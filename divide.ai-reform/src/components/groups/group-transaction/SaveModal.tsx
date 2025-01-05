import { message } from "antd";
import { useEffect, useState } from "react";
import { IUser, IUserResponse } from "@/interfaces/IUser";
import { IGroupTransactionRequest } from "@/interfaces/IGroupTransaction";
import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { useGroupDataById } from "@/hooks/group/groupHook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { useGroupTransactionMutate } from "@/hooks/group/UseGroupTransactions";
import { LoadingOutlined } from '@ant-design/icons';

interface SaveModelProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
}

export function SaveModal({isOpen, onClose, groupId}: SaveModelProps) {

  const userId = getUserLocalStorage()?.id;

  const [formData, setFormData] = useState<IGroupTransactionRequest>({
      amount: 0, 
      description: '',
      groupId: groupId, 
      debts: [], 
      createdBy: userId, 
      dueDate: new Date()
  });

  const { data: group } = useGroupDataById(groupId);
  const members = group?.members || [];

  const [selectedMembers, setSelectedMembers] = useState<IUserResponse[]>(members || []);
  const [memberAmounts, setMemberAmounts] = useState<{ [key: number]: number }>({});

  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["Dados gerais", "Selecionar membros", "Valores dos membros"];

  const { mutate: createGroupTransaction, isPending } = useGroupTransactionMutate(); 

  useEffect(() => {
    if(!isOpen) {
      setCurrentStep(1);
      setSelectedMembers([]);
      setMemberAmounts({});
      setFormData({
        amount: 0, 
        description: '',
        groupId: groupId, 
        debts: [], 
        createdBy: userId, 
        dueDate: new Date()
    })

    }
  }, [isOpen]);

  const handleNextStep = () => {
    if(currentStep === 1 && formData.description && formData.amount) {
      setCurrentStep(currentStep + 1);
    } else if(currentStep === 2 && selectedMembers.length > 0) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (validateAmounts()) {
      const completeFormData = buildCompleteFormData(); 

      createGroupTransaction(completeFormData, {
        onSuccess: (data) => {
          if (data) {
            message.success("Despesa de grupo criada com sucesso!");
            onClose();
          }
        },
        onError: (error: any) => {
          message.error(error.message);
        },
      });
    }
  }

  const handleMembersChange = (members : IUserResponse []) => {
    setSelectedMembers(members);
  }

  const handleAmountChange = (memberId: number, amount: number) => {
    setMemberAmounts(prevAmounts => ({
      ...prevAmounts,
      [memberId]: amount,
    }));
  };

  const buildCompleteFormData = () => {
    const debts = selectedMembers.map((member) => ({
      userId: member.id,
      amount: memberAmounts[member.id] || 0,
    }));
  
    return {
      ...formData,
      debts,
    };
  };

  const validateAmounts = () => {
    const totalMemberAmount = Object.values(memberAmounts).reduce((acc, value) => acc + value, 0);
    if (totalMemberAmount !== formData.amount) {
      message.error(`A soma dos valores dos membros (${totalMemberAmount}) não é igual ao valor total da despesa (${formData.amount}).`);
      return false;
    }
    return true;
  };

  const totalMemberAmount = Object.values(memberAmounts).reduce((acc, value) => acc + value, 0);
  const isAmountValid = totalMemberAmount === formData.amount;

  return (

    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="overflow-y-auto">
      <DialogHeader>
          <DialogTitle>Nova Despesa</DialogTitle>
          <DialogDescription>Preencha as etapas para criar uma nova despesa.</DialogDescription>
      </DialogHeader>
        {currentStep === 1 && <StepOne formData = {formData} setFormData = {setFormData} />}
        {currentStep === 2 && <StepTwo members = {members} selectedMembers= {selectedMembers} onMembersChange = {handleMembersChange} />}
        {currentStep === 3 && <StepThree selectedMembers={selectedMembers} memberAmounts={memberAmounts} onAmountChange={handleAmountChange} amount={formData.amount} /> }
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
            <Button variant="divideDark" 
                    onClick={handleNextStep}
                    disabled={
                      (currentStep === 1 && (!formData.amount || !formData.description)) ||
                      (currentStep === 2 && selectedMembers.length === 0)
                    }
            >
              Próximo
            </Button>
        ) : (
          <Button variant="divideDark" 
                  onClick={handleSubmit}
                  disabled={
                    isPending || 
                    (currentStep === 1 && (!formData.amount || !formData.description)) ||
                    (currentStep === 2 && selectedMembers.length === 0) ||
                    (currentStep === 3 && !isAmountValid)
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