import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RoleService } from '../../service/role.service';


interface roleInterace {
  slug: string;
  name: string;
}

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgMultiSelectDropDownModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  form!: FormGroup;
  isLoading: boolean = false;

  dropdownList:any[] = [];
  selectedItems:any[] = [];
  dropdownSettings:any = {};
  all_roles:any[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private toastr: ToastrService,
    private router: Router,
    private roleService : RoleService
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      name:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      selected_roles:  ['', [Validators.required]],
      roles: [[]] // Add roles field to form structure


    });



    this.getRoles();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'slug',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }


  getRoles(){
    this.roleService.getRoles()
    .subscribe(
      (data: any) => {
        this.all_roles = data.data;
        this.dropdownList = this.all_roles;

      },
      error => {
        console.error('Error fetching users:', error);
        alert("No user found");
      }
    );
  }


  onSubmit() {
    this.isLoading = true;

    if (this.form.valid) {
      const formValue = this.form.value;
      const selectedRoles = formValue.selected_roles;
      const selectedRolesSlug = selectedRoles.map((role:roleInterace) => role.slug);

      this.form.patchValue({
        roles: selectedRolesSlug
      });

      console.log("before submit",this.form.value);

     this.userService.createUser(this.form.value)
     .subscribe(
       response => {
       this.toastr.success('New User add successfully.', 'Success');
       this.router.navigate(['/admin/user/all']);
       this.isLoading = false;


       },
       error => {
        let errorMsg = 'OOPS Something Went Wrong';
          if (error.error && error.error.message) {
            console.log("here",error.error.message);
            errorMsg = error.error.message; // If error response has a message field
          }

        this.toastr.error(errorMsg, 'Error');
         this.isLoading = false;

       }
     );
    } else {
      alert('Please fill form');
       this.isLoading = false;

    }
  }


}
