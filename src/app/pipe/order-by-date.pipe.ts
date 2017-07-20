import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByDate',
  pure: false
})
export class OrderByDatePipe implements PipeTransform {

  transform(array: any, args?: any): any {
    if(!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      if (a.datePosted > b.datePosted) {
        return -1;
      } else if (a.datePosted < b.datePosted) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
