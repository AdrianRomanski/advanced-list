import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdvancedListContainerComponent } from './containers/advanced-list-container/advanced-list-container.component';
import { ListFilterComponent } from './components/list-filter/list-filter.component';
import { ListSortComponent } from './components/list-sort/list-sort.component';
import { ListAddressesComponent } from './components/list-adresses/list-addresses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    AdvancedListContainerComponent,
    ListFilterComponent,
    ListSortComponent,
    ListAddressesComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatButtonModule,
        HttpClientModule,
        MatProgressSpinnerModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
