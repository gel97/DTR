import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../../shared/services/alert.service';
import { catchError, map, Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
  ) {}

  users = signal<any>({
    data: [],
    isLoading: false,
  });

  isSubmitLoading = signal<boolean>(false);

  getUsers() {
    this.users.update((prev: any) => ({
      ...prev,
      isLoading: true,
    }));
    this.http.get('https://dummyjson.com/users').subscribe({
      next: (response: any) => {
        this.users.update((prev: any) => ({
          ...prev,
          data: response.users,
        }));
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
      complete: () => {
        this.users.update((prev: any) => ({
          ...prev,
          isLoading: false,
        }));
      },
    });
  }

  addUser(data: any): Observable<boolean> {
    this.isSubmitLoading.set(true);

    return this.http.post('https://dummyjson.com/users/add', data).pipe(
      map((newUser: any) => {
        this.isSubmitLoading.set(false);

        this.users.update((prev) => ({
          ...prev,
          data: [...prev.data, newUser],
        }));

        this.alertService.alertSuccess('User added successfully!');

        return true;
      }),
      catchError(() => {
        this.isSubmitLoading.set(false);
        this.alertService.alertError('Error: Something went wrong!');
        return of(false);
      }),
    );
  }

  updateUser(id: any, data: any): Observable<boolean> {
    this.isSubmitLoading.set(true);
    return this.http.put(`https://dummyjson.com/users/${id}`, data).pipe(
      map((updatedUser: any) => {
        this.isSubmitLoading.set(false);
        this.users.update((prev) => ({
          ...prev,
          data: prev.data.map((u: any) => (u.id === id ? { ...u, ...updatedUser } : u)),
        }));
        this.alertService.alertSuccess('User updated successfully!');
        return true;
      }),
      catchError((error: any) => {
        this.isSubmitLoading.set(false);
        this.alertService.alertError('Error: Something went wrong!');
        return of(false);
      }),
    );
  }

  deleteUser(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.isSubmitLoading.set(true);
        this.http.delete(`https://dummyjson.com/users/${id}`).subscribe({
          next: () => {
            this.isSubmitLoading.set(false);
            this.users.update((prev) => ({
              ...prev,
              data: prev.data.filter((user: any) => user.id !== id),
            }));
            Swal.fire('Deleted!', 'User has been deleted.', 'success');
          },
          error: (error) => {
            this.isSubmitLoading.set(false);
            Swal.fire('Error!', 'Failed to delete user.', 'error');
          },
        });
      }
    });
  }
}
