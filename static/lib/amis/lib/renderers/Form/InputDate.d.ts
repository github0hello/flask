import React from 'react';
import { FormControlProps } from 'amis-core';
import moment from 'moment';
import { FormBaseControlSchema } from '../../Schema';
import { ActionObject } from 'amis-core';
import type { ShortCuts } from 'amis-ui/lib/components/DatePicker';
export interface InputDateBaseControlSchema extends FormBaseControlSchema {
    /**
     * 指定为日期选择控件
     */
    type: 'input-date' | 'input-datetime' | 'input-time' | 'input-month' | 'input-quarter' | 'input-year';
    /**
     * 是否显示清除按钮
     */
    clearable?: boolean;
    /**
     * 日期存储格式
     */
    format?: string;
    /**
     * 替代format
     */
    valueFormat?: string;
    /**
     * 日期展示格式
     */
    inputFormat?: string;
    /**
     * 日期展示格式(新：替代inputFormat)
     */
    displayFormat?: string;
    /**
     * 设定是否存储 utc 时间。
     */
    utc?: boolean;
    /**
     * 是否为内联模式？
     */
    emebed?: boolean;
    /**
     * 边框模式，全边框，还是半边框，或者没边框。
     */
    borderMode?: 'full' | 'half' | 'none';
    /**
     * 日期快捷键
     */
    shortcuts?: string | ShortCuts[];
    /**
     * 字符串函数，用来决定是否禁用某个日期。
     *
     * (currentDate: moment.Moment, props: any) => boolean;
     */
    disabledDate?: string;
}
/**
 * Date日期选择控件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/date
 */
export interface DateControlSchema extends InputDateBaseControlSchema {
    /**
     * 指定为日期选择控件
     */
    type: 'input-date';
    /**
     * 日期存储格式
     * @default X
     */
    format?: string;
    /**
     * 日期展示格式
     * @default YYYY-MM-DD
     */
    inputFormat?: string;
    /**
     * 替代format
     */
    valueFormat?: string;
    /**
     * 日期展示格式(新：替代inputFormat)
     */
    displayFormat?: string;
    /**
     * 点选日期后是否关闭弹窗
     */
    closeOnSelect?: boolean;
    /**
     * 限制最小日期
     */
    minDate?: string;
    /**
     * 限制最大日期
     */
    maxDate?: string;
}
/**
 * Datetime日期时间选择控件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/datetime
 */
export interface DateTimeControlSchema extends InputDateBaseControlSchema {
    /**
     * 指定为日期时间选择控件
     */
    type: 'input-datetime';
    /**
     * 日期存储格式
     * @default X
     */
    format?: string;
    /**
     * 日期展示格式
     * @default YYYY-MM-DD HH:mm
     */
    inputFormat?: string;
    /**
     * 替代format
     */
    valueFormat?: string;
    /**
     * 日期展示格式(新：替代inputFormat)
     */
    displayFormat?: string;
    /**
     * 时间的格式。
     *
     * @default HH:mm
     */
    timeFormat?: string;
    /**
     * 限制最小日期
     */
    minDate?: string;
    /**
     * 限制最大日期
     */
    maxDate?: string;
    /**
     * 时间输入范围限制
     */
    timeConstraints?: any;
    /**
     * 是否为结束时间，如果是，那么会自动加上 23:59:59
     */
    isEndDate?: boolean;
}
/**
 * Time 时间选择控件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/time
 */
export interface TimeControlSchema extends InputDateBaseControlSchema {
    /**
     * 指定为日期时间选择控件
     */
    type: 'input-time';
    /**
     * 日期存储格式
     * @default X
     */
    format?: string;
    /**
     * 日期展示格式
     * @default YYYY-MM-DD HH:mm
     */
    inputFormat?: string;
    /**
     * 替代format
     */
    valueFormat?: string;
    /**
     * 日期展示格式(新：替代inputFormat)
     */
    displayFormat?: string;
    /**
     * 时间的格式。
     *
     * @default HH:mm
     */
    timeFormat?: string;
    /**
     * 时间输入范围限制
     */
    timeConstraints?: any;
}
/**
 * Month 月份选择控件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/Month
 */
export interface MonthControlSchema extends InputDateBaseControlSchema {
    /**
     * 指定为月份时间选择控件
     */
    type: 'input-month';
    /**
     * 月份存储格式
     * @default X
     */
    format?: string;
    /**
     * 月份展示格式
     * @default YYYY-MM
     */
    inputFormat?: string;
    /**
     * 替代format
     */
    valueFormat?: string;
    /**
     * 日期展示格式(新：替代inputFormat)
     */
    displayFormat?: string;
}
/**
 * 季度选择控件
 */
