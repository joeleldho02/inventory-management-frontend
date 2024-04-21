import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  templateUrl: './admin-login.component.html',
  styles:[``],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class AdminLoginComponent {
  @Output() loginEvent = new EventEmitter<boolean>;
  
  isLoading:boolean = false;
    
  loginForm = new FormGroup({
    email : new FormControl('', [ Validators.required, Validators.pattern(/[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}/)]),
    password : new FormControl('', [ Validators.required])
  })

  constructor(private _actRoute:ActivatedRoute, private _route:Router){}
  
  submit(){    
    if(this.loginForm.valid){
      this.isLoading = true;
      setTimeout(()=> {
        this.loginEvent.emit(true);
        this._route.navigateByUrl('/admin');
      },2000);

      
    } else{
      this.isLoading = false;   
      alert('Please enter login credentials to continue!');
    }
  }

}
