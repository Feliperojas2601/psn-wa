import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { UserService } from './services/user.service';
import { ProfileForm } from './interfaces/profile-form.interface';
import { ActivatedRoute } from '@angular/router';
import { User} from './models/user.model'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit{

  public profileTypeOptions: { label: string, value: string }[];
  public profileFormValue!: ProfileForm;
  public displayImageUploadDialog!: boolean;
  public showButtonSubmit!: boolean;
  public showButtonImage!: boolean;
  public profileImageUrlPost!: string;
  public profileImageUrl!: string;
  public profileForm!: FormGroup;
  public user!: User;
  public id!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService, 
    private authService: AuthService,
    private fb: FormBuilder, 
    private router: Router,
  ) {
    this.profileImageUrl = '../../assets/images/logo.jpg';
    this.displayImageUploadDialog = false;
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
    let roleFormControl = this.profileForm.get('role');
    let profileUpdateDateFormControl = this.profileForm.get('profileUpdateDate');
    if (roleFormControl != null && profileUpdateDateFormControl != null){
      roleFormControl.disable();
      profileUpdateDateFormControl.disable();
    }
    
    this.activatedRoute.params.subscribe( ({ id }) => {
      this.id = Math.floor(id);
    });

    this.showButtonImage = this.showButtonSubmit = this.authService.getUserId() == this.id;
    this.loadProfilePicture(this.id, false);
    this.loadUserInfo(this.id);

  }

  private loadUserInfo(id: number): void {
    this.userService.findUserById(id).subscribe({
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
        error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );
  }

  private loadProfilePicture(id: number, reload: boolean): void {
    this.userService.getProfilePicture(id).subscribe({
      next: (resp: any) => {
        this.profileImageUrl = resp.data.getProfilePicture;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
    });
  }
  

  public changeProfileImage(): void {
    this.userService.changeProfilePicture().subscribe({
      next: (resp: any) => {
        this.profileImageUrlPost = resp.data.changeProfilePicture;
        this.displayImageUploadDialog = true;
      },
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );
  }

  public handleUpload(): void {
    this.displayImageUploadDialog = false;
    this.loadProfilePicture(this.id, true);
    Swal.fire('Éxito', "Datos guardados con éxito", 'success'); 
    window.location.reload(); 
  }

  public updateProfile(): void {
    this.profileFormValue = this.profileForm.value as ProfileForm;
    this.userService.editUserById(this.id, this.profileFormValue).subscribe({
      next: (_resp: any) => {
        Swal.fire('Éxito', "Datos guardados con éxito", 'success')
      }, 
      error: (err: any) => Swal.fire('Error', err.toString(), 'error')
      }
    );
  }
}
