import { Form, InputNumber } from "antd"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { IReformForm, ReformPriority } from "@/interfaces/IGroup";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";

interface GroupFormProps {
  initialData?: IReformForm | null;
  onSubmit: (values: IReformForm) => void;
  isLoading: boolean;
}

export function GroupForm({ initialData, onSubmit, isLoading }: GroupFormProps) {
  const [form] = Form.useForm();

  const [occurrenceDate, setOccurrenceDate] = useState<Date | null>(null);

  const formattedOccurrenceDate = occurrenceDate
    ? format(occurrenceDate, "PPP", { locale: ptBR })
    : "Escolha uma data";

  const mapPriorityDescriptionToEnum = (
    description: string
  ): keyof typeof ReformPriority | undefined => {
    return Object.keys(ReformPriority).find((key) => 
      ReformPriority[key as keyof typeof ReformPriority] === description
    ) as keyof typeof ReformPriority | undefined;
  };
    

  useEffect(() => {
    if (initialData) {
      const priorityKey = mapPriorityDescriptionToEnum(initialData.priority);
      form.setFieldsValue({
        ...initialData,
        priority: priorityKey,
      });
      setOccurrenceDate(initialData.occurrenceDate || null);
    }
  }, [initialData, form]);

  const handleSubmit = (values: IReformForm) => {
    const userId = getUserLocalStorage()?.id;

    onSubmit({
      ...values,
      createdBy: userId,
    });
  };

  const handleOccurrenceDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setOccurrenceDate(selectedDate);
    form.setFieldsValue({ occurrenceDate: selectedDate });
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
        local: "",
        area: 0,
        priority: undefined,
        occurrenceDate: null,
      }}
    >
      <Label htmlFor="name" className="font-medium">Nome</Label>
      <Form.Item
        name="name"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
      >
        <Input id="name" />
      </Form.Item>
      <Label htmlFor="description" className="font-medium">Descrição</Label>
      <Form.Item
        name="description"
        className="text-primary m-0 mt-1 mb-2"
      >
        <Input id="description" />
      </Form.Item>
      <Label htmlFor="local" className="font-medium">
        Local
      </Label>
      <Form.Item
        name="local"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: "Por favor, insira o local!" }]}
      >
        <Input id="local" />
      </Form.Item>

      <Label htmlFor="area" className="font-medium">
        Área (m²)
      </Label>
      <Form.Item
        name="area"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: "Por favor, insira a área!" }]}
      >
        <Input type="number" id="area" min="0"
                step="0.01" />
      </Form.Item>

      <Label htmlFor="priority" className="font-medium">
        Prioridade
      </Label>
      <Form.Item
        name="priority"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: "Por favor, selecione a prioridade!" }]}
      >
        <Select
          onValueChange={(value) => form.setFieldsValue({ priority: value })}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Selecionar prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Prioridade</SelectLabel>
              {Object.entries(ReformPriority).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Form.Item>

      <Label htmlFor="occurrenceDate" className="font-medium">
        Data da Ocorrência
      </Label>
      <Form.Item
        name="occurrenceDate"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: "Por favor, insira a data da ocorrência!" }]}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !occurrenceDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formattedOccurrenceDate}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Calendar
              mode="single"
              selected={occurrenceDate || undefined}
              onSelect={handleOccurrenceDateSelect}
              locale={ptBR}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </Form.Item>

      <Button type="submit" variant="divideDark" className="w-full mt-4" disabled={isLoading}>
        {isLoading ? <LoadingOutlined spin /> : 'Salvar'}
      </Button>
    </Form>
  );
}
