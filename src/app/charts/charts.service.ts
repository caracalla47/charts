import { Injectable } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

@Injectable({
    providedIn: 'root'
})
export class ChartsService{

    //#region Bar Chart methods
    getBarChartData(labels: string[], data: number[]): ChartData{
        let chartData: ChartData;
        chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Unique errors',
                    data: data,
                    barPercentage: 0.6
                }
            ]
        }
        return chartData;
    }

    getBarChartOptions(chartTitle?: string): ChartOptions {
        let chartOptions: ChartOptions;
        chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                }
            },
            plugins: {
                title: {
                    font: {
                        size: 28
                    },
                    display: chartTitle? true : false,
                }

            }
        }
        return chartOptions;
    }
    //#endregion 

    //#region Pie Chart methods
    getPieChartData(labels: string[], data: number[], hoverOffset?: number): ChartData{
        let chartData: ChartData;
        chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Count',
                    data: data,
                    hoverOffset: hoverOffset? hoverOffset: 4,
                },
            ],
        }
        return chartData;
    }
    //#endregion
}