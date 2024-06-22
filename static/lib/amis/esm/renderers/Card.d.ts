import React from 'react';
import { RendererProps } from 'amis-core';
import { SchemaNode, Schema, ActionObject, PlainObject } from 'amis-core';
import { SchemaQuickEdit } from './QuickEdit';
import { SchemaPopOver } from './PopOver';
import { TableCell } from './Table';
import { SchemaCopyable } from './Copyable';
import { BaseSchema, SchemaClassName, SchemaExpression, SchemaObject, SchemaTpl, SchemaUrlPath } from '../Schema';
import { ActionSchema } from './Action';
import type { IItem } from 'amis-core';
export type CardBodyField = SchemaObject & {
    /**
     * 列标题
     */
    label: string;
    /**
     * label 类名
     */
    labelClassName?: SchemaClassName;
    /**
     * 绑定字段名
     */
    name?: string;
    /**
     * 配置查看详情功能
     */
    popOver?: SchemaPopOver;
    /**
     * 配置快速编辑功能
     */
    quickEdit?: SchemaQuickEdit;
    /**
     * 配置点击复制功能
     */
    copyable?: SchemaCopyable;
};
/**
 * Card 卡片渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/card
 */
export interface CardSchema extends BaseSchema {
    /**
     * 指定为 card 类型
     */
    type: 'card';
    /**
     * 头部配置
     */
    header?: {
        className?: SchemaClassName;
        /**
         * 标题
         */
        title?: SchemaTpl;
        titleClassName?: SchemaClassName;
        /**
         * 副标题
         */
        subTitle?: SchemaTpl;
        subTitleClassName?: SchemaClassName;
        subTitlePlaceholder?: string;
        /**
         * 描述
         */
        description?: SchemaTpl;
        /**
         * 描述占位内容
         */
        descriptionPlaceholder?: string;
        /**
         * 描述占位类名
         */
        descriptionClassName?: SchemaClassName;
        /**
         * @deprecated 建议用 description
         */
        desc?: SchemaTpl;
        /**
         * @deprecated 建议用 descriptionPlaceholder
         */
        descPlaceholder?: SchemaTpl;
        /**
         * @deprecated 建议用 descriptionClassName
         */
        descClassName?: SchemaClassName;
        /**
         * 图片地址
         */
        avatar?: SchemaUrlPath;
        avatarText?: SchemaTpl;
        avatarTextBackground?: String[];
        avatarTextClassName?: SchemaClassName;
        /**
         * 图片包括层类名
         */
        avatarClassName?: SchemaClassName;
        /**
         * 图片类名。
         */
        imageClassName?: SchemaClassName;
        /**
         * 是否点亮
         */
        highlight?: SchemaExpression;
        highlightClassName?: SchemaClassName;
        /**
         * 链接地址
         */
        href?: SchemaTpl;
        /**
         * 是否新窗口打开
         */
        blank?: boolean;
    };
    /**
     * 内容区域
     */
    body?: Array<CardBodyField>;
    /**
     * 多媒体区域
     */
    media?: {
        className?: SchemaClassName;
        /**
         * 多媒体类型
         */
        type?: 'image' | 'video';
        /**
         * 多媒体链接地址
         */
        url?: SchemaUrlPath;
        /**
         * 多媒体区域位置
         */
        position?: 'top' | 'left' | 'right' | 'bottom';
        /**
         * 类型为video时是否自动播放
         */
        autoPlay?: boolean;
        /**
         * 类型为video时是否是直播
         */
        isLive?: boolean;
        /**
         * 类型为video时视频封面
         */
        poster?: SchemaUrlPath;
    };
    /**
     * 底部按钮集合。
     */
    actions?: Array<ActionSchema>;
    /**
     * 工具栏按钮
     */
    toolbar?: Array<ActionSchema>;
    /**
     * 次要说明
     */
    secondary?: SchemaTpl;
    /**
     * 卡片内容区的表单项label是否使用Card内部的样式，默认为true
     */
    useCardLabel?: boolean;
}
export interface CardProps extends RendererProps, Omit<CardSchema, 'className'> {
    onCheck: (item: IItem) => void;
    actionsCount: number;
    itemIndex?: number;
    dragging?: boolean;
    selectable?: boolean;
    selected?: boolean;
    checkable?: boolean;
    multiple?: boolean;
    hideCheckToggler?: boolean;
    item: IItem;
    checkOnItemClick?: boolean;
}
export declare class CardRenderer extends React.Component<CardProps> {
    static defaultProps: {
        className: string;
        avatarClassName: string;
        headerClassName: string;
        footerClassName: string;
        secondaryClassName: string;
        avatarTextClassName: string;
        bodyClassName: string;
        actionsCount: number;
        titleClassName: string;
        highlightClassName: string;
        subTitleClassName: string;
        descClassName: string;
        descriptionClassName: string;
        imageClassName: string;
        highlight: boolean;
        blank: boolean;
        dragging: boolean;
        selectable: boolean;
        checkable: boolean;
        selected: boolean;
        hideCheckToggler: boolean;
        useCardLabel: boolean;
    };
    static propsList: Array<string>;
    constructor(props: CardProps);
    isHaveLink(): any;
    handleClick(e: React.MouseEvent<HTMLDivElement>): void;
    handleAction(e: React.UIEvent<any>, action: ActionObject, ctx: object): void;
    handleCheck(): void;
    getPopOverContainer(): Element | Text | null;
    handleQuickChange(values: object, saveImmediately?: boolean, savePristine?: boolean, options?: {
        resetOnFailed?: boolean;
        reload?: string;
    }): void;
    renderToolbar(): React.JSX.Element | null;
    renderActions(): React.JSX.Element[] | undefined;
    renderChild(node: SchemaNode, region?: string, key?: any): React.ReactNode;
    itemRender(field: any, index: number, props: any): React.JSX.Element | undefined;
    renderFeild(region: string, field: Schema, key: any, props: any): React.JSX.Element | undefined;
    renderBody(): React.ReactNode;
    rederTitle(): JSX.Element | undefined;
    renderSubTitle(): JSX.Element | undefined;
    renderSubTitlePlaceholder(): JSX.Element | undefined;
    renderDesc(): JSX.Element | undefined;
    renderDescPlaceholder(): JSX.Element | undefined;
    renderAvatar(): string | undefined;
    renderAvatarText(): JSX.Element | undefined;
    renderSecondary(): JSX.Element | undefined;
    renderAvatarTextStyle(): PlainObject | undefined;
    renderMedia(): React.JSX.Element | undefined;
    render(): React.JSX.Element;
}
export declare class CardItemFieldRenderer extends TableCell {
    static defaultProps: {
        wrapperComponent: string;
    };
    static propsList: string[];
    render(): React.JSX.Element;
}
