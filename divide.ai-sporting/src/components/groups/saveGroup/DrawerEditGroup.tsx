import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { IGroup, IGroupForm, ISporting, ISportingForm } from "@/interfaces/IGroup";
import { message } from "antd";
import { GroupForm } from "./GroupForm";
import { useGroupUpdate } from "@/hooks/group/groupHook";

interface DrawerEditGroupProps {
  isOpen: boolean;
  onClose: () => void;
  initialGroup: ISporting;
}

export function DrawerEditGroup({ isOpen, onClose, initialGroup }: DrawerEditGroupProps) {
  const { mutate: updateGroup, isPending } = useGroupUpdate();

  const mapInitialGroupToFormValues = (group: ISporting): ISportingForm => {
    console.log(group);
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      occurrenceDate: new Date(group.occurrenceDate),
      local: group.local,
      
      sportingsModalities: group.sportingsModalities, 
      createdBy: group.createdBy?.id,
    };
  };

  const handleGroupSave = (values: ISportingForm) => {
    console.log(values);
    updateGroup(
      { ...values, id: initialGroup.id },
      {
        onSuccess: () => {
          message.success("Evento editado com sucesso!");
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
            <DrawerTitle>Editar Evento Esportivo</DrawerTitle>
            <DrawerDescription>Atualize as informações do evento abaixo.</DrawerDescription>
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
