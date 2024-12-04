import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Room } from '../../interfaces/room';
import { RatingsComponent } from '../ratings/ratings.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-roominfo',
  standalone: true,
  imports: [RouterModule, RatingsComponent, FullCalendarModule],
  templateUrl: './roominfo.component.html',
  styleUrl: './roominfo.component.scss'
})

export class RoominfoComponent implements OnInit{
  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ){}

  roomID: string = "";

  room:Room =  {
      id: 'dsdsfasdfsaf',
      title: "Duna Szálló",
      address: "Baja, Szentháromság tér 1.",
      price: 4500,
      phone: "06-79/324-555",
      email: "dunaszallo@gmail.hu",
      description: "skdhfs jdgfkjds hfsa fjsahflkjsd hflkjsahfkjdsa fkjsahf kjsahfsakjdlj",
      rating: 3
  }

  calendarOptions:CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    editable: false,
    selectable: false,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    }
  }

  ngOnInit(): void {
    this.roomID = this.activatedRoute.snapshot.params['id'];

    this.api.read('accomodations', this.roomID).subscribe(res =>{
      if (res){
        this.room = (res as Room[])[0];
      }
    });
  }
}
