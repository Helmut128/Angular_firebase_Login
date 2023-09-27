import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';

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

  loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    return this.auth.signInWithPopup(provider);
  }

  loginWithGitHub() {
    const provider = new GithubAuthProvider();
    return this.auth.signInWithPopup(provider);
  }

  getUserLogged() {
    return this.auth.authState;
  }
}
