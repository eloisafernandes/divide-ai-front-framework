import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IGroup, IGroupForm, IReform, IReformForm } from "@/interfaces/IGroup";
import { message } from "antd";
import { GroupForm } from "./GroupForm";
import { useGroupUpdate } from "@/hooks/group/groupHook";

interface DrawerEditGroupProps {
  isOpen: boolean;
  onClose: () => void;
  initialGroup: IReform;
}

export function DrawerEditGroup({ isOpen, onClose, initialGroup }: DrawerEditGroupProps) {
  const { mutate: updateGroup, isPending } = useGroupUpdate();

  const mapInitialGroupToFormValues = (group: IReform): IReformForm => {
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      createdBy: group.createdBy?.id,
      occurrenceDate: new Date(group.occurrenceDate),
      local: group.local,
      area: group.area,
      priority: group.priority,
    }
  };

  const handleGroupSave = (values: IReformForm) => {
    updateGroup(
      { ...values, id: initialGroup.id },
      {
        onSuccess: () => {
          message.success("Reforma editada com sucesso!");
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
            <DrawerTitle>Editar Reforma</DrawerTitle>
            <DrawerDescription>Atualize as informações da reforma abaixo.</DrawerDescription>
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
