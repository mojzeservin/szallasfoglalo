import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-lostpass',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lostpass.component.html',
  styleUrl: './lostpass.component.scss'
})

export class LostpassComponent {

  constructor(private api: ApiService, private message:MessageService){}

  email:string = '';

  sendmail(){
    if (!this.email){
      this.message.showMessage('Hiba', 'Add meg az e-mail címet!', 'danger');
      return;
    }

    this.api.read('users', 'email', 'eq', this.email).subscribe((res:any) => {
        if (res.length == 0){
          this.message.showMessage('Hiba', 'Nem regisztrált e-mail cím!', 'danger');
          return;
        }

        let data = {
          to: this.email,
          subject: "Elfelejtett jelszó visszaállítás",
          content: {
              link: "http://localhost:4200/restorepass/"+res[0].id+"/"+res[0].secret
          },
          template: "lostpass"
        }

        this.api.sendMail(data).subscribe((res:any) => {
          this.message.showMessage('Üzenet', res.message, 'info');
          this.email = '';
        });


      });

  }
}
