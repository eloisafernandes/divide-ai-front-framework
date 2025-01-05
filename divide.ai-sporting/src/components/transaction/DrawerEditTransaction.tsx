import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { TransactionForm } from "./TransactionForm";
import { message } from "antd";
import { useTransactionUpdate } from "@/hooks/transacion/transacionHook"; 
import { ITransacion, ITransacionResponse } from "@/interfaces/ITransacion";

interface DrawerTransactionProps {
  initialTransaction: ITransacionResponse; 
  isOpen: boolean; 
  onClose: () => void; 
}

export function DrawerTransaction({ initialTransaction, isOpen, onClose }: DrawerTransactionProps) {
  const [isLoading, setLoading] = useState(false);

  const { mutate: updateTransaction } = useTransactionUpdate();

  const handleTransactionSave = (values: ITransacion) => {
    setLoading(true);
    console.log("no envio para upodate: ",values);
    updateTransaction(
      { ...values, id: initialTransaction.id },
      {
        
        onSuccess: () => {
          message.success("Transação editada com sucesso!");
          setLoading(false);
          
          onClose(); 
        },
        onError: () => {
          message.error("Erro ao editar a transação. Tente novamente.");
          setLoading(false);
        },
      }
    );
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose} onClose={onClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg flex flex-col justify-center">
          <DrawerHeader>
            <DrawerTitle>Editar Transação</DrawerTitle>
            <DrawerDescription>
              Altere os detalhes da transação.
            </DrawerDescription>
            <TransactionForm
              onSubmit={handleTransactionSave}
              isLoading={isLoading}
              initialData={initialTransaction} 
            />
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
