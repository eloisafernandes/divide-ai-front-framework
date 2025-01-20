export interface ExpenseByCategory {
    amount: number;
    categoryName: string;
    categoryColor: string;
    categoryId: number; 
}
  
export interface IAIPrediction {
  response: string;
}

export interface ChatResponse {
  prompt: string;
  response: string;
  userId: number;
  groupId: number;
  createdAt: string;
}

export interface IAIPredictionRequest {
  userId: number;
  groupId: number;
  prompt?: string | null;
}