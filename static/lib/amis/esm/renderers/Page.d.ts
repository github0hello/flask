import React from 'react';
import { RendererProps } from 'amis-core';
import { IServiceStore } from 'amis-core';
import { ActionObject, Location } from 'amis-core';
import { IScopedContext } from 'amis-core';
import { SpinnerExtraProps } from 'amis-ui';
import { BaseSchema, SchemaCollection, SchemaClassName, SchemaDefaultData, SchemaApi, SchemaExpression, SchemaName, SchemaMessage } from '../Schema';
import { SchemaRemark } from './Remark';
/**
 * css 定义
 */
interface CSSRule {
    [selector: string]: Record<string, string> | Record<string, Record<string, string>>;
}
/**
 * amis Page 渲染器。详情请见：https://aisuda.bce.baidu.com/amis/zh-CN/components/page
 */
export interface PageSchema extends BaseSchema, SpinnerExtraProps {
    /**
     * 指定为 page 渲染器。
     */
    type: 'page';
    /**
     * 页面标题
     */
    title?: string;
    /**
     * 页面副标题
     */
    subTitle?: string;
    /**
     * 页面描述, 标题旁边会出现个小图标，放上去会显示这个属性配置的内容。
     */
    remark?: SchemaRemark;
    /**
     * 内容区域
     */
    body?: SchemaCollection;
    /**
     * 内容区 css 类名
     */
    bodyClassName?: SchemaClassName;
    /**
     * 边栏区域
     */
    aside?: SchemaCollection;
    /**
     * 边栏是否允许拖动
     */
    asideResizor?: boolean;
    /**
     * 边栏内容是否粘住，即不跟随滚动。
     *
     * @default true
     */
    asideSticky?: boolean;
    /**
     * 边栏最小宽度
     */
    asideMinWidth?: number;
    /**
     * 边栏最小宽度
     */
    asideMaxWidth?: number;
    /**
     * 边栏区 css 类名
     */
    asideClassName?: SchemaClassName;
    /**
     * 配置容器 className
     */
    className?: SchemaClassName;
    /**
     * 自定义页面级别样式表
     */
    css?: CSSRule;
    /**
     * 移动端下的样式表
     */
    mobileCSS?: CSSRule;
    /**
     * 页面级别的初始数据
     */
    data?: SchemaDefaultData;
    /**
     * 配置 header 容器 className
     */
    headerClassName?: SchemaClassName;
    /**
     * 页面初始化的时候，可以设置一个 API 让其取拉取，发送数据会携带当前 data 数据（包含地址栏参数），获取得数据会合并到 data 中，供组件内使用。
     */
    initApi?: SchemaApi;
    /**
     * 是否默认就拉取？
     */
    initFetch?: boolean;
    /**
     * 是否默认就拉取表达式
     */
    initFetchOn?: SchemaExpression;
    messages?: SchemaMessage;
    name?: SchemaName;
    /**
     * 页面顶部区域，当存在 title 时在右上角显示。
     */
    toolbar?: SchemaCollection;
    /**
     * 配置 toolbar 容器 className
     */
    toolbarClassName?: SchemaClassName;
    definitions?: any;
    /**
     * 配置轮询间隔，配置后 initApi 将轮询加载。
     */
    interval?: number;
    /**
     * 是否要静默加载，也就是说不显示进度
     */
    silentPolling?: boolean;
    /**
     * 配置停止轮询的条件。
     */
    stopAutoRefreshWhen?: SchemaExpression;
    /**
     * 是否显示错误信息，默认是显示的。
     */
    showErrorMsg?: boolean;
    /**
     * css 变量
     */
    cssVars?: any;
    /**
     * 默认不设置自动感觉内容来决定要不要展示这些区域
     * 如果配置了，以配置为主。
     */
    regions?: Array<'aside' | 'body' | 'toolbar' | 'header'>;
    /**
     * 自定义样式
     */
    style?: {
        [propName: string]: any;
    };
    /**
     * 下拉刷新配置
     */
    pullRefresh?: {
        disabled?: boolean;
        pullingText?: string;
        loosingText?: string;
    };
}
export interface PageProps extends RendererProps, Omit<PageSchema, 'type' | 'className'> {
    data: any;
    store: IServiceStore;
    location?: Location;
}
export default class Page extends React.Component<PageProps> {
    timer: ReturnType<typeof setTimeout>;
    mounted: boolean;
    style: HTMLStyleElement;
    varStyle: HTMLStyleElement;
    startX: number;
    startWidth: number;
    codeWrap: HTMLElement;
    static defaultProps: {
        asideClassName: string;
        bodyClassName: string;
        headerClassName: string;
        initFetch: boolean;
        toolbarClassName: string;
        messages: {};
        asideSticky: boolean;
        pullRefresh: {
            disabled: boolean;
        };
    };
    static propsList: Array<keyof PageProps>;
    constructor(props: PageProps);
    /**
     * 构建 css
     */
    updateStyle(): void;
    buildCSS(cssRules?: CSSRule): string;
    /**
     * 构建用于 css 变量的内联样式
     */
    updateVarStyle(): void;
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: PageProps): void;
    componentWillUnmount(): void;
    reloadTarget(target: string, data?: any): void;
    handleAction(e: React.UIEvent<any> | void, action: ActionObject, ctx: object, throwErrors?: boolean, delegate?: IScopedContext): any;
    handleQuery(query: any): any;
    handleDialogConfirm(values: object[], action: ActionObject, ...args: Array<any>): void;
    handleDialogClose(confirmed?: boolean): void;
    handleDrawerConfirm(values: object[], action: ActionObject, ...args: Array<any>): void;
    handleDrawerClose(): void;
    handleClick(e: any): void;
    handleResizeMouseDown(e: React.MouseEvent): void;
    handleResizeMouseMove(e: MouseEvent): void;
    handleResizeMouseUp(): void;
    openFeedback(dialog: any, ctx: any): Promise<unknown>;
    reload(subpath?: any, query?: any, ctx?: any, silent?: boolean, replace?: boolean): void;
    receive(values: object, subPath?: string, replace?: boolean): void;
    silentReload(target?: string, query?: any): void;
    initInterval(value: any): any;
    handleRefresh(): Promise<void>;
    handleChange(value: any, name: string, submit?: boolean, changePristine?: boolean): void;
    handleBulkChange(values: Object): void;
    renderHeader(): React.JSX.Element | undefined;
    render(): React.JSX.Element;
}
export declare class PageRenderer extends Page {
    static contextType: React.Context<IScopedContext>;
    constructor(props: PageProps, context: IScopedContext);
    componentWillUnmount(): void;
    reloadTarget(target: string, data?: any): void;
    handleAction(e: React.UIEvent<any>, action: ActionObject, ctx: object, throwErrors?: boolean, delegate?: IScopedContext): void;
    handleDialogConfirm(values: object[], action: ActionObject, ...rest: Array<any>): void;
    handleDrawerConfirm(values: object[], action: ActionObject, ...rest: Array<any>): void;
    setData(values: object, replace?: boolean): void;
    getData(): any;
}
export {};
