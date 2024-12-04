import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-lostpass',
  standalone: true,
  imports: [],
  templateUrl: './lostpass.component.html',
  styleUrl: './lostpass.component.scss'
})

export class LostpassComponent {
  constructor(private api: ApiService){}
}
