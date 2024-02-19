/// <reference types="node" />
import React from 'react';
import { RendererProps } from 'amis-core';
import { ActionObject } from 'amis-core';
import { BaseSchema, SchemaCollection, SchemaName } from '../Schema';
import { IScopedContext } from 'amis-core';
/**
 * Carousel 轮播图渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/carousel
 */
export interface CarouselSchema extends BaseSchema {
    /**
     * 指定为轮播图类型
     */
    type: 'carousel';
    /**
     * 是否自动播放
     */
    auto?: boolean;
    /**
     * 轮播间隔时间
     */
    interval?: number | string;
    /**
     * 动画时长
     */
    duration?: number;
    /**
     * 设置宽度
     */
    width?: number;
    /**
     * 设置高度
     */
    height?: number;
    controlsTheme?: 'light' | 'dark';
    /**
     * 占位
     */
    placeholder?: string;
    /**
     * 配置控件内容
     */
    controls?: Array<'dots' | 'arrows'>;
    /**
     * 动画类型
     */
    animation?: 'fade' | 'slide';
    /**
     * 配置单条呈现模板
     */
    itemSchema?: SchemaCollection;
    name?: SchemaName;
    /**
     * 预览图模式
     */
    thumbMode?: 'contain' | 'cover';
    /**
     * 配置固定值
     */
    options?: Array<any>;
    /**
     * 是否一直显示箭头
     */
    alwaysShowArrow?: boolean;
    /**
     * 多图模式配置项
     */
    multiple?: {
        count: number;
    };
    /**
     * 自定义箭头图标
     */
    icons?: {
        prev?: SchemaCollection;
        next?: SchemaCollection;
    };
}
export interface CarouselProps extends RendererProps, Omit<CarouselSchema, 'className'> {
    value?: any;
}
export interface CarouselState {
    current: number;
    options: any[];
    nextAnimation: string;
}
export declare class Carousel extends React.Component<CarouselProps, CarouselState> {
    wrapperRef: React.RefObject<HTMLDivElement>;
    intervalTimeout: NodeJS.Timer | number;
    durationTimeout: NodeJS.Timer | number;
    static defaultProps: Pick<CarouselProps, 'auto' | 'interval' | 'duration' | 'controlsTheme' | 'animation' | 'controls' | 'placeholder' | 'multiple' | 'alwaysShowArrow'>;
    state: {
        current: number;
        options: any;
        nextAnimation: string;
    };
    loading: boolean;
    componentDidMount(): void;
    componentDidUpdate(prevProps: CarouselProps): void;
    componentWillUnmount(): void;
    doAction(action: ActionObject, args: object, throwErrors: boolean): any;
    prepareAutoSlide(): void;
    autoSlide(rel?: string): void;
    transitFramesTowards(direction: string, nextAnimation: string): Promise<void>;
    getFrameId(pos?: string): number;
    next(): void;
    prev(): void;
    clearAutoTimeout(): void;
    changeSlide(index: number): Promise<void>;
    renderDots(): React.JSX.Element;
    renderArrows(): React.JSX.Element;
    handleMouseEnter(): void;
    handleMouseLeave(): void;
    getNewOptions(options: any, count?: number): any[];
    render(): React.JSX.Element;
}
export declare class CarouselRenderer extends Carousel {
    static contextType: React.Context<IScopedContext>;
    constructor(props: CarouselProps, context: IScopedContext);
    componentWillUnmount(): void;
}
