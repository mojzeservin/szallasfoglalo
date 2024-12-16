import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Room } from '../../interfaces/room';
import { RatingsComponent } from '../ratings/ratings.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../interfaces/booking';
import { MessageService } from '../../services/message.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-roominfo',
  standalone: true,
  imports: [RouterModule, RatingsComponent, FullCalendarModule, CommonModule, FormsModule],
  templateUrl: './roominfo.component.html',
  styleUrl: './roominfo.component.scss'
})

export class RoominfoComponent implements OnInit{
  constructor(
    private api: ApiService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private message: MessageService
  ){}

  roomID: string = "";
  isLoggedIn:boolean = false;

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

  booking:Booking = {
    id: '',
    userID: '',
    accomID: '',
    bookingDate: '',
    startDate: '',
    endDate: '',
    personCount: 0,
    checkout: 0
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

    this.auth.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = res;
    });

    this.roomID = this.activatedRoute.snapshot.params['id'];

    this.api.read('accomodations', 'id', 'eq', this.roomID).subscribe(res =>{
      if (res){
        this.room = (res as Room[])[0];
      }
    });

   this.getBookings();

  }


  getBookings(){
    this.api.read('bookings', 'accomID', 'eq', this.roomID).subscribe((res:any) => {

      if (res){

      let events: any[] = [];
        console.log(res)
      res.forEach((item:any) => {
        events.push({
          title: 'Foglalt',
          start: item.startDate,
          end: item.endDate // itt gy napot hozzá kell adni
        });
      });

      this.calendarOptions.events = events;
      }
    });
  }

  calculatePrice(){
    if (!this.booking.startDate || !this.booking.endDate || !this.booking.personCount ){
      return;
    }

    const start = new Date(this.booking.startDate);
    const end = new Date(this.booking.endDate);
    if (end <= start){
      return;
    }
    const diff = ((end.getTime() - start.getTime()) / (24 * 3600 * 1000)) ; // így kapjuk meg az éjszakák számát
    this.booking.checkout = diff * this.booking.personCount * this.room.price;
  }

  addBooking(){
    this.booking.userID = this.auth.loggedUser().id;
    this.booking.accomID = this.room.id;

    let data = {
      id: uuid.v4(),
      startDate: this.booking.startDate,
      endDate: this.booking.endDate,
      accomID: this.booking.accomID,
      userID: this.booking.userID,
      personCount: this.booking.personCount,
      checkout: this.booking.checkout
    }

    this.api.insert('bookings', data).subscribe((res:any) => {
      if (res){
        this.message.showMessage('OK', 'Foglalás rögzítve!', 'success');
        this.getBookings();
      }
    });
  }

}
