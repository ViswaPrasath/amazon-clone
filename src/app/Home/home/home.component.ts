import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Cart/cart.service';
import { ProductModel } from './product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private cartService: CartService) { }

  ngOnInit(): void {
  }
  imageLocation = [{ path: "assets/img/homeBanner.jpg" }, { path: "assets/img/homeBanner1.jpg" }]; 
  products: ProductModel[] = [
    {
      id: "1",
      image: "assets/img/laptop_row11.jpg",
      name: "AVITA LAPTOP",
      description: "AVITA LIBER V14 NS14A8INF562-SG 14-inch Laptop (Core i5-10210U/8GB/512GB SSD/ FHD / Windows 10 Home / Intel UHD Graphics 620 / MS Office 365 / 1.25KG), Space Grey",
      price: 39490.00
    },
    {
      id: "2",
      image: "assets/img/laptop_row12.jpg",
      name: "LENOVO LAPTOP",
      description: "Lenovo IdeaPad S145 AMD Ryzen 5 15.6\" FHD Thin and Light Laptop (8GB/512GB SSD/Windows10/Office/Platinum Grey/1.85Kg), 81UT0044IN",
      price: 43990.00
    },
    {
      id: "3",
      image: "assets/img/laptop_row13.jpg",
      name: "Mi Notebook",
      description: "Mi Notebook 14 Intel Core i5-10210U 10th Gen Thin and Light Laptop(8GB/512GB SSD/Windows 10/Intel UHD Graphics/Silver/1.5Kg), XMA1901-FA+Webcam",
      price: 43999.00
    }
  ]

  productsRow2: ProductModel[] = [
    {
      id: "4",
      image: "assets/img/laptop_row11.jpg",
      name: "AVITA LAPTOP",
      description: "AVITA LIBER V14 NS14A8INF562-SG 14-inch Laptop (Core i5-10210U/8GB/512GB SSD/ FHD / Windows 10 Home / Intel UHD Graphics 620 / MS Office 365 / 1.25KG), Space Grey",
      price: 39490.00
    },
    {
      id: "5",
      image: "assets/img/laptop_row12.jpg",
      name: "LENOVO LAPTOP",
      description: "Lenovo IdeaPad S145 AMD Ryzen 5 15.6\" FHD Thin and Light Laptop (8GB/512GB SSD/Windows10/Office/Platinum Grey/1.85Kg), 81UT0044IN",
      price: 43990.00
    },
    {
      id: "6",
      image: "assets/img/laptop_row13.jpg",
      name: "Mi Notebook",
      description: "Mi Notebook 14 Intel Core i5-10210U 10th Gen Thin and Light Laptop(8GB/512GB SSD/Windows 10/Intel UHD Graphics/Silver/1.5Kg), XMA1901-FA+Webcam",
      price: 43999.00
    }
  ]

  addToCart(id: string, image: string, name: string, description: string, price: number) {
    this.cartService.addProduct(id, image, name, description, price);
  }
}
