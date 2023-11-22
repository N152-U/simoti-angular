import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Select2Data, Select2Option } from 'ng-select2-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
import TimeSlider from "@arcgis/core/widgets/TimeSlider";
import DistanceMeasurement2D from "@arcgis/core/widgets/DistanceMeasurement2D.js";
import Basemap from '@arcgis/core/Basemap';

import { CatalogsService } from '@app/services/managment/catalogs/catalogs.service';
import { Municipality } from '@app/interfaces/municipalities';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  shapes: Select2Data = [{
    value: "municipalities_edomex",
    label: "Municipios EDOMEX",
    data: {
      id: "municipalities_edomex",
      name: "Municipios EDOMEX"
    }
  }];
  shapesGroup: FormGroup | any;
  optionsSelect: Select2Option | any;

  constructor(
    private mcs: CatalogsService,
    public router: Router,
    public formBuilder: FormBuilder,
  ) { }

  @ViewChild('mapViewNode', { static: true }) private mapa!: ElementRef;
  public views: any = null;

  initializeMap(): Promise<any> {
    const INIT_ZOOM = 9;
    const INIT_CENTER_LNG = -99.1425698;
    const INIT_CENTER_LAT = 19.2511604;

    const container = this.mapa.nativeElement;

    /*---------------------------------------------------CREACION DE CAPAS Y GRUPOS--------------------------------------------------------------------------- */
    const MunicipalitiesLayer = new GraphicsLayer({
      id: "1000",
      title: "Alcaldías",
    });

    const graphicsLayer = new GraphicsLayer();

    graphicsLayer.title = "Poligono Trazado";
    /*----------------------------------------------------------------------------------------------------------------------------------------------------- */
    /*-----------------------------------------------------------------INICIAR MAPA--------------------------------------------------------------- */
    const webmap = new WebMap({
      portalItem: {
        id: 'aa1d3f80270146208328cf66d022e09c',
      },
      basemap: "gray-vector",
      layers: [MunicipalitiesLayer, graphicsLayer]
    });
    /*----------------------------------------------------------------------------------------------------------------------------------------------------- */
    const viewer = new MapView({
      container: "viewDiv",
      map: webmap,
      zoom: INIT_ZOOM,
      center: [INIT_CENTER_LNG, INIT_CENTER_LAT]
    });

    viewer.watch("zoom", function (newZoom) {
      if (newZoom < 17 && newZoom !== -1) {
        webmap.basemap = 'gray-vector' as any as Basemap;
      } else {
        webmap.basemap = 'hybrid' as any as Basemap;
      }
    });

    const capas = new LayerList({
      view: viewer,
      listItemCreatedFunction: async function (event) {
        let trigger = event.item;

        webmap.layers.remove(webmap.layers.getItemAt(2));

        await trigger.layer.when(); //carga de las capas al menu
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

    /***********************Mediciones **********************/
    viewer.ui.add("topbar", "top-right");

    function setActiveButton(selectedButton: any) {
      viewer.focus();
      let elements = document.getElementsByClassName("active");
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("active");
      }
      if (selectedButton) {
        selectedButton.classList.add("active");
      }
    }
    let activeWidget: DistanceMeasurement2D | null = null;

    function setActiveWidget(type: any) {
      switch (type) {
        case "distance":
          activeWidget = new DistanceMeasurement2D({
            view: viewer
          });

          activeWidget.viewModel.start();

          viewer.ui.add(activeWidget, "top-right");
          setActiveButton(document.getElementById("distanceButton"));
          break;
        case null:
          if (activeWidget) {
            viewer.ui.remove(activeWidget);
            activeWidget.destroy();
            activeWidget = null;
          }
          break;
      }
    }

    document.getElementById("distanceButton")?.addEventListener("click", function () {
      setActiveWidget(null);
      if (!this.classList.contains("active")) {
        setActiveWidget("distance");
      } else {
        setActiveButton(null);
      }
    });

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


    async function getInformationPopup(target: any) {
      let totalFaltaAguaArea = 0;

      return (
        "<b>" +
        "<ul>" +
        "<li> Total de incidentes: " +
        totalFaltaAguaArea +
        "</li>" +
        "</ul>"
      );

    }

    sketch.on("create", function (event) {
      if (event.state === "complete") {
        /*  event.graphic.popupTemplate = new PopupTemplate({
           title: "Poligono Trazado",
           content: "hola"
         }); */


        event.graphic.popupTemplate = {
          title: "Poligono Trazado",
          content: getInformationPopup
        } as any;


        viewer.popup.features = [event.graphic]
        viewer.popup.visible = true;
      }
    });


    async function getInformationPopupMunicipalities(target: any) {
      const attributes = target.graphic.attributes;
      const geometry = target.graphic.geometry;

      let total = 0;

      return (
        "<b>" +
        "<ul>" +
        "<li> Total: " +
        total +
        "</li>" +
        "</ul>"
      );

    }

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
            popupTemplate: {
              title: shape.municipality,
              content: getInformationPopupMunicipalities,
            }

          });
          MunicipalitiesLayer.add(polygonGraphic);
        });
      }
    );

    /**************** Linea de tiempo ***************/
    function addHours(date: any, hours: any) {
      date.setHours(date.getHours() + hours);
      return date;
    }

    /*  const updateTimeSlider = () => {
       let start = new Date($("#start_date").val())
       start = addHours(start, 6); //Horario GMT-6
       let endTimeExtent = new Date(start);
       endTimeExtent.setDate(endTimeExtent.getDate() + 1);
       let end = new Date($("#end_date").val())
       end = addHours(end, 30);
       timeSlider.fullTimeExtent = {
         start: start,
         end: end,
       } as any;
       timeSlider.timeExtent = {
         start,
         end: endTimeExtent,
       } as any;
     } */

    const timeSlider = new TimeSlider({
      container: "timeSlider",
      playRate: 250,
      stops: {
        interval: {
          value: 1,
          unit: "days"
        } as any
      }
    });

    const timeExpand = new Expand({
      expandIconClass: "esri-icon-expand",
      view: viewer,
      content: timeSlider,
      expanded: true,
    });

    viewer.ui.add(timeExpand, "bottom-left");

    this.views = viewer;

    return this.views.when();

  }



  ngOnInit(): void {
    this.shapesGroup = this.formBuilder.group(
      {
        shape_id: ["", Validators.required]
      }
    );

    this.optionsSelect = {
      placeholder: "Select option...",
      allowClear: true,
      width: "100%"
    }

    this.initializeMap().then(() => {
    });
  }

  AddShapes() {

  }

  ngOnDestroy(): void {
    if (this.views) {
      this.views.destroy();
    }
  }

  get shape_id() {
    return this.shapesGroup.get("shape_id");
  }
}
