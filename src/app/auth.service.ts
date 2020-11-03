import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({providedIn: "root"})
export class AuthService{

    username: string;
    updatedUserName = new Subject<string>();
    
    constructor(private http: HttpClient,private router: Router) { }

    
    getUserName()
    {
        return this.username;
    }

    getUpdatedUserName()
    {
        return this.updatedUserName.asObservable();
    }
    
    createUser(name: string, mobileNo: number, emailId: string, password: string) {
        const userDetails = {
            name: name,
            mobileNo: mobileNo,
            emailId: emailId,
            password: password
        }
        this.http.post("http://localhost:3000/signin", userDetails).subscribe(response => {
            this.router.navigate(['/']);
        });
    }

    signOut()
    {
        localStorage.removeItem("token");
        localStorage.removeItem("expiresIn");
        localStorage.removeItem('userName');
        this.updatedUserName.next('Guest');
    }

    userLogin(emailId: string, password: string) {
        const userLogin = {
            emailId: emailId,
            password: password
        };

        this.http.post<{ message: string, token: string, expiresIn: number }>("http://localhost:3000/login", userLogin).subscribe(response => {
            this.updatedUserName.next(emailId);
            const now = new Date();
            const expiresIn = new Date(now.getTime() + response.expiresIn * 1000);
            localStorage.setItem('token', response.token);
            localStorage.setItem('expiresIn', expiresIn.toISOString());
            localStorage.setItem('userName', emailId);
        });
    }

    autoAuthCheck()
    {
        const authDetail = this.getLocalStorageItems();

        if (!authDetail)
        {
            return;
        }
        const timeFromLS = new Date(authDetail.expiresIn);
        const newDate = new Date();
        // console.log("Now " + newDate);
        // console.log("From LS" + timeFromLS);
        if (timeFromLS > newDate)
        {
            // console.log("User in " + authDetail.userName);
            const user = authDetail.userName.toString();
            this.updatedUserName.next(user);
            this.logoutTimeSetter((timeFromLS.getTime() - newDate.getTime()) / 1000);
        }
    }

    logoutTimeSetter(duration)
    {
        console.log("Timer");
        setTimeout(() => {
            this.signOut();
            console.log("timer executed");
        } , duration * 3600);
    }


    getLocalStorageItems()
    {
      const authDetails = {
            token: localStorage.getItem('token'),
            expiresIn: localStorage.getItem('expiresIn'),
            userName: localStorage.getItem('userName')
        }
        return authDetails; 
    }
}