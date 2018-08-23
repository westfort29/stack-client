import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  MainHeaderComponent,
  MainPageComponent,
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
import { ConstantsService } from './services/constants.service';
import { TableSortPipe } from './services/table-sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    MainPageComponent,
    NotFoundComponent,
    SearchBarComponent,
    SearchResultsComponent,
    QuestionsTableComponent,
    QuickPanelComponent,
    QuestionPageComponent,
    TableSortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    ApiQuestionsService,
    ConstantsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
