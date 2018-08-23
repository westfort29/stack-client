import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  public readonly API_BASE_URL = 'http://localhost:3000/';
  public readonly SORT_DIRECTION = {
    desc: 'desc',
    asc: 'asc'
  };
  public readonly SORT_OPTIONS = {
    author: 'author',
    title: 'title',
    answer_count: 'answer_count'
  };
}
