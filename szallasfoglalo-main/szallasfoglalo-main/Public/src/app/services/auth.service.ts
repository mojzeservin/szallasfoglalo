import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  private tokenName = environment.tokenName;

  private isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  private hasToken():boolean{
    return !!localStorage.getItem(this.tokenName);
  }

  login(token:string){
    localStorage.setItem(environment.tokenName, token);
    this.isLoggedIn.next(true);
  }

  logout(){
    localStorage.removeItem(environment.tokenName);
    this.isLoggedIn.next(false);
  }

}
