import { Routes } from '@angular/router';

import {
  NotFoundComponent,
  SearchBarComponent,
  SearchResultsComponent,
  QuestionPageComponent
} from '../components';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: SearchBarComponent
  },
  {
    path: 'search-result/:search',
    component: SearchResultsComponent
  },
  {
    path: 'question/:id',
    component: QuestionPageComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
