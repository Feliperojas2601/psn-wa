import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/components/search/search.component';
import { FollowComponent } from './follow/components/follow/follow.component';

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
    path: 'follow', 
    component:  FollowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserrsRoutingModule { }
