import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../services/category/category.service';
import { Category, User } from '../model';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert/alert.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  categoryForm : FormGroup;
  submitted : boolean =false;
  category : Category;
  user : User = JSON.parse(localStorage.getItem("user"));

  constructor(
    private formBuilder : FormBuilder,
    private categoryService : CategoryService,
    private alertService : AlertService
  ) { }

  get con() {return this.categoryForm.controls;}

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name : ['', Validators.required],
      description : ['', Validators.maxLength(250)]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.categoryForm.invalid)
      return;
    this.category = this.categoryForm.value;
    this.category.userId = this.user.id;
    this.categoryService.save(this.category, this.user.token)
    .pipe(first())
    .subscribe(response => {
      if (response.statusCode == 200) 
        this.alertService.success(response.message);
      else
        this.alertService.error(response.message);
    })
  }

}
