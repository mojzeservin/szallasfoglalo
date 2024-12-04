import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss'
})

export class RatingsComponent implements OnInit {
  @Input('ratings') ratings = 0;

  filledstars:number[] = [];
  unfilledstars:number[] = [];

  ngOnInit(): void {

    this.filledstars = Array.from({ length: this.ratings }, (_, i) => i);
    this.unfilledstars = Array.from({ length: 5 - this.ratings }, (_, i) => i);

  }

}
