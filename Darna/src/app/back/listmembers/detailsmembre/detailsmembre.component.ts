import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListMemberService } from '../../service/list-Member.service';
import { Member } from '../../models/member';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detailsmembre',
  templateUrl: './detailsmembre.component.html',
  styleUrls: ['./detailsmembre.component.css'],
})
export class DetailsmembreComponent implements OnInit {
  id_Member;
  currentMember: Member;
  selectedValue: String;
  pdm;
  archive:Boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listMemberService: ListMemberService,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.id_Member = this.route.snapshot.paramMap.get('idMember');
    this.getMemberByid(this.id_Member);
  }
  getMemberByid(id){
   // this.SpinnerService.show();
    this.listMemberService.getMember(id).subscribe((res:Member) => {
      this.currentMember=res
      this.currentMember.DateNaissance=res.DateNaissance.substring(0,10);
      let e =res["Expired_date"]
      console.log(e)
     // this.SpinnerService.hide();
     var convertedStartDate = new Date(e);
     console.log(convertedStartDate)
    var month1 = convertedStartDate.getMonth() + 1 ;
    var day1 = convertedStartDate.getDate();
    var year1 = convertedStartDate.getFullYear();
    let data1= day1 + "/" + month1 + "/" + year1;
    console.log(data1)

      let year = new Date().getFullYear();
      let month=new Date().getMonth() + 1;
      let day=new Date().getDate();
      let today=new Date(year, month, day);
      let shortStartDate = day + "/" + month + "/" + year;
      console.log(shortStartDate)

        if(data1<=shortStartDate){
          console.log(shortStartDate)
          console.log(data1)
         this.archive=true; }else{
  this.archive=false;
          }
    });
  }
  bannirMember(id) {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez plus récuperer cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, banni-le!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.listMemberService.bannirMember(id, 'banni').subscribe((res) => {
          // this.selectedValue=null;
          this.ngOnInit();
        });

        Swal.fire('Supprimé', 'Ce Member a été banni avec succés', 'success');
      }
    });
  }
  // ArchiverMember(id) {
  //   Swal.fire({
  //     title: 'êtes-vous sûr?',
  //     text: 'Vous ne pourrez plus récuperer cela!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Oui, archive-le!',
  //     cancelButtonText: 'Annuler',
  //   }).then((result) => {
  //     if (result.value) {
  //       this.listMemberService.archiverMember(id, 'archivé').subscribe((res) => {
  //         // this.selectedValue=null;
  //         this.ngOnInit();
  //       });

  //       Swal.fire('Archivé', 'Ce Member a été archivé avec succés', 'success');
  //     }
  //   });
  // }
  open() {
    this.router.navigate(['/listmembers']);
  }
}
