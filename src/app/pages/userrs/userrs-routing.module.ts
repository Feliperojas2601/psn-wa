import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserrsComponent } from './userrs.component';
import { SearchComponent } from './search/components/search/search.component';
import { FriendsComponent } from './friends/components/friends/friends.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  }, 
  { 
    path: 'search', 
    component:  SearchComponent
  }, 
  { 
    path: 'friends', 
    component:  FriendsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserrsRoutingModule { }
