import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store'
import { Injectable } from '@angular/core'
import { LoginAction, LogoutAction, RegistrationAction } from './auth.actions'
import { AuthService } from '../services/auth.service'
import { delay, Observable, tap } from 'rxjs'
import { MessageService } from 'primeng/api'
import { HttpErrorResponse } from '@angular/common/http'
import { RequestStatus } from '../../shared/types/requestStatus.type'
import { AuthResponse } from '../shared/types/authResponse.type'
import { Router } from '@angular/router'
import { Routes } from '../../shared/consts/routes.const'

interface AuthStateModel {
  token: string | null
  status: RequestStatus
}

export const AUTH_STATE_TOKEN = new StateToken<AuthStateModel>('auth')

@State<AuthStateModel>({
  name: AUTH_STATE_TOKEN,
  defaults: {
    token: null,
    status: 'init',
  },
})
@Injectable()
export class AuthState {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  @Selector([AUTH_STATE_TOKEN])
  static getStatus(state: AuthStateModel) {
    return state.status
  }

  @Selector([AUTH_STATE_TOKEN])
  static getToken(state: AuthStateModel) {
    return state.token
  }

  @Action(RegistrationAction)
  registration(
    ctx: StateContext<AuthStateModel>,
    { payload }: RegistrationAction
  ) {
    ctx.patchState({ status: 'pending' })
    return this.getResponse(this.authService.registration$(payload), ctx)
  }

  @Action(LoginAction)
  login(ctx: StateContext<AuthStateModel>, { payload }: LoginAction) {
    ctx.patchState({ status: 'pending' })
    return this.getResponse(this.authService.login$(payload), ctx)
  }
  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      token: null,
      status: 'init',
    })
  }

  getResponse<T extends AuthResponse>(
    observable: Observable<T>,
    { patchState }: StateContext<AuthStateModel>
  ) {
    return observable.pipe(
      delay(300),
      tap({
        next: (response) => {
          patchState({ token: response.user.token, status: 'fullfield' })
          this.router.navigateByUrl(Routes.HOME)
        },
        error: (response: HttpErrorResponse) => {
          Object.entries(response.error.errors).map(([key, value]) => {
            // @ts-ignore
            value.map((value) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: key + ' ' + value,
              })
            })
          })
          patchState({ status: 'rejected' })
        },
      })
    )
  }
}
