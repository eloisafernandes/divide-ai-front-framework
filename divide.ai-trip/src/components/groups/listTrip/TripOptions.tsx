import { Button } from "@/components/ui/button";
import { Edit, Info, MoreVertical, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from 'usehooks-ts';
import { useMediaQuery } from 'react-responsive';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { DialogCode } from "../DialogCode";
import { DrawerEditTrip } from "../saveTrip/DrawerEditTrip";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IGroup, ITrip } from "@/interfaces/IGroup";
import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { useTripDelete, useTripLeave } from "@/hooks/trip/tripHook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { message } from "antd";

interface TripOptionsProps {
  trip: ITrip;
}

export function TripOptions({ trip }: TripOptionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  const userId = Number(getUserLocalStorage()?.id);
  const { mutate: deleteGroup } = useTripDelete();
  const { mutate: leaveGroup } = useTripLeave(trip.id!, userId);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const isCreator = Number(trip.createdBy.id) === userId;

  const drawerRef = useRef(null);

  
  useEffect(() => {
    if (isDesktop && isDrawerOpen) {
      setIsDrawerOpen(false);
    }

  }, [isDesktop, isDrawerOpen]);

  useOnClickOutside(drawerRef, () => {
    if (isDrawerOpen) setIsDrawerOpen(false);
  });

  const handleEditGroup = () => {
    if (!isDesktop) {
      setIsDrawerOpen(false);
    }
    setIsEditDrawerOpen(true);
  };

  const handleGetCode = () => {
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    deleteGroup(trip.id!, {
      onSuccess: () => {
        message.success("Viagem removida com sucesso!");
        setIsDeleteDialogOpen(false);
      },
      onError: (error: any) => {
        message.error(error.message);
      },
    });
  };

  const handleLeave = () => {
    leaveGroup(undefined, {
      onSuccess: () => {
        message.success("Você saiu da viagem com sucesso!");
        setIsLeaveDialogOpen(false);
      },
      onError: (error: any) => {
        message.error(error.message);
      },
    });
  };

  return (
    <>
      {isDesktop ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer p-2">
              <Button variant="ghost" className="h-10 w-10 p-0 rounded-full">
                <MoreVertical />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            {isCreator && (
              <DropdownMenuItem onClick={handleEditGroup}>Editar</DropdownMenuItem>
            )}

            {!trip.discontinued && (
              <DropdownMenuItem onClick={handleGetCode}>
                Obter código
              </DropdownMenuItem>
            )}

            {isCreator ? (
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
                Remover
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => setIsLeaveDialogOpen(true)}>
                Sair
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
              <EllipsisVertical />
            </div>
          </DrawerTrigger>
          <DrawerContent ref={drawerRef} className="flex justify-center items-center">
            <DialogTitle className="sr-only">Opções da Viagem</DialogTitle>
            <div className="flex flex-col space-y-4 p-4 w-1/2 max-w-md mx-auto">
              {isCreator && (
                <Button
                  variant="outline"
                  onClick={handleEditGroup}
                  className="flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </Button>
              )}
              {!trip.discontinued && (
                <Button
                  variant="secondary"
                  onClick={handleGetCode}
                  className="flex items-center space-x-2"
                >
                  <Info className="w-4 h-4" />
                  <span>Obter código</span>
                </Button>
              )}
              {isCreator ? (
                <Button
                  variant="destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="flex items-center space-x-2"
                >
                  <Trash className="w-4 h-4" />
                  <span>Remover</span>
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  onClick={() => setIsLeaveDialogOpen(true)}
                  className="flex items-center space-x-2"
                >
                  <Trash className="w-4 h-4" />
                  <span>Sair</span>
                </Button>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      )}

      <DrawerEditTrip
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        initialGroup={trip}
      />

      {isDialogOpen && (
        <DialogCode
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          groupCode={trip.code}
        />
      )}

      {isDeleteDialogOpen && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Você tem certeza de que deseja deletar a viagem?
              </DialogTitle>
              <DialogDescription>
                Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Deletar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {isLeaveDialogOpen && (
        <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Você tem certeza de que deseja sair do grupo de viagem?
              </DialogTitle>
              <DialogDescription>
                Você não poderá mais acessar este grupo de viagem após sair.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setIsLeaveDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleLeave}>
                Sair
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
