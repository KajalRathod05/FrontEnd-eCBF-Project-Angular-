import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-forgotpassword',
  standalone: false,
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  loginForm!: FormGroup;
  isLoading: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private fb: FormBuilder,
             private router:Router,
             private loginService: LoginService,
             private toastr: ToastrService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      newpassword: ['', [Validators.required]]
    });
  }

   onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.toastr.warning('Please enter valid login details.','Validation');
      return;
    }
    if (this.isLoading) {
      return;
    }
    const passwordData = this.loginForm.value;
    console.log('Password Request:', passwordData);
    
    if (passwordData.password !== passwordData.newpassword) {
      this.toastr.error(
        'Password and Confirm Password do not match.',
        'Invalid Password'
      );
      return;
    }

    this.isLoading = true;

    this.loginService.resetPassword(passwordData)
      .subscribe({
        next: (response: string) => {
          this.isLoading = false;

          this.toastr.success( response,'Success');
          this.loginForm.reset();
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: (error: HttpErrorResponse) => {

          this.isLoading = false;
          console.error('Password reset failed:',error);

          if (error.status == 404) {
            this.toastr.error(error.error );
          } 
          else if (error.status == 400) {
            this.toastr.error(error.error || 'Invalid password details.','Reset Password Failed');
          } 
          else if (error.status == 0) {
            this.toastr.error('Unable to connect to server. Please check your backend.','Connection Error');
          } 
          else {
             this.toastr.error('Something went wrong. Please try again.','Error');
          }
        }
      });       
 }

  login(){
     this.router.navigate(['/login']);
  }
} 
