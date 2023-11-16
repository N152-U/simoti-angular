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
import Expand from "@arcgis/core/widgets/Expand.js";
import Fullscreen from "@arcgis/core/widgets/Fullscreen.js";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import Home from "@arcgis/core/widgets/Home.js";

import { CatalogsService } from '@app/services/managment/catalogs/catalogs.service';
import { Municipality } from '@app/interfaces/municipalities';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  constructor(
    private mcs: CatalogsService,
    public router: Router
  ) { }

  @ViewChild('mapViewNode', { static: true }) private mapa!: ElementRef;
  public views: any = null;

  initializeMap(): Promise<any> {
    const container = this.mapa.nativeElement;

    /*---------------------------------------------------CREACION DE CAPAS Y GRUPOS--------------------------------------------------------------------------- */
    const MunicipalitiesLayer = new GraphicsLayer({
      id: "1000",
      title: "Alcaldías",
    });

    const graphicsLayer = new GraphicsLayer();

    const config = new GroupLayer({
      title: "General",
      visible: true,
      layers: [MunicipalitiesLayer, graphicsLayer]
    });

    graphicsLayer.title = "Poligono Trazado";
    /*----------------------------------------------------------------------------------------------------------------------------------------------------- */
    /*-----------------------------------------------------------------INICIAR MAPA--------------------------------------------------------------- */
    const webmap = new WebMap({
      portalItem: {
        id: 'aa1d3f80270146208328cf66d022e09c',
      },
      basemap: "gray-vector",
      layers: [config]
    });
    /*----------------------------------------------------------------------------------------------------------------------------------------------------- */
    const viewer = new MapView({
      container,
      map: webmap,
      zoom: 9,

      center: [-99.1425698, 19.2511604]
    });

    viewer.watch("zoom", function (newZoom) {
    });

    const capas = new LayerList({
      view: viewer,
      listItemCreatedFunction: async function (event) {
        let trigger = event.item;

        webmap.layers.remove(webmap.layers.getItemAt(1));

        await trigger.layer.when(); //carga de las capas al menu

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
    /*************Para expander o minimizar el cuadro de capas**************/
    const shapesExpand = new Expand({
      expandIconClass: "esri-icon-expand",
      view: viewer,
      content: capas,
      expanded: true,
    });

    viewer.ui.add(shapesExpand, {
      position: "top-left"
    });
    /**************Se habilita la pantalla completa**************/
    const fullscreen = new Fullscreen({
      view: viewer
    });

    viewer.ui.add(fullscreen, "top-right");
    /***************Trazado de poligonos personalizados***************/
    const sketch = new Sketch({
      layer: graphicsLayer,
      view: viewer,
      availableCreateTools: ["polygon", "rectangle", "circle"],
      creationMode: "update",
    });

    const sketchExpand = new Expand({
      expandIconClass: "esri-icon-expand",
      view: viewer,
      content: sketch,
      expanded: true,
    });

    viewer.ui.add(sketchExpand, "top-right");

    sketch.on("create", function (event) {
      if (event.state === "complete") {
        console.log("event", event.graphic);

        viewer.popup.features = [event.graphic];
        viewer.popup.visible = true;
      }
    });

    capas.on("trigger-action", (event) => {
      // The layer visible in the view at the time of the trigger.
      const visibleLayer = config.visible ? config : config;

      // Capture the action id.
      const accion = event.action.id;

      if (accion === "full-extent") {
        viewer.goTo(visibleLayer.set("zoom", 10));
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
          const element = shape.geo_shape.coordinates[0];

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
          MunicipalitiesLayer.add(polygonGraphic);
        });
      }
    );

    this.views = viewer;
    return this.views.when();
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
