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
  getMemberByid(id) {
    this.SpinnerService.show();
    this.listMemberService.getMember(id).subscribe((res: Member) => {
      this.currentMember = res;
      this.currentMember.DateNaissance = res.DateNaissance.substring(0, 10);

      this.SpinnerService.hide();
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
  open() {
    this.router.navigate(['/listmembers']);
  }
}
