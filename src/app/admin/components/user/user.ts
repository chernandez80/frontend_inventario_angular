import { Component, inject, OnInit, signal  } from '@angular/core';
import { UserService } from '../../services/user-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/user-interface';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class User implements OnInit {
  
  userService = inject(UserService);
  visible: boolean = false;
  users = signal<IUser[]>([]);
  //users = signal<UserInterface[]>([]);
  user_id = -1;

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
        this.users.set(res);
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
        this.getUsers();
        this.visible =false;
        this.userForm.reset();

        Swal.fire({
          title: "Usuario Registrado",
          text: "Ok para continuar",
          icon: "success"
        });
      }
    )
  }

  funEliminar(us: any){}
  funEditar(us: any){
    this.user_id = us.id;
    this.userForm = new FormGroup({
    name: new FormControl(us.name, [Validators.required]),
    email: new FormControl(us.email, [Validators.email, Validators.required]),
    password: new FormControl(us.password, [Validators.required, Validators.minLength(6)])
  });

  }
}
