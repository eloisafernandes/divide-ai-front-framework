import { useGroupDataById } from '@/hooks/group/groupHook';
import { useParams } from 'react-router-dom';
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { DialogCode } from '@/components/groups/DialogCode';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TabGroup } from '@/components/groups/TabGroup';

export function GroupDetails() {
  const { id } = useParams();
  const groupId = Number(id);
  const { data: group } = useGroupDataById(groupId); 
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  if (!group) {
    return <div>Grupo não encontrado.</div>;
  }

  const handleDialogOpen = () => setIsDialogOpen(true); 

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      {/* Sidebar mobile */}
      <SheetMenu />
			<div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{group.name}</h2> 
        <div className="flex items-center space-x-2">
          {!group.discontinued &&
            <Button variant="divideDark" onClick={handleDialogOpen}>
              Obter código
            </Button>
          }
          <DialogCode
            isOpen={isDialogOpen}
            groupCode={group.code}
            onClose={() => setIsDialogOpen(false)}
          />
        </div>
      </div>
      <TabGroup group={group}/>
    </div>
  );
}

