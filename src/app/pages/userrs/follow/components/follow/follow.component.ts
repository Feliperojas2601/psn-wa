import { UserSearch } from '../../../search/interfaces/userSearch.interface';
import { FollowService } from '../../services/follow.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  public subscriptionToDestroy: Subscription[] = [];

  public followedUsers!: UserSearch[];
  public requestFollowedUsers!: UserSearch[];
  public blockedUsers!: UserSearch[];

  constructor(
    private followService: FollowService,
  ) { }

  ngOnInit(): void {
    this.getFollowedUsers();
    this.getRequestFollowedUsers();
    this.getBlockedUsers();
  }

  public getFollowedUsers(): void {
    let subGetFollow = this.followService.getFollow().subscribe({
      next: (resp: any) => {
        this.followedUsers = resp.data.findAllFollowedUsers.map((user: UserSearch) => {
          return user;
        });
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetFollow);
  }

  public getRequestFollowedUsers(): void {
    let subGetRequestFollowedUsers = this.followService.getRequestFollowedUsers().subscribe({
      next: (resp: any) => {
        this.requestFollowedUsers = resp.data.findAllFollowRequests.map((user: UserSearch) => {
          return user;
        });
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetRequestFollowedUsers);
  }

  public getBlockedUsers(): void {
    let subGetBlockedUsers = this.followService.getBlockedUsers().subscribe({
      next: (resp: any) => {
        this.blockedUsers = resp.data.findAllBlockedUsers.map((user: UserSearch) => {
          return user;
        });
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetBlockedUsers);
  }

  public unblockUser(id: number): void {
    let subUnblockUser = this.followService.unblockUser(id).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'User unblocked', 'success');
        const previousBlockedUsers = this.blockedUsers;
        this.blockedUsers = previousBlockedUsers.filter((user: UserSearch) => user.id !== id);
        this.getFollowedUsers();
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subUnblockUser);
  }

  public unFollowUser(id: number): void {
    let subUnFollowUser = this.followService.unFollowUser(id).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'User unfollowed', 'success');
        const previousFollowedUsers = this.followedUsers;
        this.followedUsers = previousFollowedUsers.filter((user: UserSearch) => user.id !== id);
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subUnFollowUser);
  }

  public acceptFollowRequest(id: number): void {
    let subAcceptFollowUser = this.followService.acceptFollowUser(id).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'Follow request accepted', 'success');
        const previousRequestFollowedUsers = this.requestFollowedUsers;
        this.requestFollowedUsers = previousRequestFollowedUsers.filter((user: UserSearch) => user.id !== id);
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subAcceptFollowUser);
  }

  public rejectFollowRequest(id: number): void {
    let subRejectFollowUser = this.followService.rejectFollowUser(id).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'Follow request rejected', 'success');
        const previousRequestFollowedUsers = this.requestFollowedUsers;
        this.requestFollowedUsers = previousRequestFollowedUsers.filter((user: UserSearch) => user.id !== id);
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subRejectFollowUser);
  }

  ngOnDestroy() {
    this.subscriptionToDestroy.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
