import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ClientService } from './client/service/client.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './client/components/pagination/pagination.component';
import { ClientComponent } from './client/components/client_list/client.component';
import { FormComponent } from './client/components/form/form.component';
import { HeaderComponent } from './client/components/header/header.component';
import { FooterComponent } from './client/components/footer/footer.component';
import { DetailScreenComponent } from './client/components/detail-screen/detail-screen.component';

const routes: Routes = [
  // {path: '', redirectTo: '/', pathMatch: 'full'} THIS IS EXAMPLE TO REDIRECT
  // {path: '', component: AppComponent},
  { path: 'clients', component: ClientComponent},
  { path: 'clients/pages/:page', component: ClientComponent },
  { path: 'clients/create', component: FormComponent },
  { path: 'clients/create/:id', component: FormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormComponent,
    PaginationComponent,
    ClientComponent,
    DetailScreenComponent
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
