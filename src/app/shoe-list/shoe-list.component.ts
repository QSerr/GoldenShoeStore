import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalRef } from 'ng-zorro-antd/modal/modal-ref';
import { map } from 'rxjs/internal/operators/map';
import { ProductComponent } from '../product/product.component';
import { Product } from '../shared/product';
import { RequestsService } from '../shared/requests.service';

@Component({
  selector: 'app-shoe-list',
  templateUrl: './shoe-list.component.html',
  styleUrls: ['./shoe-list.component.css']
})
export class ShoeListComponent implements OnInit {
  
  @Input() criteria: string[] =  ['women'];
  @Output() productAdded = new EventEmitter();
  
  result: any
  shoes: Product[] = []
  selectedShoe: any;
  

  constructor(private requestService: RequestsService) {}
  
  ngOnInit() {    
  }
    
  ngOnChanges(criteria: any) {
    this.searchForCriteria(criteria);
    
  }

  searchForCriteria(criteria: any) {
    this.shoes =[]
    console.log(criteria.criteria);
    this.requestService.getShoesWithCriteria(criteria.criteria.currentValue)
    .pipe(map((data: { [x: string]: any; }) => Object.keys(data).map(key => data[key])))
    .subscribe((shoes: Product[]) => this.shoes = shoes);
  }

}
