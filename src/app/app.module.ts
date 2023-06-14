import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/component/header.component';
import { FooterComponent } from './footer/component/footer.component';
import { ClientComponent } from './client/component/client.component';
import { ClientService } from './client/service/client.service';
import { RouterModule,Routes } from '@angular/router';

const routes : Routes = [
  // {path: '', redirectTo: '/clients', pathMatch: 'full'} THIS IS EXAMPLE TO REDIRECT
  {path: 'clients', component: ClientComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  /**
   * Assing in here all the services
   */
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
