import { Component, Input } from '@angular/core';
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
}
