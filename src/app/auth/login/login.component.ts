import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ILogin } from '@interface/security/ILogin';
import { SecurityService } from '@service/security.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  public form!: FormGroup;

  isProcessing = false;

  constructor(
    private fb: FormBuilder,
    private auth: SecurityService,
    private router: Router
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  send() {
    this.isProcessing = true;
    // this.router.navigate(['/tacama/home']);
    const { user, password } = this.form.value;

    const login: ILogin = {
      UserName: user,
      Password: password,
    };



    this.auth.login(login).subscribe(

      (res: any) => {
        this.router.navigate(['/tacama/home']);
      },
      (err: any) => {
        console.log('Error=>', err);
      }
    );
  }
}
