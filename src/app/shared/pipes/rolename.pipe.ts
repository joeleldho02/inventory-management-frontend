import { Pipe, PipeTransform } from '@angular/core';
import { ROLES } from '../enums/roles.enum';

@Pipe({
  name: 'rolename',
  standalone: true
})
export class RolenamePipe implements PipeTransform {

  transform(value: ROLES[], ...args: unknown[]): unknown {
    let out = '';
    value.forEach(val => {
      out += ROLES[val] + " ";
    });    
    return out;
  }

}
