import { Component, EventEmitter, Output, OnInit } from "@angular/core";

import { AuthService } from "@app/services/auth/auth.service";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  openSidebar: boolean = false;
  user: any;
  faEyeSlash = faEyeSlash;
  hasUser: boolean = false;
  dataUser: any;

  menuSidebar = [
    {
      link_name: "Home",
      link: "/home",
      icon: "pi pi-home",
      sub_menu: []
    }, {
      link_name: "Admnistración",
      icon: "pi pi-cog",
      sub_menu: [{
        link_name: "Usuarios",
        link: "/managment/manage-users",
        icon: "pi pi-user",
        sub_menu: []
      }, {
        link_name: "Roles",
        link: "/managment/manage-roles",
        icon: "pi pi-id-card",
      }, {
        link_name: "Permisos",
        link: "/managment/manage-permissions",
        icon: "pi pi-key",
      }]
    }, {
      link_name: "Informes",
      link: "/reports",
      icon: "pi pi-file-edit",
      sub_menu: []
    }, {
      link_name: "Mapa",
      link: "/map",
      icon: "pi pi-map",
      sub_menu: []
    }
  ]
  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle("showMenu");
  }

  @Output() sideBar = new EventEmitter<boolean>();
  opener() {
    this.sideBar.emit(this.openSidebar);
  }
  constructor(private auth: AuthService) { }
  ngOnInit() {
    this.dataUser = this.auth.getTokenData();
  }

  logOut() {
    this.user = null;
    this.hasUser = false;
    this.auth.logOut();
  }
}
