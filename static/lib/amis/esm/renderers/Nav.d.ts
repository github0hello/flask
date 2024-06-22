/// <reference types="hoist-non-react-statics" />
import React from 'react';
import { RendererEnv, RendererProps, ActionObject } from 'amis-core';
import { ThemeProps } from 'amis-core';
import { SpinnerExtraProps } from 'amis-ui';
import { BadgeObject } from 'amis-ui';
import { IScopedContext } from 'amis-core';
import type { NavigationItem } from 'amis-ui/lib/components/menu';
import type { BaseSchema, SchemaObject, SchemaApi, SchemaIcon, SchemaUrlPath, SchemaCollection, SchemaClassName } from '../Schema';
export type IconItemSchema = {
    icon?: SchemaIcon;
    position: string;
};
export type NavItemSchema = {
    /**
     * 文字说明
     */
    label?: string | SchemaCollection;
    /**
     * 图标类名，参考 fontawesome 4。
     */
    icon?: SchemaIcon | Array<IconItemSchema>;
    to?: SchemaUrlPath;
    target?: string;
    unfolded?: boolean;
    active?: boolean;
    defer?: boolean;
    deferApi?: SchemaApi;
    children?: Array<NavItemSchema>;
    key?: string;
    disabled?: boolean;
    disabledTip?: string;
    className?: string;
    mode?: string;
} & Omit<BaseSchema, 'type'>;
export interface NavOverflow {
    /**
     * 是否开启响应式收纳
     */
    enable: boolean;
    /**
     * 菜单触发按钮的文字
     */
    overflowLabel?: string | SchemaObject;
    /**
     * 菜单触发按钮的图标
     * @default "fa fa-ellipsis-h"
     */
    overflowIndicator?: SchemaIcon;
    /**
     * 菜单触发按钮CSS类名
     */
    overflowClassName?: SchemaClassName;
    /**
     * Popover浮层CSS类名
     */
    overflowPopoverClassName?: SchemaClassName;
    /**
     * 菜单外层CSS类名
     */
    overflowListClassName?: SchemaClassName;
    /**
     * 导航横向布局时，开启开启响应式收纳后最大可显示数量，超出此数量的导航将被收纳到下拉菜单中
     */
    maxVisibleCount?: number;
    /**
     * 包裹导航的外层标签名，可以使用其他标签渲染
     * @default "ul"
     */
    wrapperComponent?: string;
    /**
     * 导航项目宽度
     * @default 160
     */
    itemWidth?: number;
    /**
     * 导航列表后缀节点
     */
    overflowSuffix?: SchemaCollection;
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
}
/**
 * Nav 导航渲染器
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/nav
 */
