import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Cart/cart.component';
import { HomeComponent } from './Home/home/home.component';
import { LoginComponent } from './Login/login.component';
import { SignInComponent } from './signIn/sign-in.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    { path: 'cart', component: CartComponent },
    {path: 'login', component: LoginComponent},
    { path: 'signin', component: SignInComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

} 