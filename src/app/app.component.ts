import { Component, OnInit  } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  src = '../assets/img/amazon_logo.png';
 
  constructor(private authService:AuthService){}
  ngOnInit()
  {
    // this.authService.autoAuthCheck();
  }
}
