import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ConversationService } from 'src/app/pages/chat/conversation/services/conversation.service';
import { FollowService } from '../../../follow/services/follow.service';
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

  public filteredUsers!: UserSearch [];
  public recentSearchedUsers!: UserSearch[]; 
  public suggestedUsers!: UserSearch[];
  public suggestedFilteredUsers!: UserSearch[];
  public searchForm!: FormGroup; 
  public searchFormValue!: UserSearch; 

  constructor(
    private readonly searchService: SearchService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private coversationService: ConversationService,
    private followService: FollowService,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      pattern: ['', [Validators.required]]
    });

    let subscriptionSearchAll = this.searchService.getAllSearchedUsers().subscribe({
      next: (resp: any) => {
        this.recentSearchedUsers = resp.data.findAllSearchedUsers.map((user: UserSearch) => {
          return user;
        });
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });

    let subscriptionSuggested = this.searchService.getAllSuggestedUsers().subscribe({
      next: (resp: any) => {
        this.suggestedUsers = resp.data.findAllSuggestedFriends.map((user: UserSearch) => {
          return user; 
        });
      }, 
      error: (err: any) => {
        if (err.toString() === "ApolloError: Cannot read property 'Props' of null") {
          this.suggestedUsers = [];
        } else {
          Swal.fire('Error', err.toString(), 'error')
        }
      }
    });

    this.subscriptionToDestroy.push(subscriptionSearchAll);
    this.subscriptionToDestroy.push(subscriptionSuggested);
  }

  public deleteRecentSearchedUsers(): void {
    let subscriptionDeleteSearch = this.searchService.deleteRecentSearchedUsers().subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'Recent searched users deleted successfully', 'success');
        this.recentSearchedUsers = [];
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });

    this.subscriptionToDestroy.push(subscriptionDeleteSearch);    
  }

  public followUser(userId: number): void {
    let subscriptionFollow = this.searchService.followUser(userId).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'Requested follow successfully', 'success');
        this.suggestedUsers = this.suggestedUsers.filter((user: UserSearch) => user.id !== userId);
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });

    this.subscriptionToDestroy.push(subscriptionFollow);
  }

  public filterUser(event: any): void {
    let filtered: UserSearch[] = [];
    let query = event.query;

    let subscriptionSearchUsers = this.searchService.searchUsers(query).subscribe({
      next: (resp: any) => {
        filtered = resp.data.searchUser.map((user: UserSearch) => {
          return user;
        });
        this.filteredUsers = filtered.map((user: UserSearch) => {
          if (user.id == this.authService.getUserId()) {
            return {
              ...user,
              completeName: `${user.name} ${user.lastName} - Yo`
            }
          } else {
            return {
              ...user, 
              completeName: `${user.name} ${user.lastName}`
            };
          }
        });
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });

    this.subscriptionToDestroy.push(subscriptionSearchUsers);
  }

  public searchUser(): void {
    this.searchFormValue = this.searchForm.value.pattern as UserSearch;
    
    let subscriptionUser = this.searchService.searchUser(this.searchFormValue.id).subscribe({
      next: (_resp: any) => {
        this.recentSearchedUsers = [this.searchFormValue, ...this.recentSearchedUsers];
        this.router.navigate(['/psn/profile', this.searchFormValue.id]);
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });

    this.subscriptionToDestroy.push(subscriptionUser);
  }

  public createConversation(id: number): void {
    let subscriptionCreateConversation = this.coversationService.createConversation(id).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'Conversation created', 'success');
        this.router.navigate([`psn/chat`]);
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });

    this.subscriptionToDestroy.push(subscriptionCreateConversation);
  }

  public blockUser(id: number): void {
    let subscriptionBlockUser = this.followService.blockUser(id).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'User blocked', 'success');
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });

    this.subscriptionToDestroy.push(subscriptionBlockUser);
  }

  ngOnDestroy() {
    this.subscriptionToDestroy.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
