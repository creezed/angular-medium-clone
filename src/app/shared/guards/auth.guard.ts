import { Injectable } from '@angular/core'
import { AuthService } from '../../auth/services/auth.service'
import { Router } from '@angular/router'
import { Routes } from '../consts/routes.const'

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  isAuth: boolean = false
  constructor(private authService: AuthService, private router: Router) {
    this.authService.getAuth$().subscribe((value) => {
      this.isAuth = !!value
    })
  }

  canActivate() {
    if (!this.isAuth) {
      this.router.navigateByUrl(Routes.HOME)
      return false
    }
    return true
  }
}
