import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HemsidaComponent } from './views/hemsida/hemsida.component';
import { KundsidaComponent } from './views/kundsida/kundsida.component';
import { MassHanteringComponent } from './views/mass-hantering/mass-hantering.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: '/hemsida', pathMatch: 'full' },
  { path: 'hemsida', component: HemsidaComponent },
  { path: 'kundsida', component: KundsidaComponent },
  { path: 'masshantering', component: MassHanteringComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/hemsida' }
];

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes, { useHash: true, enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
