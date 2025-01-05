import { useState, useEffect } from 'react';
import { message } from 'antd';
import { StepOne } from './StepOne';
import { StepThree } from './StepThree';
import { IGroupTransaction } from '@/interfaces/IGroupTransactions';
import { IGroupTransactionRequest } from '@/interfaces/IGroupTransaction';
import { useGroupTransactionDataById, useGroupTransactionUpdate } from '@/hooks/group/UseGroupTransactions';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';


interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupTransactionId: number;
}

export function EditModal({ isOpen, onClose, groupTransactionId }: EditModalProps) {
  const [formData, setFormData] = useState<IGroupTransactionRequest>({
    amount: 0,
    description: '',
    debts: [],
    dueDate: new Date()
  });

  const [memberAmounts, setMemberAmounts] = useState<{ [key: number]: number }>({});
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Dados gerais", "Valores dos membros"];

  const { data: transactionData } = useGroupTransactionDataById(groupTransactionId);
  const { mutate: updateGroupTransaction, isPending } = useGroupTransactionUpdate();

  useEffect(() => {
    if (transactionData && isOpen) {
      setFormData({
        id: groupTransactionId,
        amount: transactionData.amount,
        description: transactionData.description,
        debts: transactionData.debts.map((debt) => ({
          id: debt.id,
          amount: debt.amount,
        })),
        dueDate: new Date(`${transactionData.dueDate}T00:00:00`)
      });

      const initialMemberAmounts = transactionData.debts.reduce((acc, debt) => {
        acc[debt.user.id] = debt.amount;
        return acc;
      }, {} as { [key: number]: number });
      setMemberAmounts(initialMemberAmounts);
    } else if (!transactionData && !isOpen) {
      message.error("Erro ao carregar os dados da transação.");
      onClose();
    }
  }, [transactionData, isOpen]);

  const handleNextStep = () => {
    if (currentStep === 1 && formData && formData.description && formData.amount) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (validateAmounts()) {
      const updatedFormData = {
        ...formData, 
        debts: transactionData!.debts.map((debt) => ({
          id: debt.id,
          amount: memberAmounts[debt.user.id],
        })),
      };


      updateGroupTransaction(updatedFormData, {
        onSuccess: (data) => {
          if (data) {
            console.log("Enviado" + updatedFormData.dueDate)
            message.success("Despesa de grupo atualizada com sucesso!");
            onClose();
          }
        },
        onError: (error: any) => {
          message.error(error.message);
        },
      });
    }
  };

  const handleAmountChange = (memberId: number, amount: number) => {
    setMemberAmounts((prevAmounts) => ({
      ...prevAmounts,
      [memberId]: amount,
    }));
  };

  const totalMemberAmount = Object.values(memberAmounts).reduce((acc, value) => acc + value, 0);
  const isAmountValid = totalMemberAmount === formData.amount;

  const validateAmounts = () => {
    const totalMemberAmount = Object.values(memberAmounts).reduce((acc, value) => acc + value, 0);
    if (formData && totalMemberAmount !== formData.amount) {
      message.error(`A soma dos valores dos membros (${totalMemberAmount}) não é igual ao valor total da despesa (${formData.amount}).`);
      return false;
    }
    return true;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Despesa</DialogTitle>
          <DialogDescription>Edite o valor total e os valores dos membros da despesa.</DialogDescription>
        </DialogHeader>

        {currentStep === 1 && (
          <StepOne formData={formData} setFormData={setFormData} />
        )}

        {currentStep === 2 && (
          <StepThree
            selectedMembers={transactionData!.debts.map(debt => ({
              id: debt.user.id,
              firstName: debt.user.firstName,
              lastName: debt.user.lastName,
              email: debt.user.email,
              phoneNumber: debt.user.phoneNumber,
            }))}
            memberAmounts={memberAmounts}
            onAmountChange={handleAmountChange}
            amount={formData.amount}
          />
        )}

        <DialogFooter>
          {currentStep > 1 ? (
            <Button variant="divide" onClick={() => setCurrentStep(currentStep - 1)}>
              Voltar
            </Button>
          ) : (
            <Button variant="divide" onClick={onClose}>
              Cancelar
            </Button>
          )}

          {currentStep < steps.length ? (
            <Button
              variant="divideDark"
              onClick={handleNextStep}
              disabled={currentStep === 1 && (!formData.amount || !formData.description)}
            >
              Próximo
            </Button>
          ) : (
            <Button
              variant="divideDark"
              onClick={handleSubmit}
              disabled={
                isPending ||
                (currentStep === 1 && (!formData.amount || !formData.description)) ||
                (currentStep === 2 && !isAmountValid)
              }
            >
              {isPending ? <LoadingOutlined spin /> : 'Salvar'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
