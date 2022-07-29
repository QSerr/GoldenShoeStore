import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { RequestsService } from '../shared/requests.service';
import { ShoeType } from '../shared/shoe-type';

@Component({
  selector: 'app-womens-shoes',
  templateUrl: './womens-shoes.component.html',
  styleUrls: ['./womens-shoes.component.css']
})
export class WomensShoesComponent implements OnInit {

  womensShoeTypes: ShoeType[] = [
    {name: "Women's Trainers", url:"trainers"},
    {name: "Women's Boots", url: "boots"},
    {name: "Golden Shoe Special", url:"special"},
];
  radioValue = 'trainers'

  constructor(private requestsService: RequestsService) { }

  ngOnInit(): void {
  }

}
