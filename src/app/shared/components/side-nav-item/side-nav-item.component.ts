import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-nav-item',
  standalone: true,
  template: `
    <a [routerLink]="path" routerLinkActive="bg-red-600" [routerLinkActiveOptions]="{ exact: true }" class="flex gap-3 bg-blue-600 py-2 ps-7 rounded-lg w-full items-center justify-start mb-3 hover:opacity-75">
      <img [src]="icon" class="w-6 h-6">
      <p class="text-white font-semibold">{{title | uppercase}}</p>
    </a>
  `,
  styles: [``],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class SideNavItemComponent {
  @Input() title:string = '';
  @Input() icon:string = '';
  @Input() path:string = '';
}
