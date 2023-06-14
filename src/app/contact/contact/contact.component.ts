import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public plantMasteryBackground = {src: 'assets/images/plant_mastery_1.png'};
  constructor() {
  }

  ngOnInit(): void {
  }

}
