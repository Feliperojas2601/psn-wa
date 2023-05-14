import { VerifyTokenForm } from '../../interfaces/verify-token-form.interface';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.css'], 
  encapsulation: ViewEncapsulation.None
})
export class VerifyTokenComponent implements OnInit {

  public verifyTokenForm!: FormGroup;
  public id!: number; 
  public token!: string;
  public verifyTokenFormValue!: VerifyTokenForm; 

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ token, id }) => {
      this.token = token; 
      this.id = parseInt(id);  
    });



    this.verifyTokenForm = this.fb.group({
      id: [this.id],
      token: [this.token, Validators.required],
    });
  }

  public verifyToken(): void {
    this.verifyTokenFormValue = this.verifyTokenForm.value as VerifyTokenForm;
    this.authService.verifyToken( this.verifyTokenFormValue )
    .subscribe(
      {
        next: (_resp : any) => {
          Swal.fire('Success', 'Token verified successfully', 'success');
          this.router.navigate(['/login']);
        }, 
        error: (err : any) => Swal.fire('Error', err.toString(), 'error')
      }
    ); 
  }

}
