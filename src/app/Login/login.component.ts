import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['login.component.css']
})
    
export class LoginComponent{
   
    constructor(private authService: AuthService) { }
    
    login(form: NgForm) {
        this.authService.userLogin(form.value.emailId, form.value.password);    
    }
    
}