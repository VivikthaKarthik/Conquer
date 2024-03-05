import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'ResonanceAdmin';
  constructor(private router: Router) {}
  ngOnInit() {
    // Intercept all clicks on HTML links
    // document.body.addEventListener('click', (event: any) => {
    //   if (event.target.tagName === 'A') {
    //     const href = event.target.getAttribute('href');
    //     // Check if the link is not an external link (starts with http or https)
    //     if (href && !/^https?:\/\//i.test(href)) {
    //       // Check if the link exists in Angular routes
    //       const exists = this.router.config.some((route) => {
    //         return route.path === href.substring(1);
    //       });
    //       // If the link doesn't exist, navigate to the 404 page
    //       if (!exists) {
    //         this.router.navigate(['/404']);
    //         event.preventDefault(); // Prevent the default navigation behavior
    //       }
    //     }
    //   }
    // });
  }
}
