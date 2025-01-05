import { useEffect, useState } from 'react';
import { Form } from "antd";
import { cn } from "@/lib/utils";
import { ptBR } from 'date-fns/locale';
import { format } from "date-fns";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingOutlined } from '@ant-design/icons';
import { ICategory } from "@/interfaces/ICategory";
import { MinusIcon, PlusIcon, CalendarIcon } from "@radix-ui/react-icons";

import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import { useAuth } from "@/context/AuthProvider/useAuth";
import { useCategoryDataByUser } from "@/hooks/category/categoryHook";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ITransacion, ITransacionResponse } from "@/interfaces/ITransacion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface TransacionFormProps {
  initialData?: ITransacion | ITransacionResponse | null;
  onSubmit: (values: ITransacion) => void;
  isLoading: boolean;
}

export function TransactionForm({ initialData, onSubmit, isLoading }: TransacionFormProps) {
  const [date, setDate] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const formattedDate = date ? format(date, "PPP", { locale: ptBR }) : "Escolha uma data";

  const [form] = Form.useForm();
  const { data } = useCategoryDataByUser(); // data com todas as categorias do user logado
  const auth = useAuth();

  const [money, setMoney] = useState<number>(initialData?.amount || 0);
  const [categoryId, setCategoryId] = useState<number>(initialData?.categoryId || 0);
  const [isPaid, setIsPaid] = useState<boolean>(initialData?.paidAt ? true : false);
  const [categoryOutflow, setCategoryOutflow] = useState<boolean | number | undefined>(data?.find(category => category.id === initialData?.categoryId)?.expense);
  const [toggleGroup, setToggleGroup] = useState<string | null>(initialData?.categoryId ? data?.find(category => category.id === initialData?.categoryId)?.expense ? 'inflow' : 'outflow' : null);
  console.log("teste: ", data?.find(category => category.id === initialData?.categoryId)?.name || undefined);
  useEffect(() => {
    if (initialData) {

      const positiveAmount = Math.abs(initialData.amount);
      const categoryOutflow = data?.find(category => category.id === initialData?.categoryId)?.expense;
      setMoney(positiveAmount);
      setCategoryId(initialData.categoryId!);
      setIsPaid(initialData?.paidAt ? true : false);

      const toggleValue = categoryOutflow ? 'outflow' : 'inflow';
      setToggleGroup(toggleValue);
      if (initialData.paidAt) {
        const paidAtDate = new Date(initialData.paidAt);
        setDate(paidAtDate); // Atualiza o estado `date`
        form.setFieldsValue({ data_paid: paidAtDate }); // Define o valor inicial no formulário
      }
      //setDate(initialData.paidAt!);
      //console.log("data vem assim: ", initialData.paidAt);

      form.setFieldsValue({
        id: initialData.id,
        description: initialData.description,
        value: initialData.amount,
        categoryId: data?.find(category => category.id === categoryId)?.name,
        paidAt: categoryOutflow ? initialData.paidAt : null,
        toggleGroup: toggleValue,
        data_paid: initialData.paidAt,

      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: ITransacion) => {
    const data: ITransacion = {
      description: values.description,
      amount: money,
      categoryId: categoryId,
      userId: Number(auth.id!),
      paidAt: categoryOutflow && isPaid ? date : null,
    };
    onSubmit(data);
  };

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      form.setFieldsValue({ money: 0 });
      setMoney(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        form.setFieldsValue({ money: numValue });
        setMoney(numValue);
      }
    }
  };

  function onClick(adjustment: number) {
    let newMoney = parseFloat((money + adjustment).toFixed(2));
    if (newMoney < 0) {
      newMoney = 0;
    }
    form.setFieldsValue({ value: newMoney });
    setMoney(newMoney);
  }

  const handleSwitchChange = () => {
    setIsPaid(prev => !prev);
  };

  const handleCategoryChange = (value: string) => {
    const selectedCategory = data?.find(category => category.name === value);
    if (selectedCategory) {
      setCategoryId(selectedCategory.id!); // Set categoryId as the numeric ID
      form.setFieldsValue({ categoryId: selectedCategory.name });
      setCategoryOutflow(data?.find(category => category.id === selectedCategory.id)?.expense);
    }
  };

  return (
    <Form
      form={form}
      name="edit-transaction-form"
      onFinish={handleSubmit}
      layout="vertical"
      initialValues={{
        description: initialData?.description || '',
        value: initialData?.amount || 0,

        toggleGroup: initialData ? (initialData.amount > 0 ? 'inflow' : 'outflow') : null,
      }}

    >
      <Label htmlFor="description" className="font-medium">Descrição</Label>
      <Form.Item
        name="description"
        className="text-primary m-0 mt-1 mb-2"
        rules={[{ required: true, message: 'Por favor, insira uma descrição!' }]}
      >
        <Input id="description" />
      </Form.Item>

      <Label htmlFor="money" className="font-medium">Valor</Label>
      <Form.Item
        name="value"
        className="text-primary m-0 mt-1 mb-2"
        rules={[
          {
            required: true,
            validator: async (_, value) => {
              if (!value || isNaN(value)) {
                return Promise.reject(new Error('Por favor, inserir um valor maior que 0!'));
              }
              if (value <= 0) {
                return Promise.reject(new Error('O valor deve ser maior que 0!'));
              }
            },
          }
        ]}
      >
        <div className="flex items-center justify-center space-x-2 text-primary">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(-50)}
            disabled={money <= 0}
            type="button"
          >
            <MinusIcon className="h-4 w-4" />
            <span className="sr-only">-</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-[1rem] uppercase text-muted-foreground">R$</div>

            <input
              type="number"
              step={0.01}
              min={0}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                boxShadow: 'none',
                padding: 0,
                margin: 0,
                appearance: 'none',
                height: 80,
                lineHeight: 80,
                paddingBottom: 20
              }}
              className="flex text-center text-7xl text-[#29756f] font-bold tracking-tighter w-full"
              value={money}
              onChange={handleMoneyChange}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => onClick(50)}
            type="button"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">+</span>
          </Button>
        </div>
      </Form.Item>

      <Label htmlFor="tipo_transacao" className="font-medium">Tipo de transação</Label>
      <Form.Item
        name="toggleGroup"
        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
        className="mt-1 mb-2"
      >
        <ToggleGroup
          onValueChange={(value: string | null) => {
            setToggleGroup(value);
            form.setFieldsValue({ toggleGroup: value });
          }}
          type="single" variant="outline" size="lg" className="gap-5 text-primary"
        >
          <ToggleGroupItem
            value="inflow"
            className="w-full gap-1 data-[state=on]:bg-green-100 dark:data-[state=on]:bg-green-950"
          >
            <IoArrowUpCircleOutline size={20} color="15803d" /> Entrada
          </ToggleGroupItem>
          <ToggleGroupItem
            value="outflow"
            className="w-full gap-1 data-[state=on]:bg-rose-100 dark:data-[state=on]:bg-rose-950"
          >
            <IoArrowDownCircleOutline size={20} color="be123c" /> Saída
          </ToggleGroupItem>
        </ToggleGroup>
      </Form.Item>

      {toggleGroup != null && (
        <>
          <Label htmlFor="category" className="font-medium">Categoria</Label>
          <Form.Item
            name="categoryId"
            rules={[{ required: true, message: 'Por favor, selecione uma categoria!' }]}
            className="mt-1 mb-2"
          >

            <Select
              value={data?.find(category => category.id === categoryId)?.name}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>
                  {data
                    ?.filter((category: ICategory) => {
                      if (toggleGroup === "inflow") {
                        return category.expense === false;
                      } else if (toggleGroup === "outflow") {
                        return category.expense === true;
                      }
                      return false;
                    })
                    .map((category: ICategory) => (
                      <SelectItem key={category.id} value={category.name}>
                        <div className="flex justify-center">
                          <span className="w-5 h-5 rounded-full mr-2" style={{ backgroundColor: category.color }}></span>
                          <p>{category.name}</p>
                        </div>
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Form.Item>
        </>
      )}

      {toggleGroup === "outflow" && (
        <div className='flex justify-between'>
          <div>
            <Label htmlFor="isPaid" className="font-medium">Essa transação foi paga?</Label>
            <Form.Item
              name="isPaid"
              className="mt-1 mb-2"
            >
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode bg-[#29756f]" checked={isPaid ? true : false} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="airplane-mode">{isPaid ? "Sim, foi paga." : "Não foi pago."}</Label>
              </div>
            </Form.Item>
          </div>
          {isPaid && (
            <div>
              <Label htmlFor="data_paid" className="font-medium">Informe a data de pagamento</Label>
              <Form.Item
                name="data_paid"
                className="mt-1 mb-2"
              >
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-auto justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formattedDate}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onDayClick={
                        (day) => {
                          setDate(day)
                          setCalendarOpen(false)
                        }
                      }
                      locale={ptBR}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </Form.Item>
            </div>
          )}
        </div>
      )}

      <Button type="submit" className="w-full mt-4 bg-[#29756F] hover:bg-[#29756F] text-white" disabled={isLoading}>
        {isLoading ? <LoadingOutlined spin /> : 'Salvar'}
      </Button>
    </Form>
  );
}
