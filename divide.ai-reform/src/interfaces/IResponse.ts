export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    error: ErrorResponse | null;
  }
  
  export interface ErrorResponse {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
  }