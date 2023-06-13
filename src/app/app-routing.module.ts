import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home/home.component";
import {ShopComponent} from "./shop/shop.component";
import {ProductDetailsComponent} from "./shop/product-details/product-details.component";
import {ContactComponent} from "./contact/contact/contact.component";
import {MasteryComponent} from "./mastery/mastery/mastery.component";
import {OurTeamComponent} from "./our-team/our-team/our-team.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'team', component: OurTeamComponent},
  {path: 'shop/:id', component: ProductDetailsComponent},
  {path: 'mastery', component: MasteryComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
