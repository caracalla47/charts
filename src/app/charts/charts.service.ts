import { Injectable } from '@angular/core';

import { ChartData, ChartOptions } from 'chart.js';
import 'chartjs-plugin-datalabels';

@Injectable({
    providedIn: 'root'
})
export class ChartsService{

    //#region Bar Chart methods
    getBarChartData(labels: string[], data: number[]): ChartData{
       return { 
            labels: labels,
            datasets: [
                {
                    label: 'Unique errors',
                    data: data,
                    barPercentage: 0.6
                }
            ]
        }
    }

    getBarChartOptions(chartTitle?: string): ChartOptions {
        return {
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
    }
    //#endregion 

    //#region Pie Chart methods
    getPieChartData(labels: string[], data: number[], hoverOffset?: number): ChartData{
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Count',
                    data: data,
                    hoverOffset: hoverOffset? hoverOffset: 4,
                },
            ],
        }
    }

    getPieChartOptions(): ChartOptions {
        return {
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    // Ensure we're working with numbers only
                    const numericData = context.dataset.data.map(item => typeof item === 'number' ? item : 0);
                    const total = numericData.reduce((a, b) => a + b, 0);
                    const value = numericData[context.dataIndex];
                    const percentage = ((value / total) * 100).toFixed(2);
                    return `${context.label}: ${value} (${percentage}%)`;
                  }
                }
              }
            }
          }
    }     
    //#endregion
}