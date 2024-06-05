import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../service/local-storage.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private userAuthService:UserAuthService,
    private localStorageService:LocalStorageService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userAuthService.checkUserCredentials(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (data) => {
          if (data.length == 0) {
            alert('No User found')
            return;
          }
          if (data.success) {
            this.localStorageService.setUserAuthToken(data.token);
            this.toastr.success('Login successfully!', 'Welcome');
            this.router.navigate(['/user/project/all']);

          } else {
            this.toastr.error(data.message,'Error');
          }
        },
        (error) => {
          // console.log(error.error.message);
          this.toastr.error(error.error.message,'error');
        }
      );
    } else {
      alert('Please fill form');
    }
  }


}
