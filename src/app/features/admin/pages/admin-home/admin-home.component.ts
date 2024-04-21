import { Component, DestroyRef, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styles: [``],
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
  ],
})
export class AdminHomeComponent {
  constructor(

  ){}
  
  isLoggedIn = true;
  sideNavCollapsed = true;
  destroyRef = inject(DestroyRef)

  logout(){
    if(this.isLoggedIn)
      if(confirm('Are you sure to logout?')){
        console.log('Admin logged out!!');        
      }
  }

  toggleSideNav(){
    this.sideNavCollapsed = !this.sideNavCollapsed;
  }

  onOutletLoaded(component:Component) {
    if(!(component instanceof AdminLoginComponent)) 
      return;
    component.loginEvent
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((val)=>{ 
        this.isLoggedIn = val as boolean;
        this.sideNavCollapsed = !val as boolean;
      });
  } 

}

