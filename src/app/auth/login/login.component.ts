import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
  isLoading: boolean = false;
  isRegisterMode = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private fb: FormBuilder,
             private router:Router,
             private loginService: LoginService,
             private toastr: ToastrService) {}

  ngOnInit() {

    this.loginForm = this.fb.group({
      username: ['',[Validators.required]],
      //email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }

   toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.loginForm.reset();
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

    if (this.isRegisterMode) {
      this.registerUser();
    } else {
      this.loginUser();
    }      
 }

 registerUser() {
  this.isLoading = true;
  const registerData = this.loginForm.value;
  console.log('Register Request:', registerData);
  this.loginService.registerUser(registerData)
    .subscribe({
      next: (response: string) => {
        this.toastr.success(response,'Success' );
        this.isRegisterMode = false;
        this.isLoading = false;
        this.loginForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error, 'Registration Failed');
      }
     });
}

loginUser() {
    this.isLoading = true;
    //const email = this.loginForm.value.email;
    const username = this.loginForm.value.username;
   
    const loginData = this.loginForm.value;
    console.log('Login Request:', loginData);

    this.loginService.userLogin(loginData)
      .subscribe({
        next: (response) => {
          console.log('Login response:', "ok");
          this.isLoading = false;

          this.toastr.success("Login Success!",'Success');
          //sessionStorage.setItem('email', email);
          //sessionStorage.setItem('userid', response.userid.toString());
          //console.log('jwt:::',response.jwt);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('token', response.jwt);
          this.router.navigate(['/pages/dashboard']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Login failed:', error);

          this.isLoading = false;
          if (error.status == 401) {
            this.toastr.error(error.error ,'Login Failed');
          }
          if (error.status == 400) {
            this.toastr.error('Invalid Credentials' ,'Login Failed');
          }
          else if (error.status == 0) {
            this.toastr.error('Unable to connect to server. Please check your backend.', 'Connection Error');
          }
          else {
            this.toastr.error( 'Something went wrong. Please try again.','Error');
          } 
        }
      });
 }

 forgotPassword(){
   this.router.navigate(['/login/forgotpass']);
 }

}
