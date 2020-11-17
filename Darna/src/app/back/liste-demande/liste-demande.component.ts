import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {ListeDemandeService} from '../service/liste-demande.service'
import { NgxSpinnerService } from "ngx-spinner";
export class Demande {
  _id;
  NomPrenom : string;
  Email: string;
  Tel: Int32List;
  DateNaissance: Date;
  Job:String;
  photo:String
}

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.css']
})
export class ListeDemandeComponent implements OnInit {
  demandes :Demande[];
  pd;
  public listeDemandes:any;
  constructor( private router: Router , private listeDemandeService: ListeDemandeService, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getListDemands();
  }
  getListDemands(){
    this.SpinnerService.show();
    this.listeDemandeService.getListeDemand().subscribe((res: any) => {
      console.log(res[0]);
      this.demandes=res;
      this.SpinnerService.hide();
    }
      );
  }
// ngOnChanges(){
//   this.getListDemands();
// }
refuserDemande(_id){
  Swal.fire({
    title: 'êtes-vous sûr?',
    text: 'Vous ne pourrez plus récuperer cela!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le!',
    cancelButtonText:'Annuler'
  }).then((result) => {
    if (result.value) {
      this.listeDemandeService.deleteDemand(_id).subscribe((res: any) => {
        this.demandes=res;
        this.ngOnInit();
      });
      Swal.fire(
        'Supprimé',
        'Cette demande a été supprimée avec succés',
        'success'
      );
    }
  });

}

accepterDemande(demande){
  this.listeDemandeService.deleteDemand(demande._id).subscribe((res: any) => {
    console.log(res)
    this.demandes=res;
    this.ngOnInit();
  });
  this.listeDemandeService.AcceptDemande(demande).subscribe((res:any)=> {

    Swal.fire(
      "Demande d'adhesion a été acceptée avec succés!",
      '',
      'success'
    );
    }
    );
  }

}
