import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../service/event.service';
import {EventModel} from '../../models/event';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details-events',
  templateUrl: './details-events.component.html',
  styleUrls: ['./details-events.component.css']
})
export class DetailsEventsComponent implements OnInit {
  idEvent;
  currentEvent : EventModel;
  selectedValue: String;
  DateBeginEvent;
  DateEndEvent;
  DateBeginInsc;
  DateEndInsc;
  role: string;
  participants=[{emailP:String,etat:String}];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private EventService: EventService,
    private SpinnerService: NgxSpinnerService
  ) { 
    
  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');

    this.idEvent = this.route.snapshot.paramMap.get('idEvent');
    this.getEventByid(this.idEvent);
    
  }
  getEventByid(id) {
    this.SpinnerService.show();
    this.EventService.getEvent(id).subscribe((res: EventModel) => {
      this.currentEvent = res;
      this.DateBeginEvent = res.DateBeginEvent.substring(0, 10);
      this.DateEndEvent = res.DateEndEvent.substring(0, 10);
      this.DateBeginInsc = res.DateBeginInsc.substring(0, 10);
      this.DateEndInsc = res.DateEndInsc.substring(0, 10);
      this.participants.push({"emailP":res.participants.emailP,"etat":res.participants.etat})
      console.log(this.participants)
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
  this.getEventByid(id);
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
      this.getEventByid(id);

    }
  });
}
}
