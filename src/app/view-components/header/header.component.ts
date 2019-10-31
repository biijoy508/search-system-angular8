import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @Input() activeView: string;
  constructor() { }

  ngAfterViewInit() {

    let menyItemQueryParameter = '[href=\"\#\/' + this.activeView + '\"]';
    const selectedMenuItem = document.querySelector(menyItemQueryParameter);

    if (selectedMenuItem) {
      selectedMenuItem.classList.add('active');
      selectedMenuItem.setAttribute("routerLinkActive", "active");
    }
  }
}
