import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  firstName =  new FormControl('', [Validators.required]);
  lastName =  new FormControl('', [Validators.required]);
  email =  new FormControl('', [Validators.required, Validators.email]);
  mobileNumber =  new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
  image = '';
  constructor(private snackBar: MatSnackBar, private httpService: HttpService, private router: Router) { }

  ngOnInit() {
  }

  getFirstNameErrorMessage() {
    return this.firstName.hasError('required') ? 'You must enter a value' :
      '';
  }

  getLastNameErrorMessage() {
    return this.lastName.hasError('required') ? 'You must enter a value' :
      '';
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Enter a valid email' :
        '';
  }

  getMobileNumberErrorMessage() {
    return this.mobileNumber.hasError('required') ? 'You must enter a value' :
      this.mobileNumber.hasError('pattern') ? 'Enter a valid mobile number' :
        '';
  }

  onFileSelected(event) {
    this.image = event.target.files[0];
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 1000,
    });
  }

  submit() {
    try {
      if (this.firstName.invalid) { 
        throw "First name is required";
      }
      if (this.lastName.invalid) { 
        throw "Last name is required";
      }
      if (this.email.invalid) { 
        throw "Invalid Email";
      }
      if (this.mobileNumber.invalid) { 
        throw "Invalid mobile number";
      }
      if (this.image === '') { 
        throw "Choose an image";
      }
      const formData = new FormData();  
      formData.append('firstName', this.firstName.value);
      formData.append('lastName', this.lastName.value);
      formData.append('email', this.email.value);
      formData.append('mobileNumber', this.mobileNumber.value);
      formData.append('image', this.image);
      var url = 'registration'
      this.httpService.postRequest(url, formData).subscribe((response: any) => {
        console.log(response);
        this.firstName.reset();
        this.lastName.reset();
        this.email.reset();
        this.mobileNumber.reset();
        this.image = '';
        this.openSnackBar("SuccessFully Registered")
        this.router.navigate(['user-list']);
      },
      err => {
        this.openSnackBar("Something went wrong!");
      });
    } catch (error) {
      this.openSnackBar(error);
    }
  }

}
