import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../../interfaces/login-form.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup; 
  public loginFormValue!: LoginForm; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public loginUser(): void {
    this.loginFormValue = this.loginForm.value as LoginForm;
    this.authService.loginUser( this.loginFormValue )
    .subscribe(
      {
        next: (_resp : any) => {
          Swal.fire('Success', 'Logged in successfully', 'success');
          this.router.navigate(['/psn']);
        }, 
        error: (err : any) => {
          Swal.fire('Error', err.toString(), 'error');
        }
      }
    ); 
  }
}
