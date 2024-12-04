import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './services/theme.service';
import { AlertComponent } from "./components/alert/alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, NavbarComponent, FooterComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

  constructor(public themeService: ThemeService ){}
  theme = '';
  appName = 'Szállásfoglaló App';
  company = 'Bajai SZC - Türr István Technikum';
  author = '13.a Szoftverfejlesztő';

  toggleTheme(){
    this.themeService.toggleTheme();
  }

}
