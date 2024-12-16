import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';
import * as CryptoJS from 'crypto-js';
import * as uuid from 'uuid';

@Component({
  selector: 'app-restorepass',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './restorepass.component.html',
  styleUrl: './restorepass.component.scss'
})

export class RestorepassComponent implements OnInit{
  newpass:string = '';
  newpassconfirm:string = '';
  userID:string = '';
  secret:string = '';
  oldpassHash:string = ''
  passwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private message: MessageService,
    private router: Router
  ){}

  changeable:boolean = false;

  ngOnInit(): void {
    this.userID = this.activatedRoute.snapshot.params['userId'];
    this.secret = this.activatedRoute.snapshot.params['secret'];

    this.api.read('users', 'id', 'eq', this.userID).subscribe((res:any) => {
      if (res){
        if (res[0].secret != this.secret){
          this.changeable = false;
          return;
        }
        this.changeable = true;
        this.oldpassHash = res[0].passwd;
      }
    });
  }

  save(){
    if (!this.newpass || !this.newpassconfirm){
      this.message.showMessage('Hiba', 'Nem adtál meg minden adatot!', 'danger');
      return;
    }

    if (this.newpass != this.newpassconfirm){
      this.message.showMessage('Hiba', 'A megadott jelszavak nem egyeznek!', 'danger');
      return;
    }

    if (!this.newpass.match(this.passwdRegExp)){
      this.message.showMessage('Hiba', 'A megadott jelszavak nem elég biztonságos!', 'danger');
      return;
    }

    this.newpass = CryptoJS.SHA1(this.newpass).toString();
    if (this.newpass == this.oldpassHash){
      this.message.showMessage('Hiba', 'A megadott jelszó megegyezik az jelenlegivel!', 'danger');
      return;
    }

    let data = {
      passwd: this.newpass,
      secret: uuid.v4()
    }
    this.api.updatePasswd(this.userID, data).subscribe(res => {
        this.message.showMessage('Ok', 'Jelszó módosítva!', 'success');
        this.router.navigate(['/login']);
    });
  }
}
