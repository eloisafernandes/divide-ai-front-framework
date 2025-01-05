import { useEffect, useState } from "react";
import { IUserResponse } from "@/interfaces/IUser";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "../../ui/avatar"
import { generateColor } from "../listGroup/GroupAvatars";
import { Checkbox } from "@/components/ui/checkbox";
import { formatInitialName } from "@/utils/Formatter";


interface StepTwoProps {
  members: IUserResponse[];
  selectedMembers: IUserResponse[];
  onMembersChange: (members: IUserResponse[]) => void;
}

export function StepTwo({ members, selectedMembers, onMembersChange }: StepTwoProps) {
  const [selected, setSelected] = useState<IUserResponse[]>(selectedMembers);

  useEffect(() => {
    onMembersChange(selected);
  }, [selected, onMembersChange]);

  const handleCheckboxChange = (member: IUserResponse) => {
    setSelected(prevSelected => {
      if (prevSelected.some(item => item.id === member.id)) {
        return prevSelected.filter(item => item.id !== member.id);
      } else {
        return [...prevSelected, member];
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selecione Membros</CardTitle>
        <CardDescription>Marque os membros que participarão da despesa</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-4">
          {members.map(member => (
            <li key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className={generateColor(member.id)}>
                    {formatInitialName(member.firstName.charAt(0))}
                    {formatInitialName(member.lastName.charAt(0))}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>

              <Checkbox
                checked={selected.some(item => item.id === member.id)}
                onCheckedChange={() => handleCheckboxChange(member)}
                className="border border-divide data-[state=checked]:bg-divide-dark data-[state=checked]:text-white"
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
