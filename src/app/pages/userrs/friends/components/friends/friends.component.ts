import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../../services/friends.service';
import Swal from 'sweetalert2';
import { ConversationService } from 'src/app/pages/chat/conversation/services/conversation.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

    public followedUsers!: any[];
    public requestFollowedUsers!: any[];
    public blockedUsers!: any[];

    constructor(
      private friendsService: FriendsService,
      private coversationService: ConversationService,
      private router: Router,
    ) { }

    ngOnInit(): void {
      this.friendsService.getFriends().subscribe({
        next: (resp: any) => {
          console.log(resp);
          this.followedUsers = resp.data.findAllFollowedUsers.map((user: any) => {
            return user.Values[0].Props.id;
          });
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }); 
      this.friendsService.getRequestFollowedUsers().subscribe({
        next: (resp: any) => {
          this.requestFollowedUsers = resp.data.findAllFollowRequests.map((user: any) => {
            return user.Values[0].Props.id;
          });
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
      this.friendsService.getBlockedUsers().subscribe({
        next: (resp: any) => {
          this.blockedUsers = resp.data.findAllBlockedUsers.map((user: any) => {
            return user.Values[0].Props.id;
          });
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public blockUser(id: number): void {
      this.friendsService.blockUser(id).subscribe({
        next: (resp: any) => {
          Swal.fire('Success', 'User blocked', 'success');
          const previousFollowedUsers = this.followedUsers;
          this.followedUsers = previousFollowedUsers.filter((user: any) => user !== id);
          this.blockedUsers = [...this.blockedUsers, id];
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public unblockUser(id: number): void {
      this.friendsService.unblockUser(id).subscribe({
        next: (resp: any) => {
          Swal.fire('Success', 'User unblocked', 'success');
          const previousBlockedUsers = this.blockedUsers;
          this.blockedUsers = previousBlockedUsers.filter((user: any) => user !== id);
          this.followedUsers = [...this.followedUsers, id];
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public unFollowUser(id: number): void {
      this.friendsService.unFollowUser(id).subscribe({
        next: (resp: any) => {
          Swal.fire('Success', 'User unfollowed', 'success');
          const previousFollowedUsers = this.followedUsers;
          this.followedUsers = previousFollowedUsers.filter((user: any) => user !== id);
        },
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public acceptFollowRequest(id: number): void {
      this.friendsService.acceptFollowUser(id).subscribe({
        next: (resp: any) => {
          Swal.fire('Success', 'Follow request accepted', 'success');
          const previousRequestFollowedUsers = this.requestFollowedUsers;
          this.requestFollowedUsers = previousRequestFollowedUsers.filter((user: any) => user !== id);
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public rejectFollowRequest(id: number): void {
      this.friendsService.rejectFollowUser(id).subscribe({
        next: (resp: any) => {
          Swal.fire('Success', 'Follow request rejected', 'success');
          const previousRequestFollowedUsers = this.requestFollowedUsers;
          this.requestFollowedUsers = previousRequestFollowedUsers.filter((user: any) => user !== id);
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

    public createConversation(id: number): void {
      this.coversationService.createConversation(id).subscribe({
        next: (resp: any) => {
          Swal.fire('Success', 'Conversation created', 'success');
          this.router.navigate([`psn/chat`]);
        }, 
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      });
    }

}
