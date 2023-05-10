import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileForm } from './profile-form.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit{

  public profileForm!: FormGroup; 
  public profileFormValue!: ProfileForm; 
  profileImageUrl: string = 'https://ruta';

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      role: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      notificationsEnable: [true],
      profileUpdateDate: ['', Validators.required],
      profileType: ['', Validators.required],
    });
  }

  public changeProfileImage(): void {
    console.log("THIS");
  }

  public updateProfile(): void {
    this.profileFormValue = this.profileForm.value as ProfileForm;
    console.log("UWUWUWUUWUWUWU");
  }

}
