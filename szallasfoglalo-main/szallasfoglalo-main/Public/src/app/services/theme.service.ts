import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {
  private readonly themeKey = 'szallasAppTheme';
  private isDarkMode:boolean = false;
  private themeSubject = new BehaviorSubject<string>(this.getInitialTheme());
  public  themeSubject$ = this.themeSubject.asObservable();

  constructor() {
    this.saveTheme(this.themeSubject.value);
  }

  private saveTheme(theme: string){
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem(this.themeKey, theme);
    this.themeSubject.next(theme);
  }

  toggleTheme(){
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    this.saveTheme(theme)
  }

  private getInitialTheme(){
    const storedTheme = localStorage.getItem(this.themeKey);
    this.isDarkMode = storedTheme === 'dark';
    return this.isDarkMode ? 'dark': 'light';
  }
}
