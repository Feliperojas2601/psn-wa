import { Component, OnInit } from '@angular/core';
import { FollowService } from '../../services/follow.service';
import { ConversationService } from 'src/app/pages/chat/conversation/services/conversation.service';
import { UserSearch } from '../../../search/interfaces/userSearch.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

    public followedUsers!: UserSearch[];
    public requestFollowedUsers!: UserSearch[];
    public blockedUsers!: UserSearch[];

    constructor(
      private followService: FollowService,
      private coversationService: ConversationService,
      private router: Router,
    ) { }

    ngOnInit(): void {
      this.followService.getFollow().subscribe({
        next: (resp: any) => {
          this.followedUsers = resp.data.findAllFollowedUsers.map((user: UserSearch) => {
            return user;
          });
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }); 
      this.followService.getRequestFollowedUsers().subscribe({
        next: (resp: any) => {
          this.requestFollowedUsers = resp.data.findAllFollowRequests.map((user: UserSearch) => {
            return user;
          });
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
      this.followService.getBlockedUsers().subscribe({
        next: (resp: any) => {
          this.blockedUsers = resp.data.findAllBlockedUsers.map((user: UserSearch) => {
            return user;
          });
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public blockUser(id: number): void {
      this.followService.blockUser(id).subscribe({
        next: (_resp: any) => {
          Swal.fire('Success', 'User blocked', 'success');
          const previousFollowedUsers = this.followedUsers;
          const user: UserSearch = previousFollowedUsers.find((user: UserSearch) => user.id === id) || {
            id: 0,
            name: '',
            lastName: '',
            email: '',
            completeName: '',
          };
          this.followedUsers = previousFollowedUsers.filter((user: UserSearch) => user.id !== id);
          this.blockedUsers = [...this.blockedUsers, user];
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public unblockUser(id: number): void {
      this.followService.unblockUser(id).subscribe({
        next: (_resp: any) => {
          Swal.fire('Success', 'User unblocked', 'success');
          const previousBlockedUsers = this.blockedUsers;
          const user: UserSearch = previousBlockedUsers.find((user: UserSearch) => user.id === id) || {
            id: 0,
            name: '',
            lastName: '',
            email: '',
            completeName: '',
          };
          this.blockedUsers = previousBlockedUsers.filter((user: UserSearch) => user.id !== id);
          this.followedUsers = [...this.followedUsers, user];
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public unFollowUser(id: number): void {
      this.followService.unFollowUser(id).subscribe({
        next: (_resp: any) => {
          Swal.fire('Success', 'User unfollowed', 'success');
          const previousFollowedUsers = this.followedUsers;
          this.followedUsers = previousFollowedUsers.filter((user: UserSearch) => user.id !== id);
        },
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public acceptFollowRequest(id: number): void {
      this.followService.acceptFollowUser(id).subscribe({
        next: (_resp: any) => {
          Swal.fire('Success', 'Follow request accepted', 'success');
          const previousRequestFollowedUsers = this.requestFollowedUsers;
          this.requestFollowedUsers = previousRequestFollowedUsers.filter((user: UserSearch) => user.id !== id);
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public rejectFollowRequest(id: number): void {
      this.followService.rejectFollowUser(id).subscribe({
        next: (_resp: any) => {
          Swal.fire('Success', 'Follow request rejected', 'success');
          const previousRequestFollowedUsers = this.requestFollowedUsers;
          this.requestFollowedUsers = previousRequestFollowedUsers.filter((user: UserSearch) => user.id !== id);
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public createConversation(id: number): void {
      this.coversationService.createConversation(id).subscribe({
        next: (_resp: any) => {
          Swal.fire('Success', 'Conversation created', 'success');
          this.router.navigate([`psn/chat`]);
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

}
