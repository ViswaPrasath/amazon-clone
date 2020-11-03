import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductModel } from '../Home/home/product.model';
import { CartService } from './cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {

    constructor(private cartService: CartService) { }

    public productsSelected: ProductModel[] = [];
    private productCountSub: Subscription;
    productCount = 0;
    productPrice= "10";
  
    ngOnInit() {
      this.productsSelected = this.cartService.getProduct();
      this.productCount = this.cartService.getProductCount();
      this.productCountSub = this.cartService.getUpdatedProductCount().subscribe(count => {
        this.productCount = count;
      });

      this.productPrice = this.cartService.getProductPrice();
      this.cartService.getUpdatedPrice().subscribe(price => {
        this.productPrice = price.toFixed(2);
      })
    }

    removeFromCart(id: string) {
      this.cartService.removeProduct(id);
      this.productsSelected = this.cartService.getProduct(); 
    }

  ngOnDestroy() {
    this.productCountSub.unsubscribe();
    }
    // products: ProductModel[] = [
    //     {
    //       id: "1",
    //       image: "assets/img/laptop_row11.jpg",
    //       name: "AVITA LAPTOP",
    //       description: "AVITA LIBER V14 NS14A8INF562-SG 14-inch Laptop (Core i5-10210U/8GB/512GB SSD/ FHD / Windows 10 Home / Intel UHD Graphics 620 / MS Office 365 / 1.25KG), Space Grey",
    //       price: 39490.00
    //     },
    //     {
    //       id: "2",
    //       image: "assets/img/laptop_row12.jpg",
    //       name: "LENOVO LAPTOP",
    //       description: "Lenovo IdeaPad S145 AMD Ryzen 5 15.6\" FHD Thin and Light Laptop (8GB/512GB SSD/Windows10/Office/Platinum Grey/1.85Kg), 81UT0044IN",
    //       price: 43990.00
    //     },
    //     {
    //       id: "3",
    //       image: "assets/img/laptop_row13.jpg",
    //       name: "Mi Notebook",
    //       description: "Mi Notebook 14 Intel Core i5-10210U 10th Gen Thin and Light Laptop(8GB/512GB SSD/Windows 10/Intel UHD Graphics/Silver/1.5Kg), XMA1901-FA+Webcam",
    //       price: 43999.00
    //     }
    //   ]
}