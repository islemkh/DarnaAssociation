import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ImageService } from 'src/app/front/services/image.service';
import { EventModel } from '../models/event';
import Swal from 'sweetalert2';
import { EventService } from '../service/event.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  modalRef: BsModalRef;
  events: EventModel[];
  minDate = null;
  maxDate = null;
  minDateIn = null;
  maxDateIn = null;
  BeginDate = null;
  EndDate = null;
  photo;
  imageSrc: string = 'assets/images/eventDefault.jpg';

  addFormEvent: FormGroup;
  updateFormEvent: FormGroup;
  filesToUpload: Array<File>;
  submitted = false;
  currentEvent: EventModel;
  role: string;
  pm;
  years = [];
  currentYear;
  etat = false;
  alreadyParti = false;
  userConnect: string;
  currentDate = '';
  tabPubEvent;
  today = new Date();
  error: any = { isError: false, errorMessage: '' };
  isValidDate: any;
  eventValue;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private EventService: EventService,
    private modalService: BsModalService,
    private imageservice: ImageService,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role');
    this.userConnect = sessionStorage.getItem('UserConnect');
    this.currentYear = new Date().getFullYear();

    this.tabPubEvent = [];
    this.getYears();
    this.getLisEventsbByYear();
    (this.addFormEvent = this.formBuilder.group({
      NameEvent: [null, Validators.required],
      Description: [null, [Validators.required]],
      NumberMember: [null, [Validators.required]],
      lieu: [null, [Validators.required]],
      DateBeginEvent: [null, Validators.required],
      DateEndEvent: [null, Validators.required],
      DateBeginInsc: [null, [Validators.required]],
      DateEndInsc: [null, [Validators.required]],
    })),
      (this.updateFormEvent = this.formBuilder.group({
        NameEvent: [null, Validators.required],
        Description: [null, [Validators.required]],
        NumberMember: [null, [Validators.required]],
        lieu: [null, [Validators.required]],
        DateBeginEvent: [null, Validators.required],
        DateEndEvent: [null, Validators.required],
        DateBeginInsc: [null, [Validators.required]],
        DateEndInsc: [null, [Validators.required]],
      }));
    this.addFormEvent
      .get('DateBeginEvent')
      .valueChanges.subscribe((valueChanges) => {
        this.minDate = valueChanges;
      });
    this.addFormEvent
      .get('DateEndEvent')
      .valueChanges.subscribe((valueChanges) => {
        this.maxDate = valueChanges;
      });
    this.addFormEvent
      .get('DateBeginInsc')
      .valueChanges.subscribe((valueChanges) => {
        this.minDateIn = valueChanges;
      });
    this.addFormEvent
      .get('DateEndInsc')
      .valueChanges.subscribe((valueChanges) => {
        this.maxDateIn = valueChanges;
      });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageSrc = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      this.filesToUpload = event.target.files;
      this.photo = event.target.files[0].photo;
    }
  }
  getYears() {
    for (let y = 2014; y <= this.currentYear; y++) {
      this.years.push(y);
    }
  }
  getLisEventsbByYear() {
    this.SpinnerService.show();
    this.EventService.getEventbyYear(this.currentYear).subscribe((res: any) => {
      console.log(res);
      this.events = res;
      res.forEach((e) => {
        if (e.publish === 'Yes') {
          this.tabPubEvent.push(e);
        }
      });
      this.SpinnerService.hide();
    });
  }

  get AddEventControls() {
    return this.addFormEvent.controls;
  }
  get UpdatEventControls() {
    return this.updateFormEvent.controls;
  }
  ResetForm() {
    this.addFormEvent.reset();
    this.imageSrc = 'assets/images/eventDefault.jpg';
    this.modalRef.hide();
  }
  AddEvent() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addFormEvent.invalid) {
      return;
    }
    let data = {};
    if (this.filesToUpload === undefined) {
      data = {
        NameEvent: this.addFormEvent.value.NameEvent,
        Description: this.addFormEvent.value.Description,
        lieu: this.addFormEvent.value.lieu,
        DateBeginEvent: this.addFormEvent.value.DateBeginEvent,
        DateEndEvent: this.addFormEvent.value.DateEndEvent,
        NumberMember: this.addFormEvent.value.NumberMember,
        DateBeginInsc: this.addFormEvent.value.DateBeginInsc,
        DateEndInsc: this.addFormEvent.value.DateEndInsc,
        photo: 'eventDefault.jpg',
      };
    } else {
      data = {
        NameEvent: this.addFormEvent.value.NameEvent,
        Description: this.addFormEvent.value.Description,
        lieu: this.addFormEvent.value.lieu,
        DateBeginEvent: this.addFormEvent.value.DateBeginEvent,
        DateEndEvent: this.addFormEvent.value.DateEndEvent,
        NumberMember: this.addFormEvent.value.NumberMember,
        DateBeginInsc: this.addFormEvent.value.DateBeginInsc,
        DateEndInsc: this.addFormEvent.value.DateEndInsc,
        photo: this.filesToUpload[0].name,
      };
    }
    this.EventService.AddNewEvent(data).subscribe((res) => {
      Swal.fire('Event ajouté avec succès!', '', 'success');
      if (this.filesToUpload != undefined) {
        this.imageservice
          .pushFileToStorage(this.filesToUpload[0])
          .subscribe((rest) => {
            console.log(rest);
          });
      }
      this.getLisEventsbByYear();
    });
  }
  DeleteEvent(_id) {
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez plus récuperer cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.EventService.deleteEvent(_id).subscribe((res: any) => {
          this.events = res;
          this.ngOnInit();
        });
        Swal.fire(
          'Supprimé',
          'Ce événement a été supprimé avec succés',
          'success'
        );
      }
    });
  }
  Publish(id) {
    this.EventService.getEvent(id).subscribe((res: EventModel) => {
      this.currentEvent = res;
      if (this.currentEvent.publish === 'Yes') {
        Swal.fire('Déja Publié', ':)', 'error');
      }
      if (this.currentEvent.publish === 'No') {
        Swal.fire({
          title: 'êtes-vous sûr pour publié cette événement?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui, Publier-le!',
          cancelButtonText: 'Annuler',
        }).then((result) => {
          if (result.value) {
            this.EventService.PublishEvent(
              id,
              'Yes'
            ).subscribe((res: EventModel) => { });
            Swal.fire('Publier', 'événement publié', 'success');
            this.getLisEventsbByYear();
          }
        });
      }
    });
  }

  getEventByid(id) {
    this.EventService.getEvent(id).subscribe((res: EventModel) => {
      this.currentEvent = res;
      this.currentEvent.NameEvent = res.NameEvent;
      this.currentEvent.Description = res.Description;
      this.currentEvent.lieu = res.lieu;
      this.currentEvent.DateBeginEvent = res.DateBeginEvent;
      this.currentEvent.DateEndEvent = res.DateEndEvent;
      this.currentEvent.NumberMember = res.NumberMember;
      this.currentEvent.DateBeginInsc = res.DateBeginInsc;
      this.currentEvent.DateEndInsc = res.DateEndInsc;
      console.log(this.currentEvent.publish);
      this.updateFormEvent.setValue({
        NameEvent: this.currentEvent.NameEvent,
        Description: this.currentEvent.Description,
        lieu: this.currentEvent.lieu,
        DateBeginEvent: this.currentEvent.DateBeginEvent.substring(0, 10),
        DateEndEvent: this.currentEvent.DateEndEvent.substring(0, 10),
        NumberMember: this.currentEvent.NumberMember,
        DateBeginInsc: this.currentEvent.DateBeginInsc.substring(0, 10),
        DateEndInsc: this.currentEvent.DateEndInsc.substring(0, 10),
      });
    });
  }

  participate(id) {
    this.EventService.getEvent(id).subscribe((res: EventModel) => {
      let part = '';
      this.currentEvent = res;
      let tabP = [];
      res.participants.forEach((p) => {
        tabP.push(p.emailP);
      });
      this.userConnect = sessionStorage.getItem('UserConnect');
      if (tabP.length != 0) {
        console.log('this emna', tabP);
        for (let i = 0; i < tabP.length; i++) {
          console.log('this emna');
          if (tabP[i] === this.userConnect) {
            part = 'true';
            break;
          } 
          else {
            part = 'false';
          }
        }

        if (part === 'false') {
          this.EventService.Participate(
            id,
            this.userConnect
          ).subscribe((res) => { });
          Swal.fire(
            'participer',
            'Vous avez participé à cet évènement avec succes',
            'success'
          );
          this.getLisEventsbByYear();
        } else if (part === 'true') {
          Swal.fire(
            'Deja participer',
            'Vous avez déja participé à cet évènement',
            'error'
          );
          this.getLisEventsbByYear();
        }
      } else {
        this.EventService.Participate(
          id,
          this.userConnect
        ).subscribe((res) => { });
        Swal.fire(
          'participer',
          'Vous avez participé à cet évènement avec succes',
          'success'
        );
        this.getLisEventsbByYear();
      }
    });
  }

  EditEvent() {
    this.EventService.updateEvent(
      this.currentEvent._id,
      this.updateFormEvent.value
    ).subscribe(
      (response) => {
        console.log(response);
        Swal.fire('Cet événement a été modifié avec succés', '', 'success');
        this.getLisEventsbByYear();
        this.modalRef.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
