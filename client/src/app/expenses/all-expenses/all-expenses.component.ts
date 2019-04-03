import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/model';
import { ExpenseService } from 'src/app/services/expense/expense.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent implements OnInit {
  expenses : Expense[];
  user = JSON.parse(localStorage.getItem("user"));
  noteForm : FormGroup[] = [];
  nf : FormGroup;
  constructor(
    private expenseService : ExpenseService,
    private formBuilder : FormBuilder,
    private alertService : AlertService
  ) { }

  getAllExpenses() {
    this.expenseService.getAll(this.user.id, this.user.token)
    .pipe(first())
    .subscribe(data => {
      if (data.statusCode == 200) {
        this.expenses = data.data;
        this.init();
      }
      else {

      }
    });
  }

  init() {
    for (let i = 0; i < this.expenses.length; i++) {
      this.expenses[i].index = i;
      this.noteForm[i] = this.formBuilder.group({
        note : [this.expenses[i].notes.length > 0 ? this.expenses[i].notes : "Notes and reminders about expense..."]
      });
    }
  }

  ngOnInit() {
    this.getAllExpenses();
    
  }

  submit(id, index) {
    this.expenseService.updateNote(this.noteForm[index].value.note, this.user.id, id, this.user.token)
    .pipe(first())
    .subscribe(response => {
      console.log(response);
      if (response.statusCode == 200)
        this.alertService.success(response.message);
      else
        this.alertService.error(response.message);
    });
  }

  deleteNote(id) {
    this.expenseService.deleteExpense(this.user.id, id, this.user.token)
    .pipe(first())
    .subscribe(response => {
      if (response.statusCode == 200)
        this.getAllExpenses();
    })
  }

}
