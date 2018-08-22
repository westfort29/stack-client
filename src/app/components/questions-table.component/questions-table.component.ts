import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IQuestion } from '../../entities/question';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html'
})
export class QuestionsTableComponent {
  @Input() questions: IQuestion[];
  @Output() onAuthor = new EventEmitter<number>();
  @Output() onTag = new EventEmitter<string>();

  public onTagClick(tag: string) {
    this.onTag.emit(tag);
  }

  public onAuthorClick(authorId: number) {
    this.onAuthor.emit(authorId);
  }

}
