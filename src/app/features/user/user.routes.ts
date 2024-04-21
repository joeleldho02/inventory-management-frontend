import { Routes } from "@angular/router";

export const userRoutes: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/user-home/user-home.component").then(mod => mod.UserHomeComponent),
    children: [
        {
            path: "",
            loadComponent: () => import("./pages/dashboard/dashboard.component").then(mod => mod.DashboardComponent),
            // canActivate: ,
        },
        {
            path: "login",
            loadComponent: () => import("./pages/user-login/user-login.component").then(mod => mod.UserLoginComponent),
            // canActivate: ,
        },  
        {
            path: "forgot-password",
            loadComponent: () => import("./pages/forgot-password/forgot-password.component").then(mod => mod.ForgotPasswordComponent),
            // canActivate: ,
        },  
        {   
            path: "profile",
            loadComponent: () => import("./pages/profile/profile.component").then(mod => mod.ProfileComponent),
            // canActivate: ,
        },
    ],
  },
];