import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { StatusDivPipe } from '../../../commonPipe/status-div.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink,CommonModule,StatusDivPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  users: any[] = [];


  constructor(
    private userService:UserService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    this.loadusers();
  }

  loadusers() {
    this.userService.getUsers()
      .subscribe(
        (data: any) => {
          // console.log("dd",data.data);
          this.users = data.data;
          // this.isLoading = true;
        },
        error => {
          console.error('Error fetching users:', error);
        }
      );

  }

  changeStatus(id:string){
    this.userService.updateStatus(id)
    .subscribe(
      (data: any) => {

        this.toastr.success('Status Changed Successfully.', 'Success');
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
          this.users[index].status = data.data.status;
        }
        console.log("data",data.data.status);
      },
      error => {
        console.error('Error fetching users:', error);
        this.toastr.error('OOPS Something Went Wrong', 'Error');


      }
    );
  }
}
