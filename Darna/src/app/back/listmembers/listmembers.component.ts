import { Component, OnInit, ɵConsole } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ListMemberService } from '../service/list-Member.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import { Member } from '../models/member'
import { ImageService } from '../../front/services/image.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-listmembers',
  templateUrl: './listmembers.component.html',
  styleUrls: ['./listmembers.component.css'],
})
export class ListmembersComponent implements OnInit {
  members: Member[];
  closeResult: string;
  addForm: FormGroup;
  updateForm: FormGroup;
  submitted = false;
  currentMember: Member;
  public listMembers: any;
  modalRef: BsModalRef;
  filesToUpload: Array<File>;
  photo;
  pm;
  memberValue;
  // archiver: Boolean;
  // archiv:Boolean= false;
  currentYear;
  years=[];

  // membersarchived: Member[];


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private listMemberService: ListMemberService,
    private modalService: BsModalService,
    private imageservice: ImageService,
    private SpinnerService: NgxSpinnerService
  ) { }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {

    this.currentYear= (new Date()).getFullYear();
    this.getYears();
    this.getmembersbyYear();

    (this.addForm = this.formBuilder.group({
      NomPrenom: [null, Validators.required],
      Email: [null, [Validators.required, Validators.email]],
      Tel: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
          Validators.minLength(8),
        ],
      ],
      DateNaissance: [null, Validators.required],
      Job: [null, Validators.required],
      Password: [null, [Validators.required, Validators.minLength(6)]],
    })),
      (this.updateForm = this.formBuilder.group({
        NomPrenom: [null, Validators.required],
        Email: [null, [Validators.required, Validators.email]],
        Tel: [
          null,
          [
            Validators.required,
            Validators.pattern(/^[0-9]\d*$/),
            Validators.minLength(8),
          ],
        ],
        DateNaissance: [null, Validators.required],
        Job: [null, Validators.required],
        // Adresse:[this.currentMember.Adresse,Validators.required],
      }));
  }
  getYears(){

    for (let y =2014; y<=this.currentYear; y++) {

      this.years.push(y)
        }
  }


  getmembersbyYear(){
      this.SpinnerService.show();
    this.listMemberService.getmembers(this.currentYear).subscribe((res: any) => {
     // this.members = res.filter((t) => t.role === 'member' &&t.Create_date.toString() !== this.currentYear.toString());
     this.members =res.filter((t) => t.role === 'member');
    //  this.archiv=true;
     this.SpinnerService.hide();

    });


  }
  // getmembersCY2(){
  //   if( this.model.archived2){
  //     this.SpinnerService.show();
  //   this.listMemberService.getmembers(this.currentYear-2).subscribe((res: any) => {
  //    // this.members = res.filter((t) => t.role === 'member' &&t.Create_date.toString() !== this.currentYear.toString());
  //    this.members =res.filter((t) => t.role === 'member');
  //    this.archiv=true;
  //     this.model.archived1=false;
  //     this.SpinnerService.hide();
  //   });

  // }else this.getListMembers();
  // }
//   getListMembersarchivé() {
//    // if( this.model.archived){
//     //this.SpinnerService.show();
//     this.listMemberService.getAllmembers().subscribe((res: any) => {
//       console.log(res);
//   //    let e =res["create_date"]
//       this.membersarchived = res.filter((t) => t.statut === 'archivé' );
// console.log(this.membersarchived )

//     });
//   }

//   getListMembers() {

//     //this.SpinnerService.show();
//     this.listMemberService.getAllmembers().subscribe((res: any) => {
//       console.log(res);
//       this.members = res.filter((t) => t.role === 'member' &&t.Create_date.toString() === this.currentYear.toString());
//       //&& t.Create_date.toString() === this.currentYear.toString()
//       console.log(this.members );
//       this.archiv=false;
//      // this.model.archived=false;
//      /*  for (let i = 0; i < this.members.length; i++){
//         if (this.members[i]["Create_date"]=this.currentYear){
//           this.archiv=true;break
//         }else this.archiv=false;
//       } */
//    /*    for(let i = 0; i < this.members.length; i++){
//         let e =this.members[i]["Expired_date"]
//         console.log(e)

//        var convertedStartDate = new Date(e);
//        console.log(convertedStartDate)
//       var month1 = convertedStartDate.getMonth() + 1 ;
//       var day1 = convertedStartDate.getDate();
//       var year1 = convertedStartDate.getFullYear();
//       let data1= day1 + "/" + month1 + "/" + year1;
//       console.log(data1)

