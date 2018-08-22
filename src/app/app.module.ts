import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { ROUTES } from './app-routing.module/app.routes';

import { AppComponent } from './app.component';
import {
  SearchBarComponent,
  SearchResultsComponent,
  NotFoundComponent,
  QuestionsTableComponent,
  QuickPanelComponent,
  QuestionPageComponent
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
    QuickPanelComponent,
    QuestionPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiQuestionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
