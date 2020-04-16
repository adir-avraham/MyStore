import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactUsService } from 'src/app/services/contact-us/contact-us.service';
import { AlertComponent } from '../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';
import { Mail } from './contact-us.interface';

interface Result {
  status: boolean;
  message: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {

  public contactUsForm: FormGroup;
  public requiredMsg: string = "Field is required.";
  public resultMessage: string;

  constructor(private formBuilder: FormBuilder, private contactUsService: ContactUsService, 
    private dialog: MatDialog) { 

    this.contactUsForm = this.formBuilder.group({
      name: [null, Validators.required ],
      email: [null, [Validators.required, Validators.email]],
      message: [null, Validators.required]
    });

  };

  ngOnInit(): void {
  }

  sendEmail() {
    const mail: Mail = {
      name: this.contactUsForm.get('name').value,
      email: this.contactUsForm.get('email').value,
      message: this.contactUsForm.get('message').value
    };
    
    this.contactUsService.sendEmail(mail).subscribe((result: Result) => {
      const { message, status } = result;
      if (status && message) {
        this.contactUsForm.reset();
        this.raiseSuccessMessage(message);
      } else if (!status && message){
        this.raiseFailureMessage(message);
      }
    }, error => {
      console.log(error.message)
    })
  
  };

  raiseSuccessMessage(message: string) {
    this.dialog.open(AlertComponent, {
      width: '450px',
      data: {
        message: message,
        title: "Success"
    }})
  };

  raiseFailureMessage(message: string) {
    this.dialog.open(AlertComponent, {
      width: '450px',
      data: {
        message: message,
        title: "Failure"
    }})
  };

  requiredValidation(field: string) {
    return this.contactUsForm.get(field).errors?.required;
  };

};