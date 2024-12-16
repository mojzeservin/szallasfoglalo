import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from '../../interfaces/menuitem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit{

  constructor(private auth:AuthService){}

  items:MenuItem[] = [];

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(res => {
      this.setupMenu(res);
    });
  }

  setupMenu(isLoggedIn:boolean){
    this.items = [
      { label: "Szállások", url: '/rooms' },
      ...(isLoggedIn) ? [
        ...(this.auth.isAdmin()) ? [
          { label: "Szállások kezelése", url: '/admin/rooms' },
          { label: "Foglalások kezelése", url: '/admin/bookings' },
          { label: "Felhasználók kezelése", url: '/admin/users' },
          { label: "Kilépés", url: '/logout' }
        ] : [
          { label: "Foglalásaim", url: '/bookings' },
          { label: "Kilépés", url: '/logout' }
        ]

      ] : [
        { label: "Belépés", url: '/login' },
        { label: "Regisztráció", url: '/registration'}
      ]
    ];
  }

}
