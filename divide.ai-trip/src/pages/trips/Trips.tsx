import { TripCard } from "@/components/groups/listTrip/TripCard";
import { ITrip } from "@/interfaces/IGroup";
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { DrawerInsertCode } from "@/components/groups/DrawerInsertCode";
import { DrawerNewTrip } from "@/components/groups/saveTrip/DrawerNewTrip";
import { useTripDataByUser } from "@/hooks/trip/tripHook";

import { useNavigate } from 'react-router-dom';

export function Trips() {

  const { data } = useTripDataByUser();
  const navigate = useNavigate();

  const handleGroupClick = (trip: ITrip) => {
    navigate(`/viagens/${trip.id}`);
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      {/* Sidebar mobile */}
      <SheetMenu />
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciar viagens</h2>
        <div className="flex items-center space-x-2">
          <DrawerNewTrip />
          <DrawerInsertCode />
        </div>
      </div>
      
      {/* Lista de Grupos */}
      {Array.isArray(data) && data.map((tripCard: ITrip) => (
        <div key={tripCard.id} onClick={() => handleGroupClick(tripCard)}>
          <TripCard trip={tripCard} />
        </div>
      ))}
    </div>
  );
}

