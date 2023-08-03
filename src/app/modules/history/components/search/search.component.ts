import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayListBodyComponent } from '@shared/components/play-list-body/play-list-body.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() callbackData: EventEmitter<any> = new EventEmitter()

  src: string = ''

  constructor() { }

  ngOnInit(): void {
  }

  callSearch(term: any): void {
    if (term.length >= 3) {
      this.callbackData.emit(term)
      console.log('🔴 Llamamos a nuestra API HTTP GET---> ', term);
    }
  }

}