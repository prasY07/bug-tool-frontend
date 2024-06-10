import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ProjectService } from '../service/project.service';
import { BugService } from '../service/bug.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bug',
  standalone: true,
  imports: [NgMultiSelectDropDownModule,ReactiveFormsModule,CommonModule],
  templateUrl: './add-bug.component.html',
  styleUrl: './add-bug.component.css'
})
export class AddBugComponent implements OnChanges  {

  @Input() isOpen:boolean= false;
  @Input() projectId:string= '';
  @Output() close = new EventEmitter<void>();

  dropdownList:any[] = [];
  dropdownSettings:any = {};
  members:any[]=[];
  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private projectService:ProjectService,
    private bugService:BugService,
    private toastr: ToastrService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      title:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      assign_to:  ['', [Validators.required]],

    });

    // console.log("vv",this.isOpen);
    // if(this.isOpen){
    //   this.getUsers();
    // }

    // this.dropdownList = [
    //   { slug: 1, name: 'Mumbai' },
    //   { slug: 2, name: 'Bangaluru' },
    //   { slug: 3, name: 'Pune' },
    //   { slug: 4, name: 'Navsari' },
    //   { slug: 5, name: 'New Delhi' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && changes['isOpen'].currentValue) {
      this.getUsers();
    }
  }

  getUsers(){
    this.projectService.getProjectsMembers(this.projectId)
    .subscribe(
      (data: any) => {
        this.members = data.data;
        this.dropdownList = this.members;

      },
      error => {
        console.error('Error fetching users:', error);
        alert("No user found");
      }
    );
  }

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }


  onSubmit(){
    if(this.form.valid){
      this.bugService.addBug(this.form.value,this.projectId)
     .subscribe(
       response => {
       this.toastr.success('New Bug add successfully.', 'Success');
      //  this.router.navigate(['/admin/user/all']);
       this.isLoading = false;

        this.closeModal();
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
