import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ROLES } from '@enums';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  constructor(
    private _route:Router, 
    private _actRoute:ActivatedRoute, 
    private _userService:UserService,
  ){}

  userForm = new FormGroup({
    id : new FormControl(''),
    name : new FormControl('', [ Validators.required, Validators.minLength(3)]),
    email : new FormControl('', [ Validators.required, Validators.pattern(/[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}/)]),
    mobile : new FormControl('', [ Validators.required, Validators.minLength(10), Validators.pattern(/^\d{10}$/)]),
    password : new FormControl('', [ Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z0-9!@#$%^&*]/)]),
    roles : new FormArray([]),
    outlet : new FormControl('', [ Validators.required]),
    isActive : new FormControl(true, [ Validators.required])
  });  

  destroyRef = inject(DestroyRef)
  isEdit:boolean = false;
  isLoading:boolean = false;
  user:UserModel | null = null;
  outlets = [
    {
      name: 'Outlet 1',
      id: 1
    },
    {
      name: 'Outlet 2',
      id: 2
    },
    {
      name: 'Outlet 3',
      id: 3
    },
  ];
  roles = Object.values(ROLES).slice(0, Math.floor(Object.values(ROLES).length/2));

  onCheckChange(event:any) {
    const formArray: FormArray = this.userForm.get('roles') as FormArray;
    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }
    else{
      let i: number = 0;  
      formArray.controls.forEach((ctrl: any) => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }  
        i++;
      });
    }
  }

  ngOnInit(): void {
    this._actRoute?.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data =>{
        this.isEdit = data?.['isEdit'] || false;
      });

    if(this.isEdit){
      let id = this._actRoute.snapshot.queryParamMap.get('id') || '';
      console.log(id,'id#');
      this.getUserDetails(id);
    }
  }
 
  
  submit(){ 
    if(!this.userForm.valid){    
      this.isLoading = true;
      const obj = { ...this.userForm.value as UserModel };
      console.log(obj);      
      // const obj:UserModel = {
      //   name: this.userForm.value.name?.trim() || '',
      //   email: this.userForm.value.email as string,
      //   mobile: this.userForm.value.mobile as string,
      //   roles: this.userForm.value.roles as ROLES[], 
      //   outlet: this.userForm.value.outlet as string, 
      //   isActive: this.userForm.value.isActive as boolean, 
      // }
      if(!this.isEdit){
        this._userService
          .addUser(obj)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(()=>{
            this._route.navigate(['/admin']);   
          });
      } else {
        this._userService
          .updateUser(obj)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(()=>{
            this._route.navigate(['/admin']);   
          });
      }
    } else {
      alert('Please enter details to continue!');
    }
  }

  getUserDetails(id:string){
    this._userService
      .getUser(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data =>{
        console.log(data,'get user details for edit#');
        this.user = data;
        this.userForm.patchValue({
              id: data._id,
              name: data.name,
              mobile: data.mobile,
              email: data.email,
              // roles: data.roles.toString(),
              outlet: data.outlet,
              isActive: data.isActive,
        })
      });
  }
}
