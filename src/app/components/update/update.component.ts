import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  details = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    image: ''
  };
  firstName =  new FormControl('', [Validators.required]);
  lastName =  new FormControl('', [Validators.required]);
  email =  new FormControl('', [Validators.required, Validators.email]);
  mobileNumber =  new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
  image: any;
  id = '';
  imageName = '';

  constructor(private snackBar: MatSnackBar, private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.getDetails();
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
    this.imageName = this.image.name;
  }

  getDetails() {
    try {
      var option = {
        url: 'details',
        id: localStorage.getItem("id")
      };
      this.httpService.getRequestWithParams(option).subscribe((response: any) => {
        this.details = response.data;
        this.firstName.setValue(this.details.firstName);
        this.lastName.setValue(this.details.lastName);
        this.email.setValue(this.details.email);
        this.mobileNumber.setValue(this.details.mobileNumber);
        this.id = this.details._id;
        this.imageName = response.data.image;
        this.image = response.data.image;
     },
      err => {
        this.openSnackBar("Something went wrong!");
      });
    } catch (error) {
      this.openSnackBar(error);
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 1000,
    });
  }

  update() {
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
      formData.append('_id', this.id);
      formData.append('firstName', this.firstName.value);
      formData.append('lastName', this.lastName.value);
      formData.append('email', this.email.value);
      formData.append('mobileNumber', this.mobileNumber.value);
      formData.append('image', this.image);
      var url = 'users'
      this.httpService.putRequest(url, formData).subscribe((response: any) => {
        this.firstName.reset();
        this.lastName.reset();
        this.email.reset();
        this.mobileNumber.reset();
        this.image = '';
        this.openSnackBar("Updated SuccessFully")
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
