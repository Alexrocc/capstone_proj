import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { AuthGuard } from './auth/auth.guard';

import { AppComponent } from './app.component';
import { StoreComponent } from './components/store/store.component';
import { LibraryComponent } from './components/library/library.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Route[] = [
  {
    path: '',
    component: StoreComponent,
  },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details',
    component: DetailsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    LibraryComponent,
    ProfileComponent,
    NavbarComponent,
    DetailsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
