import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './spinner/spinner.component';
import { WarningComponent} from './warning/warning.component';
import { ArendeinfoComponent } from './arendeinfo/arendeinfo.component';

@NgModule({
  declarations: [HeaderComponent, SpinnerComponent, WarningComponent, ArendeinfoComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent, SpinnerComponent, WarningComponent, ArendeinfoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ViewComponentsModule { }
