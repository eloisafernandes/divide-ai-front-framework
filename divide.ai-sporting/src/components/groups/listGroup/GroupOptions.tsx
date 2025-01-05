import { Button } from "@/components/ui/button";
import { Edit, Info, MoreVertical, Trash } from "lucide-react";
import { useRef, useState } from "react";
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
import { DrawerEditGroup } from "../saveGroup/DrawerEditGroup";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IGroup } from "@/interfaces/IGroup";
import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { useGroupDelete, useGroupLeave } from "@/hooks/group/groupHook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { message } from "antd";

interface GroupOptionsProps {
  group: IGroup;
}

export function GroupOptions({ group }: GroupOptionsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);

  const userId = Number(getUserLocalStorage()?.id);
  const { mutate: deleteGroup } = useGroupDelete();
  const { mutate: leaveGroup } = useGroupLeave(group.id!, userId);

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const isCreator = Number(group.createdBy.id) === userId;

  const drawerRef = useRef(null);

  useOnClickOutside(drawerRef, () => {
    if (isDrawerOpen) setIsDrawerOpen(false);
  });

  const handleEditGroup = () => {
    setIsEditDrawerOpen(true);
  };

  const handleGetCode = () => {
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    deleteGroup(group.id!, {
      onSuccess: () => {
        message.success('Grupo removido com sucesso!');
        setIsDeleteDialogOpen(false);
      },
      onError: (error: any) => {
        message.error(error.message);
      }
    });
  };

  const handleLeave = () => {
    leaveGroup(undefined, {
      onSuccess: () => {
        message.success('Você saiu do grupo com sucesso!');
        setIsLeaveDialogOpen(false);
      },
      onError: (error: any) => {
        message.error(error.message);
      }
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

            {!group.discontinued && (
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
        <Drawer
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        >
          <DrawerTrigger asChild>
            <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
              <EllipsisVertical />
            </div>
          </DrawerTrigger>
          <DrawerContent ref={drawerRef} className="flex justify-center items-center">
            <DialogTitle className="sr-only">Opções do Grupo</DialogTitle>
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
              {!group.discontinued && (
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

      {isDialogOpen && (
        <DialogCode
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          groupCode={group.code}
        />
      )}

      <DrawerEditGroup
        isOpen={isEditDrawerOpen}
        onClose={() => setIsEditDrawerOpen(false)}
        initialGroup={group}
      />

      {/* Modal de deletar grupo */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza de que deseja deletar o grupo?</DialogTitle>
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

      {/* Modal de sair do grupo */}
      <Dialog open={isLeaveDialogOpen} onOpenChange={setIsLeaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza de que deseja sair do grupo?</DialogTitle>
            <DialogDescription>
              Você não poderá mais acessar este grupo após sair.
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
    </>
  );
}