import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../../services/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-view-user-details',
  templateUrl: './view-user-details.component.html',
  styleUrls: ['./view-user-details.component.css']
})
export class ViewUserDetailsComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private httpService: HttpService) { }

  details = {
    image: ''
  };

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    try {
      var option = {
        url: 'details',
        id: localStorage.getItem("id")
      };
      this.httpService.getRequestWithParams(option).subscribe((response: any) => {
          this.details = response.data;
          this.details.image = environment.baseUrl + 'images/' + this.details.image
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

}
