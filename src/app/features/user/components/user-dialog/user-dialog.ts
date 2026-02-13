import { AfterViewInit, Component, inject, model } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InputField } from "../../../../shared/components/input-field/input-field";
import { UserService } from "../../user.service";

@Component({
  selector: 'app-user-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    InputField,
    MatProgressSpinnerModule
],
  templateUrl: './user-dialog.html',
  styleUrl: './user-dialog.css',
})
export class UserDialog implements AfterViewInit{
  readonly dialogRef = inject(MatDialogRef<UserDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);

  userService = inject(UserService);

  userForm = new FormGroup({
    id: new FormControl('',),
    firstName: new FormControl('',[
      Validators.required,
      Validators.minLength(3)]),
    lastName: new FormControl('',[
      Validators.required,
      Validators.minLength(3)]),
    email: new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    company: new FormGroup({
      name: new FormControl('', [
        Validators.required
      ])
  })

  });

  ngAfterViewInit(): void {
    if(!this.data.isAdd) {
      this.userForm.patchValue(this.data.userData);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.userForm.valid) {
      if(this.data.isAdd) {
        this.userService.addUser(this.userForm.value).subscribe((success: any) => {
          if (success) {
            this.dialogRef.close(this.userForm.value);
            console.log('API success');
          } else {
            console.error('API Failed');
          } });
      } else {
        this.userService.updateUser(this.userForm.value.id, this.userForm.value).subscribe((success: any) => {
          if (success) {
            this.dialogRef.close(this.userForm.value);
            console.log('API success');
          } else {
            console.error('API Failed');
          }});
        console.log('Edit user logic not implemented yet');
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
