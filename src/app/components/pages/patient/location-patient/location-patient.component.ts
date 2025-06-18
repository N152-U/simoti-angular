import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ViewChild, ElementRef } from '@angular/core';
import 'chartjs-adapter-moment';

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";



import { PatientsService } from '@app/services/managment/patients/patients.service';

@Component({
  selector: 'app-location-patient',
  templateUrl: './location-patient.component.html',
  styleUrls: ['./location-patient.component.scss']
})
export class LocationPatientComponent implements OnInit {
  @ViewChild('myChartCanvas') myChartCanvas!: ElementRef;

  public chart: any;
  public indicator: any = 'Indicador de Geolocalización';
  public age: any = 25;
  view: MapView | undefined;
  fechaInicio: string = '';
  fechaFin: string = '';
  public hash: string = '';
  public location: { fecha: string, valor: string, latitude:any, longitude:any }[] = [];
  public patient: any = {}

  constructor(private ps: PatientsService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.hash = this.route.snapshot.params["hash"];

    this.ps.GetPatientDetailByHash(this.hash).subscribe((res) => {
      this.patient = res;
    });

    const today = moment().format('YYYY-MM-DD');

    this.fechaInicio = today;
    this.fechaFin = today;

    this.getLocationData(today, today)
  }

  getLocationData(startDate: string, endDate: string): void {
    this.ps.GetPatientLocationByHash(this.hash, startDate, endDate).subscribe((res: any) => {

      const dataArray = Array.isArray(res) ? res : [];

      this.location = dataArray.map((item: any) => ({
        fecha: moment(item.created_at).format('YYYY-MM-DD HH:mm'),
        valor: item.latitude+', '+item.longitude,
        latitude: item.latitude,
        longitude: item.longitude
      }));

      this.mostrarMapa();
    });
  }
  mostrarMapa() {
    const graphicsLayer = new GraphicsLayer();

    this.location.forEach(loc => {
      const point = new Point({
        longitude: loc.longitude,
        latitude: loc.latitude
      });

      const markerSymbol = new SimpleMarkerSymbol({
        color: "#0079c1",
        outline: {
          color: "#ffffff",
          width: 1
        }
      });

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        attributes: {
          Fecha: loc.fecha
        },
        popupTemplate: {
          title: "Localización",
          content: "Fecha: {Fecha}"
        }
      });

      graphicsLayer.add(pointGraphic);
    });

    const fillSymbol = new SimpleFillSymbol({
      color: [0, 128, 255, 0.2], // Azul semitransparente
      outline: {
        color: "#004085",
        width: 1
      }
    });
    
    const renderer = new SimpleRenderer({
      symbol: fillSymbol
    });
    

    const alcaldiasLayer = new GeoJSONLayer({
      url: "assets/esri/municipalities.geojson",
      title: "Alcaldías CDMX",
      renderer: renderer,
      opacity: 0.6
    });
    

    const map = new Map({
      basemap: "streets-navigation-vector",
      layers: [alcaldiasLayer,graphicsLayer]
    });

   
    this.view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-99.14511395269028,19.372007846101095],
      zoom: 9
    });
  }


  filtrar() {
    if (!this.fechaInicio || !this.fechaFin) {
      alert('Por favor, selecciona ambas fechas.');
      return;
    }

    if (this.fechaInicio > this.fechaFin) {
      alert('La fecha de inicio no puede ser mayor que la fecha de fin.');
      return;
    }

    this.getLocationData(this.fechaInicio, this.fechaFin);
  }
}