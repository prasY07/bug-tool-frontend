import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  form!: FormGroup;
  isLoading: boolean = false;
  user:any = {};
  userId: string='';

  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private toastr: ToastrService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) { }
  ngOnInit() {

    this.aRoute.params.subscribe(params => {
      this.userId = params['id'];
    });

    this.form = this.formBuilder.group({
      name:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.userService.getSingleUsers(this.userId).subscribe((data:any) => {
      this.user = data;
      // console.log("get user",this.user.data);
      this.form.get('name')?.setValue(this.user.data.name);
      this.form.get('email')?.setValue(this.user.data.email);

    });
  }



  onSubmit() {
    this.isLoading = true;

    if (this.form.valid) {
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
