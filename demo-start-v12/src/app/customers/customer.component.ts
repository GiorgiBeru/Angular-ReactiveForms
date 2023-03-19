import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup | undefined;
  customer = new Customer();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', [Validators.required]],
        },
        { validator: validateConfirmEmail }
      ),
      phone: [''],
      notification: 'email',
      rating: [null, validateRange(2, 5)],
      sendCatalog: true,
    });
  }
  save(): void {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm?.value));
  }
  testData() {
    this.customerForm?.patchValue({
      firstName: 'bla',
      lastName: 'blu',
      sendCatalog: false,
    });
    console.log(this.customerForm);
  }

  setNotificationType(notifyVia: string): void {
    const phoneControl = this.customerForm?.get('phone');
    if (notifyVia === 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      phoneControl?.clearValidators();
    }
    phoneControl?.updateValueAndValidity();
  }
}

function validateRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (!c.value || isNaN(c.value) || c.value < min || c.value > max) {
      return { rangeError: true };
    } else {
      return null;
    }
  };
}

function validateConfirmEmail(
  c: AbstractControl
): { [key: string]: boolean } | null {
  let email: AbstractControl | null = c.get('email');
  let confirmEmail: AbstractControl | null = c.get('confirmEmail');

  if (email === confirmEmail) {
    return null;
  } else {
    return { emailMatchError: true };
  }
}
