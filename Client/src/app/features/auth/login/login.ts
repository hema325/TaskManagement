import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, finalize, first, of, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoadingButton } from "../../../shared/components/loading-button/loading-button";

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [
    ReactiveFormsModule,
    LoadingButton
],
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);
  private readonly activatedRoute = inject(ActivatedRoute);

  protected readonly form = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  get userName() {
    return this.form.controls.userName;
  }

  get password() {
    return this.form.controls.password;
  }

  protected submitting = signal(false);

  login() {

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.auth.login(this.form.value)
    .pipe(
      first(),
      finalize(() => this.submitting.set(false))
    )
    .subscribe(res => {
      if(res.isSuccess) {
        this.toastr.success('Logged in successfully!');
        
        const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
        this.router.navigateByUrl(returnUrl ? returnUrl : '/');
      }
    });
  }

}
