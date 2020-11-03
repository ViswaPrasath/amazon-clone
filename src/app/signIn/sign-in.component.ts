import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: 'sign-in.component.html',
    styleUrls: ['sign-in.component.css']
})
export class SignInComponent{
    
    constructor(private authService: AuthService) { }
    
    createUser(form: NgForm)
    {
        if (!form.valid) {
            return;
        }
        console.log("form submitted");
        this.authService.createUser(form.value.yourName, form.value.mobileNo, form.value.emailId, form.value.password);
    }
}