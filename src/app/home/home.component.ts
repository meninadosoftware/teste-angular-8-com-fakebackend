import { Component, OnInit } from "@angular/core";
import { first } from "rxjs/operators";

import { User } from "@/_models";

import { Seguro } from "@/models/seguro";
import { SeguroService } from "@/servicos/seguro.service";
import { NgForm } from "@angular/forms";
import { AuthenticationService, UserService } from "@/services";

@Component({ templateUrl: "home.component.html" })
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];
  seg = {} as Seguro;
  seguros: Seguro[];

  constructor(
    private authenticationService: AuthenticationService,
    private segService: SeguroService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.loadAllUsers();
    this.getSegs();
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));
  }

  // defini se um seguro será criado ou atualizado
  saveCar(form: NgForm) {
    if (this.seg.codigo !== undefined) {
      this.segService.updateSeg(this.seg).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.segService.saveSeg(this.seg).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os seguros
  getSegs() {
    this.segService.getSegs().subscribe((segs: Seguro[]) => {
      this.seguros = segs;
    });
  }

  // deleta um seguro
  deleteCar(seg: Seguro) {
    this.segService.deleteSeg(seg).subscribe(() => {
      this.getSegs();
    });
  }

  // copia o seguro para ser editado.
  editCar(seg: Seguro) {
    this.seg = { ...seg };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getSegs();
    form.resetForm();
    this.seg = {} as Seguro;
  }
}
