import { ActiveDataPoint, ActiveElement, Chart, ChartData, ChartTypeRegistry, FontSpec, Point, ScriptableAndScriptableOptions, ScriptableTooltipContext, TooltipCallbacks, TooltipModel } from 'chart.js';
import { AnyObject } from 'chart.js/dist/types/basic';
import { BubbleDataPoint, TooltipItem } from 'chart.js';

export const mockAnimations: Record<string, any> = {
    animation1: {
       type: 'number',
       duration: 1000,
       easing: 'easeInOutQuad',
    },
    animation2: {
       type: 'number',
       duration: 2000,
       easing: 'easeOutBounce',
    },
};