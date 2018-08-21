import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import {
  SearchBarComponent,
  SearchResultsComponent,
  NotFoundComponent,
  QuestionsTableComponent,
  QuickPanelComponent
} from './components';
import {
  ApiQuestionsService
} from './services';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SearchBarComponent,
    SearchResultsComponent,
    QuestionsTableComponent,
    QuickPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    ApiQuestionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
