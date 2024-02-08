import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HousePageRoutingModule } from './house-routing.module';

import { HousePage } from './house.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HousePageRoutingModule,
    SharedModule,
  ],
  declarations: [HousePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HousePageModule {}