export interface QuarterControlSchema extends InputDateBaseControlSchema {
    /**
     * 指定为月份时间选择控件
     */
    type: 'input-quarter';
    /**
     * 月份存储格式
     * @default X
     */
    format?: string;
    /**
     * 月份展示格式
     * @default YYYY-MM
     */
    inputFormat?: string;
    /**
     * 替代format
     */
    valueFormat?: string;
    /**
     * 日期展示格式(新：替代inputFormat)
     */
    displayFormat?: string;
}
/**
 * 年份选择控件
 */
export interface YearControlSchema extends InputDateBaseControlSchema {
    /**
     * 指定为月份时间选择控件
     */
    type: 'input-year';
    /**
     * 月份存储格式
     * @default X
     */
    format?: string;
    /**
     * 月份展示格式
     * @default YYYY-MM
     */
    inputFormat?: string;
    /**
     * 替代format
     */
    valueFormat?: string;
    /**
     * 日期展示格式(新：替代inputFormat)
     */
    displayFormat?: string;
}
export interface DateProps extends FormControlProps {
    inputFormat?: string;
    timeFormat?: string;
    format?: string;
    valueFormat?: string;
    displayFormat?: string;
    timeConstraints?: {
        hours?: {
            min: number;
            max: number;
            step: number;
        };
        minutes?: {
            min: number;
            max: number;
            step: number;
        };
        seconds: {
            min: number;
            max: number;
            step: number;
        };
    };
    closeOnSelect?: boolean;
    disabled: boolean;
    iconClassName?: string;
    utc?: boolean;
    minDate?: string;
    maxDate?: string;
}
interface DateControlState {
    minDate?: moment.Moment;
    maxDate?: moment.Moment;
    schedules?: Array<{
        startTime: Date;
        endTime: Date;
        content: any;
        className?: string;
    }>;
}
export default class DateControl extends React.PureComponent<DateProps, DateControlState> {
    placeholder: string;
    static defaultProps: {
        format: string;
        viewMode: string;
        inputFormat: string;
        timeConstraints: {
            minutes: {
                step: number;
            };
        };
        clearable: boolean;
    };
    dateRef?: any;
    constructor(props: DateProps);
    componentDidUpdate(prevProps: DateProps): void;
    onScheduleClick(scheduleData: any): void;
    getRef(ref: any): void;
    dispatchEvent(e: React.SyntheticEvent<HTMLElement>): void;
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    setData(value: any): void;
    handleChange(nextValue: any): Promise<void>;
    handleClick(date: moment.Moment): Promise<void>;
    handleMouseEnter(date: moment.Moment): Promise<void>;
    handleMouseLeave(date: moment.Moment): Promise<void>;
    isDisabledDate(currentDate: moment.Moment): any;
    render(): React.JSX.Element;
}
export declare class DateControlRenderer extends DateControl {
    placeholder: any;
    static defaultProps: {
        strictMode: boolean;
        format: string;
        viewMode: string;
        inputFormat: string;
        timeConstraints: {
            minutes: {
                step: number;
            };
        };
        clearable: boolean;
    };
}
export declare class DatetimeControlRenderer extends DateControl {
    placeholder: any;
    static defaultProps: {
        inputFormat: string;
        closeOnSelect: boolean;
        strictMode: boolean;
        format: string;
        viewMode: string;
        timeConstraints: {
            minutes: {
                step: number;
            };
        };
        clearable: boolean;
    };
}
export declare class TimeControlRenderer extends DateControl {
    placeholder: any;
    static defaultProps: {
        inputFormat: string;
        viewMode: string;
        closeOnSelect: boolean;
        format: string;
        timeConstraints: {
            minutes: {
                step: number;
            };
        };
        clearable: boolean;
    };
}
export declare class MonthControlRenderer extends DateControl {
    placeholder: any;
    static defaultProps: {
        inputFormat: string;
        viewMode: string;
        closeOnSelect: boolean;
        strictMode: boolean;
        format: string;
        timeConstraints: {
            minutes: {
                step: number;
            };
        };
        clearable: boolean;
    };
}
export declare class QuarterControlRenderer extends DateControl {
    placeholder: any;
    static defaultProps: {
        inputFormat: string;
        viewMode: string;
        closeOnSelect: boolean;
        strictMode: boolean;
        format: string;
        timeConstraints: {
            minutes: {
                step: number;
            };
        };
        clearable: boolean;
    };
}
export declare class YearControlRenderer extends DateControl {
    placeholder: any;
    static defaultProps: {
        inputFormat: string;
        viewMode: string;
        closeOnSelect: boolean;
        strictMode: boolean;
        format: string;
        timeConstraints: {
            minutes: {
                step: number;
            };
        };
        clearable: boolean;
    };
}
export {};
