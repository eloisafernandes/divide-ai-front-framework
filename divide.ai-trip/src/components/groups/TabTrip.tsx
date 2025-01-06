import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { IUserResponse } from "@/interfaces/IUser"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { ITrip } from "@/interfaces/IGroup"
import { useState } from "react"
import { useTripDeleteMember } from "@/hooks/trip/tripHook"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react"
import { getUserLocalStorage } from "@/context/AuthProvider/util"
import { message } from "antd"
import { generateColor } from "./listTrip/GroupAvatars"
import { SaveModal } from "./group-transaction/SaveModal"
import { ListTransaction } from "./transactions/ListTransactions"

interface TabTripProps {
    trip: ITrip;
  }
  
export function TabTrip({ trip }: TabTripProps) {
    const currentUserId  = Number(getUserLocalStorage()?.id); 
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleClose = () => {
      setIsDialogOpen(false);
    };  

    const handleOpen = () => {
      setIsDialogOpen(true);
    }; 

    return (
      <Tabs defaultValue="expenses">
      <TabsList
        className="grid w-full sm:w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2 h-[40px] bg-divide text-secondary-foreground border-border"
      >
        <TabsTrigger
          value="expenses"
          className="h-full text-divide-dark bg-divide hover:bg-divide/90 transition-colors"
        >
          Despesas
        </TabsTrigger>
        <TabsTrigger
          value="members"
          className="h-full text-divide-dark bg-divide hover:bg-divide/90 transition-colors"
        >
          Membros
        </TabsTrigger>
      </TabsList>
  
        <TabsContent value="expenses" className="w-full">
          <Card>
            <CardHeader className="flex-row justify-between items-center px-10">
              <CardTitle>Despesas</CardTitle>
              <Button
                variant="divideActive"
                onClick={handleOpen}
              >
                Nova despesa
          </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              <ListTransaction groupId={trip.id} />
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </TabsContent>
  
        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Membros</CardTitle>
              <CardDescription>
                Confira os membros do grupo de viagem aqui!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-4">
                {trip.members.map((user: IUserResponse) => (
                  <li key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className={generateColor(user.id)}>
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>

                    {trip.createdBy.id === currentUserId && user.id !== currentUserId && (
                      <ButtonDelete userId={user.id} groupId={trip.id} />
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {isDialogOpen && (
        <SaveModal
          isOpen={isDialogOpen}
          onClose={handleClose}
          groupId={trip.id}
        />
      )}

      </Tabs>
    );
  }
  
  function ButtonDelete({ userId, groupId }: { userId: number; groupId: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate : deleteMember } = useTripDeleteMember(groupId, userId);
  
    const handleClose = () => {
      setIsModalOpen(false);
    };
  
    const handleDelete = () => {
        deleteMember(undefined, {
          onSuccess: () => {
            message.success('Você removeu o usuário da viagem com sucesso!');
            setIsModalOpen(false);
          },
          onError: (error: any) => {
            message.error(error.message);
          }
        });
      };
  
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <div className="cursor-pointer relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground">
            <Trash2 color="red" className="w-5 h-5 text-gray-50" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza dessa ação?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o membro da viagem.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDelete}>Deletar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  