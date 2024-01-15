import { AbstractControl } from '@angular/forms';

export const passwordMatchValidator = (group: AbstractControl) => {
  if (
    group.value.password === group.value.confirmPassword &&
    group.value.password.length > 0
  ) {
    return null;
  } else {
    return { doPasswordsMatch: false };
  }
};
