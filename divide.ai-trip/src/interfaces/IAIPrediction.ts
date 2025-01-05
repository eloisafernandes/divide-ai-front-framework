export interface ExpenseByCategory {
    amount: number;
    categoryName: string;
    categoryColor: string;
    categoryId: number; 
}
  
export interface IAIPrediction {
    nextExpenses: number | null;
    nextIncome: number | null;
    nextExpensesByCategory: ExpenseByCategory[];
    recomendation: string;
    response: string;
    hasAnalysis: Boolean | null;
}

export interface IAIPredictionRequest {
  userId: number;
  prompt: string;
}