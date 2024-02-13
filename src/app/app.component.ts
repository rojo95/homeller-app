import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Casas', url: '/houses', icon: 'home' },
    { title: 'Galería', url: '/gallery', icon: 'image' },
    { title: 'Compradores', url: '/customers', icon: 'people' },
    { title: 'Usuario', url: '/', icon: 'person-circle' },
    { title: 'Usuarios', url: '/', icon: 'people-circle' },
    { title: 'Configuración', url: '/', icon: 'cog' },
  ];
  public labels = [] || [
    'Family',
    'Friends',
    'Notes',
    'Work',
    'Travel',
    'Reminders',
  ];
  constructor() {}
}
