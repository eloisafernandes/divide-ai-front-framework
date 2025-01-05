import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IGroup, IGroupForm } from "@/interfaces/IGroup";
import { message } from "antd";
import { GroupForm } from "./GroupForm";
import { useGroupUpdate } from "@/hooks/group/groupHook";

interface DrawerEditGroupProps {
  isOpen: boolean;
  onClose: () => void;
  initialGroup: IGroup;
}

export function DrawerEditGroup({ isOpen, onClose, initialGroup }: DrawerEditGroupProps) {
  const { mutate: updateGroup, isPending } = useGroupUpdate();

  const mapInitialGroupToFormValues = (group: IGroup): IGroupForm => {
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      createdBy: group.createdBy?.id,
    };
  };

  const handleGroupSave = (values: IGroupForm) => {
    updateGroup(
      { ...values, id: initialGroup.id },
      {
        onSuccess: () => {
          message.success("Grupo editado com sucesso!");
          onClose();
        },
        onError: (error: any) => {
          message.error(error.message);
        }
      }
    );
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Editar Grupo</DrawerTitle>
            <DrawerDescription>Atualize as informações do grupo abaixo.</DrawerDescription>
            <GroupForm
              initialData={mapInitialGroupToFormValues(initialGroup)}
              onSubmit={handleGroupSave}
              isLoading={isPending}
            />
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
