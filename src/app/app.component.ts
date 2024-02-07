import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'folder' },
    { title: 'Casas', url: '/houses', icon: 'home' },
    { title: 'Galería', url: '/gallery', icon: 'image' },
    { title: 'Clientes', url: '/customers', icon: 'people' },
  ];
  public labels = [] || ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
