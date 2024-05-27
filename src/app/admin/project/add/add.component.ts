import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../user/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IDropdownSettings, MultiSelectComponent, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProjectService } from '../service/project.service';

interface User {
  id: string;
  name: string;
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
  users: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private toastr: ToastrService,
    private router: Router,
    private projectService:ProjectService
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      name:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      description:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      deadline_date:  ['', [Validators.required]],
      selectedUsers:  ['', [Validators.required]],


    });
    this.getUsers()
    this.dropdownList = this.users;
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',

      itemsShowLimit: 2,
      allowSearchFilter: true,

    };
  }

  getUsers(){
    this.userService.getDataWithoutPagination()
    .subscribe(
      (data: any) => {
        this.users = data.data;
      },
      error => {
        console.error('Error fetching users:', error);
        alert("No user found");
      }
    );
  }
  onSubmit(){
    if(this.form.valid){
      const formValue = this.form.value;
      const selected_users = formValue.selectedUsers;
      const selectedUserIds = selected_users.map((user:User) => user.id);
      console.log("selectedUserIds",selectedUserIds);
      this.form.patchValue({
        selectedUsers: selectedUserIds
      });
      console.log("form",this.form.value);

      this.projectService.createProject(this.form.value)
      .subscribe(
        response => {
        this.toastr.success('New Project add successfully.', 'Success');
        this.router.navigate(['/admin/project/all']);
        this.isLoading = false;
        },
        error => {
         this.toastr.error('OOPS Something Went Wrong', 'Error');
          this.isLoading = false;

        }
      );
    }else{
      alert("Please fill form properly");
    }

    // console.log(selectedUserIds);
  }
}
