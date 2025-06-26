'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">simoti-angular documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-349f5647bc43253e5dfabfd9148353ea2b8fa619be5fce70a0d1916b12cec29e9acb6a90d63868f879c48d3af2496385eff85e304812e14fb623ddb1bb1d3ec4"' : 'data-bs-target="#xs-components-links-module-AppModule-349f5647bc43253e5dfabfd9148353ea2b8fa619be5fce70a0d1916b12cec29e9acb6a90d63868f879c48d3af2496385eff85e304812e14fb623ddb1bb1d3ec4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-349f5647bc43253e5dfabfd9148353ea2b8fa619be5fce70a0d1916b12cec29e9acb6a90d63868f879c48d3af2496385eff85e304812e14fb623ddb1bb1d3ec4"' :
                                            'id="xs-components-links-module-AppModule-349f5647bc43253e5dfabfd9148353ea2b8fa619be5fce70a0d1916b12cec29e9acb6a90d63868f879c48d3af2496385eff85e304812e14fb623ddb1bb1d3ec4"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MantainanceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MantainanceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ScrollToTopComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScrollToTopComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserUpdatePasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserUpdatePasswordComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-349f5647bc43253e5dfabfd9148353ea2b8fa619be5fce70a0d1916b12cec29e9acb6a90d63868f879c48d3af2496385eff85e304812e14fb623ddb1bb1d3ec4"' : 'data-bs-target="#xs-injectables-links-module-AppModule-349f5647bc43253e5dfabfd9148353ea2b8fa619be5fce70a0d1916b12cec29e9acb6a90d63868f879c48d3af2496385eff85e304812e14fb623ddb1bb1d3ec4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-349f5647bc43253e5dfabfd9148353ea2b8fa619be5fce70a0d1916b12cec29e9acb6a90d63868f879c48d3af2496385eff85e304812e14fb623ddb1bb1d3ec4"' :
                                        'id="xs-injectables-links-module-AppModule-349f5647bc43253e5dfabfd9148353ea2b8fa619be5fce70a0d1916b12cec29e9acb6a90d63868f879c48d3af2496385eff85e304812e14fb623ddb1bb1d3ec4"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ManagePermissionsModule.html" data-type="entity-link" >ManagePermissionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ManagePermissionsModule-d33d64e8a727c32706be0b50076bd2ddafbc35add8cc4172ed3df26abe05b38164777d1e4e35e87bdca5b389fa1b1b80f6da3258811e5fc5fc7b31fd901726fa"' : 'data-bs-target="#xs-components-links-module-ManagePermissionsModule-d33d64e8a727c32706be0b50076bd2ddafbc35add8cc4172ed3df26abe05b38164777d1e4e35e87bdca5b389fa1b1b80f6da3258811e5fc5fc7b31fd901726fa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ManagePermissionsModule-d33d64e8a727c32706be0b50076bd2ddafbc35add8cc4172ed3df26abe05b38164777d1e4e35e87bdca5b389fa1b1b80f6da3258811e5fc5fc7b31fd901726fa"' :
                                            'id="xs-components-links-module-ManagePermissionsModule-d33d64e8a727c32706be0b50076bd2ddafbc35add8cc4172ed3df26abe05b38164777d1e4e35e87bdca5b389fa1b1b80f6da3258811e5fc5fc7b31fd901726fa"' }>
                                            <li class="link">
                                                <a href="components/DetailPermissionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailPermissionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPermissionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPermissionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManagePermissionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagePermissionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewPermissionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewPermissionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ManagePermissionsRoutingModule.html" data-type="entity-link" >ManagePermissionsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ManageRolesModule.html" data-type="entity-link" >ManageRolesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ManageRolesModule-7ffe9d80056dde85c780f0e9c14253acad93cc0f20311783ea9bb32bb2897da713592eba91034070f1a491606baaa885d6357ed853566c92aa8ce9aca07f38c7"' : 'data-bs-target="#xs-components-links-module-ManageRolesModule-7ffe9d80056dde85c780f0e9c14253acad93cc0f20311783ea9bb32bb2897da713592eba91034070f1a491606baaa885d6357ed853566c92aa8ce9aca07f38c7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ManageRolesModule-7ffe9d80056dde85c780f0e9c14253acad93cc0f20311783ea9bb32bb2897da713592eba91034070f1a491606baaa885d6357ed853566c92aa8ce9aca07f38c7"' :
                                            'id="xs-components-links-module-ManageRolesModule-7ffe9d80056dde85c780f0e9c14253acad93cc0f20311783ea9bb32bb2897da713592eba91034070f1a491606baaa885d6357ed853566c92aa8ce9aca07f38c7"' }>
                                            <li class="link">
                                                <a href="components/DetailRoleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailRoleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditRoleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditRoleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageRolesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageRolesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewRoleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewRoleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ManageRolesRoutingModule.html" data-type="entity-link" >ManageRolesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ManageUsersModule.html" data-type="entity-link" >ManageUsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ManageUsersModule-9d956a83b0ec598fb8072d00c4b8abef0ab2146977975bbe08bf6e7072a20c0741da3861b2c73ef4b0ea8195f3362085439fbc79eeaf4af79f56469df9f53155"' : 'data-bs-target="#xs-components-links-module-ManageUsersModule-9d956a83b0ec598fb8072d00c4b8abef0ab2146977975bbe08bf6e7072a20c0741da3861b2c73ef4b0ea8195f3362085439fbc79eeaf4af79f56469df9f53155"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ManageUsersModule-9d956a83b0ec598fb8072d00c4b8abef0ab2146977975bbe08bf6e7072a20c0741da3861b2c73ef4b0ea8195f3362085439fbc79eeaf4af79f56469df9f53155"' :
                                            'id="xs-components-links-module-ManageUsersModule-9d956a83b0ec598fb8072d00c4b8abef0ab2146977975bbe08bf6e7072a20c0741da3861b2c73ef4b0ea8195f3362085439fbc79eeaf4af79f56469df9f53155"' }>
                                            <li class="link">
                                                <a href="components/DetailUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageUsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManageUsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewUserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ManageUsersRoutingModule.html" data-type="entity-link" >ManageUsersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ManagmentModule.html" data-type="entity-link" >ManagmentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ManagmentModule-ab3f8d04343eb415dd8161a9661d317e0930e7226240d628664ff236cce50ac2da48948b24741562f508a733ab41e93b4416fa457dc3f9e653b96eba9f9e2c68"' : 'data-bs-target="#xs-components-links-module-ManagmentModule-ab3f8d04343eb415dd8161a9661d317e0930e7226240d628664ff236cce50ac2da48948b24741562f508a733ab41e93b4416fa457dc3f9e653b96eba9f9e2c68"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ManagmentModule-ab3f8d04343eb415dd8161a9661d317e0930e7226240d628664ff236cce50ac2da48948b24741562f508a733ab41e93b4416fa457dc3f9e653b96eba9f9e2c68"' :
                                            'id="xs-components-links-module-ManagmentModule-ab3f8d04343eb415dd8161a9661d317e0930e7226240d628664ff236cce50ac2da48948b24741562f508a733ab41e93b4416fa457dc3f9e653b96eba9f9e2c68"' }>
                                            <li class="link">
                                                <a href="components/ManagmentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManagmentComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ManagmentRoutingModule.html" data-type="entity-link" >ManagmentRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PatientModule.html" data-type="entity-link" >PatientModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-PatientModule-52dcf03912fa9e9e8ea9c89034e9d3c50a3fff7e7e338557ca83d76b8dc22fe06fd3026c8530ab4454b2f2095a460acbd64ca4657355be3f82d8f9600f2d29dd"' : 'data-bs-target="#xs-components-links-module-PatientModule-52dcf03912fa9e9e8ea9c89034e9d3c50a3fff7e7e338557ca83d76b8dc22fe06fd3026c8530ab4454b2f2095a460acbd64ca4657355be3f82d8f9600f2d29dd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PatientModule-52dcf03912fa9e9e8ea9c89034e9d3c50a3fff7e7e338557ca83d76b8dc22fe06fd3026c8530ab4454b2f2095a460acbd64ca4657355be3f82d8f9600f2d29dd"' :
                                            'id="xs-components-links-module-PatientModule-52dcf03912fa9e9e8ea9c89034e9d3c50a3fff7e7e338557ca83d76b8dc22fe06fd3026c8530ab4454b2f2095a460acbd64ca4657355be3f82d8f9600f2d29dd"' }>
                                            <li class="link">
                                                <a href="components/DetailPatientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DetailPatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditPatientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditPatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FallDetectorPatientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FallDetectorPatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeartRatePatientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeartRatePatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LocationPatientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocationPatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewPatientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewPatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OxygenSaturationPatientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OxygenSaturationPatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReviewPatientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewPatientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TemperaturePatientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TemperaturePatientComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-PatientModule-52dcf03912fa9e9e8ea9c89034e9d3c50a3fff7e7e338557ca83d76b8dc22fe06fd3026c8530ab4454b2f2095a460acbd64ca4657355be3f82d8f9600f2d29dd"' : 'data-bs-target="#xs-pipes-links-module-PatientModule-52dcf03912fa9e9e8ea9c89034e9d3c50a3fff7e7e338557ca83d76b8dc22fe06fd3026c8530ab4454b2f2095a460acbd64ca4657355be3f82d8f9600f2d29dd"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PatientModule-52dcf03912fa9e9e8ea9c89034e9d3c50a3fff7e7e338557ca83d76b8dc22fe06fd3026c8530ab4454b2f2095a460acbd64ca4657355be3f82d8f9600f2d29dd"' :
                                            'id="xs-pipes-links-module-PatientModule-52dcf03912fa9e9e8ea9c89034e9d3c50a3fff7e7e338557ca83d76b8dc22fe06fd3026c8530ab4454b2f2095a460acbd64ca4657355be3f82d8f9600f2d29dd"' }>
                                            <li class="link">
                                                <a href="pipes/BooleanToYesNoPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BooleanToYesNoPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PatientRoutingModule.html" data-type="entity-link" >PatientRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/patientModel.html" data-type="entity-link" >patientModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/PermissionModel.html" data-type="entity-link" >PermissionModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/roleModel.html" data-type="entity-link" >roleModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel.html" data-type="entity-link" >UserModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserModel-1.html" data-type="entity-link" >UserModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/userTypeModel.html" data-type="entity-link" >userTypeModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CatalogsService.html" data-type="entity-link" >CatalogsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManagePermissionsService.html" data-type="entity-link" >ManagePermissionsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManageRolesService.html" data-type="entity-link" >ManageRolesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManageUsersService.html" data-type="entity-link" >ManageUsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PatientsService.html" data-type="entity-link" >PatientsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestsPendingService.html" data-type="entity-link" >RequestsPendingService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/AuthInterceptor.html" data-type="entity-link" >AuthInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Capacity.html" data-type="entity-link" >Capacity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Doctor.html" data-type="entity-link" >Doctor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Facility.html" data-type="entity-link" >Facility</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Module.html" data-type="entity-link" >Module</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Municipality.html" data-type="entity-link" >Municipality</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MunicipalityEdomex.html" data-type="entity-link" >MunicipalityEdomex</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Relationships.html" data-type="entity-link" >Relationships</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Roles.html" data-type="entity-link" >Roles</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Settlement.html" data-type="entity-link" >Settlement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Status.html" data-type="entity-link" >Status</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tutor.html" data-type="entity-link" >Tutor</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TypesOfUsers.html" data-type="entity-link" >TypesOfUsers</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});