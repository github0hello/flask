import React from 'react';
import { RendererProps } from 'amis-core';
import { ImageThumbProps } from './Image';
import { BaseSchema, SchemaClassName, SchemaUrlPath } from '../Schema';
import type { ImageToolbarAction } from './Image';
/**
 * 图片集展示控件。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/images
 */
export interface ImagesSchema extends BaseSchema {
    /**
     * 指定为图片集渲染器
     */
    type: 'images' | 'static-images';
    /**
     * 默认图片地址
     */
    defaultImage?: SchemaUrlPath;
    /**
     * 列表为空时显示
     */
    placeholder?: string;
    /**
     * 配置值的连接符
     * @default ,
     */
    delimiter?: string;
    /**
     * 预览图模式
     */
    thumbMode?: 'w-full' | 'h-full' | 'contain' | 'cover';
    /**
     * 预览图比率
     */
    thumbRatio?: '1:1' | '4:3' | '16:9';
    /**
     * 关联字段名，也可以直接配置 src
     */
    name?: string;
    value?: any;
    source?: string;
    options?: Array<any>;
    /**
     * 图片地址，默认读取数据中的 image 属性，如果不是请配置 ,如  ${imageUrl}
     */
    src?: string;
    /**
     * 大图地址，不设置用 src 属性，如果不是请配置，如：${imageOriginUrl}
     */
    originalSrc?: string;
    /**
     * 是否启动放大功能。
     */
    enlargeAble?: boolean;
    /**
     * 放大时是否显示图片集
     */
    enlargetWithImages?: boolean;
    /**
     * 是否显示尺寸。
     */
    showDimensions?: boolean;
    /**
     * 外层 CSS 类名
     */
    className?: SchemaClassName;
    /**
     * 列表 CSS 类名
     */
    listClassName?: SchemaClassName;
    /**
     * 放大详情图 CSS 类名
     */
    imageGallaryClassName?: SchemaClassName;
    /**
     * 是否展示图片工具栏
     */
    showToolbar?: boolean;
    /**
     * 工具栏配置
     */
    toolbarActions?: ImageToolbarAction[];
}
export interface ImagesProps extends RendererProps, Omit<ImagesSchema, 'type' | 'className'> {
    delimiter: string;
    onEnlarge?: (info: ImageThumbProps & {
        list?: Array<Pick<ImageThumbProps, 'src' | 'originalSrc' | 'title' | 'caption' | 'showToolbar'>>;
    }) => void;
}
export declare class ImagesField extends React.Component<ImagesProps> {
    static defaultProps: Pick<ImagesProps, 'className' | 'delimiter' | 'defaultImage' | 'placehoder' | 'thumbMode' | 'thumbRatio'>;
    list: Array<any>;
    handleEnlarge(info: ImageThumbProps): void;
    render(): React.JSX.Element;
}
export declare class ImagesFieldRenderer extends ImagesField {
}
