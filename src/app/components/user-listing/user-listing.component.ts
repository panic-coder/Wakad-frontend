import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export interface PeriodicElement {
  _id: string;
  Name: string;
  Email: string;
  Mobile: string;
  Image: string;
  View: string;
  Update: string;
  Delete: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.css']
})
export class UserListingComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email', 'Mobile', 'Image', 'View', 'Update', 'Delete' ]; 
  dataSource = [];
  constructor(private snackBar: MatSnackBar, private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    ELEMENT_DATA = []
    this.getUserList();
  }

  getUserList() {
    try {
      var option = {
        url: 'users'
      };
      this.httpService.getRequest(option).subscribe((response: any) => {
        response.data.forEach(element => {
          var data = {
            _id: element._id,
            Name: element.firstName + ' ' + element.lastName,
            Email: element.email,
            Mobile: element.mobileNumber,
            Image: environment.baseUrl + 'images/' + element.image,
            View: 'View',
            Update: 'Update',
            Delete: 'Delete'
          }
          ELEMENT_DATA.push(data);
        });
        this.dataSource = ELEMENT_DATA;
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

  update(element) {
    localStorage.setItem("id",element._id);
    this.router.navigate(['update']);
  }

  view(element) {
    localStorage.setItem("id",element._id);
    this.router.navigate(['view-details']);

  }

  delete(element) {
    var option = {
      url: 'users',
      body: {
        _id: element._id
      }
    };
    this.httpService.deleteRequest(option).subscribe((response: any) => {
      this.openSnackBar("Deleted Successfully");
      this.ngOnInit()
    },
    err => {
      this.openSnackBar("Something went wrong!");
    });
  }

}
