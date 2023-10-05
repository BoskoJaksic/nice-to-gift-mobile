import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent  implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() inputType: string = '';
  @Input() formControlName: string = '';
  @Input() additionalClass: string = '';
  @Input() placeholder: string = '';
  value: any = '';

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any) {
    this.value = value;
  }

  oninputChange(e: any): void {
    this.value =  e.target.value;
    this.onChange(this.value);
  }
  markAsTouched(e:any): void {
    this.registerOnTouched(e);
  }
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  protected readonly oninput = oninput;
}
