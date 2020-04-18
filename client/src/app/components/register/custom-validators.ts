import { FormGroup, ValidationErrors, ValidatorFn, AsyncValidator, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'


export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');
  return passwordConfirm.value && (password.value !== passwordConfirm.value) ? { 'misMatch' : true } : null;
};


@Injectable({ providedIn: 'root' })
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}
  
  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.resiterFirstStep(ctrl.value).pipe(
      map((isTaken: any) => (isTaken.message.includes('exists') ? { uniqueUserName: true } : null)),
      catchError(() => of(null))
    );
  }
};