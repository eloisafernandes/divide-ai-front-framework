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
import { IGroupForm, IReformForm } from "@/interfaces/IGroup";
import { message } from "antd";
import { GroupForm } from "./GroupForm";
import { DialogCode } from "../DialogCode";
import { useGroupMutate } from "@/hooks/group/groupHook";

export function DrawerNewGroup() {
  const { mutate: createGroup, isPending } = useGroupMutate(); 

  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groupCode, setGroupCode] = useState<string | null>(null);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleGroupSave = (values: IReformForm) => {
    createGroup(values, {
      onSuccess: (data) => {
        if (data) {
          setGroupCode(data.code); 
          setIsDialogOpen(true);
          message.success("Reforma criada com sucesso!");
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
        <Button variant="divideDark">Nova reforma</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg flex flex-col justify-center">
          <DrawerHeader>
            <DrawerTitle>Criar nova reforma</DrawerTitle>
            <DrawerDescription>Preencha os detalhes para criar uma nova reforma.</DrawerDescription>
            <GroupForm onSubmit={handleGroupSave} isLoading={isPending} /> 
          </DrawerHeader>
        </div>
      </DrawerContent>
      {groupCode && (
        <DialogCode isOpen={isDialogOpen} groupCode={groupCode} onClose={() => setIsDialogOpen(false)} />
      )}
    </Drawer>
  );
}