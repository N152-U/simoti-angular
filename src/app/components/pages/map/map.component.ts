import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";

import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Graphic from "@arcgis/core/Graphic.js";
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";
import Point from "@arcgis/core/geometry/Point";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import Polygon from "@arcgis/core/geometry/Polygon.js";
import LayerList from "@arcgis/core/widgets/LayerList.js";

import { ManageModulesService } from '@app/services/managment/manage-modules/manage-modules.service';
import { ManageFacilitiesService } from '@app/services/managment/manage-facilities/manage-facilities.service';
import { CatalogsService } from '@app/services/managment/catalogs/catalogs.service';
import { Module } from '@app/interfaces/modules';
import { Facility } from '@app/interfaces/facilities';
import { Municipality } from '@app/interfaces/municipalities';
import { HypochloriteEgressService } from '@app/services/hypochlorite/egress/hypochlorite-egress.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  constructor(
    private mms: ManageModulesService,
    private mfs: ManageFacilitiesService,
    private mcs: CatalogsService,
    private hes: HypochloriteEgressService,
    public router: Router
  ) { }

  @ViewChild('mapViewNode', { static: true }) private mapa!: ElementRef;
  public views: any = null;

  initializeMap(): Promise<any> {
    const container = this.mapa.nativeElement;
    //19.408520, -99.133651
    /*---------------------------------------------------CREACION DE CAPAS Y GRUPOS--------------------------------------------------------------------------- */
    const AlcaldiasLayer = new GraphicsLayer({
      id: "1000",
      title: "Alcaldías",
    });

    const PozosLayer = new GraphicsLayer({
      id: "1001",
      title: "Pozos",
      visible: false

    });
    const BombaLayer = new GraphicsLayer({
      id: "1002",
      title: "Rebombeo",
      visible: false
    });
    const TanqueLayer = new GraphicsLayer({
      id: "1003",
      title: "Tanque",
      visible: false
    });
    const PlantaLayer = new GraphicsLayer({
      id: "1004",
      title: "Planta Potabilizadora",
      visible: false
    });
    const TratamientoLayer = new GraphicsLayer({
      id: "1005",
      title: "Planta de Tratamiento",
      visible: false
    });
    const ManantialLayer = new GraphicsLayer({
      id: "1005",
      title: "Manantial",
      visible: false
    });
    const ModuloLayer = new GraphicsLayer({
      id: "1007",
      title: "Módulos"
    });
    const instalacionesGroup = new GroupLayer({
      title: "Instalaciones",
      visible: true,
      //visibilityMode: "exclusive",
      layers: [TratamientoLayer, TanqueLayer, BombaLayer, PozosLayer, PlantaLayer, ModuloLayer, ManantialLayer]
    });
    const config = new GroupLayer({
      title: "General",
      visible: true,
      //visibilityMode: "exclusive",
      layers: [instalacionesGroup, AlcaldiasLayer]
    });
    /*----------------------------------------------------------------------------------------------------------------------------------------------------- */
    /*-----------------------------------------------------------------INICIAR MAPA--------------------------------------------------------------- */
    const webmap = new WebMap({
      portalItem: {
        id: 'aa1d3f80270146208328cf66d022e09c',
      },
      layers: [config]
    });
    /*----------------------------------------------------------------------------------------------------------------------------------------------------- */
    //AGREGAR CAPAS AL MAPA
    // webmap.add(graphicsLayer,0);
    //webmap.add()
    // webmap.add(graphicsLayer2,1);
    // webmap.add(GarzaLayer,2);
    //////////////////////////////////////
    const viewer = new MapView({
      container,
      map: webmap,
      zoom: 11,
      center: [-99.1443, 19.32]
    });

    const capas = new LayerList({
      view: viewer,
      listItemCreatedFunction: async function (event) {
        let trigger = event.item;
        //
        webmap.layers.remove(webmap.layers.getItemAt(1));

        await trigger.layer.when(); //carga de las capas al menu
        //console.log(webmap.layers);
        //console.log("divisor");
        if (trigger.title == "general") {
          trigger.actionsSections = [[{
            title: "vision general",
            className: "esri-icon-zoom-out-fixed",
            id: "full-extent"
          }], [
            {
              title: "Aumentar opacidad",
              className: "esri-icon-up",
              id: "increase-opacity"
            },
            {
              title: "Disminuir opacidad",
              className: "esri-icon-down",
              id: "decrease-opacity"
            }
          ]
          ];
        }
      }
    });
    viewer.ui.add(capas, {
      position: "top-right"
    });
    capas.on("trigger-action", (event) => {
      // The layer visible in the view at the time of the trigger.
      const visibleLayer = config.visible ? config : config;

      // Capture the action id.
      const accion = event.action.id;

      if (accion === "full-extent") {
        viewer.goTo(visibleLayer.set("zoom", 10));
        console.log("fuera")
      } else if (accion === "increase-opacity") {
        if (visibleLayer.opacity < 1) {
          visibleLayer.opacity += 0.25;
        }
      } else if (accion === "decrease-opacity") {
        if (visibleLayer.opacity > 0) {
          visibleLayer.opacity -= 0.25;
        }
      }

    });

    this.mcs.GetAllMunicipalitiesShapes().subscribe(
      (res: Municipality[]) => {
        res.forEach(shape => {
          const element = shape.object.coordinates;

          let rings = element;

          const polygon = new Polygon({
            hasM: false,
            hasZ: false,
            rings: rings
          });

          const simpleFillSymbol = {
            type: "simple-fill",
            color: [0, 0, 0, 0.07],
            outline: {
              color: [0, 0, 0, 0.5],
              width: 1
            }
          };

          const polygonGraphic = new Graphic({
            geometry: polygon,
            symbol: simpleFillSymbol,

          });
          AlcaldiasLayer.add(polygonGraphic);
        });
      }
    );

    this.mfs.getAllFacilitiesPoints().subscribe(
      (res: Facility[]) => {

        res.forEach(facility => {
          const point = new Point({
            longitude: parseFloat(facility.longitude),
            latitude: parseFloat(facility.latitude)
          });
          const simpleMarkerSymbol = new PictureMarkerSymbol({
            url: facility.icon_url,
            width: "24px",
            height: "24px"
          });
          const attributes = {
            id: facility.id,
            Name: facility.name,
            Description: "<b>Tipo de intalacion: </b>" + facility.facilityType +

              " "

              + "<br><br><a target='_self' href='" + this.router['location']._locationStrategy._platformLocation._location.origin + "/#/manage-facilities/detail-facility/" + facility.id + "/map'>Ver Instalacion</a>"
          }
          // const popupTemplate = {
          //   title: "{Name}",
          //   content: "{Description}"
          // }
          const pointGraphic = new Graphic({
            geometry: point, //cords
            symbol: simpleMarkerSymbol, //img
            attributes: attributes,
            popupTemplate: {
              title: "{name}",
              content: this.getInformation
            }
          });


          if (facility.facilityType == "POZO") {
            PozosLayer.add(pointGraphic);
          } else if (facility.facilityType == "MANANTIAL") {
            ManantialLayer.add(pointGraphic);
          } else if (facility.facilityType == "TANQUE") {
            TanqueLayer.add(pointGraphic);
          } else if (facility.facilityType == "REBOMBEO") {
            BombaLayer.add(pointGraphic);
          } else if (facility.facilityType == "PLANTA DE TRATAMIENTO") {
            TratamientoLayer.add(pointGraphic);
          } else {
            PlantaLayer.add(pointGraphic);
          }

        });
      }
    );

    this.mms.getAllModulesPoints().subscribe(
      (res: Module[]) => {
        res.forEach(module => {
          const point = new Point({
            longitude: parseFloat(module.longitude),
            latitude: parseFloat(module.latitude)
          });
          const simpleMarkerSymbols = new PictureMarkerSymbol({
            url: "assets/images/water-treatment-building.png",
            width: "30px",
            height: "30px",
          });
          const attributes = {
            Name: module.name,
            Description: "<br><br><a target='_self' href='" + this.router['location']._locationStrategy._platformLocation._location.origin + "/#/manage-modules/detail-module/" + module.id + "/map'>Ver Módulo</a>"
          }
          const popupTemplate = {
            title: "{Name}",
            content: "{Description}"
          }
          const pointGraphic = new Graphic({
            geometry: point,
            symbol: simpleMarkerSymbols,
            attributes: attributes,
            popupTemplate: popupTemplate
          });
          ModuloLayer.add(pointGraphic);
        });
      }
    );

    this.views = viewer;
    return this.views.when();
  }

  async getInformation(target: any) {
    let data = '';
    console.log(target.graphic.attributes.id);
    await this.hes.getlastSupplyByFacilityId(target.graphic.attributes.id).subscribe(
      (res) => {
        console.log(res);
      }
    );
    return data;
  }

  ngOnInit(): void {
    this.initializeMap().then(() => {
    });
  }

  ngOnDestroy(): void {
    if (this.views) {
      this.views.destroy();
    }
  }
}
