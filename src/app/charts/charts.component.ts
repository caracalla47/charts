import { Component, OnInit }  from '@angular/core';

import { ChartData, ChartOptions } from 'chart.js';

import { BarChartConfig, PieChartConfig } from '../app.models';
import { ChartsService } from './charts.service';

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit{
    constructor(private charts: ChartsService){}

    barChartConfig!: BarChartConfig;
    pieChartConfig!: PieChartConfig;

    // #region Angular Lifecycle events
    ngOnInit(): void {
       this.resetCharts();  
        
       let barChartLabels = ['Location A', 'Location B', 'Location C'];
       let barChartData = [24, 38, 19];
       let barChartTitle = 'Errors per Location'
       this.drawBarChart(barChartLabels, barChartData, barChartTitle);

       let pieChartLabels: string[] = ['Software', 'UFI board', 'Not Available', 'Heating board']
       let pieChartData = [ 28, 12, 40, 58];
       this.drawPieChart(pieChartLabels, pieChartData);
    }
    //#endregion

    resetCharts(): void {
        this.barChartConfig = {
            type: 'bar',
            data: { datasets: [], labels: [] },
            options: {},
            labels: [],
            legend: true,
        };

        this.pieChartConfig = {
            type: 'pie',
            data: { datasets: [], labels: [] },
            options: {},
            labels: [],
            legend: true,
        };
    }

    // #region Charts Service methods
    getBarChartData(labels: string[], data: number[]): ChartData {
       return this.charts.getBarChartData(labels, data);
    }

    getBarChartOptions(chartTitle?: string): ChartOptions {
        return this.charts.getBarChartOptions(chartTitle);
    }
    // #endregion

    //#region DrawBarChart
    drawBarChart(labels: string[], data: number[], chartTitle?: string): void {
        this.barChartConfig.data = this.getBarChartData(labels, data);
        this.barChartConfig.options = this.getBarChartOptions(chartTitle)
    }

    drawPieChart(labels: string[], data: number[], hoverOffset?: number): void {
        this.pieChartConfig.data = this.charts.getPieChartData(labels, data, hoverOffset);
        this.pieChartConfig.options = this.charts.getPieChartOptions();
    }
    //#endregion
}