import { Component, OnInit } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {ListMemberService} from '../service/list-Member.service'
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";
import {Member} from '../models/member'
import { ImageService } from '../../front/services/image.service';

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
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private listMemberService: ListMemberService,
    private modalService: BsModalService,
    private imageservice: ImageService,
    private SpinnerService: NgxSpinnerService
  ) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    this.getListMembers();

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

  getListMembers() {
    this.SpinnerService.show();
    this.listMemberService.getAllmembers().subscribe((res: any) => {
      console.log(res);
      this.members = res.filter((t) => t.role === 'member');
      this.SpinnerService.hide();
    });
  }

  get f() {
    return this.addForm.controls;
  }
  get f1() {
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

  AjouterMember() {

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
            this.getListMembers();
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

  ModifierMember() {
    this.listMemberService
      .updateMember(this.currentMember._id, this.updateForm.value)
      .subscribe(
        (response) => {
          console.log(response);
          Swal.fire('Ce Member a été modifié avec succés', '', 'success');
          this.getListMembers();
          this.modalRef.hide();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
