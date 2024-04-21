import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: "admin", 
    loadChildren: () => import("./features/admin/admin.routes").then(mod => mod.adminRoutes),
  },
  { 
    path: "", 
    loadChildren: () => import("./features/user/user.routes").then(mod => mod.userRoutes),
  },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
