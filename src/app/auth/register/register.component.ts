import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordMatchValidator } from 'src/app/validators/passwordMatch.validator';
import { termsValidator } from 'src/app/validators/terms.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerData = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
        ),
      ]),
      passwordConfirm: new FormControl('', Validators.required),
      terms: new FormControl(false, termsValidator),
    },
    passwordMatchValidator
  );

  constructor(private authSrv: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    if (this.registerData.status === 'VALID') {
      this.authSrv.register(this.registerData.value).subscribe();
    } else {
      console.log(new Error());
    }
  }
}
