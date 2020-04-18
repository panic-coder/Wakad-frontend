import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatTabsModule,
  MatSortModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatFormFieldModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { UpdateComponent } from './components/update/update.component';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { ViewUserDetailsComponent } from './components/view-user-details/view-user-details.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    UpdateComponent,
    UserListingComponent,
    ViewUserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
