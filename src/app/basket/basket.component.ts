import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Product } from '../shared/product';
import { RequestsService } from '../shared/requests.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  
  products: Product[] = [];
  basketContent: { product: Product; selectedSize: string; quantity: number; quantityOfSameSizeAvailable: number[]; }[] = [];
  isLoading = false;
  isLoadingTwo = false;
  checkedout: boolean = false;
  notEnoughItemsInStock: boolean=false;
  errorArrayItemsToRemove: {name: string; quantity: number; size: string}[] = [];
  voucherCode: string = '';
  voucherNotValidError: boolean = false;
  email: string = '';
  emailIsEmptyError:boolean = false;
  marketingComms: boolean = false;

  constructor(private notification: NzNotificationService, private requestService: RequestsService) { }
  
  async ngOnInit(): Promise<void> {
    this.isLoading =true;
    await this.getBasket()
    
    console.log(this.basketContent);
    this.isLoading =false;
    
  }
  
  async getBasket() {
    const e = await this.requestService.getBasket()
    console.log(e);
    let returnArray = e.map(item => {
      const createArrayOfSize = item.quantityOfSameSizeAvailable ? item.quantityOfSameSizeAvailable+1 : 0
      let tmp: number[] = [];
      tmp.push(0)
      for (let i = 1; i < createArrayOfSize; i++) {
        const element = i;
        tmp.push(element)
      }
      return {product: item.product, quantity: item.quantity,selectedSize: item.selectedSize, quantityOfSameSizeAvailable: tmp,totalPrice: item.quantity * item.product.price}
    })
    this.basketContent = returnArray
    return returnArray
  }
  
  async checkoutBasket(){
    this.isLoadingTwo=true;
    //check if users has changed a quantity on their end
    await this.checkQuantitiesHaveChanged()
    const voucherIsValid = this.voucherCode.length > 0 ? await this.checkVoucherValidity() : true;
    if(this.email.length == 0) {
      console.log('empty email');
      this.emailIsEmptyError = true;
    } else {
      if (!voucherIsValid) {
        console.log("voucher is not valid");
        this.voucherNotValidError = true;
      } else {
        try {
          this.requestService.checkoutBasket(this.voucherCode).subscribe(e => {
            if(e.arrayInError?.length == 0){ 
              this.checkedout = true
              this.createBasicNotification(e.totalPrice, this.voucherCode.length > 0)
              this.getBasket()
            } else {
              this.errorArrayItemsToRemove = e.arrayInError
              this.notEnoughItemsInStock = true;
              console.log(this.errorArrayItemsToRemove, this.notEnoughItemsInStock); 
            }
            this.isLoadingTwo = false;
          })
        } catch (error) {
          console.log(error);
          this.isLoadingTwo = false;
          this.notEnoughItemsInStock = true;
        }}
      }
    }
    
    async checkVoucherValidity() {
      const checkVoucherValidity = await this.requestService.checkVoucher(this.voucherCode)
      console.log("checkVoucherValidity : ",checkVoucherValidity.voucherIndex > -1);
      return checkVoucherValidity.voucherIndex > -1
    }
    
    
    afterClose(){
      this.notEnoughItemsInStock = false;
    }
    
    afterCloseVoucherError(){
      this.voucherNotValidError = false;
      this.isLoadingTwo=false;
    }
    
    printRemoveArray(){
      console.log('hi');
      
      let returnstring = ""
      for (let i = 0; i < this.errorArrayItemsToRemove.length; i++) {
        const element = this.errorArrayItemsToRemove[i];
        returnstring+=element.name+" size :"+ element.quantity +" quantity :"+element.quantity
      }
      return returnstring
    }
    
    async checkQuantitiesHaveChanged() {
      const e = await this.requestService.getBasket()
      console.log("checking if quantities have changed : ", e);
      for (let i = 0; i < e.length; i++) {
        const item = e[i];
        const matchingItemInLocalBasket = this.basketContent.find(productInBasket => productInBasket.product.id == item.product.id && productInBasket.selectedSize == item.selectedSize)
        if (matchingItemInLocalBasket && matchingItemInLocalBasket.quantity !== item.quantity) {
          //if quantity different then update basket
          await this.requestService.updateBasketQuantity({...matchingItemInLocalBasket, quantityOfSameSizeAvailable: matchingItemInLocalBasket.quantityOfSameSizeAvailable.length})
        }
      };
      console.log("done updating quantities");
    }

    afterCloseEmailError(){
      this.isLoadingTwo=false;
      this.emailIsEmptyError=false;
    }
    
    createBasicNotification(totalPrice: number, usedVoucher: boolean): void {
      const voucherText = usedVoucher ? " thanks to your voucher" : ''
      this.notification.blank(
        'Checkout Complete',
        'Your total is '+totalPrice+"£"+voucherText + '.\n An email with your receipt has been sent to '+this.email+'.',
        {
          nzStyle: {
            width: '600px',
            marginLeft: '-265px'
          },
          nzClass: 'test-class'
        }
        );
      }
      
    }
    