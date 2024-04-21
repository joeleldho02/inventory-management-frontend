import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { PaginationComponent } from '@ui';
import { RolenamePipe } from '@pipes';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RolenamePipe, PaginationComponent, RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  constructor(
    private _userService:UserService,
  ){}
  
  destroyRef = inject(DestroyRef);  
  isLoading:boolean = false;
  users:UserModel[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 10;

  ngOnInit(): void {
    // this.getUsers();
  }

  getUsers(): void {
    this.isLoading = true;
    this._userService.getAllUsers(this.currentPage, this.itemsPerPage)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (data) => {        
          this.users = data.users;
          this.totalItems = data.totalItems;
          this.isLoading = false;
        },
        (error) => {
          this.users = [];
          this.isLoading = false;
          console.log(error);          
        }
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.getUsers();
  }
}
