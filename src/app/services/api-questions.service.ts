import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const API_BASE_URL = 'http://localhost:3000/';

@Injectable()
export class ApiQuestionsService {
  constructor(
    private http: HttpClient
  ) {}

  getQuestionsList(searchValue: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('searchValue', searchValue);
    return this.http.get(`${API_BASE_URL}questions`, { params: queryParams });
  }

  getPopupalQuestionsByTag(tag: string) {

  }

  getPopularQuestionsByAuthor(authorId: string) {

  }

  getAnswersByQuestion(questionId: string) {

  }
}
