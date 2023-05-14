import { RegisterForm } from '../../interfaces/register-form.interface';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup; 
  public registerFormValue!: RegisterForm; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public registerUser(): void {
    this.registerFormValue = this.registerForm.value as RegisterForm;;
    this.authService.registerUser( this.registerFormValue )
    .subscribe(
      {
        next: (_resp : any) => {
          Swal.fire('Success', 'Registered successfully, check your mail', 'success');
          this.router.navigate(['/login'])
        },
        error: (err : any) => Swal.fire('Error', err.toString(), 'error')
      }
    ); 
  }
}
