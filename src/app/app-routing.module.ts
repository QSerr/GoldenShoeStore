import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessoriesComponent } from './accessories/accessories.component';
import { BasketComponent } from './basket/basket.component';
import { HomePageComponent } from './home-page/home-page.component';
import { KidsShoesComponent } from './kids-shoes/kids-shoes.component';
import { MensShoesComponent } from './mens-shoes/mens-shoes.component';
import { ProductComponent } from './product/product.component';
import { ShoeListComponent } from './shoe-list/shoe-list.component';
import { WomensShoesComponent } from './womens-shoes/womens-shoes.component';

const routes: Routes = 
[
  {path: '', component: HomePageComponent},
  {path: 'womens', component: WomensShoesComponent},
  {path: 'mens', component: MensShoesComponent},
  {path: 'kids', component: KidsShoesComponent},
  {path: 'accessories', component: AccessoriesComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'product/:id', component: ProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
