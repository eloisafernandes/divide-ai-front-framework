import { useGroupTransactionDelete, useGroupTransactions } from "@/hooks/group/UseGroupTransactions";
import { formatMoney, formatDate, truncateText } from "@/utils/Formatter";
import { GroupAvatars } from "../listGroup/GroupAvatars";
import { useMediaQuery } from 'react-responsive';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useAuth } from "@/context/AuthProvider/useAuth";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { message } from "antd";
import { useState } from "react";
import { EditModal } from "../group-transaction/EditModal";
import { useNavigate } from "react-router-dom";

export function ListTransaction({ groupId }: { groupId: number }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data } = useGroupTransactions(groupId);
  const { mutate: deleteTransacion } = useGroupTransactionDelete(groupId);
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const userId = useAuth().id;

  const navigate = useNavigate();
  
  const handleDelete = () => {
    deleteTransacion({ groupId, transactionId: selectedTransactionId! }, {
      onSuccess: () => {
        message.success('Despesa excluida com sucesso!');
        setIsDialogOpen(false);
      },
      onError: (error: any) => {
        message.error(error.message);
      }
    });
  }

  const handleEditTransaction = (transactionId: number) => {
    setSelectedTransactionId(transactionId);
    setIsEditDialogOpen(true);
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); 
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        {data?.map((transaction) => (
          <div className="flex cursor-pointer hover:bg-muted p-5 rounded-md" key={transaction.id} onClick={() => navigate(`/details/${transaction.id}`, { state: { transactionCreatedBy: transaction.createdBy } })}>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {truncateText(transaction.description, isMobile ? 20 : 50)}
              </p>
              <GroupAvatars users={transaction.debts.map((debt) => debt.user)} />
            </div>
            <div className="ml-auto font-medium">
              {formatMoney(transaction.amount)}
              <p className="text-sm text-muted-foreground">{formatDate(transaction.createdAt)}</p>
            </div>
            <div className="ml-4" onClick={handleClick}>
              {transaction.createdBy.id == userId && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <EllipsisVertical />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40">
                    <DropdownMenuItem onClick={() => handleEditTransaction(transaction.id)}>
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setSelectedTransactionId(transaction.id); // Set the selected transaction ID
                      setIsDialogOpen(true); // Open the dialog
                    }}>
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de deletar despesa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Você tem certeza de que deseja excluir essa despesa?</DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => {
              setIsDialogOpen(false);
              setSelectedTransactionId(null); // Clear selected ID if user cancels
            }}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
          

      {isEditDialogOpen && (
        <EditModal
          groupTransactionId={selectedTransactionId!}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
        />
      )}
    </>
  );
}