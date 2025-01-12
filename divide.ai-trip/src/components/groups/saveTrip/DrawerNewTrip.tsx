import { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ITripForm } from "@/interfaces/IGroup";
import { message } from "antd";
import { TripForm } from "./TripForm";
import { DialogCode } from "../DialogCode";
import { useTripMutate } from "@/hooks/trip/tripHook";

export function DrawerNewTrip() {
  const { mutate: creteTrip, isPending } = useTripMutate(); 

  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groupCode, setGroupCode] = useState<string | null>(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleGroupSave = (values: ITripForm) => {
    console.log(values);
    creteTrip(values, {
      onSuccess: (data) => {
        if (data) {
          setGroupCode(data.code); 
          setIsDialogOpen(true);
          message.success("Grupo de viagem criado com sucesso!");
          setIsOpen(false);
        }
      },
      onError: (error: any) => {
        message.error(error.message);
      }
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={handleClose}>
      <DrawerTrigger asChild onClick={() => setIsOpen(true)}>
        <Button variant="divideDark">Novo grupo de viagem</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg flex flex-col justify-center">
          <DrawerHeader>
            <DrawerTitle>Criar novo grupo de viagem</DrawerTitle>
            <DrawerDescription>Preencha os detalhes.</DrawerDescription>
            <TripForm onSubmit={handleGroupSave} isLoading={isPending} /> 
          </DrawerHeader>
        </div>
      </DrawerContent>
      {groupCode && (
        <DialogCode isOpen={isDialogOpen} groupCode={groupCode} onClose={() => setIsDialogOpen(false)} />
      )}
    </Drawer>
  );
}