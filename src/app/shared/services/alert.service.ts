import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root',
})

export class AlertService {

  alertSuccess(title:string){
    Swal.fire({
      position: "center",
      icon: "success",
      customClass: {
        container: 'my-swal'
      },
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  alertError(title:string){
    Swal.fire({
      position: "top-end",
      icon: "error",
      customClass: {
        container: 'my-swal'
      },
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  }

}
