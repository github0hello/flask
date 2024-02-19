import React from 'react';
import { OptionsControlProps, Option } from 'amis-core';
import { ActionObject } from 'amis-core';
import { FormOptionsSchema, SchemaClassName, SchemaCollection } from '../../Schema';
/**
 * List 复选框
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/list
 */
export interface ListControlSchema extends FormOptionsSchema {
    type: 'list-select';
    /**
     * 开启双击点选并提交。
     */
    submitOnDBClick?: boolean;
    /**
     * 图片div类名
     */
    imageClassName?: string;
    /**
     * 可以自定义展示模板。
     */
    itemSchema?: SchemaCollection;
    /**
     * 激活态自定义展示模板。
     */
    activeItemSchema?: SchemaCollection;
    /**
     * 支持配置 list div 的 css 类名。
     * 比如：flex justify-between
     */
    listClassName?: SchemaClassName;
}
export interface ListProps extends OptionsControlProps, Omit<ListControlSchema, 'type' | 'options' | 'className' | 'descriptionClassName' | 'inputClassName'> {
}
export default class ListControl extends React.Component<ListProps, any> {
    static propsList: string[];
    static defaultProps: {
        clearable: boolean;
        imageClassName: string;
        submitOnDBClick: boolean;
    };
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    handleDBClick(option: Option, e: React.MouseEvent<HTMLElement>): void;
    handleClick(option: Option, e: React.MouseEvent<HTMLElement>): void;
    reload(): void;
    renderStatic(displayValue?: string): string | React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class ListControlRenderer extends ListControl {
}
