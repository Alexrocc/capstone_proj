import { AbstractControl, FormControl } from '@angular/forms';

export const termsValidator = (input: AbstractControl<FormControl>) => {
  if (input.value) {
    return null;
  } else {
    return { agreedToTerms: false };
  }
};
