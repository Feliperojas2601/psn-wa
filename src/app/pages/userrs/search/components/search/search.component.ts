import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { UserService } from '../../../../user/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserSearch } from '../../interfaces/userSearch.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit, OnDestroy {
  
  public subscriptionToDestroy: Subscription[] = [];
  public profileImageUrls: string[] = [];

  public filteredUsers!: UserSearch[];
  public recentSearchedUsers!: UserSearch[]; 
  public suggestedUsers!: UserSearch[];
  public suggestedFilteredUsers!: UserSearch[];
  public searchForm!: FormGroup; 
  public searchFormValue!: UserSearch; 

  constructor(
    private readonly searchService: SearchService,
    private readonly authService: AuthService,
    private userService: UserService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      pattern: ['', [Validators.required]]
    });

    this.getAllSearchedUsers();
    this.getAllSuggestedUsers();
  }

  public getAllSearchedUsers(): void {
    let subGetAllSearchedUsers = this.searchService.getAllSearchedUsers().subscribe({
      next: (resp: any) => {
        this.recentSearchedUsers = resp.data.findAllSearchedUsers.map((user: UserSearch) => {
          return user;
        });
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetAllSearchedUsers);
  }

  public getAllSuggestedUsers(): void {
    let subGetAllSuggestedUsers = this.searchService.getAllSuggestedUsers().subscribe({
      next: (resp: any) => {
        this.suggestedUsers = resp.data.findAllSuggestedFriends.map((user: UserSearch) => {
          return user; 
        });
        this.loadProfilePictures(this.suggestedUsers.map((user) => {return user.id}));
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetAllSuggestedUsers);
  }

  private loadProfilePictures(ids: number[]): void {
    let subGetProfilePicture = this.userService.getProfilePicture(ids).subscribe({
      next: (resp: any) => {
        this.profileImageUrls = resp.data.getProfilePicture;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetProfilePicture);
  }

  public deleteRecentSearchedUsers(): void {
    let subDeleteRecentSearchedUsers = this.searchService.deleteRecentSearchedUsers().subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'Recent searched users deleted successfully', 'success');
        this.recentSearchedUsers = [];
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subDeleteRecentSearchedUsers);    
  }

  public followUser(userId: number): void {
    let subFollowUser = this.searchService.followUser(userId).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'Requested follow successfully', 'success');
        this.suggestedUsers = this.suggestedUsers.filter((user: UserSearch) => user.id !== userId);
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subFollowUser);
  }

  public filterUser(event: any): void {
    let filtered: UserSearch[] = [];
    let query = event.query;

    let subSearchUsers = this.searchService.searchUsers(query).subscribe({
      next: (resp: any) => {
        filtered = resp.data.searchUser.map((user: UserSearch) => {
          return user;
        });
        this.filteredUsers = filtered.map((user: UserSearch) => {
          if (user.id == this.authService.getUserId()) {
            return {...user, completeName: `${user.name} ${user.lastName} - Yo`}
          } else {
            return {...user, completeName: `${user.name} ${user.lastName}`};
          }
        });
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subSearchUsers);
  }

  public searchUser(): void {
    this.searchFormValue = this.searchForm.value.pattern as UserSearch;
    
    let subSearchUser = this.searchService.searchUser(this.searchFormValue.id).subscribe({
      next: (_resp: any) => {
        this.recentSearchedUsers = [this.searchFormValue, ...this.recentSearchedUsers];
        this.router.navigate(['/psn/profile', this.searchFormValue.id]);
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subSearchUser);
  }

  ngOnDestroy() {
    this.subscriptionToDestroy.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
