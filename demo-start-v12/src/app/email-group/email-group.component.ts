import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-email-group',
  templateUrl: './email-group.component.html',
  styleUrls: ['./email-group.component.css'],
})
export class EmailGroupComponent {
  @Input() emailForm: FormGroup | undefined;
  constructor(private fb: FormBuilder) {}
}
