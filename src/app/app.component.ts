import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Casas', url: '/folder/inbox', icon: 'home' },
    { title: 'Galería', url: '/gallery', icon: 'image' },
    { title: 'Clientes', url: '/customers', icon: 'people' },
  ];
  public labels = [] || ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
