import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//importando el servicio de auth service
import { AuthService } from 'src/app/services/auth.service';

//injección de servicios
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginUsuario: FormGroup;
  loading: boolean = false;

  //Abrir googleLogin
  OnGoogleLogin() {
    // Proporcionar feedback al usuario, como un spinner de carga.
    this.authService
      .loginWithGoogle()
      .then(() => {
        // Autenticación exitosa, realizar acciones adicionales si es necesario.
        console.log('Autenticación exitosa');
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        // Manejar errores y proporcionar feedback al usuario.
        console.error('Error al iniciar sesión con Google:', error);
        // Puedes mostrar un mensaje de error al usuario aquí si es necesario.
      });
  }

  //Abrir FacebookLogin

  onFacebookLogin() {
    this.authService
      .loginWithFacebook()
      .then(() => {
        //Autentificación exitosa, realizar acciones adicionales si es necesario.
        console.log('Autenticación exitosa');
        this.router.navigate(['/dashboard']);
      })
      .catch((error) => {
        // Manejar errores y proporcionar feedback al usuario.
        console.error('Error al iniciar sesión con Google:', error);
        // Puedes mostrar un mensaje de error al usuario aquí si es necesario.
      });
  }

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;

    this.loading = true;
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user.user?.emailVerified) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/verificar-correo']);
        }
      })
      .catch((error) => {
        this.loading = false;
        this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
      });
  }
}