//         let year = new Date().getFullYear();
//         let month=new Date().getMonth() + 1;
//         let day=new Date().getDate();
//         let today=new Date(year, month, day);
//         let shortStartDate = day + "/" + month + "/" + year;
//         console.log(shortStartDate)
//         if(data1<=shortStartDate){
//           console.log(shortStartDate)
//           console.log(data1)
//          this.archive=true;    }else if (data1>shortStartDate){
//   this.archive=false;
//           }break
//       } */

//  /*      this.members.forEach(element => {
//         if (element["Create_date"]===this.currentYear){
//           console.log(this.currentYear)
//           this.archiv=true;
//         }else this.archiv=false;
//       }) */

//    /*    this.members.forEach(element => {
//         let e =element["Expired_date"]
//         console.log(e)

//         var convertedStartDate = new Date(e);
//         console.log(convertedStartDate)
//        var month1 = convertedStartDate.getMonth() + 1 ;
//        var day1 = convertedStartDate.getDate();
//        var year1 = convertedStartDate.getFullYear();
//        let data1= day1 + "/" + month1 + "/" + year1;
//        console.log(data1)

//        let year = new Date().getFullYear();
//        let month=new Date().getMonth() + 1;
//        let day=new Date().getDate();
//        let today=new Date(year, month, day);
//        let shortStartDate = day + "/" + month + "/" + year;
//        console.log(shortStartDate)

//        if(data1<=shortStartDate){
//         console.log(shortStartDate)
//         console.log(data1)
//        this.archiver = true ;    }else {
// this.archiver = false;
//         }
//         console.log(this.archiver)
//       });
// */
//     });

//   }

  get AddFormControls() {
    return this.addForm.controls;
  }
  get UpdateFormControls() {
    return this.updateForm.controls;
  }
  DeleteMember(_id) {
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
        this.listMemberService.deleteMember(_id).subscribe((res: any) => {
          this.members = res;
          this.ngOnInit();
        });
        Swal.fire(
          'Supprimé',
          'Ce Member a été supprimé avec succés',
          'success'
        );
      }
    });
  }
  recoverFile(file) {
    this.filesToUpload = file.target.files as Array<File>;
    this.photo = file.target.files[0].photo;
  }

  AddNewMember() {
    const data = {
      NomPrenom: this.addForm.value.NomPrenom,
      Email: this.addForm.value.Email,
      Tel: this.addForm.value.Tel,
      DateNaissance: this.addForm.value.DateNaissance,
      Job: this.addForm.value.Job,
      Password: this.addForm.value.Password,
      photo: this.filesToUpload[0].name,
    };
    this.submitted = true;
    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    this.listMemberService.AddMember(data).subscribe((res) => {
      this.imageservice
        .pushFileToStorage(this.filesToUpload[0])
        .subscribe((rest) => {
          console.log(rest);
          if (res['code'] == 505) {
            Swal.fire({
              icon: 'error',
              title: 'oops...',
              text: 'Cet email existe déja !',
            });
          } else {
            Swal.fire('Membre ajouté avec succès!', '', 'success');
            this.getmembersbyYear();
            this.addForm.reset();
            this.modalRef.hide();
          }
        });
    });
  }
  getMemberByid(id) {
    this.listMemberService.getMember(id).subscribe((res: Member) => {
      this.currentMember = res;
      this.currentMember.DateNaissance = res.DateNaissance.substring(0, 10);
      console.log(this.currentMember);
      console.log(this.currentMember.DateNaissance);
      this.updateForm.setValue({
        NomPrenom: this.currentMember.NomPrenom,
        Email: this.currentMember.Email,
        Tel: this.currentMember.Tel,
        DateNaissance: this.currentMember.DateNaissance,
        Job: this.currentMember.Job,
      });
    });
  }

  EditMember() {
    this.listMemberService
      .updateMember(this.currentMember._id, this.updateForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          Swal.fire('Ce Member a été modifié avec succés', '', 'success');
          this.getmembersbyYear();
          this.modalRef.hide();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  renouvelerMember(id){
    Swal.fire({
      title: 'êtes-vous sûr?',
      text: 'Vous ne pourrez plus récuperer cela!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, actif-le!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.value) {
        this.listMemberService.renouvelerMember(id, 'actif').subscribe((res) => {
          // this.selectedValue=null;
          this.ngOnInit();
        });

        Swal.fire('Activé', 'Ce Member a été activé avec succés', 'success');
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
}
