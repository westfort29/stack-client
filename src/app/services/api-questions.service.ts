import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConstantsService } from './constants.service';

@Injectable()
export class ApiQuestionsService {
  constructor(
    private http: HttpClient,
    private constants: ConstantsService
  ) {}

  getQuestionsList(searchValue: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('searchValue', searchValue);
    return this.http.get(`${this.constants.API_BASE_URL}questions`, { params: queryParams });
  }

  getPopupalQuestionsByTag(tag: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('tag', tag);
    return this.http.get(`${this.constants.API_BASE_URL}questions/tag`, { params: queryParams });
  }

  getPopularQuestionsByAuthor(authorId: string): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('userId', authorId);
    return this.http.get(`${this.constants.API_BASE_URL}questions/user`, { params: queryParams });
  }

  getAnswersByQuestion(questionId: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('questionId', questionId);
    return this.http.get(`${this.constants.API_BASE_URL}answers`, { params: queryParams });
  }
}
