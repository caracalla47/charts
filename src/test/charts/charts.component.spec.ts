import 'zone.js';
import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

import { ChartData, ChartOptions } from 'chart.js';

import { ChartsComponent } from '../../app/charts/charts.component';
import { ChartsService } from '../../app/charts/charts.service';

let component: ChartsComponent;
let fixture: ComponentFixture<ChartsComponent>;
let service: ChartsService;

describe('Charts Component', () => {

    beforeAll(() => {
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    })

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ChartsComponent],
            providers: [ChartsService]
        }).compileComponents()

        fixture = TestBed.createComponent(ChartsComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(ChartsService);
    })

    it('should be create a component', () => {
        expect(component).toBeTruthy();
    })

    describe('ngOnInit()', () => {
        const mockResetCharts = jest.fn<void, []>(() => {});
        const mockDrawBarChart = jest.fn<void, [string[], number[], string?]>(
            (labels, data, chartTitle) => {

            });
        const mockDrawPieChart = jest.fn<void, [string[], number[], number?]>(
            (labels, data, hoverOffset) => {});

        beforeEach(() => {
            // Arrange 
            component.resetCharts = mockResetCharts;
            component.drawBarChart = mockDrawBarChart;
            component.drawPieChart = mockDrawPieChart;

            // Act
            component.ngOnInit();
        })

        // Assess
        it('should call resetBarCharts', () => {
            expect(component.resetCharts).toHaveBeenCalledTimes(1);
        })

        it('should call drawBarChart with 3 arguments', () => {
            const labels = ['Location A', 'Location B', 'Location C'];
            const data = [24, 38, 19];
            const title = 'Errors per Location';

            expect(component.drawBarChart).toHaveBeenCalledWith(labels, data, title);
        })

        it('should call drawPieChart with 3 arguments', () => {
            const labels: string[] = ['Software', 'UFI board', 'Not Available', 'Heating board']
            const data = [ 28, 12, 40, 58];

            expect(component.drawPieChart).toHaveBeenCalledWith(labels, data);
        })

    })

    describe('drawBarChart()', () => {
        const labels = ['A', 'B', 'C'];
        const data = [1, 2, 3];
        const title = 'Title'
        beforeEach(() => {
            component.resetCharts();
        })

        it('should call the getBarChartData method', () => {
            const spy = jest.spyOn(component, 'getBarChartData').mockImplementation();
            
            component.drawBarChart(labels, data);

            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should call the getBarChartOptions method', () => {
            const spy = jest.spyOn(component, 'getBarChartOptions').mockImplementation();

            component.drawBarChart(labels, data);

            expect(spy).toHaveBeenCalledTimes(1);
        })

        it('should instantiate the barChartConfig.data property with a BarChartData object', () => {
            const expected: ChartData = {
                labels: labels,
                datasets: [
                    {
                        barPercentage: 0.7,
                        label: 'Unique errors',
                        data: data,
                    },
                ],
            }

            component.drawBarChart(labels, data, title);

            expect(component.barChartConfig.data).toEqual(expected);
        });

        it('should instantiate the barChartConfig.options property with a BarChartOptions object', () => {
            const expected: ChartOptions = {
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
                        text: 'Title'
                    }

                }
            }      

            jest.spyOn(component, 'getBarChartOptions').mockReturnValue(
                {
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
                            text: 'Title'
                        }

                    }
                }
            );

            component.drawBarChart(labels, data, title);

            expect(component.barChartConfig.options).toEqual(expected);    
        });

        describe('barChartConfig.options', () => {
            it('should display its title when provided with an argument for chart title', () => {
                jest.spyOn(component, 'getBarChartOptions').mockReturnValue(
                    {
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
                                text: 'Title'
                            }
                        }
                    }
                )

                component.drawBarChart(labels, data, title);

                expect(component?.barChartConfig?.options?.plugins?.title?.display).toBe(true);
                expect(component?.barChartConfig?.options?.plugins?.title?.text).toBe(title)
            })
            it('should not display its title when not provided with a argument with chart title', () => {
                jest.spyOn(component, 'getBarChartOptions').mockReturnValue(
                    {
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
                                text: undefined
                            }
                        }
                    }
                )

                component.drawBarChart(labels, data);

                expect(component?.barChartConfig?.options?.plugins?.title?.display).toBe(false)
                expect(component?.barChartConfig?.options?.plugins?.title?.text).toBe(undefined)

            })
        })
    })

    describe('getBarChartData()', () => {
        const labels = ['A', 'B', 'C'];
        const data = [1, 2, 3];

        it('should call ChartsService\'s getBarChartData method', () => {
            const spy = jest.spyOn(service, 'getBarChartData').mockImplementation();

            component.getBarChartData(labels, data);

            expect(spy).toHaveBeenCalled();
        })
    })

    describe('getBarChartOptions()', () => {
        beforeEach(() => {
            component.getBarChartOptions();
        })

        it('should call ChartsService\'s getBarChartOptions method', () => {
            const spy = jest.spyOn(service, 'getBarChartOptions').mockImplementation();

            component.getBarChartOptions();

            expect(spy).toHaveBeenCalled();
        })
    })

    describe('drawPiewChart()', () => {
        const labels = ['A', 'B', 'C'];
        const data = [1, 2, 3];
        const hoverOffset = 6;

        beforeEach(() => {
            component.resetCharts();
        })

        it('should call the getPieChartData', () => {
            const spy = jest.spyOn(component, 'getPieChartData').mockImplementation();

            component.drawPieChart(labels, data, hoverOffset);

            expect(spy).toHaveBeenCalled();
        })

        it('should call the getPieChartOtpions', () => {
            const spy = jest.spyOn(component, 'getPieChartOptions').mockImplementation();

            component.drawPieChart(labels, data, hoverOffset);

            expect(spy).toHaveBeenCalled();
        })

        it('should instantiate the pieChartConfig.data property with a ChartData object', () => {
            const expected = {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        label: 'Count',
                        data: [1, 2, 3],
                        hoverOffset: 6
                    },
                ],
            };
            
            jest.spyOn(component, 'getPieChartData').mockReturnValue(expected);

            component.drawPieChart(labels, data, hoverOffset);

            expect(component.pieChartConfig.data).toEqual(expected);
        })

        it('should instantiate the pieChartConfig.data property with a ChartData object with a hoverOffset of 4 when no value is provided', () => {
            const expected = {
                labels: ['A', 'B', 'C'],
                datasets: [
                    {
                        label: 'Count',
                        data: [1, 2, 3],
                        hoverOffset: 4
                    },
                ],
            };
            
            jest.spyOn(component, 'getPieChartData').mockReturnValue(expected);

            component.drawPieChart(labels, data);

            expect(component.pieChartConfig.data).toEqual(expected);
        })
        
        it('should instantiate the pieChartConfig.options property with a ChartOptions object', () => {
            jest.spyOn(component, 'getPieChartOptions').mockReturnValue({
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: jest.fn()
                        }
                    }
                }
            });

            component.drawPieChart(labels, data, hoverOffset);

            expect(component.barChartConfig.options).toBeTruthy();
            expect(typeof component.barChartConfig.options).toEqual('object');
        })
    })

    describe('getPieChartData()', () => {
        const labels = ['A', 'B', 'C'];
        const data = [1, 2, 3];
        const hoverOffset = 4;

        it('should call ChartsService\'s getPieChartData', () => {
            const spy = jest.spyOn(service, 'getPieChartData').mockImplementation();

            component.getPieChartData(labels, data, hoverOffset);

            expect(spy).toHaveBeenCalled();
        })
    })

    describe('getPieChartOptions()', () => {
        it('should call ChartsService\'s getPieChartOptions', () => {
            const spy = jest.spyOn(service, 'getPieChartOptions').mockImplementation();

            component.getPieChartOptions();

            expect(spy).toHaveBeenCalled();
        })
    })
})