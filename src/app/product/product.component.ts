import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { Product } from '../shared/product';
import { RequestsService } from '../shared/requests.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Output() productAdded = new EventEmitter();
  
  isLoading = true;
  activeProduct: Product | undefined
  isLoadingTwo = false;
  selectedSize: string = "Please select a size."
  private routeSub: Subscription;
  tooManyitemsAlert: boolean = false;

  constructor(private requestService: RequestsService, private route: ActivatedRoute) {
    let productId: number = 0;
    this.routeSub = this.route.params.subscribe(params => {
      productId = params['id']
    });
    this.requestService.getProductById(productId).subscribe((product: Product) => {
      this.activeProduct = product
      this.isLoading = false;
    });
  }
  
  ngOnInit(): void {

  }

  hasPickedASize(){
    return this.selectedSize == "Please select a size."
  }
  
  addProductToBasket() {
    this.isLoadingTwo = true;
    console.log(this.activeProduct, this.selectedSize);
    console.log('addProductToBasket');
    
    this.requestService.addProductToBasket({product: this.activeProduct, size: this.selectedSize})
      .subscribe(count => {
        console.log(count.productCount)
        if(count.productCount == -1){
          this.tooManyitemsAlert = true;
        }
        this.isLoadingTwo=false;
      });
  }

  afterClose(){
    this.tooManyitemsAlert = false;
  }
  
}
