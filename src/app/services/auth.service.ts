import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: AngularFireAuth) {}

  //Login con Google
  loginWithGoogle() {
    const provider = new GoogleAuthProvider(); // Updated usage
    return this.auth.signInWithPopup(provider);
  }
}
