import { Category } from '.';

export class Expense {
    id : number;
    amount : number;
    description : number;
    date : Date;
    notes : String;
    type : String;
    category : Category;
    categoryId : number;
    userId : number;
    index : number;
}