import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Select2Data, Select2Option } from 'ng-select2-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import * as moment from 'moment';
import * as $ from 'jquery';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from "@arcgis/core/Graphic.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
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
import { environment } from "@environments/environment";

function addHours(date: any, hours: any) {
  date.setHours(date.getHours() + hours);
  return date;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('search') el: ElementRef | any;
  loading: boolean = false;

  shapes: Select2Data = [{
    value: "municipalities_edomex",
    label: "Municipios EDOMEX",
    data: {
      id: "municipalities_edomex",
      name: "Municipios EDOMEX"
    }
  }];
  shapesGroup: FormGroup | any;
  datesGroup: FormGroup | any;
  optionsSelect: Select2Option | any;
  layer: any = null;
  viewer: any = null;
  webmap: any = null;
  layerView: any = null;
  timeSlider: any = null;


  constructor(
    private mcs: CatalogsService,
    public router: Router,
    public formBuilder: FormBuilder,
  ) {
  }

  @ViewChild('mapViewNode', { static: true }) private mapa!: ElementRef;
  @ViewChild('statsDiv') private statsDiv!: ElementRef;
  public views: any = null;


  LocationsLayer = new GraphicsLayer({
    id: "1001",
    title: "Localizaciones",
    visible: true
  });

  initializeMap(): Promise<any> {
    const INIT_ZOOM = 9;
    const INIT_CENTER_LNG = -99.1425698;
    const INIT_CENTER_LAT = 19.2511604;

    const container = this.mapa.nativeElement;
    let ct = this;

    /*---------------------------------------------------CREACION DE CAPAS Y GRUPOS--------------------------------------------------------------------------- */
    const MunicipalitiesLayer = new GraphicsLayer({
      id: "1000",
      title: "Alcaldías",
    });



    const graphicsLayer = new GraphicsLayer();

    graphicsLayer.title = "Poligono Trazado";
    /*----------------------------------------------------------------------------------------------------------------------------------------------------- */
    /*-----------------------------------------------------------------INICIAR MAPA--------------------------------------------------------------- */
    this.webmap = new Map({
      basemap: "gray-vector" as any,
      layers: [graphicsLayer, MunicipalitiesLayer]
    });
    /*----------------------------------------------------------------------------------------------------------------------------------------------------- */
    this.viewer = new MapView({
      map: this.webmap,
      container: "viewDiv",
      zoom: INIT_ZOOM,
      center: [INIT_CENTER_LNG, INIT_CENTER_LAT]
    });

    this.viewer.watch("zoom", function (newZoom: any) {
      if (newZoom < 17 && newZoom !== -1) {
        ct.webmap.basemap = 'gray-vector' as any as Basemap;
      } else {
        ct.webmap.basemap = 'hybrid' as any as Basemap;
      }
    });

    const capas = new LayerList({
      view: this.viewer,
      listItemCreatedFunction: async function (event) {
        let trigger = event.item;

        ct.webmap.layers.remove(ct.webmap.layers.getItemAt(3));

        await trigger.layer.when(); //carga de las capas al menu
      }
    });
    /*************Para expander o minimizar el cuadro de capas**************/
    const shapesExpand = new Expand({
      expandIconClass: "esri-icon-expand",
      view: this.viewer,
      content: capas,
      expanded: true,
    });

    this.viewer.ui.add(shapesExpand, {
      position: "top-left"
    });
    /**************Se habilita la pantalla completa**************/
    const fullscreen = new Fullscreen({
      view: this.viewer
    });

    this.viewer.ui.add(fullscreen, "top-right");

    /***********************Mediciones **********************/
    this.viewer.ui.add("topbar", "top-right");

    function setActiveButton(selectedButton: any) {
      ct.viewer.focus();
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
            view: ct.viewer
          });

          activeWidget.viewModel.start();

          ct.viewer.ui.add(activeWidget, "top-right");
          setActiveButton(document.getElementById("distanceButton"));
          break;
        case null:
          if (activeWidget) {
            ct.viewer.ui.remove(activeWidget);
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
      view: this.viewer,
      availableCreateTools: ["polygon", "rectangle", "circle"],
      creationMode: "update",
    });

    const sketchExpand = new Expand({
      expandIconClass: "esri-icon-expand",
      view: this.viewer,
      content: sketch,
      expanded: true,
    });

    this.viewer.ui.add(sketchExpand, "top-right");


    async function getInformationPopup(target: any) {
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

    sketch.on("create", function (event) {
      if (event.state === "complete") {

        event.graphic.popupTemplate = {
          title: "Poligono Trazado",
          content: getInformationPopup
        } as any;


        ct.viewer.popup.features = [event.graphic]
        ct.viewer.popup.visible = true;
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
    this.timeSlider = new TimeSlider({
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
      view: this.viewer,
      content: this.timeSlider,
      expanded: true,
    });

    this.viewer.ui.add(timeExpand, "bottom-left");

    this.views = this.viewer;

    return this.views.when();

  }



  ngOnInit(): void {
    this.shapesGroup = this.formBuilder.group(
      {
        shape_id: ["", Validators.required]
      }
    );

    this.datesGroup = this.formBuilder.group({
      initialDate: ["", Validators.required],
      endDate: ["", Validators.required]

    });

    this.optionsSelect = {
      placeholder: "Select option...",
      allowClear: true,
      width: "100%"
    }

    this.initializeMap().then(() => {
      const statsDiv = this.statsDiv.nativeElement;
      $(statsDiv).empty();

      let initialDate = document.getElementById("initialDate") as HTMLInputElement | null;
      initialDate ? initialDate.value = moment().format('YYYY-MM-DD') : '';
      let endDate = document.getElementById("endDate") as HTMLInputElement | null;
      endDate ? endDate.value = moment().format('YYYY-MM-DD') : '';

    });

  }

  AddShapes() {

  }



  search() {

    let ct = this;

    this.loading = true;

    let initialDate = document.getElementById("initialDate") as HTMLInputElement | null;
    let endDate = document.getElementById("endDate") as HTMLInputElement | null;

    /*****************streetview*****************/
    const streetviewThisAction = {
      title: "Google Streetview.",
      id: "map-this",
      className: "esri-icon-map-pin"
    }

    const updateTimeSlider = (initialDate: any, endDate: any) => {
      let start = new Date(initialDate)
      start = addHours(start, 6); //Horario GMT-6
      let endTimeExtent = new Date(start);
      endTimeExtent.setDate(endTimeExtent.getDate() + 1);
      let end = new Date(endDate)
      end = addHours(end, 30);
      this.timeSlider.fullTimeExtent = {
        start: start,
        end: end,
      } as any;
      this.timeSlider.timeExtent = {
        start,
        end: endTimeExtent,
      } as any;
    }

    function openStreetview() {
      const latitude = ct.viewer.popup.selectedFeature.geometry.latitude
      const longitude = ct.viewer.popup.selectedFeature.geometry.longitude
      let url = "http://maps.google.com/maps?q=Your+Sign+Location+in+Street+View@" +
        longitude + "," + latitude + "&cbll=" + latitude + "," +
        longitude + "&layer=c";
      window.open(url, 'Streetview', "height=500,width=800,resizable=yes,scrollbars=yes");
    }

    reactiveUtils.on(
      () => this.viewer.popup,
      "trigger-action",
      (event) => {
        if (event.action.id === "map-this") {
          openStreetview();
        }
      }
    );

    let layer = new GeoJSONLayer({
      url: `${environment.apiUrl}/measurements/location/${initialDate?.value}/${endDate?.value}`,
      copyright: `Incidentes`,
      title: `Incidentes `,
      timeInfo: {
        startField: "time",
        interval: {
          unit: "days",
          value: 1
        }
      },
      renderer: {
        type: "simple",
        symbol: {
          type: "picture-marker",
          url: "assets/images/location.png",
          width: "15",
          height: "17",
          background: "#00F",
          color: "blue",
          position: "absolute",
        },
      } as any,
      popupTemplate: {
        title: "{codification_type}",
        content: [{
          type: "fields",
          fieldInfos: [{
            fieldName: "folio",
            label: "Folio",
            visible: true
          }, {
            fieldName: "place",
            label: "Dirección",
            visible: true
          },
          {
            fieldName: "codification_type",
            label: "Tipo",
            visible: true
          },
          {
            fieldName: "reports",
            label: "Reportes",
            visible: true
          },
          {
            fieldName: "status_name",
            label: "Estatus",
            visible: true
          },
          {
            fieldName: "latitude",
            label: "latitude",
            visible: false
          },
          {
            fieldName: "longitude",
            label: "longitude",
            visible: false
          },
          ]
        }],
        actions: [streetviewThisAction] as any
      }
    });

    this.webmap.add(layer, 3);
    layer.title = `Localizaciones`;

    // wait till the layer view is loaded
    this.viewer.whenLayerView(layer).then((lv: any) => {
      this.layerView = lv;
      updateTimeSlider(initialDate?.value, endDate?.value);
    });

    setTimeout(() => {
      this.loading = false
    }, 2000);

  }

  ngOnDestroy(): void {
    if (this.views) {
      this.views.destroy();
    }
  }

  get shape_id() {
    return this.shapesGroup.get("shape_id");
  }
  get initialDate() {
    return this.shapesGroup.get("initialDate");
  }
  get endDate() {
    return this.shapesGroup.get("endDate");
  }
}
