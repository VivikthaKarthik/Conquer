import { Component } from '@angular/core';
import { LoadingService } from '../services/loader.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.isLoading$.subscribe((_isLoading) => {
      this.isLoading = _isLoading;
    });
  }
}
