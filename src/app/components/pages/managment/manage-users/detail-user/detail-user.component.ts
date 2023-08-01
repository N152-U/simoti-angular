import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ManageUsersService } from '@app/services/managment/manage-users/manage-users.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit{
  
  public user: any = {}
  public hash: string = '';
  
  constructor(
    private mus: ManageUsersService,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.hash = this.route.snapshot.params["hash"];

    this.mus.GetUserByHash(this.hash).subscribe((res) => {
      this.user = res;
    });
  }

}
