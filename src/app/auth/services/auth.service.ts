import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { RegistrationRequest } from '../shared/types/registrationRequest.type'
import { AuthResponse } from '../shared/types/authResponse.type'
import { LoginRequest } from '../shared/types/loginRequest.type'
import { apiUrl } from '../../shared/consts/apiUrl.const'
import { Store } from '@ngxs/store'
import { AuthState } from '../store/auth.state'
import { Observable } from 'rxjs'
import { LogoutAction } from '../store/auth.actions'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}
  registration$(
    registrationParams: RegistrationRequest
  ): Observable<AuthResponse> {
    const url = apiUrl + 'users'
    return this.http.post<AuthResponse>(url, registrationParams)
  }

  login$(loginParams: LoginRequest): Observable<AuthResponse> {
    const url = apiUrl + 'users/login'
    return this.http.post<AuthResponse>(url, loginParams)
  }

  logout$() {
    return this.store.dispatch(new LogoutAction())
  }

  getAuth$(): Observable<string | null> {
    return this.store.select(AuthState.getToken)
  }
}
