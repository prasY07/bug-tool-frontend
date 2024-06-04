import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UserService } from '../../user/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../service/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomDateFormatPipe } from '../../../commonPipe/custom-date-format.pipe';

interface User {
  id: string;
  name: string;
}

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,NgMultiSelectDropDownModule,FormsModule,CustomDateFormatPipe ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  form!: FormGroup;
  isLoading: boolean = false;

  dropdownList:any[] = [];
  selectedItems:any[] = [];
  dropdownSettings:any = {};
  users: any[] = [];
  projects:any = {};

  projectId: string='';
  projectMembers: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private projectService:ProjectService,
  ) { }

  ngOnInit() {
    this.aRoute.params.subscribe(params => {
      this.projectId = params['id'];
    });

    this.form = this.formBuilder.group({
      name:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      description:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      deadline_date:  ['', [Validators.required]],
      selectedUsers:  ['', [Validators.required]],


    });
    this.getUsers()

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',

      itemsShowLimit: 2,
      allowSearchFilter: true,

    };

    this.projectService.getSingleProjects(this.projectId).subscribe((data:any) => {
      this.projects = data;
      this.form.get('name')?.setValue(this.projects.data.name);
      this.form.get('description')?.setValue(this.projects.data.description);
      this.projectMembers = this.projects.data.members || [];

      this.updateDropdownList();

    });
  }

  updateDropdownList() {
    // console.log("here");
    if (this.users.length > 0 && this.projectMembers.length > 0) {

      // const projectMemberIds = this.projectMembers.map((member: any) => console.log("member",member));
      this.dropdownList = this.users.filter(user => !this.projectMembers.includes(user.id));


    } else {

      this.dropdownList = this.users;
    }
  }

  getUsers(){
    this.userService.getDataWithoutPagination()
    .subscribe(
      (data: any) => {
        this.users        = data.data;
        this.dropdownList = this.users;
        this.updateDropdownList();

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

      this.projectService.updateProject(this.form.value,this.projectId)
      .subscribe(
        response => {
        this.toastr.success('Project updated successfully.', 'Success');
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

  }
}
