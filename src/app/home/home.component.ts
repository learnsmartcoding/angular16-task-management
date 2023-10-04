import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {


  constructor(
    private titleService: Title
  ) {
    titleService.setTitle('Welcome to Task Manager | LearnSmartCoding');
  }

  ngOnInit(): void {
   
  }

  getTitle(title: string) {
    return `${title.substring(0, 50)}...`;
  }


}
