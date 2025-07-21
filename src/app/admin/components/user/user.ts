import { Component, inject, OnInit, signal  } from '@angular/core';
import { UserService } from '../../services/user-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class User implements OnInit {
  
  userService = inject(UserService);
  visible: boolean = false;
  users: any[] = [];
  //users = signal<UserInterface[]>([]);
  //user_id = -1;

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.funListar().subscribe(
      (res : any) => {
        console.log(res);
      }
    )
  }

  showDialog(){
    this.visible = true;
  }

  funGuardarUser(){
    this.userService.funGuardar(this.userForm.value).subscribe(
      (res) => {
        alert('usuario registrado');
      }
    )
  }

}
