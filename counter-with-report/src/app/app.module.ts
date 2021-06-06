import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-rounting.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CounterComponent } from './counter/counter.component';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [AppComponent, ReportsComponent, CounterComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
