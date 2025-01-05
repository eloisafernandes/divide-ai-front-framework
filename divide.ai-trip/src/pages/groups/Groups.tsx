import { GroupCard } from "@/components/groups/listGroup/GroupCard";
import { IGroup } from "@/interfaces/IGroup";
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { DrawerInsertCode } from "@/components/groups/DrawerInsertCode";
import { DrawerNewGroup } from "@/components/groups/saveGroup/DrawerNewGroup";
import { useGroupDataByUser } from "@/hooks/group/groupHook";

import { useNavigate } from 'react-router-dom';

export function Groups() {

  const { data } = useGroupDataByUser();
  const navigate = useNavigate();

  const handleGroupClick = (group: IGroup) => {
    navigate(`/grupos/${group.id}`);
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      {/* Sidebar mobile */}
      <SheetMenu />
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciar grupos</h2>
        <div className="flex items-center space-x-2">
          <DrawerNewGroup />
          <DrawerInsertCode />
        </div>
      </div>
      
      {/* Lista de Grupos */}
      {Array.isArray(data) && data.map((groupCard: IGroup) => (
        <div key={groupCard.id} onClick={() => handleGroupClick(groupCard)}>
          <GroupCard group={groupCard} />
        </div>
      ))}
    </div>
  );
}

