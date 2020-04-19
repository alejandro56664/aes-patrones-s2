import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'grafico-barras',
  templateUrl: './grafico-barras.component.html' 
})
export class GraficoBarrasComponent implements OnInit {

  @Input()
  ofertas: number[];
  @Input()
  proveedores: string[];
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
  public labels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];

  public datasets: ChartDataSets[];

  constructor() { }

  ngOnInit() {
    this.labels = this.proveedores;
    this.datasets =  [
      { data: this.ofertas, label: 'Oferta' }
    ];
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
