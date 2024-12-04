import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})

export class LogoutComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private message: MessageService
  ){}

  ngOnInit(): void {
    this.auth.logout();
    this.message.showMessage('OK', 'Sikeres kijelentkezés', 'success');
    this.router.navigateByUrl('/login');
  }
}
