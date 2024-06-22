import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaClassName, SchemaCollection, SchemaTpl } from '../Schema';
import { ActionSchema } from './Action';
import { FormHorizontal } from 'amis-core';
/**
 * Panel渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/panel
 */
export interface PanelSchema extends BaseSchema {
    /**
     * 指定为Panel渲染器。
     */
    type: 'panel';
    /**
     * 按钮集合
     */
    actions?: Array<ActionSchema>;
    /**
     * 按钮集合外层类名
     */
    actionsClassName?: SchemaClassName;
    /**
     * 内容区域
     */
    body?: SchemaCollection;
    /**
     * 配置 Body 容器 className
     */
    bodyClassName?: SchemaClassName;
    /**
     * 底部内容区域
     */
    footer?: SchemaCollection;
    /**
     * 配置 footer 容器 className
     */
    footerClassName?: SchemaClassName;
    /**
     * footer 和 actions 外层 div 类名。
     */
    footerWrapClassName?: SchemaClassName;
    /**
     * 头部内容, 和 title 二选一。
     */
    header?: SchemaCollection;
    /**
     * 配置 header 容器 className
     */
    headerClassName?: SchemaClassName;
    /**
     * Panel 标题
     */
    title?: SchemaTpl;
    /**
     * 固定底部, 想要把按钮固定在底部的时候配置。
     */
    affixFooter?: boolean | 'always';
    /**
     * 配置子表单项默认的展示方式。
     */
    subFormMode?: 'normal' | 'inline' | 'horizontal';
    /**
     * 如果是水平排版，这个属性可以细化水平排版的左右宽度占比。
     */
    subFormHorizontal?: FormHorizontal;
}
export interface PanelProps extends RendererProps, Omit<PanelSchema, 'type' | 'className' | 'panelClassName' | 'bodyClassName'> {
}
export default class Panel extends React.Component<PanelProps> {
    static propsList: Array<string>;
    static defaultProps: {};
    renderBody(): JSX.Element | null;
    renderActions(): JSX.Element[] | null;
    render(): React.JSX.Element;
}
export declare class PanelRenderer extends Panel {
}
