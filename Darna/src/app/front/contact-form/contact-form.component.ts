import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder ,private contactService: ContactService ,    private router: Router,
    ) { }

    ngOnInit(): void {
       // this.renderMap();

      this.contactForm = this.formBuilder.group(
        {
          NomPrenom: [null, Validators.required],
          Email: [null, [Validators.required, Validators.email]],
          Message: [null, Validators.required],
        
        },
      
      );
    }  
  get form() {
    return this.contactForm.controls;
  }
  sendMail() {
    const data = {
      NomPrenom: this.contactForm.value.NomPrenom,
      Email: this.contactForm.value.Email,
      Message: this.contactForm.value.Message,     
    };
    this.submitted = true;
    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    this.contactService.sendEmail(data).subscribe((res)  => {
      console.log(this.contactForm.value);

      console.log(res)
      Swal.fire('Votre Email a été envoyée avec succés!', '', 'success');
      this.contactForm.reset();
    }, error => {
      console.error(error, "error");
    } );
  }


 
 /* loadMap = () => {
    var map = new window['google'].maps.Map(this.mapElement.nativeElement, {
      center: {lat: 24.5373, lng: 81.3042},
      zoom: 8
    });
 
    var marker = new window['google'].maps.Marker({
      position: {lat: 24.5373, lng: 81.3042},
      map: map,
      title: 'Hello World!',
      draggable: true,
      animation: window['google'].maps.Animation.DROP,
    });
 
    var contentString = '<div id="content">'+
    '<div id="siteNotice">'+
    '</div>'+
    '<h3 id="thirdHeading" class="thirdHeading">tutsmake.com</h3>'+
    '<div id="bodyContent">'+
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>'+
    '</div>'+
    '</div>';
 
    var infowindow = new window['google'].maps.InfoWindow({
      content: contentString
    });
 
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
 
  }
  renderMap() {
     
    window['initMap'] = () => {
      this.loadMap();      
    }
    if(!window.document.getElementById('google-map-script')) {
      var s = window.document.createElement("script");
      s.id = "google-map-script";
      s.type = "text/javascript";
      s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDRmqZ-1VD-DbsccElMGtMtlRz9FndbPB4&callback=initMap";
       
      window.document.body.appendChild(s);
    } else {
      this.loadMap();
    }
  } */

}
