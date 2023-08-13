import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home/home.component";
import {ContactComponent} from "./contact/contact/contact.component";
import {MasteryComponent} from "./mastery/mastery/mastery.component";
import {OurTeamComponent} from "./our-team/our-team/our-team.component";
import {ImprintComponent} from "./imprint/imprint/imprint.component";
import {TestErrorComponent} from "./core/test-error/test-error.component";
import {NotFoundComponent} from "./core/not-found/not-found.component";
import {ServerErrorComponent} from "./core/server-error/server-error.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'test-error', component: TestErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule)},
  {path: 'contact', component: ContactComponent},
  {path: 'imprint', component: ImprintComponent},
  {path: 'team', component: OurTeamComponent},
  {path: 'mastery', component: MasteryComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
