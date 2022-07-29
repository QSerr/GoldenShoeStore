import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NavigationHeaderComponent } from './navigation-header/navigation-header.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { WomensShoesComponent } from './womens-shoes/womens-shoes.component';
import { MensShoesComponent } from './mens-shoes/mens-shoes.component';
import { KidsShoesComponent } from './kids-shoes/kids-shoes.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { BasketComponent } from './basket/basket.component';
import { NzImageModule } from 'ng-zorro-antd/image';
import { ProductComponent } from './product/product.component';
import { ShoeListComponent } from './shoe-list/shoe-list.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationHeaderComponent,
    WomensShoesComponent,
    MensShoesComponent,
    KidsShoesComponent,
    AccessoriesComponent,
    BasketComponent,
    ProductComponent,
    ShoeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzDividerModule,
    NzMenuModule,
    NzIconModule,
    NzListModule,
    NzCardModule,
    NzRadioModule,
    NzImageModule,
    NzModalModule,
    NzSpinModule,
    NzSelectModule,
    NzButtonModule,
    NzAlertModule,
    NzNotificationModule,
    NzCheckboxModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
