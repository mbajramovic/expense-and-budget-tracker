import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login';
import { HomeComponent } from './home';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './register';
import { AllExpensesComponent } from './expenses/all-expenses/all-expenses.component';
import { NewExpenseComponent } from './new-expense/new-expense.component';
import { NewCategoryComponent } from './new-category/new-category.component';

const routes: Routes = [
  {path : '', component : HomeComponent, canActivate : [AuthGuard],
    children : [
      {path : 'expenses', component : AllExpensesComponent},
      {path : 'newExpense', component : NewExpenseComponent},
      {path: 'editExpense/:id', component : NewExpenseComponent},
      {path : 'newCategory', component : NewCategoryComponent}
    ]
  },
  {path : 'login', component: LoginComponent},
  {path : 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
