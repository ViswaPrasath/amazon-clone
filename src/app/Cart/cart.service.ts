import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductModel } from '../Home/home/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private product: ProductModel[] = [];
  private productCount = 0;

  private productCountSub = new Subject<number>();
  private productPriceSub = new Subject<number>();

  addProduct(id: string ,image: string, name: string, description: string, price: number){
    const product: ProductModel = {
      id: id,
      image: image,
      name: name,
      description: description,
      price: price
    } 
    const fromStorage = JSON.parse(localStorage.getItem("product"));
    if (fromStorage) {
      this.product = fromStorage;
    }
    this.product.push(product);
    localStorage.setItem("product", JSON.stringify(this.product));
    const productCount: ProductModel[] = JSON.parse(localStorage.getItem("product"));
    let productPrice = 0;
    productCount.map(product => {
      productPrice = productPrice + product.price;
    });
    this.productCountSub.next(productCount.length);
    this.productPriceSub.next(productPrice);
  }

  getProduct(): ProductModel[] {
    this.product = JSON.parse(localStorage.getItem("product"));
    return this.product;
  }
  
  removeProduct(id: string) {
    const product: ProductModel[] = JSON.parse(localStorage.getItem("product"));
    const element = product.map(i => i.id);
    const index = element.lastIndexOf(id);    
    product.splice(index, 1);
    const removed = product;
    this.product = removed;
    localStorage.setItem("product", JSON.stringify(this.product));
    let productPrice = 0;
    product.map(product => {
      productPrice = productPrice + product.price;
    });
    this.productCountSub.next(product.length);
    this.productPriceSub.next(productPrice);
  }
  
  getProductCount() {
    const product: ProductModel[] = JSON.parse(localStorage.getItem("product"));
    return product.length;
  }

  getUpdatedProductCount()
  {
    return this.productCountSub.asObservable();
  }

  getProductPrice(){
    const product: ProductModel[] = JSON.parse(localStorage.getItem("product"));
    let price = 0;
    product.map(product => {
      price = price + product.price;
    });
    return price.toFixed(2);
  }

  getUpdatedPrice() {
    return this.productPriceSub.asObservable();
  }


}
