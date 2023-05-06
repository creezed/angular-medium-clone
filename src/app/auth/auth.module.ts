import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisterComponent } from './components/register/register.component'
import { AuthRoutingModule } from './auth-routing.module'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { ReactiveFormsModule } from '@angular/forms'
import { NgxsModule } from '@ngxs/store'
import { AuthState } from './store/auth.state'
import { AuthService } from './services/auth.service'
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from './components/login/login.component'

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forFeature([AuthState]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
