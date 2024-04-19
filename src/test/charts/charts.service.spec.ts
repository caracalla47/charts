
import 'zone.js';
import 'zone.js/testing';

import { ChartData, ChartOptions } from 'chart.js';

import { ChartsService } from '../../app/charts/charts.service';

let service: ChartsService;

describe('Charts Service', () => {


    beforeEach(() => {
        service = new ChartsService();
    })

    it('should exist', () => {
        expect(service).toBeTruthy();
    })

    describe('Bar chart methods', () => {
        describe('getBarChartData()', () => {
            it('should return a ChartData instance with the labels and data provided as inputs.', () => {
                const labels: string[] = ['A', 'B', 'C', 'D'];
                const data: number[] = [0, 1, 2, 3, 4]
                const mockChartData: ChartData ={
                    labels: ['A', 'B', 'C', 'D'],
                    datasets: [
                        {
                            label: 'Unique errors',
                            data: [0, 1, 2, 3, 4],
                            barPercentage: 0.7
                        }
                    ]
                }

                const actual: ChartData = service.getBarChartData(labels, data);

                expect(actual).toEqual(mockChartData);
            })
        });

        describe('getBarChartOptions()', () => {
            it('should return a ChartOptions that does not display a title if none is given.', () => {
                const mockChartOptions: ChartOptions = {
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
                            display: false,
                        }
                    }
                }

                const actual: ChartOptions = service.getBarChartOptions();

                expect(actual).toEqual(mockChartOptions);
            })

            it('should return a ChartOptions with a title displayed if provided', () => {
                const title: string = 'My title';
                const mockChartOptions: ChartOptions = {
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
                            display: true,
                            text: 'My title'
                        }
                    }
                }

                const actual: ChartOptions = service.getBarChartOptions(title);

                expect(actual).toEqual(mockChartOptions);
            })
        })
    })

    describe('Pie chart methods', () => {
        describe('getPieChartData()', () => {
            it('should return a ChartData with labels, data, and hoverOffset provided as inputs', () => {
                const labels: string[] = ['A', 'B', 'C', 'D'];
                const data: number[] = [1, 2, 3, 4];
                const hoverOffset: number = 6;
                const mockChartData: ChartData = {
                    labels: ['A', 'B', 'C', 'D'],
                    datasets: [
                        {
                            label: 'Count',
                            data: [1, 2, 3, 4],
                            hoverOffset: 6,
                        },
                    ],
                };

                const actual: ChartData = service.getPieChartData(labels, data, hoverOffset);

                expect(actual).toEqual(mockChartData);
            })

            it('should return a ChartData with an hoverOffset of \'4\' when none is provided', () => {
                const labels: string[] = ['A', 'B', 'C', 'D'];
                const data: number[] = [1, 2, 3, 4];
                const mockChartData: ChartData = {
                    labels: ['A', 'B', 'C', 'D'],
                    datasets: [
                        {
                            label: 'Count',
                            data: [1, 2, 3, 4],
                            hoverOffset: 4,
                        },
                    ],
                };

                const actual: ChartData = service.getPieChartData(labels, data);

                expect(actual).toEqual(mockChartData);
            })
            
        })

        describe('getPieChartOptions()', () => {
            it('should return a ChartOptions object with a callback function for \'label\'', () => {
                const actual = service.getPieChartOptions();

                const expected = {
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: expect.any(Function) 
                            }
                        }
                    }
                };
                expect(actual).toEqual(expected);
            })
            it('should calculate percentage correctly in getPieChartOptions', () => {
                // Mock the context object that would be passed to the callback
                const mockContext = {
                  dataset: {
                    data: [10, 20, 30, 40] // Example data
                  },
                  dataIndex: 1, // Example dataIndex
                  label: 'Test Label' // Example label
                } as any;
            
                // Mock the TooltipModel and ChartTypeRegistry
                const mockTooltipModel = {
                  chart: {}, // Mock the chart object
                  dataPoints: [], // Mock the dataPoints array
                  xAlign: 'center', // Mock the xAlign property
                  yAlign: 'center', // Mock the yAlign property
                  x: 0, // Mock the x property
                  y: 0, // Mock the y property
                  width: 100, // Mock the width property
                  height: 100, // Mock the height property
                  caretX: 0, // Mock the caretX property
                  caretY: 0, // Mock the caretY property
                  body: [], // Mock the body property
                  beforeBody: [], // Mock the beforeBody property
                  afterBody: [], // Mock the afterBody property
                  title: [], // Mock the title property
                  footer: [], // Mock the footer property
                  labelColors: [], // Mock the labelColors property
                  labelTextColors: [], // Mock the labelTextColors property
                  labelPointStyles: [], // Mock the labelPointStyles property
                  opacity: 1, // Mock the opacity property
                  options: {} // Mock the options property
                } as any;
            
                // Call the method and capture the result
                const result = service.getPieChartOptions().plugins?.tooltip?.callbacks?.label?.call(mockTooltipModel, mockContext);
            
                // Assert that the result is as expected
                expect(result).toBe('Test Label: 20 (20.00%)');
            });
            it('should return a percentage of zero for entries that are not of type \'number\'', () => {
                const mockContext = {
                    dataset: {
                        data: [10, 20, undefined, 40] // Example data
                    },
                    dataIndex: 2, // Example dataIndex
                    label: 'Test Label' // Example label
                } as any;
                
                const mockTooltipModel = {
                    chart: {}, // Mock the chart object
                    dataPoints: [], // Mock the dataPoints array
                    xAlign: 'center', // Mock the xAlign property
                    yAlign: 'center', // Mock the yAlign property
                    x: 0, // Mock the x property
                    y: 0, // Mock the y property
                    width: 100, // Mock the width property
                    height: 100, // Mock the height property
                    caretX: 0, // Mock the caretX property
                    caretY: 0, // Mock the caretY property
                    body: [], // Mock the body property
                    beforeBody: [], // Mock the beforeBody property
                    afterBody: [], // Mock the afterBody property
                    title: [], // Mock the title property
                    footer: [], // Mock the footer property
                    labelColors: [], // Mock the labelColors property
                    labelTextColors: [], // Mock the labelTextColors property
                    labelPointStyles: [], // Mock the labelPointStyles property
                    opacity: 1, // Mock the opacity property
                    options: {} // Mock the options property
                } as any;
                
                // Call the method and capture the result
                const result = service.getPieChartOptions().plugins?.tooltip?.callbacks?.label?.call(mockTooltipModel, mockContext);
            
                // Assert that the result is as expected
                expect(result).toBe('Test Label: 0 (0.00%)');
            })
        })
    })
})