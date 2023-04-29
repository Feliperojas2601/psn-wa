import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordForm!: FormGroup; 
  public resetPasswordFormValue!: string; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  public requestResetPassword(): void {
    this.resetPasswordFormValue = this.resetPasswordForm.value as string;
    this.authService.requestResetPassword( this.resetPasswordFormValue )
    .subscribe(
      {
        next: (_resp : any) => this.router.navigate(['/login']), 
        error: (err : any) => Swal.fire('Error', err.error.msg, 'error' )
      }
    ); 
  }

}
