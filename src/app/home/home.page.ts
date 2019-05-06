import { Component } from '@angular/core';

//Importacion de data.animales
import { ANIMALES } from "../data/data.animales";
//Importacion de animalinterface
import { Animal } from "../interfaces/animales.interface";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animales: any[] = [];
  audio = new Audio();
  audioTiempo: any;

  constructor() {
    this.animales = ANIMALES.splice(0);
  }

  reproducir(animal: Animal) {
    console.log(animal);
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

  borrar(idx: number) {
    this.animales.splice(idx, 1);
  }
}
