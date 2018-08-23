import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IQuestion } from '../../entities/question';
import { ConstantsService } from '../../services/constants.service';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html'
})
export class QuestionsTableComponent {
  public sortOptions = {
    type: '',
    order: ''
  };
  public sortingOptions;
  @Input() questions: IQuestion[];
  @Output() onAuthor = new EventEmitter<number>();
  @Output() onTag = new EventEmitter<string>();

  constructor(private constants: ConstantsService) {
    this.sortingOptions = Object.assign({}, this.constants.SORT_OPTIONS);
  }

  public onTagClick(tag: string) {
    this.onTag.emit(tag);
  }

  public onAuthorClick(authorId: number) {
    this.onAuthor.emit(authorId);
  }

  applySortingOptions(option: any) {
    this.toggleSortingOrderIfSameType(option);
    if (this.sortOptions.type !== option) {
      this.sortOptions.type = option;
      this.sortOptions.order = this.constants.SORT_DIRECTION.desc;
      this.refreshSortOptionsLink();
    }
  }

  toggleSortingOrderIfSameType(option: string) {
    if (this.sortOptions.type === option) {
      if (this.sortOptions.order === this.constants.SORT_DIRECTION.desc) {
        this.sortOptions.order = this.constants.SORT_DIRECTION.asc;
        this.refreshSortOptionsLink();
      } else {
        this.sortOptions.order = this.constants.SORT_DIRECTION.desc;
        this.refreshSortOptionsLink();
      }
    }
  }

  refreshSortOptionsLink() {
    this.sortOptions = Object.assign({}, this.sortOptions);
  }
}
