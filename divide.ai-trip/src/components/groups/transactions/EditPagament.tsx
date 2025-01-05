import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { usePaidAtUpdate } from '@/hooks/debt/debtHook';
import { message } from "antd";
import { IDebt } from "@/interfaces/IDebt";


export function EditPagament({ debt }: { debt: IDebt }) {
  const [date, setDate] = useState<Date | null>(debt.paidAt ? new Date(debt.paidAt) : null);
  const [isOpen, setIsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [status, setStatus] = useState(debt.paidAt ? "default" : "comfortable");
  const formattedDate = date ? format(date, "PPP", { locale: ptBR }) : "Escolha uma data";

  const { mutate: putPaidAt } = usePaidAtUpdate({ id: debt.id, date });

  const handleSave = () => {
    if (!debt.id) return;

    if (status === "default" && !date) {
      message.error("Por favor, selecione uma data para pagamentos marcados como 'Pago'.");
      return;
    }


    if (date) {
      const dateWithTime = new Date(date);
      const currentTime = new Date();
      dateWithTime.setHours(currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds());
      setDate(dateWithTime);
    }

    putPaidAt(undefined, {
      onSuccess: () => {
        message.success("Pagamento atualizado com sucesso!");
        setIsOpen(false);
      },
      onError: (error: any) => {
        message.error("Erro ao atualizar pagamento: " + error.message);
      },
    });
  };
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    if (newStatus === "comfortable") {
      setDate(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="p-2 ms-1" variant="outline" onClick={() => setIsOpen(true)}>
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] md:max-w-[435px]">
        <DialogHeader>
          <DialogTitle>Edite o pagamento</DialogTitle>
          <DialogDescription>
            Selecione se a despesa foi paga ou não
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-8 py-auto">
          <div className="grid grid-cols-4 items-center gap-8">
            <Label htmlFor="paymentStatus" className="text-right">
              Pagamento
            </Label>
            <RadioGroup value={status} onValueChange={handleStatusChange} className="w-12/12">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Pago</Label>
              </div>
              <div className="flex items-center space-x-1 w-full">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Não Pago</Label>
              </div>
            </RadioGroup>
          </div>
          {status === "default" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Data
              </Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[300%] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formattedDate}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date || undefined}
                    onDayClick={(day) => {
                      setDate(day);
                      setCalendarOpen(false);
                    }}
                    locale={ptBR}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="default" onClick={handleSave}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}




