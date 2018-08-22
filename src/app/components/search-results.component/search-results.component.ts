import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiQuestionsService } from '../../services';
import { IQuestion } from '../../entities/question';

const QUICK_PANEL_SEARCH_OPTIONS = {
  byTag: 'tag',
  byAuthor: 'author'
};
Object.freeze(QUICK_PANEL_SEARCH_OPTIONS);

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})

export class SearchResultsComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'search-result';
  public quickPanelItems: IQuestion[] = [];
  public searchResult: IQuestion[] = [];
  private routerParamsSub: Subscription;
  public searchString: string;
  public quickPanelSearchParam = '';
  public quickPanelSearchValue = '';

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

  public runSearch(): void {
    this.apiQuestionsService.getQuestionsList(this.searchString)
      .subscribe(
        data => {
          this.searchResult = data;
          console.log(data);
        }
      );
  }

  public onAuthor(authorId: string): void {
    this.apiQuestionsService.getPopularQuestionsByAuthor(authorId)
      .subscribe(
        (questions: IQuestion[]) => {
          this.quickPanelItems = questions;
          this.quickPanelSearchParam = QUICK_PANEL_SEARCH_OPTIONS.byAuthor;
          this.quickPanelSearchValue = questions[0].owner.display_name;
        }
      );
  }

  public onTag(tag: string) {
    this.apiQuestionsService.getPopupalQuestionsByTag(tag)
      .subscribe(
        (questions: IQuestion[]) => {
          this.quickPanelItems = questions;
          this.quickPanelSearchParam = QUICK_PANEL_SEARCH_OPTIONS.byTag;
          this.quickPanelSearchValue = tag;
        }
      );
  }

  ngOnDestroy() {
    if (this.routerParamsSub && this.routerParamsSub.unsubscribe) {
      this.routerParamsSub.unsubscribe();
    }
  }
}