export interface NavSchema extends BaseSchema {
    /**
     * 指定为 Nav 导航渲染器
     */
    type: 'nav';
    /**
     * 链接地址集合
     */
    links?: Array<NavItemSchema>;
    /**
     * @default 16
     */
    indentSize: number;
    /**
     * 可以通过 API 拉取。
     */
    source?: SchemaApi;
    /**
     * 懒加载 api，如果不配置复用 source 接口。
     */
    deferApi?: SchemaApi;
    /**
     * true 为垂直排列，false 为水平排列类似如 tabs。
     */
    stacked?: true | false;
    /**
     * 更多操作菜单列表
     */
    itemActions?: SchemaCollection;
    /**
     * 可拖拽
     */
    draggable?: boolean;
    /**
     * 保存排序的 api
     */
    saveOrderApi?: SchemaApi;
    /**
     * 角标
     */
    itemBadge?: BadgeObject;
    /**
     * 角标
     */
    badge?: BadgeObject;
    /**
     * 仅允许同层级拖拽
     */
    dragOnSameLevel?: boolean;
    /**
     * 横向导航时自动收纳配置
     */
    overflow?: NavOverflow;
    /**
     * 最多展示多少层级
     */
    level?: number;
    /**
     * 默认展开层级 小于等于该层数的节点默认全部打开
     */
    defaultOpenLevel?: number;
    /**
     * 控制仅展示指定key菜单下的子菜单项
     */
    showKey?: string;
    /**
     * 控制菜单缩起
     */
    collapsed?: boolean;
    /**
     * 垂直模式 非折叠状态下 控制菜单打开方式
     */
    mode?: 'float' | 'inline';
    /**
     * 自定义展开图标
     */
    expandIcon?: string | SchemaObject;
    /**
     * 自定义展开图标位置 默认在前面 before after
     */
    expandPosition?: string;
    /**
     * 主题配色 默认light
     */
    themeColor?: 'light' | 'dark';
    /**
     * 手风琴展开 仅垂直inline模式支持
     */
    accordion?: boolean;
    /**
     * 子菜单项展开浮层样式
     */
    popupClassName?: string;
    /**
     * 是否开启搜索
     */
    searchable?: boolean;
    /**
     * 搜索框相关配置
     */
    searchConfig?: {
        /**
         * 搜索框外层CSS样式类
         */
        className?: string;
        /**
         * 搜索匹配函数
         */
        matchFunc?: string | any;
        /**
         * 占位符
         */
        placeholder?: string;
        /**
         * 是否为 Mini 样式。
         */
        mini?: boolean;
        /**
         * 是否为加强样式
         */
        enhance?: boolean;
        /**
         * 是否可清除
         */
        clearable?: boolean;
        /**
         * 是否立马搜索。
         */
        searchImediately?: boolean;
        /**
         * 指定唯一标识字段
         */
        valueField?: string;
    };
}
export interface Link {
    className?: string;
    label?: string | SchemaCollection;
    to?: string;
    target?: string;
    icon?: string;
    active?: boolean;
    activeOn?: string;
    unfolded?: boolean;
    children?: Links;
    defer?: boolean;
    loading?: boolean;
    loaded?: boolean;
    [propName: string]: any;
    disabled?: boolean;
    disabledTip?: string;
}
export interface Links extends Array<Link> {
}
export interface NavigationState {
    error?: string;
    dropIndicator?: {
        top: number;
        left: number;
        width: number;
        height?: number;
        opacity?: number;
    };
    collapsed?: boolean;
    keyword?: string;
    filteredLinks?: Link[];
}
export interface NavigationProps extends ThemeProps, Omit<RendererProps, 'className'>, Omit<NavSchema, 'type' | 'className'>, SpinnerExtraProps {
    onSelect?: (item: Link, depth: number) => void | false;
    onToggle?: (item: Link, depth: number, forceFold?: boolean) => void;
    onDragUpdate?: (dropInfo: IDropInfo) => void;
    onOrderChange?: (res: Link[]) => void;
    togglerClassName?: string;
    links?: Array<Link>;
    loading?: boolean;
    render: RendererProps['render'];
    env: RendererEnv;
    data: Object;
    reload?: any;
    overflow?: NavOverflow;
    /**
     * 菜单DOM挂载点
     */
    popOverContainer?: () => HTMLElement;
}
export interface IDropInfo {
    dragLink: Link | null;
    nodeId: string;
    position: string;
    rect: DOMRect;
    height: number;
    left: number;
}
export declare class Navigation extends React.Component<NavigationProps, NavigationState> {
    static defaultProps: Pick<NavigationProps, 'indentSize'>;
    dragNode: {
        node: HTMLElement;
        link: Link | null;
    } | null;
    dropInfo: IDropInfo | null;
    startPoint: {
        y: number;
        x: number;
    };
    state: NavigationState;
    handleClick(link: Link, depth: number): Promise<boolean>;
    handleChange(links: Array<Link>): Promise<void>;
    toggleLink(target: Link, depth: number, forceFold?: boolean): void;
    getDropInfo(e: DragEvent, id: string, depth: number): IDropInfo;
    updateDropIndicator(e: DragEvent): void;
    handleDragStart(link: Link): (e: React.DragEvent) => void;
    handleDragOver(e: DragEvent): void;
    handleDragEnd(e: DragEvent): void;
    normalizeNavigations(links: Links, depth: number): Array<NavigationItem>;
    handleSearch(keyword: string): Promise<void>;
    renderSearchBox(): React.JSX.Element;
    render(): JSX.Element;
}
declare const ThemedNavigation: {
    new (props: Omit<NavigationProps, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps): {
        ref: any;
        childRef(ref: any): void;
        getWrappedInstance(): any;
        render(): React.JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Omit<NavigationProps, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Omit<NavigationProps, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Omit<NavigationProps, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        /**
         * Nav 导航渲染器
         * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/nav
         */
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<NavigationProps, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Omit<NavigationProps, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Omit<NavigationProps, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Omit<NavigationProps, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Omit<NavigationProps, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<NavigationProps, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: React.ComponentType<typeof Navigation>;
} & import("hoist-non-react-statics").NonReactStatics<typeof Navigation, {}> & {
    ComposedComponent: typeof Navigation;
};
export default ThemedNavigation;
export declare class NavigationRenderer extends React.Component<RendererProps> {
    static contextType: React.Context<IScopedContext>;
    navRef: any;
    remoteRef: {
        loadConfig: (ctx?: any) => Promise<any> | void;
        setConfig: (value: any) => void;
        syncConfig: () => void;
    } | undefined;
    remoteConfigRef(ref: any): void;
    getRef(ref: any): void;
    constructor(props: RendererProps, context: IScopedContext);
    componentDidUpdate(prevProps: any): void;
    componentWillUnmount(): void;
    doAction(action: ActionObject, args: {
        value?: string | {
            [key: string]: string;
        };
    }): void;
    reload(target?: string, query?: any, values?: object): void;
    receive(values: object): void;
    render(): React.JSX.Element;
}
