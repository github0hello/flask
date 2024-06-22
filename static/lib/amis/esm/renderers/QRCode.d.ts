import React from 'react';
import { ActionObject, IScopedContext } from 'amis-core';
import { FormControlProps } from 'amis-core';
import { BaseSchema, SchemaClassName } from '../Schema';
export interface QRCodeImageSettings {
    src: string;
    height: number;
    width: number;
    excavate: boolean;
    x?: number;
    y?: number;
}
/**
 * 二维码展示控件。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/qrcode
 */
export interface QRCodeSchema extends BaseSchema {
    type: 'qrcode' | 'qr-code';
    /**
     * 关联字段名。
     */
    name?: string;
    /**
     * css 类名
     */
    qrcodeClassName?: SchemaClassName;
    /**
     * 二维码的宽高大小，默认 128
     * @default 128
     */
    codeSize?: number;
    /**
     * 背景色
     */
    backgroundColor?: string;
    /**
     * 前景色
     */
    foregroundColor?: string;
    /**
     * 二维码复杂级别
     */
    level?: 'L' | 'M' | 'Q' | 'H';
    /**
     * 占位符
     */
    placeholder?: string;
    /**
     * 图片配置
     */
    imageSettings?: QRCodeImageSettings;
}
export interface QRCodeProps extends FormControlProps, Omit<QRCodeSchema, 'type' | 'className'> {
}
export default class QRCode extends React.Component<QRCodeProps, any> {
    static defaultProps: Partial<QRCodeProps>;
    ref: React.RefObject<HTMLDivElement>;
    constructor(props: QRCodeProps);
    /**
     * 获取图片配置
     */
    getImageSettings(): QRCodeImageSettings | undefined;
    /**
     * 接收动作事件
     */
    doAction(action: ActionObject, args: any, throwErrors: boolean): any;
    render(): React.JSX.Element;
}
export declare class QRCodeRenderer extends QRCode {
    static contextType: React.Context<IScopedContext>;
    constructor(props: QRCodeProps, context: IScopedContext);
    componentWillUnmount(): void;
}
