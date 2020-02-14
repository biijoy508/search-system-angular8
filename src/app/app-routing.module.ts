import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HemsidaComponent } from './views/hemsida/hemsida.component';
import { ArendesidaComponent } from './views/arendesida/arendesida.component';
import { MassHanteringComponent } from './views/mass-hantering/mass-hantering.component';
import { RapporterComponent } from './views/rapporter/rapporter.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { VarinigOspadedataDataGuard } from './services/varinig-ospadedata-data.guard';

const routes: Routes = [
  { path: '', redirectTo: '/hemsida', pathMatch: 'full' },
  { path: 'hemsida', component: HemsidaComponent },
  { path: 'arendesida/:arendeId/:kundNummer', component: ArendesidaComponent, canDeactivate: [VarinigOspadedataDataGuard] },
  { path: 'masshantering', component: MassHanteringComponent },
  { path: 'rapporter', component: RapporterComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/hemsida' }
];

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes, { useHash: true, enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
