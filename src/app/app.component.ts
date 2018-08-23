import { Component } from '@angular/core';
import { slideAnimation } from './animate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideAnimation]
})
export class AppComponent {
  title = 'stack-client';
}
