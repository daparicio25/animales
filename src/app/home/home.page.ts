import { Component } from '@angular/core';

//Importacion de data.animales
import { ANIMALES } from "../data/data.animales";
//Importacion de animalinterface
import { Animal } from "../interfaces/animales.interface";
import { IonList } from '@ionic/angular';

//modal
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animales: Animal[] = [];
  audio = new Audio();
  audioTiempo: any;

  constructor(public alertController: AlertController, public modalController: ModalController) {
    this.animales = ANIMALES.slice(0);
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

  borrar(idx: number, slidingItem : any) {
    this.animales.splice(idx, 1);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      event.target.complete();
    }, 2000);
  }

  async abrir_modal(animal: Animal) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        objAnimal: animal,
      }
    });
    await modal.present();
  }
}
