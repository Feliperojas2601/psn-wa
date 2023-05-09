import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SearchService } from '../../services/search.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit{
  public searchedUsers!: any[];
  public recentSearchedUsers!: any[]; 
  public suggestedUsers!: any[];
  public searchForm!: FormGroup; 
  public searchFormValue!: string; 

  constructor(
    private readonly searchService: SearchService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      searchParam: ['', [Validators.required]]
    });
    this.searchService.getAllSearchedUsers().subscribe({
      next: (resp: any) => {
        this.recentSearchedUsers = resp.data.findAllSearchedUsers.map((user: any) => {
          return user.Values[0].Props.id;
        });
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.searchService.getAllSuggestedUsers().subscribe({
      next: (resp: any) => {
        this.suggestedUsers = resp.data.findAllSuggestedFriends.map((user: any) => {
          return user.Values[0].Props.id;
        });
        console.log(this.suggestedUsers);
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
  }

  public deleteRecentSearchedUsers(): void {
    this.searchService.deleteRecentSearchedUsers().subscribe({
      next: (_resp: any) => {
        this.recentSearchedUsers = [];
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
  }

  public followUser(userId: number): void {
    this.searchService.followUser(userId).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'Requested follow successfully', 'success');
        this.ngOnInit();
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
  }

  public searchUser(): void {
    this.searchFormValue = this.searchForm.value.searchParam as string;
    this.searchService.searchUser(this.searchFormValue).subscribe({
      next: (resp: any) => {
        /* this.searchedUsers = resp.data.searchUsers.map((user: any) => {
          return user.Values[0].Props.id;
        });
        console.log(this.suggestedUsers);
        Values{
              Id
              ElementId
              Labels
              Props {
                id
              }
            }
            Keys
          } */
        this.recentSearchedUsers = [...this.recentSearchedUsers, this.searchFormValue];
        
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
  }
}
