import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../service/event.service';
import { EventModel } from '../../models/event'; import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-details-events',
  templateUrl: './details-events.component.html',
  styleUrls: ['./details-events.component.css']
})
export class DetailsEventsComponent implements OnInit {
  idEvent;
  currentEvent: EventModel;
  selectedValue: String;
  DateBeginEvent;
  DateEndEvent;
  DateBeginInsc;
  DateEndInsc;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private EventService: EventService,
    private SpinnerService: NgxSpinnerService
  ) {

  }

  ngOnInit(): void {
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
      this.SpinnerService.hide();
    });
  }

}
