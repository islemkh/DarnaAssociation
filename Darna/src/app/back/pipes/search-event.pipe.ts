import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEvent'
})
export class SearchEventPipe implements PipeTransform {

  transform(value: any, eventValue: any): any {
    if (eventValue == null) {
      return value;
    } else {
      return value.filter(
        (item) =>
          item.NameEvent.includes(eventValue.toLocaleLowerCase()) ||
          item.DateBeginEvent.toLocaleLowerCase().includes(eventValue.toLocaleLowerCase()) 
          || item.DateEndEvent.toLocaleLowerCase().includes(eventValue.toLocaleLowerCase())
          || item.lieu.toLocaleLowerCase().includes(eventValue.toLocaleLowerCase())  );
    }
  }
}
toString();

