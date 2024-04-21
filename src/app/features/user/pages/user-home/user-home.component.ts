import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  standalone: true,
  imports: [
    CommonModule,  
    RouterModule,
    HeaderComponent,
  ],
})
export class UserHomeComponent {

}
