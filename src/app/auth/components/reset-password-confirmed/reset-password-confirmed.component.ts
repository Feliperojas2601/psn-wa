import { ResetPasswordConfirmedForm } from '../../interfaces/reset-password-confirmed-form.interface';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password-confirmed',
  templateUrl: './reset-password-confirmed.component.html',
  styleUrls: ['./reset-password-confirmed.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class ResetPasswordConfirmedComponent implements OnInit {

  public resetPasswordConfirmedForm!: FormGroup; 
  public resetPasswordConfirmedValue!: ResetPasswordConfirmedForm; 
  public code!: string;
  public id!: number; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe( ({ code, id }) => {
        this.code = code; 
        this.id = parseInt(id);  
      });
      this.resetPasswordConfirmedForm = this.fb.group({
        id: [this.id],
        code: [this.code, Validators.required],
        newPassword: ['', Validators.required]
      });
   }

  public resetPassword(): void {
    this.resetPasswordConfirmedValue = this.resetPasswordConfirmedForm.value as ResetPasswordConfirmedForm;;
    this.authService.resetPassword( this.resetPasswordConfirmedValue )
    .subscribe(
      {
        next: (_resp : any) => {
          Swal.fire('Success', 'Password reset successfully', 'success');
          this.router.navigate(['/login']);
        }, 
        error: (err : any) => Swal.fire('Error', err.toString(), 'error')
      }
    ); 
  }
}
