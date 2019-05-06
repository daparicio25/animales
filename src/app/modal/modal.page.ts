import { Component, OnInit, Input } from '@angular/core';

//Importacion de animalinterface
import { Animal } from "../interfaces/animales.interface";
//Importacion de data.animales
import { ANIMALES } from "../data/data.animales";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() objAnimal?: Animal;

  animales: Animal[] = [];
  audio = new Audio();
  audioTiempo: any;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  ngOnInit() {
  }

  reproducir(animal: Animal) {
    this.pausar_audio(animal);

    if (animal.reproduciendo == true) {
      animal.reproduciendo = false;
      return;
    }

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;
    this.audioTiempo = setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000 );
  }

  private pausar_audio(animalSel: Animal) {
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animales) {
      if (animal.nombre != animalSel.nombre) {
        animal.reproduciendo = false;
      }
    }
  }

}
