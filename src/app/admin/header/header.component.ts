import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthService } from '../service/admin-auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router,  private toastr: ToastrService,
    private adminAuthService: AdminAuthService,
    ) {

    }


  logout(){
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      this.adminAuthService.logout(localStorage.getItem('adminToken')).subscribe(
        (data) => {
          localStorage.clear();
          this.toastr.success('logout successfully!', 'Bye');
       this.router.navigate(['/admin/login']);


        },
        (error) => {
          console.log(error)
          this.toastr.error("OOPS! Something Went Wrong");

        }
      );
    }
  }

}
