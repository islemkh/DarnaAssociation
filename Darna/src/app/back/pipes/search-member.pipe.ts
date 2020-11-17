import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMember'
})
export class SearchMemberPipe implements PipeTransform {

  transform(value: any, memberValue: any): any {
    if (memberValue == null) {
      return value;
    } else {
      return value.filter(item => (item.NomPrenom.includes(memberValue.toLocaleLowerCase()))||
      (item.Email.toLocaleLowerCase().includes(memberValue.toLocaleLowerCase()))||
      (item.Job.toString().includes(memberValue))||
      (item.Tel.toString().includes(memberValue))

      );
    }}
}
toString()
