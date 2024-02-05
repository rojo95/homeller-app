import { Component, OnInit, inject } from '@angular/core';
import { PhotoService, UserPhoto } from 'src/app/services/photo/photo.service';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [
        {
          text: 'Ver Imágen',
          role: 'watch',
          icon: 'eye',
          handler: () => {},
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.presentConfirm(photo, position);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Nothing to do, action sheet is automatically closed
          },
        },
      ],
    });
    await actionSheet.present();
  }

  public async presentConfirm(photo: UserPhoto, position: number) {
    let alert = await this.alertCtrl.create({
      header: '¿ELIMINAR IMAGEN?',
      message: '¿Realmente desea eliminar ésta imagen?',
      buttons: [
        'NO',
        {
          text: 'SÍ',
          handler: () => {
            this.photoService.deletePicture(photo, position);
          },
        },
      ],
    });

    alert.present();
  }
}
