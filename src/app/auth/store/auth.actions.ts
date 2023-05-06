import { ActionTypes } from '../shared/consts/actionTypes'
import { RegistrationRequest } from '../shared/types/registrationRequest.type'
import { LoginRequest } from '../shared/types/loginRequest.type'

export class RegistrationAction {
  static readonly type = ActionTypes.REGISTER
  constructor(public payload: RegistrationRequest) {}
}

export class LoginAction {
  static readonly type = ActionTypes.LOGIN
  constructor(public payload: LoginRequest) {}
}

export class LogoutAction {
  static readonly type = ActionTypes.LOGOUT
}
