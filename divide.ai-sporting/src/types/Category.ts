export type Category = {
    id: number;
    name: string;
    description: string;
    color: string;
    creationDate: Date;
};

// Definindo a interface para as operações CRUD
// export interface CategoryCRUD {
//     getAllCategories: (token: string) => Promise<Category[]>;
//     getCategoryById: (id: number, token: string) => Promise<Category | null>;
//     createCategory: (category: Omit<Category, 'id' | 'creationDate'>, token: string) => Promise<Category>;
//     updateCategory: (id: number, category: Partial<Omit<Category, 'id' | 'creationDate'>>, token: string) => Promise<Category | null>;
//     deleteCategory: (id: number, token: string) => Promise<void>;
// }