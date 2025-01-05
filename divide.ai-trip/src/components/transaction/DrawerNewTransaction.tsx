import { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { message } from "antd";
import { ITransacion} from "@/interfaces/ITransacion";
import { TransactionForm } from "./TransactionForm";
import { useTransactionMutate } from "@/hooks/transacion/transacionHook";

export function DrawerNewTransaction() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { mutate: createTransacion } = useTransactionMutate();
   
  const handleClose = () => {
    setIsOpen(false);
};

const handleTransacionSave = (values: ITransacion) => {
  setLoading(true);
  setTimeout(() => {
    setIsDialogOpen(true);
    message.success("Transação criada com sucesso!");
    setLoading(false);
    console.log("no envio da transação: ", values);
    
    createTransacion(values, {
      onSuccess: () => {
      }
    });
    
    setIsOpen(false);
  }, 500);
};

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={handleClose}>
      <DrawerTrigger asChild onClick={() => setIsOpen(true)}>
        <Button variant="divideDark">Nova Transação</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg flex flex-col justify-center">
          <DrawerHeader>
            <DrawerTitle>Criar nova transação</DrawerTitle>
            <DrawerDescription>Preencha os detalhes para criar uma nova transação.</DrawerDescription>
            <TransactionForm onSubmit={handleTransacionSave} isLoading={isLoading} />
          </DrawerHeader>
        </div>
      </DrawerContent>
      
    </Drawer>
  );
}