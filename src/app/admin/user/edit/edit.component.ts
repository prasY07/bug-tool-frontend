import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../../service/role.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

interface roleInterace {
  slug: string;
  name: string;
}

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink,NgMultiSelectDropDownModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  form!: FormGroup;
  isLoading: boolean = false;
  user:any = {};
  userId: string='';
  dropdownSettings:any = {};


  dropdownList:any[] = [];
  selectedItems:any[] = [];
  all_roles:any[]= []
  alreadyRoles:any[]= [];
  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private roleService : RoleService

  ) { }
  ngOnInit() {

    this.aRoute.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.form = this.formBuilder.group({
      name:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      roles: [[]],
      selected_roles:  ['', [Validators.required]],

    });


    this.userService.getSingleUsers(this.userId).subscribe((data:any) => {
      this.user = data;
      this.form.get('name')?.setValue(this.user.data.name);
      this.form.get('email')?.setValue(this.user.data.email);
      this.alreadyRoles = this.user.data.roles || [];

      this.updateRoleList();

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
  updateRoleList() {
    if (this.all_roles.length > 0 && this.alreadyRoles.length > 0) {

      this.selectedItems = this.all_roles.filter(role => this.alreadyRoles.includes(role.slug)).map(role => ({
        slug: role.slug,
        name: role.name
      }));
    } else {
      // If no roles are selected yet, show all roles in the dropdown
      this.dropdownList = this.all_roles;
      this.selectedItems = [];
    }
  }



  getRoles(){
    this.roleService.getRoles()
    .subscribe(
      (data: any) => {
        this.all_roles = data.data;
        this.dropdownList = this.all_roles;
        this.updateRoleList();

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
     this.userService.updateUser(this.form.value,this.userId)
     .subscribe(
       response => {
       this.toastr.success('User Updated  successfully.', 'Success');
       this.router.navigate(['/admin/user/all']);
       this.isLoading = false;

       },
       error => {
        this.toastr.error('OOPS Something Went Wrong', 'Error');
         this.isLoading = false;

       }
     );
    } else {
      alert('Please fill form');
       this.isLoading = false;

    }
  }

}
