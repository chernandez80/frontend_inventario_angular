import { Component, inject } from '@angular/core';
import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.html',
  styleUrl: './perfil.scss'
})
export class Perfil {

  authService = inject(Auth);
  perfil: any ={};

  constructor(){
    this.authService.perfil().subscribe(
      (res) => {
        console.log(res);
        this.perfil = res;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
