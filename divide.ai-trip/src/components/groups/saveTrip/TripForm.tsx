import { Form } from "antd"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { IGroup, IGroupForm, ITripForm } from "@/interfaces/IGroup";
import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";


interface TripFormProps {
  initialData?: ITripForm | null;
  onSubmit: (values: ITripForm) => void;
  isLoading: boolean;
}

export function TripForm({ initialData, onSubmit, isLoading }: TripFormProps) {
  const [form] = Form.useForm();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [finalOccurrenceDate, setEndDate] = useState<Date | null>(null);

  const formattedStartDate = startDate
    ? format(startDate, "PPP", { locale: ptBR })
    : "Escolha uma data";
  const formattedEndDate = finalOccurrenceDate
    ? format(finalOccurrenceDate, "PPP", { locale: ptBR })
    : "Escolha uma data";

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
      setStartDate(initialData.startDate || null);
      setEndDate(initialData.finalOccurrenceDate || null); 
    }
  }, [initialData, form]);

  const handleSubmit = (values: ITripForm) => {
    const userId = getUserLocalStorage()?.id;

    onSubmit({
      ...values,
      createdBy: userId,
    });
  };

  const handleStartDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setStartDate(selectedDate);
    form.setFieldsValue({ startDate: selectedDate });
  };

  const handleEndDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setEndDate(selectedDate);
    form.setFieldsValue({ finalOccurrenceDate: selectedDate });
  };

  return (
    <Form
      form={form}
      name="edit-group-form"
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        name: "",
        description: "",
        destination: "",
        startDate: null,
        finalOccurrenceDate: null, 
      }}
    >
      <Label htmlFor="name" className="font-medium">
        Nome do grupo de Viagem
      </Label>
      <Form.Item
        name="name"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: "Por favor, insira o nome!" }]}
      >
        <Input id="name" />
      </Form.Item>

      <Label htmlFor="description" className="font-medium">
        Descrição
      </Label>
      <Form.Item
        name="description"
        className="text-primary m-0 mt-1 mb-2"
      >
        <Input id="description" />
      </Form.Item>

      <Label htmlFor="destination" className="font-medium">
        Destino
      </Label>
      <Form.Item
        name="destination"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: "Por favor, insira o destino!" }]}
      >
        <Input id="destination" />
      </Form.Item>

      {/* Data Inicial */}
      <Label htmlFor="startDate" className="font-medium">
        Data Inicial
      </Label>
      <Form.Item
        name="startDate"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: "Por favor, insira a data inicial!" }]}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formattedStartDate}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate || undefined}
              onSelect={handleStartDateSelect}
              locale={ptBR}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </Form.Item>

      {/* Data Final */}
      <Label htmlFor="finalOccurrenceDate" className="font-medium">
        Data Final
      </Label>
      <Form.Item
        name="finalOccurrenceDate"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: "Por favor, insira a data final!" }]}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !finalOccurrenceDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formattedEndDate}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Calendar
              mode="single"
              selected={finalOccurrenceDate || undefined}
              onSelect={handleEndDateSelect}
              locale={ptBR}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </Form.Item>

      <Button
        type="submit"
        variant="divideDark"
        className="w-full mt-4"
        disabled={isLoading}
      >
        {isLoading ? <LoadingOutlined spin /> : "Salvar"}
      </Button>
    </Form>
  );
}
