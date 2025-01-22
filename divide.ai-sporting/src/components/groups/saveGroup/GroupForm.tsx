import { Form, TimePicker } from "antd"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ISportingForm, SportingsModalities} from "@/interfaces/IGroup";
import { getUserLocalStorage } from "@/context/AuthProvider/util";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";


interface GroupFormProps {
  initialData?: ISportingForm | null;
  onSubmit: (values: ISportingForm) => void;
  isLoading: boolean;
}

export function GroupForm({ initialData, onSubmit, isLoading }: GroupFormProps) {
  const [form] = Form.useForm();
  const [occurrenceDate, setOccurrenceDate] = useState<Date | null>(null);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form]);

  const handleSubmit = (values: ISportingForm) => {
    console.log(values);
    const post : ISportingForm = {
      sportingsModalities: values.sportingsModalities,
      local: values.local,
      name: values.name,
      description: values.description,
      occurrenceDate: combineDateAndTime(values.occurrenceDate, values.time)
    }
    console.log(post);
    const userId = getUserLocalStorage()?.id;

    onSubmit({ ...post, createdBy: userId });
  };
  
  function combineDateAndTime(date: string, time: string): string {
    const dateObject = new Date(date);
    const timeObject = new Date(time);
  
    dateObject.setHours(timeObject.getHours() - 3, timeObject.getMinutes(), 0, 0);
  
    return dateObject.toISOString().slice(0, 19);
  }

  const formattedOccurrenceDate = occurrenceDate
    ? format(occurrenceDate, "PPP", { locale: ptBR })
    : "Escolha uma data";

  // const mapModalitiesDescriptionToEnum = (
  //   description: string
  // ): keyof typeof SportingsModalities | undefined => {
  //   console.log("inicial description: ", description);
  //   return Object.keys(SportingsModalities).find((key) => 
  //     SportingsModalities[key as keyof typeof SportingsModalities] === description
  //   ) as keyof typeof SportingsModalities | undefined;
  // };
 
  useEffect(() => {
    if (initialData) {
      // const modalityKey = mapModalitiesDescriptionToEnum(initialData.sportingsModalities);
      // console.log("inicial modalidade: ", initialData.sportingsModalities);
      
      form.setFieldsValue({
        ...initialData,
        sportingsModalities: initialData.sportingsModalities,
        // time: new Date(initialData.occurrenceDate),
      });
      setOccurrenceDate(initialData.occurrenceDate || null);
    }
  }, [initialData, form]);

  

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
        name: '',
        description: '',
        local: "",
        sportingsModalities: undefined,
        occurrenceDate: null,
        // time: '',
      }}
    >
      <Label htmlFor="name" className="font-medium">Nome do Evento</Label>
      <Form.Item
        name="name"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, insira o nome do evento!' }]}
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
      <Label htmlFor="modality" className="font-medium">
        Modalidade Esportiva
      </Label>
      <Form.Item
        name="sportingsModalities"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: "Por favor, selecione a modalidade esportiva!" }]}
      >
        <Select
          onValueChange={(value) => form.setFieldsValue({ sportingsModalities: value })}
        >
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Selecionar modalidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Modalidade Esportiva</SelectLabel>
              {Object.entries(SportingsModalities).map(([key, label]) => (
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
      <Label htmlFor="occurrenceDate" className="font-medium">
        Horário
      </Label>
      <Form.Item
        name="time"
        className="text-primary m-0 mt-1"
        rules={[{ required: true, message: "Por favor, insira o horário!" }]}
      >
        <TimePicker
          id="time"
          className="w-full"
          format="HH:mm" 
          placeholder="Selecione o horário"
          minuteStep={5}
          showNow={true} 
          use12Hours={false} 
        />
      </Form.Item>

      <Button type="submit" variant="divideDark" className="w-full mt-4" disabled={isLoading}>
        {isLoading ? <LoadingOutlined spin /> : 'Salvar'}
      </Button>
    </Form>
  );
}
