import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IQuestion } from '../../entities/question';

@Component({
  selector: 'app-quick-panel',
  templateUrl: './quick-panel.component.html',
  styleUrls: ['./quick-panel.component.scss']
})
export class QuickPanelComponent {
  @Input() questions: IQuestion[];
  @Input() searchParam: string;
  @Input() searchValue: string;
  @Output() onAuthor = new EventEmitter<number>();
  @Output() onTag = new EventEmitter<string>();

  public onTagClick(tag: string) {
    this.onTag.emit(tag);
  }

  public onAuthorClick(authorId: number) {
    this.onAuthor.emit(authorId);
  }
}
