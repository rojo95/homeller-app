import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage /* implements OnInit */ {
  showPass: boolean = true;
  public buffer = 0;
  public progress = 0;
  public security: string = 'medium';
  public passMessage: string = '';

  public restorePass: boolean = false;

  constructor() {}

  // ngOnInit() {
  // }

  showPassFunction() {
    this.showPass = !this.showPass;
  }

  async validatePassword($event: any) {
    const total = 6;
    const text = $event.target.value;

    let success: number = 0;

    // Check for uppercase letter
    if (/[A-Z]/.test(text)) {
      success++;
    }

    // Check for lowercase letter
    if (/[a-z]/.test(text)) {
      success++;
    }

    // Check for number
    if (/\d/.test(text)) {
      success++;
    }

    // Check for minimum length of  8 characters
    if (text.length > 7) {
      success += 2;
    }

    // Check for special character
    if (/[^a-zA-Z\d\s:]/.test(text)) {
      success++;
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(text) && success < 1) {
      success--;
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(text) && success < 1) {
      success--;
    }

    // Check for number
    if (!/\d/.test(text) && success < 1) {
      success--;
    }

    // Check for minimum length of   8 characters
    if (text.length < 8 && success < 1) {
      success -= 2;
    }

    // Check for special character
    if (!/[^a-zA-Z\d\s:]/.test(text) && success < 1) {
      success--;
    }

    // Ensure success never goes below zero
    if (success < 0) {
      success = 0;
    }

    this.buffer = (success + 0.5) / total;
    this.progress = success / total;

    if (success === 0) {
      this.security = 'medium';
      this.passMessage = '';
    }
    if ((success / total) * 100 < 50) {
      this.security = 'danger';
      this.passMessage = 'Contraseña debil.';
    }
    if ((success / total) * 100 >= 50) {
      this.security = 'warning';
      this.passMessage = 'Contraseña intermedia';
    }
    if (success >= total) {
      this.security = 'success';
      this.passMessage = '¡Contraseña segura!';
    }
  }

  restorePassFunction() {
    this.restorePass = !this.restorePass
  }
}
