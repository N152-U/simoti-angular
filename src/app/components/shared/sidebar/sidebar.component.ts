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
      ngxPermission: "READ.HOME",
      sub_menu: []
    }, {
      link_name: "Admnistración",
      icon: "pi pi-cog",
      ngxPermission: "READ.MANAGEMENT",
      sub_menu: [{
        link_name: "Usuarios",
        link: "/managment/manage-users",
        icon: "pi pi-user",
        ngxPermission_sub_menu: "READ.USER",
      }, {
        link_name: "Roles",
        link: "/managment/manage-roles",
        icon: "pi pi-id-card",
        ngxPermission_sub_menu: "READ.ROLE",
      }, {
        link_name: "Permisos",
        link: "/managment/manage-permissions",
        icon: "pi pi-key",
        ngxPermission_sub_menu: "READ.PERMISSION",
      }]
    },
    {
      link_name: "Mapa",
      link: "/map",
      icon: "pi pi-map",
      ngxPermission: "READ.MAP",
      sub_menu: []
    },
  ]
  showSubmenu(itemEl: HTMLElement,) {
    itemEl.classList.toggle("showMenu");
    const lastChild = itemEl.lastElementChild
    let numElements = lastChild?.childElementCount ?? 0;
    numElements = numElements - 1;
    if (numElements > 0) {
      document.documentElement.style.setProperty(`--count`, `${numElements * 50}px`);
    }
  }

  @Output() sideBar = new EventEmitter<boolean>();
  opener() {
    this.sideBar.emit(this.openSidebar);
  }
  constructor(private auth: AuthService) { }
  ngOnInit() {
    this.dataUser = this.auth.getTokenData();
    if (this.dataUser.pic == null) this.dataUser.pic = 'assets/images/user.png';
  }

  logOut() {
    this.user = null;
    this.hasUser = false;
    this.auth.logOut();
  }
}
