import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IDropdownSettings, MultiSelectComponent, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

interface User {
  item_id: number;
  item_text: string;
}

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgMultiSelectDropDownModule,FormsModule ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  form!: FormGroup;
  isLoading: boolean = false;

  dropdownList:any[] = [];
  selectedItems:any[] = [];
  dropdownSettings:any = {};

  user:any[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      name:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      description:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      deadline_date:  ['', [Validators.required]],
      selected_users:  ['', [Validators.required]],


    });

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',

      itemsShowLimit: 3,
      allowSearchFilter: true,

    };
  }


  onSubmit(){
    const formValue = this.form.value;
    const selectedUsers = formValue.selected_users;

    const selectedUserIds = selectedUsers.map((user:User) => user.item_id);
    // console.log(selectedUserIds);
  }
}
