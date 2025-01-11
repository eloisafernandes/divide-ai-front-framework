import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ITrip, ITripForm } from "@/interfaces/IGroup";
import { message } from "antd";
import { TripForm } from "./TripForm";
import { useTripUpdate } from "@/hooks/trip/tripHook";

interface DrawerEditTripProps {
  isOpen: boolean;
  onClose: () => void;
  initialGroup: ITrip;
}

export function DrawerEditTrip({ isOpen, onClose, initialGroup }: DrawerEditTripProps) {
  const { mutate: updateTrip, isPending } = useTripUpdate();

  const mapInitialGroupToFormValues = (group: ITrip): ITripForm => {
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      createdBy: group.createdBy?.id,
      endDate: new Date(`${group.endDate}T00:00:00`),
      destination: group.destination,
      occurrenceDate: new Date(`${group.occurrenceDate}T00:00:00`),
    };
  };

  const handleGroupSave = (values: ITripForm) => {
    updateTrip(
      { ...values, id: initialGroup.id },
      {
        onSuccess: () => {
          message.success("Viagem editada com sucesso!");
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
            <DrawerTitle>Editar Viagem</DrawerTitle>
            <DrawerDescription>Atualize as informações da viagem abaixo.</DrawerDescription>
            <TripForm
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
