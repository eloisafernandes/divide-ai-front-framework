import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { GroupAvatars } from "./GroupAvatars";
import { GroupOptions } from "./GroupOptions";
import { IGroup } from "@/interfaces/IGroup";

interface GroupCardProps {
  group: IGroup;
}

export function GroupCard({ group }: GroupCardProps) {
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
                {group.name}
              </span>
              {group.discontinued && (
                <span
                  className="inline-block bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]
                            px-3 py-1 rounded-full text-lg font-medium mb-4 ml-2"
                >
                  Descontinuado
                </span>
              )}
          </CardTitle>
          <CardDescription className="text-sm text-[hsl(var(--muted-foreground))]">
            Criado por: {group.createdBy.firstName} {group.createdBy.lastName}
          </CardDescription>
          <CardDescription className="text-sm text-[hsl(var(--muted-foreground))]">
            {group.description}
          </CardDescription>
        </div>
        <div onClick={handleClick}>
          <GroupOptions group={group} />
        </div>
      </CardHeader>

      <CardFooter>
        <GroupAvatars users={group.members} />
      </CardFooter>
    </Card>
  );
}


