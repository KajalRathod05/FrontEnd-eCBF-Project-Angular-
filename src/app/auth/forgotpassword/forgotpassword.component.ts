import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
        next: (response: any) => {
          this.isLoading = false;

          this.toastr.success( response.message,'Success');
          this.loginForm.reset();
          
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
        },
        error: (error) => {

          this.isLoading = false;
          console.error('Password reset failed:',error);
          const errorMessage = error.error?.message || error.error || 'Login Failed';
          this.toastr.error(errorMessage, 'Error');
        }
      });       
 }

  login(){
     this.router.navigate(['/login']);
  }
} 
