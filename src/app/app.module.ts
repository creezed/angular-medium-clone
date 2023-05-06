import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NgxsModule } from '@ngxs/store'
import { AuthModule } from './auth/auth.module'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin'
import { AuthState } from './auth/store/auth.state'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({ key: AuthState }),
    AuthModule,
    ToastModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
