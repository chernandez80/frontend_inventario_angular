import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  fb =  inject(FormBuilder);
  authService = inject(Auth);
  router = inject(Router);

  //formGroup
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  //FormBuilder
  loginForm2 =  this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  })

  funIngresar(){

    if(this.loginForm.invalid) return;

    const { email, password} = this.loginForm.value;

    this.authService.login({email,password}).subscribe(
      (res: any) => {
        console.log(res);

        //Almacenamos el token
        localStorage.setItem("access_token", res.access_token);

        this.router.navigate(["/admin/perfil"]);
      },
      (error: any) => {
        console.log(error);

        alert("Error de Credenciales");
      }
    );
  }
}
