import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiQuestionsService } from '../../services';
import { IQuestion, IAnswer } from '../../entities/question';

interface IQuestionData {
  answers: IAnswer[];
  question: IQuestion;
}

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html'
})
export class QuestionPageComponent implements OnInit, OnDestroy {
  private routerParamsSub: Subscription;
  public questionData: IQuestionData;

  constructor(
    private apiQuestionsService: ApiQuestionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routerParamsSub = this.route.params.subscribe(params => {
      this.apiQuestionsService.getAnswersByQuestion(params['id'])
        .subscribe(
          (data: IQuestionData) => {
            console.log(data);
            this.questionData = data;
          }
        );
   });
  }

  ngOnDestroy() {
    if (this.routerParamsSub && this.routerParamsSub.unsubscribe) {
      this.routerParamsSub.unsubscribe();
    }
  }
}
