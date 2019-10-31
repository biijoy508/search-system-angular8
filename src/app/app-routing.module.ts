import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExempelviewComponent } from './views/exempelview/exempelview.component';
import { HemsidaComponent} from './views/hemsida/hemsida.component';
import { KundsidaComponent } from './views/kundsida/kundsida.component';
import { MassHanteringComponent} from './views/mass-hantering/mass-hantering.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: '/hemsida', pathMatch: 'full' },
  { path: 'exempel', component: ExempelviewComponent },
  { path: 'hemsida', component: HemsidaComponent },
  { path: 'kundsida', component: KundsidaComponent },
  { path: 'masshantering', component: MassHanteringComponent },
  { path: '**', pathMatch: 'full', redirectTo: '/hemsida'}
];

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(routes, { useHash: false, enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
