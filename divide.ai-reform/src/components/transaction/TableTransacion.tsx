import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, FilePenLine } from 'lucide-react';
import { useTransactionDelete, useTransactionDataByUser } from "@/hooks/transacion/transacionHook";
import { DrawerTransaction } from "./DrawerEditTransaction";
import { ITransacion, ITransacionResponse } from "@/interfaces/ITransacion";


export function TableTransacion() {
    const { data } = useTransactionDataByUser();

    const [selectedTransacion, setSelectedTransacion] = useState<ITransacionResponse | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleEdit = (transaction: ITransacionResponse) => {
        // console.log("triction convertida: ", convertToITransacion(transaction));
        setSelectedTransacion(convertToITransacion(transaction));
        setIsDrawerOpen(true);
    };
    const convertToITransacion = (response: ITransacionResponse): ITransacion => {
        console.log("response do editar: ", response.id);
        return {
          id: response.id,
          amount: response.amount,
          description: response.description,
          categoryId: response.category?.id ?? response.category?.id ?? 0, 
          userId: response.userId,
          paidAt: response.paidAt,
        };
      };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setSelectedTransacion(null);
    };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-2/12">Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Valor (R$)</TableHead>
                        <TableHead>Classificação</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {Array.isArray(data) && data.map((transaction: ITransacionResponse) => (
                        
                        <TableRow key={transaction.id}>
                            <TableCell className="w-5/12">
                                <div className="flex flex-row items-center">
                                    <span>{transaction.description}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <p className="w-fit p-1 px-4 rounded-xl" style={{ backgroundColor: transaction.category!.color! }}>{transaction.category!.name!}</p></TableCell>
                            <TableCell>
                                <p> {new Intl.NumberFormat('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format(Math.abs(transaction.amount))}</p></TableCell>
                            <TableCell>
                            {transaction.paidAt == null && transaction.amount > 0 && (
                                <p className="w-fit bg-green-100 p-2 text-sm rounded text-green-950">Ganho</p>
                             )}
                            {transaction.paidAt == null && transaction.amount < 0 && (
                                <p className="w-fit bg-red-100 p-2 text-sm rounded text-red-950">Dívida</p>
                             )}
                            {transaction.paidAt != null && transaction.amount < 0 && (
                                <p className="w-fit bg-green-100 p-2 text-sm rounded text-green-950">Gasto</p>
                             )}
                            </TableCell>

                            <TableCell>
                                <div className="flex justify-center">
                                    <Button variant="link" className="text-gray p-1" onClick={() => handleEdit(transaction)}>
                                        <FilePenLine className="w-5 h-5" />
                                    </Button>
                                    <ButtonDelete transacion={transaction} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Drawer para edição */}
            {selectedTransacion && (
                <DrawerTransaction
                    initialTransaction={selectedTransacion}
                    isOpen={isDrawerOpen}
                    onClose={handleDrawerClose}
                />
            )}
        </>
    );
}

function ButtonDelete({ transacion }: { transacion: ITransacionResponse | ITransacion }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate, isSuccess } = useTransactionDelete();

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        mutate(transacion.id!);
        if (isSuccess) {
            handleClose();
        }
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
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente sua transação.
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
