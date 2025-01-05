import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatInitialName = (name: string) => {
  return name?.toString().charAt(0).toUpperCase();
}

export const formatMoney = (value: number | null) => {
  if (value === null || value === undefined) return "";
  
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const formatDate = (date: string | Date) => {
  if (!date) return;

  try {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
  }
  catch {
    return "";
  }
}

export const truncateText = (Text: string, maxLength: number) => {
  return Text.length > maxLength ? Text.substring(0, maxLength) + "..." : Text;
}

export const formatDateTime = (date: string | Date) => {
  if (!date) return "";

  try {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: ptBR });
  } catch {
    return "";
  }
};

export const formatMonthYear = (date: string | Date) => {
  if (!date) return "";

  try {
    return format(new Date(date), 'MMMM/yyyy', { locale: ptBR });
  } catch {
    return "";
  }
}