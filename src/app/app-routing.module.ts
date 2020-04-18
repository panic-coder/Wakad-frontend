import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { UpdateComponent } from './components/update/update.component';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { ViewUserDetailsComponent } from './components/view-user-details/view-user-details.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'user-list', component: UserListingComponent },
  { path: 'view-details', component: ViewUserDetailsComponent },
  { path: 'update', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
