// modules imports
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";

// component imports
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";

// pipe imports
import { FilterPipe } from './pipes/pipe';
import { DatePipe } from './pipes/datePipe';
import { AgePipe } from './pipes/agePipe';

// service imports
import { UserDataService } from "./servies/user-data.service";

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
  declarations: [AppComponent, HomeComponent, FilterPipe,DatePipe, AgePipe], 
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
