import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HemsidaComponent } from './hemsida/hemsida.component';
import { MassHanteringComponent } from './mass-hantering/mass-hantering.component';
import { ViewComponentsModule } from '../view-components/view-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DomChangeDirective } from './dom-change.directive';
import { ArendesidaComponent } from './arendesida/arendesida.component';



@NgModule({
  declarations: [
    HemsidaComponent, MassHanteringComponent,
    DomChangeDirective, ArendesidaComponent
  ],
  imports: [
    CommonModule, ViewComponentsModule, FormsModule, ReactiveFormsModule, RouterModule
  ],
  exports: [HemsidaComponent, ArendesidaComponent, MassHanteringComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ViewsModule { }
