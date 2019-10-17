import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExempelviewComponent } from './views/exempelview/exempelview.component';
import { HemsidaComponent} from './views/hemsida/hemsida.component';
import { KundsidaComponent } from './views/kundsida/kundsida.component';
import { MassHanteringComponent} from './views/mass-hantering/mass-hantering.component';

const routes: Routes = [
  { path: '', redirectTo: '/exempel', pathMatch: 'full' },
  { path: 'exempel', component: ExempelviewComponent },
  { path: 'hemsida', component: HemsidaComponent },
  { path: 'kundsida', component: KundsidaComponent },
  { path: 'masshantering', component: MassHanteringComponent },
  { path: '**', redirectTo: '/exempel'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
