import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminAuthService } from '../service/admin-auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  credentialsValid: boolean | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private adminAuthService: AdminAuthService,
    private toastr: ToastrService,
    private router: Router
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
      this.adminAuthService.checkUserCredentials(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (data) => {
          if (data.length == 0) {
            alert('No admin found')
            return;
          }
          if (data.success) {
            // this.adminService.updateAdminData(data.data); // Update admin data in the service
            // this.localStorageService.setAuthToken(data.token);
            this.toastr.success('Login successfully!', 'Welcome');
            this.router.navigate(['/admin/home']);

          } else {
            this.toastr.error(data.message,'Error');
          }
        },
        (error) => {
          console.log(error);
          this.toastr.error('OOPS! Something Went Wrong','error');
        }
      );
    } else {
      alert('Please fill form');
    }
  }
}
