import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiQuestionsService } from '../../services';
import { IQuestion } from '../../entities/question';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  host: {'class': 'search-result'}
})

export class SearchResultsComponent implements OnInit, OnDestroy {
  public isSidePanelShown: boolean;
  public isSidePanelLoading: boolean;
  public sidePanelItems: any[];
  public searchResult: IQuestion[];
  private routerParamsSub: Subscription;
  public searchString: string;

  constructor(
    private route: ActivatedRoute,
    private apiQuestionsService: ApiQuestionsService
  ) {}

  ngOnInit() {
    this.routerParamsSub = this.route.params.subscribe(params => {
       this.searchString = params['search'];
       this.runSearch();
    });
  }

  runSearch(): void {
    this.apiQuestionsService.getQuestionsList(this.searchString).subscribe(
      (data: any[]) => {
        this.searchResult = data;
      }
    );
  }

  ngOnDestroy() {
    if (this.routerParamsSub && this.routerParamsSub.unsubscribe) {
      this.routerParamsSub.unsubscribe();
    }
  }
}
