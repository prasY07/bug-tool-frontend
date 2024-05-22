import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService:UserService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      name:  ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    });
  }

  onSubmit() {
    this.isLoading = true;

    if (this.form.valid) {
     this.userService.createUser(this.form.value)
     .subscribe(
       response => {
       this.toastr.success('New User add successfully.', 'Success');
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
