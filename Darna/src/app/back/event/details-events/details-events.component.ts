import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../service/event.service';
import { EventModel } from '../../models/event';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details-events',
  templateUrl: './details-events.component.html',
  styleUrls: ['./details-events.component.css'],
})
export class DetailsEventsComponent implements OnInit {
  idEvent;
  currentEvent: EventModel;
  selectedValue: String;
  DateBeginEvent;
  DateEndEvent;
  DateBeginInsc;
  DateEndInsc;
  role: string;
  parValide=[];
  participants=[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private EventService: EventService,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.participants = [];
    this.parValide = [];
    this.role = sessionStorage.getItem('role');
    this.idEvent = this.route.snapshot.paramMap.get('idEvent');
    this.getEventByid(this.idEvent);
    console.log(this.parValide)
  }
  getEventByid(id) {
    this.SpinnerService.show();
    this.EventService.getEvent(id).subscribe((res: EventModel) => {
      this.currentEvent = res;
      res.participants.forEach(p => {
        if(p.etat !=='refusé')
      {this.participants.push({"emailP":p.emailP,"etat":p.etat})}
      });
      res.participants.forEach(p => {
        if(p.etat ==='valide')
      {this.parValide.push({"emailP":p.emailP,"etat":p.etat})}
      });
      console.log("part test21",this.participants)
      this.SpinnerService.hide();
     
    });
  
  }



validerParticipant(id,emailP){
this.EventService.ValiderP(id,emailP).subscribe((res: EventModel) => {
  });
  Swal.fire(
    "Participant a été validé avec succés!",
    '',
    'success'
  );
 this.ngOnInit();
}
refuserParticipant(id,emailP){
  Swal.fire({
    title: 'êtes-vous sûr?',
    text: 'Vous ne pourrez plus récuperer cela!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, refuser-le!',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.value) {
      this.EventService.NoValiderP(id,emailP).subscribe((res: any) => {
      //  this.ngOnInit();
      });
      Swal.fire(
        'Refusé',
        'Ce participant a été refusé avec succés',
        'success'
      );
      this.ngOnInit();
    }
  });
}
}
