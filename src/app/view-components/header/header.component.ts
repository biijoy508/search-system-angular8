import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() activeView: string;
  constructor() { }

  ngOnInit() {
    // const selectedMenuItem = document.querySelector('a[href=\'\/' + this.activeView + '\']');
    // if (selectedMenuItem) {
    //   selectedMenuItem.classList.add('active');
    // }
  }
}
