import { Component, inject, OnInit, signal } from '@angular/core';
import { ICategoria } from '../../../interfaces/categoria-interface';
import { CategoriaService } from '../../../services/categoria-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria-component',
  standalone: false,
  templateUrl: './categoria-component.html',
  styleUrl: './categoria-component.scss'
})
export class CategoriaComponent implements OnInit {
  categorias = signal<ICategoria[]>([]);
  categoriaService = inject(CategoriaService);
  visibleDiCategoria = signal<boolean>(false);

  categoriaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', )
  });

  constructor(){
    console.log('Cosntructor');
  }
  ngOnInit(): void {
    console.log('On Init');
    this.listar();
  }

  listar():void{
    this.categoriaService.index().subscribe(
      (data: ICategoria[]) => {
        this.categorias.set(data);
      },
      (error : any) => {

      }
    );
  }

  funMostrarDialog(){
    this.visibleDiCategoria.set(true);
  }

  funGuardarCategoria(){
    let data: ICategoria = { nombre: this.categoriaForm.value.nombre + "",
      descripcion: this.categoriaForm.value.descripcion + ""
     }

    this.categoriaService.store(data).subscribe(
      (res: ICategoria) => {
        this.listar();
        this.visibleDiCategoria.set(false);
      }
    )
  }

}
