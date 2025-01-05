import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IGroupTransaction } from "@/interfaces/IGroupTransactions";
import { IGroupTransactionRequest } from "@/interfaces/IGroupTransaction";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { formatDate } from "@/utils/Formatter";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { message } from "antd";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';

interface StepOneProps {
  formData: IGroupTransactionRequest;
  setFormData: React.Dispatch<React.SetStateAction<IGroupTransactionRequest>>;
}

export function StepOne({ formData, setFormData }: StepOneProps) {
  const formattedDate = formData.dueDate
    ? format(formData.dueDate, "PPP", { locale: ptBR })
    : "Escolha uma data";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  };

  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      dueDate: selectedDate,
    }));
  };


  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <Label htmlFor="description">Descrição</Label>
        <Input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col space-y-1">
        <Label htmlFor="amount">Valor</Label>
        <Input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount || ""}
          onChange={handleInputChange}
          min="0"
          step="0.01"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <Label htmlFor="dueDate">Data de Vencimento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.dueDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formattedDate}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.dueDate}
              onSelect={handleDateSelect}
              locale={ptBR}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

