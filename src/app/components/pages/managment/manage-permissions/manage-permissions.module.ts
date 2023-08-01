import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TreeTableModule } from 'primeng/treetable';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { NgxPermissionsModule } from 'ngx-permissions';

import { ManagePermissionsRoutingModule } from './manage-permissions-routing.module';
import { ManagePermissionsComponent } from './manage-permissions.component';
import { DetailPermissionComponent } from './detail-permission/detail-permission.component';
import { EditPermissionComponent } from './edit-permission/edit-permission.component';
import { NewPermissionComponent } from './new-permission/new-permission.component';


@NgModule({
  declarations: [
    ManagePermissionsComponent,
    DetailPermissionComponent,
    EditPermissionComponent,
    NewPermissionComponent
  ],
  imports: [
    CommonModule,
    ManagePermissionsRoutingModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
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
    NgxPermissionsModule.forChild(),
  ]
})
export class ManagePermissionsModule { }
