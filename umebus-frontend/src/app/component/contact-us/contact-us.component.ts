import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  imports: [CommonModule ,ReactiveFormsModule , FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';
  emails: string = 'support@busroutes.com';

  submitForm() {
    if (this.name && this.email && this.subject && this.message) {
      alert(`Thank you, ${this.name}! Your message has been sent.`);
      // Reset Form
      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';
    } else {
      alert('Please fill out all fields.');
    }
  }
}
