import { ChartData, ChartOptions, ChartTypeRegistry } from 'chart.js';

export interface BarChartConfig {
    data: ChartData,
    options: ChartOptions,
    labels: string[],
    type: keyof ChartTypeRegistry,
    legend?: boolean,
    chartClicked?: () => {},
    chartHover?: () => {},
}

export interface PieChartConfig {
    data: ChartData,
    options: ChartOptions,
    labels: string[],
    type: keyof ChartTypeRegistry,
    hoverOffset?: number,
    legend?: boolean,
    chartClicked?: () => {},
    chartHover?: () => {},
}

