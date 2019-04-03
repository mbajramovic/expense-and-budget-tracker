import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Category, Expense } from '../model';
import { CategoryService } from '../services/category/category.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ExpenseService } from '../services/expense/expense.service';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.css']
})
export class NewExpenseComponent implements OnInit {
  expenseForm : FormGroup;
  private submitted = false;
  private user = JSON.parse(localStorage.getItem("user"));
  private categories : Category[] = [];
  private expense : Expense;
  private disabled : boolean = false;

  private type : String = '';
  private categoryId : number  = 1;
  private id : number;
  private isNew : boolean = true;

  constructor(
    private categoryService : CategoryService,
    private formBuilder : FormBuilder,
    private route : ActivatedRoute,
    private expenseService : ExpenseService,
    private alertService : AlertService
  ) { }

  getAllCategories() {
    this.categoryService.getAll(this.user.id, this.user.token)
    .pipe(first())
    .subscribe(response => {
      console.log(response);
      if (response && response.statusCode == 200) {
        this.categories = response.data;
        if (this.categories.length == 0) {
          this.disabled = true;
          this.alertService.error("No categories defined yet.");
        }
        this.init();
      }
    });
  }

  getExpense() {
    var id = this.route.snapshot.paramMap.get("id");
    if (id != null)
      this.expenseService.getExpense(this.user.id, id, this.user.token)
      .pipe(first())
      .subscribe(response => {
        console.log(response);
        if (response && response.statusCode == 200) {
          this.isNew = false;
          this.expense = response.data;
          this.id = response.data.id;
          this.init();
        }
      })
  }

  init() {
    this.expenseForm = this.formBuilder.group({
      amount : [this.expense != null ? this.expense.amount : '', [Validators.pattern(/^\d*\.?\d*$/), Validators.required]],
      description : [this.expense != null ? this.expense.description : '', Validators.maxLength(250)],
      date : [this.expense != null ? this.expense.date : null, Validators.required],
      type : this.expense != null ? this.expense.type : 'expense'
     
    });
    this.type = this.expense != null ? this.expense.type : 'expense';
    if (this.categories.length != 0)
      if (this.expense != null)
        this.categoryId = this.categories.filter(e => e.id == this.expense.categoryId)[0].id;
      else
        this.categoryId = this.categories[0].id;
  }

  typeUpdate(value) {
    this.type = value;
  }

  categoryUpdate(value) {
    this.categoryId = parseInt( value);
  }

  ngOnInit() {
    this.init();
    this.getAllCategories();
    this.getExpense();
   // this.init();
  }

  get con() { return this.expenseForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.expenseForm.invalid)
      return;
    if (this.expense != null) this.isNew = false;
    this.expense = this.expenseForm.value;
    this.expense.type = this.type;
    this.expense.categoryId = this.categoryId;
    this.expense.userId = this.user.id;
    this.expense.id = this.id;

    console.log(this.expense);
    if (this.isNew)
      this.expenseService.save(this.expense,  this.user.token)
      .pipe(first())
      .subscribe(response => {
        if (response.statusCode == 200) 
          this.alertService.success(response.message);
        else
          this.alertService.error(response.message);
      }); 
    else 
      this.expenseService.update(this.expense, this.user.token)
      .pipe(first())
      .subscribe(response => {
        if (response.statusCode == 200) 
          this.alertService.success(response.message);
        else
          this.alertService.error(response.message);
      });
   

  }

}
