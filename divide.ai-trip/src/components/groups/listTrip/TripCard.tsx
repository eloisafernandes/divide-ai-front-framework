import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { GroupAvatars } from "./GroupAvatars";
import { TripOptions } from "./TripOptions";
import { ITrip } from "@/interfaces/IGroup";
import { formatDate } from "@/utils/Formatter";

interface TripCardProps {
  trip: ITrip;
}

export function TripCard({ trip }: TripCardProps) {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); 
  };

  return (
    <Card
      className="w-full flex flex-col bg-[hsl(var(--card))] 
                text-[hsl(var(--card-foreground))] hover:bg-gray-50 
                hover:text-[hsl(var(--muted-foreground))] transition-colors"
    >
      <CardHeader className="flex flex-row justify-between items-start">
        <div className="flex flex-col">
        <CardTitle>
              <span
                className="inline-block bg-[#E9F3F2] text-[#438883] 
                          px-3 py-1 rounded-full text-lg font-medium mb-4"
              >
                {trip.name}
              </span>

              <span
                className="inline-block bg-[#E9F3F2] text-[#438883] 
                          px-3 py-1 rounded-full text-lg font-medium mb-4 ml-2"
              >
                {trip.destination}
              </span>
              
              {trip.discontinued && (
                <span
                  className="inline-block bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]
                            px-3 py-1 rounded-full text-lg font-medium mb-4 ml-2"
                >
                  Descontinuado
                </span>
              )}
          </CardTitle>
          <CardDescription className="text-sm text-[hsl(var(--muted-foreground))]">
            Criado por: {trip.createdBy.firstName} {trip.createdBy.lastName}
          </CardDescription>
          <CardDescription className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            {trip.description}
          </CardDescription>
          <CardDescription className="text-sm text-[hsl(var(--muted-foreground))]">
            De {formatDate(trip.startDate)} até {formatDate(trip.finalOccurrenceDate)}
          </CardDescription>
        </div>
        <div onClick={handleClick}>
          <TripOptions trip={trip} />
        </div>
      </CardHeader>

      <CardFooter>
        <GroupAvatars users={trip.members} />
      </CardFooter>
    </Card>
  );
}


