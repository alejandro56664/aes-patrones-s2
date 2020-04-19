import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { SolicitudCotizacion, Usuario } from '@/_models';
import { SolicitudCotizacionService } from '@/_services';
import { AuthenticationService } from '@/_services';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { IDataChart } from './dataChart';
@Component({
  selector: 'app-bar',
  templateUrl: './graficobarras-component.html'
})

export class BarChartComponent implements OnInit {
  @Input() idSolicitud: number;
  solicitudes: SolicitudCotizacion[] = [];

  currentUser: Usuario;
  solicitud: SolicitudCotizacion;
  resultData: any[] =[];
  loaded = false;
  

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Titulo' }
  ];

  constructor(private solicitudCotizacionService: SolicitudCotizacionService,
    private route: ActivatedRoute,
    private solicitudCotizacionServicio: SolicitudCotizacionService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;

  }

  ngOnInit() {

    console.log("Entro:  " + this.idSolicitud)
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.idSolicitud = +params.get('idSolicitud')
        return this.solicitudCotizacionServicio.get(this.currentUser.id, this.idSolicitud)
      })
    ).subscribe(s => {
  
      this.resultData = s;
      this.barChartLabels = this.resultData.map(item => item.label);
      this.barChartData = this.resultData.map(item => item.data);
      this.loaded = true;

    }
    )

  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }

  private traerMisSolicitudesDeCotizacion(idUsuario: number) {
    this.solicitudCotizacionService.getAll(idUsuario)
      .subscribe(solicitudes => this.solicitudes = solicitudes);
  }

}
