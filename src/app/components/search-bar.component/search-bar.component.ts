import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent {
  @HostBinding('class') class = 'search-bar';
  public searchString = '';

  constructor(private router: Router) {}

  public onSearch(): void {
    this.router.navigate(['/search-result', this.searchString]);
  }
}
