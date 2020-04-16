export interface Category {
    _id: string;
    category: string;
}
  
export interface CategoriesRes {
    categories: Array<Category>;
    stauts: boolean;
}