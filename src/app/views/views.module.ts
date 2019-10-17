import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HemsidaComponent } from './hemsida/hemsida.component';
import { KundsidaComponent } from './kundsida/kundsida.component';
import { MassHanteringComponent } from './mass-hantering/mass-hantering.component';
import { ExempelviewComponent } from './exempelview/exempelview.component';
import { ViewComponentsModule } from '../view-components/view-components.module';



@NgModule({
  declarations: [HemsidaComponent, KundsidaComponent, MassHanteringComponent, ExempelviewComponent],
  imports: [
    CommonModule, ViewComponentsModule
  ],
  exports: [HemsidaComponent, KundsidaComponent, MassHanteringComponent, ExempelviewComponent]
})
export class ViewsModule { }
