import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  host: {'class': 'search-bar'}
})

export class SearchBarComponent {
  public searchString = '';

  constructor(private router: Router) {}

  public onSearch(): void {
    this.router.navigate(['/search-result', this.searchString]);
  }
}
