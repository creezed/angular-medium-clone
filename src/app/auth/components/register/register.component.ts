import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Select, Store } from '@ngxs/store'
import { RegistrationAction } from '../../store/auth.actions'
import { AuthState } from '../../store/auth.state'
import { Observable } from 'rxjs'
import { RequestStatus } from '../../../shared/types/requestStatus.type'

@Component({
  selector: 'mc-register',
  templateUrl: 'register.component.html',
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  @Select(AuthState.getStatus) status$: Observable<RequestStatus> | undefined
  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {}

  get _email() {
    return this.form.get('email')
  }

  get _username() {
    return this.form.get('username')
  }

  get _password() {
    return this.form.get('password')
  }

  onSubmit(): void {
    if (this.form.invalid) return
    this.store.dispatch(new RegistrationAction({ user: this.form.value }))
  }
}
