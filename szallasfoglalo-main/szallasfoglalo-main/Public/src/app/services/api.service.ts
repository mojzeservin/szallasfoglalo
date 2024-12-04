import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  private tokenName = environment.tokenName;
  private server = environment.serverUrl;

  getToken():String | null{
    return localStorage.getItem(this.tokenName);
  }

  tokenHeader():{ headers: HttpHeaders }{
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return { headers }
  }

  registration(table:string, data:object){
    return this.http.post(this.server + '/reg/' + table, data);
  }

  login(table:string, data:object){
    return this.http.post(this.server + '/login/' + table, data);
  }

  read(table:string, id:string){
    return this.http.get(this.server + '/public/'+table+'/id/eq/'+id);
  }

  readAll(table: string){
    return this.http.get(this.server + '/public/' + table);
  }

  // token-el védett metódusok:

  select(table: string, id:string){
    return this.http.get(this.server + '/'+table+'/id/eq/'+id, this.tokenHeader());
  }

  selectAll(table: string){
    return this.http.get(this.server + '/' + table, this.tokenHeader());
  }

  insert(table: string, data:object){
    return this.http.post(this.server + '/'+table, data, this.tokenHeader());
  }

  update(table:string, id:string, data:object){
    return this.http.post(this.server + '/'+table+'/id/eq/'+id, data, this.tokenHeader());
  }

  delete(table:string, id:string){
    return this.http.delete(this.server + '/'+table+'/id/eq/'+id, this.tokenHeader());
  }

}
