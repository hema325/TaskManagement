import { Pipe, PipeTransform } from '@angular/core';
import { Permissions } from '../../core/enums/permissions';

@Pipe({
  name: 'permission',
})
export class PermissionPipe implements PipeTransform {
  transform(value: Permissions): string | number {

    switch (value) {
      case 0:
        return 'None';

      // User
      case 1:
        return 'User Create';
      case 2:
        return 'User Read';
      case 3:
        return 'User Change Permission';
      case 4:
        return 'User Delete';

      // Task
      case 10:
        return 'Task Create';
      case 11:
        return 'Task Update';
      case 12:
        return 'Task Delete';
      case 13:
        return 'Task Read';

      default:
        return 'Unknown';
    }
  }
}
