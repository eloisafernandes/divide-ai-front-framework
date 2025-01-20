import { useTripDataById } from '@/hooks/trip/tripHook';
import { useParams } from 'react-router-dom';
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { DialogCode } from '@/components/groups/DialogCode';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TabTrip } from '@/components/groups/TabTrip';

export function TripDetails() {
  const { id } = useParams();
  const tripId = Number(id);
  const { data: trip } = useTripDataById(tripId); 
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  if (!trip) {
    return <div>Viagem não encontrada.</div>;
  }

  const handleDialogOpen = () => setIsDialogOpen(true); 

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      {/* Sidebar mobile */}
      <SheetMenu />
			<div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{trip.name}</h2> 
        <div className="flex items-center space-x-2">
          {!trip.discontinued &&
            <Button variant="divideDark" onClick={handleDialogOpen}>
              Obter código
            </Button>
          }
          <DialogCode
            isOpen={isDialogOpen}
            groupCode={trip.code}
            onClose={() => setIsDialogOpen(false)}
          />
        </div>
      </div>
      <TabTrip trip={trip}/>
    </div>
  );
}

