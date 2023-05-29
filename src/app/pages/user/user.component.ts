import { ConversationService } from 'src/app/pages/chat/conversation/services/conversation.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FollowService } from '../userrs/follow/services/follow.service';
import { SearchService } from '../userrs/search/services/search.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Relationship } from './interfaces/relationship-interface';
import { ProfileForm } from './interfaces/profile-form.interface';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from './services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User} from './models/user.model'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit, OnDestroy{

  public subscriptionToDestroy: Subscription[] = [];
  public profileTypeOptions: { label: string, value: string }[];

  public displayButtons!: boolean;
  public showFollowUserButton!: boolean;
  public showUnFollowUserButton!: boolean;
  public showBlockUserButton!: boolean;
  public showUnblockUserButton!: boolean;
  public showButtonSubmit!: boolean;
  public showButtons!: boolean;
  public profileForm!: FormGroup;
  public profileFormValue!: ProfileForm;
  public profileImageUrlPost!: string;
  public profileImageUrl!: string;
  public user!: User;
  public id!: number;

  constructor(
    private coversationService: ConversationService,
    private activatedRoute: ActivatedRoute,
    private followService: FollowService,
    private searchService: SearchService,
    private userService: UserService, 
    private authService: AuthService,
    private fb: FormBuilder, 
    private router: Router,
  ) {
    this.profileImageUrl = '../../assets/images/logo.jpg';
    this.displayButtons = false;
    this.showFollowUserButton = false;
    this.showUnFollowUserButton = false;
    this.showBlockUserButton = false;
    this.showUnblockUserButton = false;
    this.profileTypeOptions = [
      { label: 'PUBLIC', value: 'PUBLIC' },
      { label: 'PRIVATE', value: 'PRIVATE' },
    ];
   }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      role: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      notificationsEnable: [true],
      profileUpdateDate: ['', Validators.required],
      profileType: ['PUBLIC', Validators.required],
    });

    this.activatedRoute.params.subscribe( ({ id }) => {
      this.id = Math.floor(id);
      this.loadProfilePicture(this.id);
      this.loadUserInfo(this.id);
      this.getRelationsToUser(this.id);

      if(this.authService.getUserId() != this.id){
        this.showButtons = this.showButtonSubmit = false;
        let emailFormControl = this.profileForm.get('email');
        let nameFormControl = this.profileForm.get('name');
        let lastNameFormControl = this.profileForm.get('lastName');
        let phoneNumberFormControl = this.profileForm.get('phoneNumber');
        let profileTypeFormControl = this.profileForm.get('profileType');
        let notificationsEnableFormControl = this.profileForm.get('notificationsEnable');
  
        notificationsEnableFormControl?.disable();
        profileTypeFormControl?.disable();
        phoneNumberFormControl?.disable();
        lastNameFormControl?.disable();
        nameFormControl?.disable();
        emailFormControl?.disable();
      }else{
        this.showButtons = this.showButtonSubmit = true; 
      }

    });

    let roleFormControl = this.profileForm.get('role');
    let profileUpdateDateFormControl = this.profileForm.get('profileUpdateDate');
    profileUpdateDateFormControl?.disable();
    roleFormControl?.disable();

  }

  private loadUserInfo(id: number): void {
    let subFindUserById = this.userService.findUserById(id).subscribe({
      next: (resp: any) => {
        this.user = resp.data.findUserById;
        this.profileForm.setValue({
          role: this.user.role,
          email: this.user.email,
          name: this.user.name,
          lastName: this.user.lastName,
          phoneNumber: this.user.phoneNumber,
          notificationsEnable: this.user.notificationsEnable,
          profileUpdateDate: this.user.profileUpdateDate,
          profileType: this.user.profileType
        });
      }, 
      error: (err: any) => {
        Swal.fire('Error', err.toString(), 'error')
        this.router.navigateByUrl("/psn/userrs/search")
      }
    });
    this.subscriptionToDestroy.push(subFindUserById);
  }

  private loadProfilePicture(id: number): void {
    let subGetProfilePicture = this.userService.getProfilePicture([id]).subscribe({
      next: (resp: any) => {
        this.profileImageUrl = resp.data.getProfilePicture;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetProfilePicture);
  }
  
  private getRelationsToUser(id: number): void {
    let subGetRelationsToUser = this.userService.getRelationsToUser(id).subscribe({
      next: (resp: any) => {
        let relations = resp.data.getRelationsToUser;
        const existFollow = relations.find((relation: Relationship) => relation.name == "FOLLOW");
        if(existFollow){
          this.showUnFollowUserButton = true;
        }else{
          this.showFollowUserButton = true;
        }

        const existBlock = relations.find((relation: Relationship) => relation.name == "BLOCK");
        if(existBlock){
          this.showUnblockUserButton = true;
        }else{
          this.showBlockUserButton = true;
        }

      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subGetRelationsToUser);
  }

  public createConversation(id: number): void {
    let subCreateConversation = this.coversationService.createConversation(id).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'Conversation created', 'success');
        this.router.navigate([`psn/chat`]);
      }, 
      error: (err: any) => {
        if(err.toString() == "ApolloError: Previous conversation with those members already exists"){
          this.router.navigateByUrl("/psn/chat")
        }else{
          Swal.fire('Error', err.toString(), 'error')
        }
      }
    });
    this.subscriptionToDestroy.push(subCreateConversation);
  }

  public followUser(userId: number): void {
    let subFollowUser = this.searchService.followUser(userId).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'Requested follow successfully', 'success');
        this.showFollowUserButton = false;
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subFollowUser);
  }

  public unFollowUser(id: number): void {
    let subUnFollowUser = this.followService.unFollowUser(id).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'User unfollowed', 'success');
        this.showUnFollowUserButton = false;
        this.showFollowUserButton = true;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subUnFollowUser);
  }

  public blockUser(id: number): void {
    let subBlockUser = this.followService.blockUser(id).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'User blocked', 'success');
        this.router.navigateByUrl("/psn/userrs/follow");
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subBlockUser);
  }

  public unblockUser(id: number): void {
    let subUnblockUser = this.followService.unblockUser(id).subscribe({
      next: (_resp: any) => {
        Swal.fire('Success', 'User unblocked', 'success');
        this.showUnblockUserButton = false;
        this.showBlockUserButton = true;
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
    this.subscriptionToDestroy.push(subUnblockUser);
  }

  public changeProfileImage(): void {
    let subChangeProfilePicture = this.userService.changeProfilePicture().subscribe({
      next: (resp: any) => {
        this.profileImageUrlPost = resp.data.changeProfilePicture;
        this.displayButtons = true;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );
    this.subscriptionToDestroy.push(subChangeProfilePicture);
  }

  public updateProfile(): void {
    this.profileFormValue = this.profileForm.value as ProfileForm;
    let subEditUserById = this.userService.editUserById(this.id, this.profileFormValue).subscribe({
      next: (_resp: any) => {
        Swal.fire('Éxito', "Datos guardados con éxito", 'success')
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );
    this.subscriptionToDestroy.push(subEditUserById);
  }

  public handleUpload(): void {
    this.displayButtons = false;
    Swal.fire('Éxito', "Datos guardados con éxito", 'success'); 
    window.location.reload(); 
  }

  ngOnDestroy() {
    this.subscriptionToDestroy.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
