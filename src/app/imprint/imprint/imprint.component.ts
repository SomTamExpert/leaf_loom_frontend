import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.component.html',
  styleUrls: ['./imprint.component.scss']
})
export class ImprintComponent implements OnInit {

  public plantMasteryBackground = {src: 'assets/images/plant_mastery_1.png'};

  constructor() { }

  ngOnInit(): void {
  }

}
