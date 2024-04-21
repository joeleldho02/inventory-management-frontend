import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideNavItemComponent } from '@ui';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  imports: [
    CommonModule,
    SideNavItemComponent,
    RouterModule
  ],
})
export class SidenavComponent {
  @Input() collapsed = true;

  hi(){
    console.log('hi');
    
  }
}
