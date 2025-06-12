import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//Http Requests
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


//Services
import { AuthService } from './services/auth/auth.service';
//Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

//Models
import { UserModel } from './models/user/user.module';
import { AppRoutingModule } from './app-routing.module';

//Installed extra modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalModule } from '@angular/cdk/portal';
import { ToastrModule } from 'ngx-toastr';
// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ScrollToTopComponent } from './components/shared/scroll-to-top/scroll-to-top.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AboutComponent } from './components/pages/about/about.component';
import { MantainanceComponent } from './components/pages/mantainance/mantainance.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { HeaderComponent } from './components/shared/header/header.component';

//primeng
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { DividerModule } from "primeng/divider";
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeTableModule } from 'primeng/treetable';
import { NgxPermissionsModule } from 'ngx-permissions';
import { BlockUIModule } from 'primeng/blockui';
import { MapComponent } from './components/pages/map/map.component';
import { UserDetailComponent } from './components/shared/profile/user-detail/user-detail.component';
import { UserUpdatePasswordComponent } from './components/shared/profile/user-update-password/user-update-password.component';
import { Select2Module } from 'ng-select2-component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    ScrollToTopComponent,
    SidebarComponent,
    AboutComponent,
    MantainanceComponent,
    ProfileComponent,
    HeaderComponent,
    MapComponent,
    UserDetailComponent,
    UserUpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    BrowserAnimationsModule,
    PortalModule,
    BsDatepickerModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    NgxPermissionsModule.forChild(),
    AccordionModule,
    TableModule,
    ToolbarModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    TooltipModule,
    TreeTableModule,
    BlockUIModule,
    PanelModule,
    InputNumberModule,
    RippleModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    TabViewModule,
    MenuModule,
    FileUploadModule,
    RatingModule,
    CardModule,
    DividerModule,
    ToastrModule,
    NgxCaptchaModule,
    DataTablesModule,
    Select2Module
  ],
  providers: [UserModel, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
    { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
  exports: [
    BsDatepickerModule,
    NgxPermissionsModule,
    Select2Module,
  ]
})
export class AppModule { }
