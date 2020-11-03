import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartService } from '../Cart/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

    itemInCart = 0;
    showSideMenu = false;
    userName: string = 'Guest';

    private productCountSub: Subscription;

    constructor(private cartService: CartService, private authService: AuthService) {}
       
    ngOnInit() {
        this.itemInCart = this.cartService.getProductCount();
        this.productCountSub = this.cartService.getUpdatedProductCount().subscribe(count => {
            this.itemInCart = count;
        });
        if (this.authService.getUserName())
        {
            this.userName = this.authService.getUserName();
        }
        this.authService.getUpdatedUserName().subscribe(user => {
            this.userName = user;
        });
        this.authService.autoAuthCheck();
    }

    sideMenuStatus() {
        this.showSideMenu = !this.showSideMenu;
    }

    signOut()
    {
        this.authService.signOut();
    }

    ngOnDestroy() {
        this.productCountSub.unsubscribe();
    }
}