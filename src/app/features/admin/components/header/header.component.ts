import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent {
  @Input() isLoggedIn = false;
  @Output() logoutEvent = new EventEmitter<void>();
  @Output() sidenavEvent = new EventEmitter<void>();

  logout(){
    this.logoutEvent.emit();
  }
  toggleSideNav(){
    this.sidenavEvent.emit();
  }

}
