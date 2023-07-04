import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/component/header.component';
import { FooterComponent } from './footer/component/footer.component';
import { ClientComponent } from './client/component/client.component';
import { ClientService } from './client/service/client.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/component/form.component';
import { PaginationComponent } from './pagination/component/pagination.component';

const routes: Routes = [
  // {path: '', redirectTo: '/', pathMatch: 'full'} THIS IS EXAMPLE TO REDIRECT
  // {path: '', component: AppComponent},
  { path: 'clients', component: ClientComponent },
  { path: 'clients/pages/:page', component: ClientComponent },
  { path: 'clients/create', component: FormComponent },
  { path: 'clients/create/:id', component: FormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientComponent,
    FormComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    // Import http module to consume api rest
    HttpClientModule,
    RouterLinkActive,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  /**
   * Assing in here all the services
   */
  providers: [ClientService],
  bootstrap: [AppComponent],
})
export class AppModule {}
