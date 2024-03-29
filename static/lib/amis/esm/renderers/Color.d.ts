/**
 * @file 用来展示颜色块。
 */
import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema } from '../Schema';
/**
 * Color 显示渲染器，格式说明。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/color
 */
export interface ColorSchema extends BaseSchema {
    /**
     *  指定为颜色显示控件
     */
    type: 'color';
    /**
     * 默认颜色
     */
    defaultColor?: string;
    /**
     * 是否用文字显示值。
     */
    showValue?: boolean;
}
export interface ColorProps extends RendererProps, Omit<ColorSchema, 'type' | 'className'> {
}
export declare class ColorField extends React.Component<ColorProps, object> {
    static defaultProps: {
        className: string;
        defaultColor: string;
        showValue: boolean;
    };
    render(): React.JSX.Element;
}
export declare class ColorFieldRenderer extends ColorField {
}
