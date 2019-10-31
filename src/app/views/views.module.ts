import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HemsidaComponent } from './hemsida/hemsida.component';
import { KundsidaComponent } from './kundsida/kundsida.component';
import { MassHanteringComponent } from './mass-hantering/mass-hantering.component';
import { ExempelviewComponent } from './exempelview/exempelview.component';
import { ViewComponentsModule } from '../view-components/view-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HemsidaComponent, KundsidaComponent, MassHanteringComponent, ExempelviewComponent],
  imports: [
    CommonModule, ViewComponentsModule, FormsModule, ReactiveFormsModule, RouterModule
  ],
  exports: [HemsidaComponent, KundsidaComponent, MassHanteringComponent, ExempelviewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ViewsModule { }
