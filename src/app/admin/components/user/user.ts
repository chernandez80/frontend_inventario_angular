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
    if (this.user_id > 0)
    {
      //Edicion
      this.userService.funModificar(this.user_id, this.userForm.value).subscribe(
        (res) => {
          this.getUsers();
          this.visible = false;
          this.userForm.reset();

          Swal.fire({
            title: "Usuario Actualizado!",
            text: "Ok para continuar!",
            icon: "success"
          });
        }
      )
    }else{
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
      })
      
      alert('Error');
    }
    
    this.user_id =-1;
  }

  funEliminar(us: any){
    if(confirm('Esta seguro de eliminar el usuario?')){
      this.userService.funEliminar(us.id).subscribe(
        (res) => {
          this.getUsers();
          Swal.fire({
            title: "Usuario Eliminado",
            text: "Ok para continuar",
            icon: "success"
          });
        }
      )
    }
  }

  funEditar(us: any){
    this.user_id = us.id;
    this.userForm = new FormGroup({
    name: new FormControl(us.name, [Validators.required]),
    email: new FormControl(us.email, [Validators.email, Validators.required]),
    password: new FormControl(us.password, [Validators.required, Validators.minLength(6)])
    });

    this.visible = true;

  
  }
}
