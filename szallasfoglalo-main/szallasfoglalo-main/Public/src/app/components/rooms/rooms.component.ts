import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Room } from '../../interfaces/room';
import { ApiService } from '../../services/api.service';
import { RatingsComponent } from '../ratings/ratings.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RatingsComponent, RouterModule],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})

export class RoomsComponent implements OnInit {

  constructor(private api: ApiService){}

  rooms:Room[] = [
    {
      id: 'dsdsfasdfsaf',
      title: "Duna Szálló",
      address: "Baja, Szentháromság tér 1.",
      price: 4500,
      phone: "06-79/324-555",
      email: "dunaszallo@gmail.hu",
      description: "skdhfs jdgfkjds hfsa fjsahflkjsd hflkjsahfkjdsa fkjsahf kjsahfsakjdlj",
      rating: 3
    },
    {
      id: 'dsdfgsdfgsdfg',
      title: "Duna Szálló",
      address: "Baja, Szentháromság tér 1.",
      price: 4500,
      phone: "06-79/324-555",
      email: "dunaszallo@gmail.hu",
      description: "skdhfs jdgfkjds hfsa fjsahflkjsd hflkjsahfkjdsa fkjsahf kjsahfsakjdlj",
      rating: 4
    },
    {
      id: 'werwefdsgfdg',
      title: "Duna Szálló",
      address: "Baja, Szentháromság tér 1.",
      price: 4500,
      phone: "06-79/324-555",
      email: "dunaszallo@gmail.hu",
      description: "skdhfs jdgfkjds hfsa fjsahflkjsd hflkjsahfkjdsa fkjsahf kjsahfsakjdlj",
      rating: 2
    },
    {
      id: 'fherjtvhdfhsd',
      title: "Duna Szálló",
      address: "Baja, Szentháromság tér 1.",
      price: 4500,
      phone: "06-79/324-555",
      email: "dunaszallo@gmail.hu",
      description: "skdhfs jdgfkjds hfsa fjsahflkjsd hflkjsahfkjdsa fkjsahf kjsahfsakjdlj",
      rating: 1
    },
    {
      id: 'fgjgcvxvxyg',
      title: "Duna Szálló",
      address: "Baja, Szentháromság tér 1.",
      price: 4500,
      phone: "06-79/324-555",
      email: "dunaszallo@gmail.hu",
      description: "skdhfs jdgfkjds hfsa fjsahflkjsd hflkjsahfkjdsa fkjsahf kjsahfsakjdlj",
      rating: 5
    },
    {
      id: 'ertewrgwfns',
      title: "Duna Szálló",
      address: "Baja, Szentháromság tér 1.",
      price: 4500,
      phone: "06-79/324-555",
      email: "dunaszallo@gmail.hu",
      description: "skdhfs jdgfkjds hfsa fjsahflkjsd hflkjsahfkjdsa fkjsahf kjsahfsakjdlj",
      rating: 3
    }
  ]


  ngOnInit(): void {
    this.api.readAll('accomodations').subscribe(res => {
      this.rooms = res as Room[];
    })
  }
}
