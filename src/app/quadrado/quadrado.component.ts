import { Component, ElementRef, ViewChild } from '@angular/core';
import { Rotation } from '../rotation/rotation';

@Component({
  selector: 'app-quadrado',
  templateUrl: './quadrado.component.html',
  styleUrls: ['./quadrado.component.scss'],
})
export class QuadradoComponent {

  @ViewChild('entrada') entrada: ElementRef;
  texto = "";
  LastList = "";
  matriz = [];
  rotation: Rotation = new Rotation([]);
  matrizOriginal = [];
  tabela1 = false;

  novo() {
    this.texto = this.entrada.nativeElement.value;
    let vec = this.texto.split(',');
    this.rotation = new Rotation(vec);
    this.matrizOriginal = this.rotation.getMatrizClone();
    this.rotation.rotate();
    this.texto = this.rotation.getVector();
  }

  denovo() {
    this.rotation.rotate();
  }

}
