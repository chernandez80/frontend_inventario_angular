import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  fb =  inject(FormBuilder);
  authService = inject(Auth);

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
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
