import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() openSidebar: boolean = false;
  user: any;
  hasUser: boolean = false;
  dataUser = {
    pic: 'assets/images/user.png',
    username: 'Nombre',
    rol: 'Rol',
  };

  @Output() sideBar = new EventEmitter<boolean>();
  opener() {
    this.sideBar.emit(this.openSidebar);
  }

  constructor(private auth: AuthService, private el: ElementRef) {}

  menuSidebar = [
    {
      link_name: 'Home',
      link: '/home',
      icon: 'pi pi-home',
      ngxPermission: 'READ.HOME',
      sub_menu: [],
    },
    {
      link_name: 'Admnistración',
      icon: 'pi pi-cog',
      ngxPermission: 'READ.MANAGEMENT',
      sub_menu: [
        {
          link_name: 'Usuarios',
          link: '/managment/manage-users',
          icon: 'pi pi-user',
          ngxPermission_sub_menu: 'READ.USER',
        },
        {
          link_name: 'Roles',
          link: '/managment/manage-roles',
          icon: 'pi pi-id-card',
          ngxPermission_sub_menu: 'READ.ROLE',
        },
        {
          link_name: 'Permisos',
          link: '/managment/manage-permissions',
          icon: 'pi pi-key',
          ngxPermission_sub_menu: 'READ.PERMISSION',
        },
      ],
    },
    {
      link_name: 'Pacientes',
      link: '/patient',
      icon: 'pi pi-id-card',
      ngxPermission: 'READ.PATIENT',
      sub_menu: [],
    },
    {
      link_name: 'Mapa',
      link: '/map',
      icon: 'pi pi-map',
      ngxPermission: 'READ.MAP',
      sub_menu: [],
    },
  ];
  showSubmenu(itemEl: HTMLElement, indexEl: number) {
    itemEl.classList.toggle('showMenu');
    var menu = document.getElementsByClassName('showMenu');
    if (menu.length > 1) {
      for (let index = 0; index < menu.length; index++) {
        if (parseInt(menu[index].id) != indexEl) {
          menu[index]?.classList.remove('showMenu');
        }
      }
    }
    const lastChild = itemEl.lastElementChild;
    let numElements = lastChild?.childElementCount ?? 0;
    numElements = numElements - 1;
    if (numElements > 0) {
      document.documentElement.style.setProperty(
        `--count`,
        `${numElements * 50}px`
      );
    }
  }

  ngOnInit() {
    this.dataUser = this.auth.getTokenData();
    if (this.dataUser.pic == null)
      this.dataUser.pic = 'assets/images/user.png';

    const child = document.querySelector('.nav-link');
    const parent = document.querySelector('.nav-links');

    child?.addEventListener('mouseenter', () => {
      parent?.classList.add('hovered');
    });

    child?.addEventListener('mouseleave', () => {
      parent?.classList.remove('hovered');
    });
  }

  logOut() {
    this.hasUser = false;
    this.auth.logOut();
  }
}
