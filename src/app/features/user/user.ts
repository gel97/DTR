import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Table, TableColumn } from '../../shared/components/table/table';
import { UserDialog } from './components/user-dialog/user-dialog';
import { UserService } from './user.service';
import { Card } from "../../shared/components/card/card";

@Component({
  selector: 'app-user',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    Table,
    Card
],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
  userService = inject(UserService);
  readonly dialog = inject(MatDialog);

  isAdd: boolean = true;

  columns: TableColumn[] = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'company.name', label: 'Company' },
    {
      key: 'actions',
      label: 'Actions',
      type: 'actions',
      actions: [
        { label: 'Edit', icon: 'edit', action: 'edit', color: 'primary' },
        { label: 'Delete', icon: 'delete', action: 'delete', color: 'warn' },
      ],
    },
  ];

  users = this.userService.users;
  searchTerm = signal('');

  ngOnInit(): void {
    this.getUsers();
  }

  filteredUsers = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.users().data.filter(
      (user:any) =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
    );
  });

  getUsers(){
    this.userService.getUsers();
  }

  openUserDialog(userData?: any): void {
    const dialogRef = this.dialog.open(UserDialog, {
      data: {
        isAdd: this.isAdd,
        userData: userData,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }

  onHandleAction(e: any) {
    if (e.action === 'edit') {
      this.isAdd = false;
      this.openUserDialog(e.row);
    }

    if (e.action === 'delete') {
      this.userService.deleteUser(e.row.id);
    }
  }
}
