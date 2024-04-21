import { Routes } from "@angular/router";

export const adminRoutes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/admin-home/admin-home.component").then(mod => mod.AdminHomeComponent),
    children: [
        {
            path: "",
            loadComponent: () => import("./pages/dashboard/dashboard.component").then(mod => mod.DashboardComponent),
            // canActivate: ,
        },
        {
            path: "login",
            loadComponent: () => import("./pages/admin-login/admin-login.component").then(mod => mod.AdminLoginComponent),
            // canActivate: ,
        },  
        {
            path: "reset-password",
            loadComponent: () => import("./pages/reset-password/reset-password.component").then(mod => mod.ResetPasswordComponent),
            // canActivate: ,
        },  
        {   
            path: "users",
            loadComponent: () => import("./pages/users/users.component").then(mod => mod.UsersComponent),
            // canActivate: ,
        },
        {   
            path: "users/add",
            loadComponent: () => import("./pages/user-form/user-form.component").then(mod => mod.UserFormComponent),
            data:{ isEdit: false},
            // canActivate: ,
        },
        {   
            path: "users/edit/:userId",
            loadComponent: () => import("./pages/user-form/user-form.component").then(mod => mod.UserFormComponent),
            data:{ isEdit: true},
            // canActivate: ,
        },
    ],
  },
];