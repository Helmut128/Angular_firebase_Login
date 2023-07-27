import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCodeErrorService {
  constructor() {}

  codeError(code: string) {
    switch (code) {
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';

      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil';

      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo Invalido';

      case FirebaseCodeErrorEnum.WorngPassword:
        return 'Contraseña incorrecta';

      case FirebaseCodeErrorEnum.UserNotFound:
        return 'Usuario no existe';

      default:
        return 'Error desconocido';
    }
  }
}
