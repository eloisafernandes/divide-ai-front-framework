import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { GroupAvatars } from "./GroupAvatars";
import { GroupOptions } from "./GroupOptions";
import { IGroup, IReform, ReformPriority } from "@/interfaces/IGroup";
import { formatDate } from "@/utils/Formatter";

interface GroupCardProps {
  group: IReform;
}

const priorityColors: { [key in ReformPriority]: string } = {
  Urgente: "bg-red-100 text-red-800",
  Alta: "bg-orange-100 text-orange-800",
  Média: "bg-yellow-100 text-yellow-800",
  Baixa: "bg-green-100 text-green-800",
};

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
              <span
                className={`inline-block px-3 py-1 rounded-full text-lg font-medium mb-4 ml-2 ${
                  priorityColors[group.priority as ReformPriority]
                }`}
              >
                {group.priority}
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
          <CardDescription className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
            {group.description}
          </CardDescription>
          <CardDescription className="text-sm text-[hsl(var(--muted-foreground))]">
            Local: {group.local}
          </CardDescription>
          <CardDescription className="text-sm text-[hsl(var(--muted-foreground))]">
            Área: {group.area} (m²)
          </CardDescription>
          <CardDescription className="text-sm text-[hsl(var(--muted-foreground))]">
            Inicia em {formatDate(group.occurrenceDate)}
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


