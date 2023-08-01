import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  dataUser: any;

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    this.dataUser = this.auth.getTokenData();
  }
}
