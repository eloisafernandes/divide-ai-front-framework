export async function getExpenses() {
  return [
    {
      id: 1,
      description: 'Aluguel',
      value: 1000,
      type: 'Despesa Fixa',
      date: '2021-01-10',
    },
    {
      id: 2,
      description: 'Mercado',
      value: 500,
      type: 'Despesa Variável',
      date: '2021-01-10',
    },
    {
      id: 3,
      description: 'Lazer',
      value: 200,
      type: 'Despesa Variável',
      date: '2021-01-10',
    },
  ];
}

export async function createExpense(expenses: any) {
  return {
    id: 4,
    ...expenses,
  };
}