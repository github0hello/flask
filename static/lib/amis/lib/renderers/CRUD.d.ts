/// <reference types="lodash" />
import React from 'react';
import { RendererProps } from 'amis-core';
import { SchemaNode, Schema, ActionObject, PlainObject } from 'amis-core';
import { ICRUDStore } from 'amis-core';
import { IScopedContext } from 'amis-core';
import { SpinnerExtraProps } from 'amis-ui';
import { BaseSchema, SchemaApi, SchemaClassName, SchemaExpression, SchemaMessage, SchemaName, SchemaObject, SchemaTokenizeableString, SchemaTpl } from '../Schema';
import { ActionSchema } from './Action';
import { CardsSchema } from './Cards';
import { ListSchema } from './List';
import { TableSchema } from './Table';
import type { TableRendererEvent } from './Table';
import type { CardsRendererEvent } from './Cards';
export type CRUDBultinToolbarType = 'columns-toggler' | 'drag-toggler' | 'pagination' | 'bulkActions' | 'bulk-actions' | 'statistics' | 'switch-per-page' | 'load-more' | 'filter-toggler' | 'export-csv' | 'export-excel';
export interface CRUDBultinToolbar extends Omit<BaseSchema, 'type'> {
    type: CRUDBultinToolbarType;
}
export type CRUDToolbarChild = SchemaObject | CRUDBultinToolbar;
export type CRUDToolbarObject = {
    /**
     * 对齐方式
     */
    align?: 'left' | 'right';
};
export type AutoGenerateFilterObject = {
    /**
     * 过滤条件单行列数
     */
    columnsNum?: number;
    /**
     * 是否显示设置查询字段
     */
    showBtnToolbar?: boolean;
    /**
     * 是否显示展开/收起
     */
    /**
     * 是否默认收起
     *
     * @default true
     */
    defaultCollapsed?: boolean;
};
export type CRUDRendererEvent = TableRendererEvent | CardsRendererEvent;
export interface CRUDCommonSchema extends BaseSchema, SpinnerExtraProps {
    /**
     *  指定为 CRUD 渲染器。
     */
    type: 'crud';
    /**
     * 指定内容区的展示模式。
     */
    mode?: 'table' | 'grid' | 'cards' | /* grid 的别名*/ 'list';
    /**
     * 初始化数据 API
     */
    api?: SchemaApi;
    /**
     * 懒加载 API，当行数据中用 defer: true 标记了，则其孩子节点将会用这个 API 来拉取数据。
     */
    deferApi?: SchemaApi;
    /**
     * 批量操作
     */
    bulkActions?: Array<ActionSchema>;
    /**
     * 单条操作
     */
    itemActions?: Array<ActionSchema>;
    /**
     * 每页个数，默认为 10，如果不是请设置。
     *
     * @default 10
     */
    perPage?: number;
    /**
     * 默认排序字段
     */
    orderBy?: string;
    /**
     * 默认排序方向
     */
    orderDir?: 'asc' | 'desc';
    /**
     * 可以默认给定初始参数如： {\"perPage\": 24}
     */
    defaultParams?: PlainObject;
    /**
     * 是否可通过拖拽排序
     */
    draggable?: boolean;
    /**
     * 是否可通过拖拽排序，通过表达式来配置
     */
    draggableOn?: SchemaExpression;
    name?: SchemaName;
    /**
     * 过滤器表单
     */
    filter?: any;
    /**
     * 初始是否拉取
     * @deprecated 建议用 api 的 sendOn 代替。
     */
    initFetch?: boolean;
    /**
     * 初始是否拉取，用表达式来配置。
     * @deprecated 建议用 api 的 sendOn 代替。
     */
    initFetchOn?: SchemaExpression;
    /**
     * 配置内部 DOM 的 className
     */
    innerClassName?: SchemaClassName;
    /**
     * 设置自动刷新时间
     */
    interval?: number;
    /**
     * 设置用来确定位置的字段名，设置后新的顺序将被赋值到该字段中。
     */
    orderField?: string;
    /**
     * 设置分页页码字段名。
     * @default page
     */
    pageField?: string;
    /**
     * 设置分页一页显示的多少条数据的字段名。
     * @default perPage
     */
    perPageField?: string;
    /**
     * 设置分页方向的字段名。单位简单分页时清楚时向前还是向后翻页。
     * @default pageDir
     */
    pageDirectionField?: string;
    /**
     * 快速编辑后用来批量保存的 API
     */
    quickSaveApi?: SchemaApi;
    /**
     * 快速编辑配置成及时保存时使用的 API
     */
    quickSaveItemApi?: SchemaApi;
    /**
     * 保存排序的 api
     */
    saveOrderApi?: SchemaApi;
    /**
     * 是否将过滤条件的参数同步到地址栏,默认为true
     * @default true
     */
    syncLocation?: boolean;
    /**
     * 顶部工具栏
     */
    headerToolbar?: Array<(CRUDToolbarChild & CRUDToolbarObject) | CRUDBultinToolbarType>;
    /**
     * 底部工具栏
     */
    footerToolbar?: Array<(CRUDToolbarChild & CRUDToolbarObject) | CRUDBultinToolbarType>;
    /**
     * 每页显示多少个空间成员的配置如： [10, 20, 50, 100]。
     */
    perPageAvailable?: Array<number>;
    messages?: SchemaMessage;
    /**
     * 是否隐藏快速编辑的按钮。
     */
    hideQuickSaveBtn?: boolean;
    /**
     * 是否自动跳顶部，当切分页的时候。
     */
    autoJumpToTopOnPagerChange?: boolean;
    /**
     * 静默拉取
     */
    silentPolling?: boolean;
    stopAutoRefreshWhen?: SchemaExpression;
    stopAutoRefreshWhenModalIsOpen?: boolean;
    filterTogglable?: boolean | {
        label?: string;
        activeLabel?: string;
        icon?: string;
        activeIcon?: string;
    };
    filterDefaultVisible?: boolean;
    /**
     * 是否将接口返回的内容自动同步到地址栏，前提是开启了同步地址栏。
     */
    syncResponse2Query?: boolean;
    /**
     * 分页的时候是否保留用户选择。
     */
    keepItemSelectionOnPageChange?: boolean;
    /**
     * 当配置 keepItemSelectionOnPageChange 时有用，用来配置已勾选项的文案。
     */
    labelTpl?: SchemaTpl;
    /**
     * 是否为前端单次加载模式，可以用来实现前端分页。
     */
    loadDataOnce?: boolean;
    /**
     * 在开启loadDataOnce时，当修改过滤条件时是否重新请求api
     *
     * 如果没有配置，当查询条件表单触发的会重新请求 api，当是列过滤或者是 search-box 触发的则不重新请求 api
     * 如果配置为 true，则不管是什么触发都会重新请求 api
     * 如果配置为 false 则不管是什么触发都不会重新请求 api
     */
    loadDataOnceFetchOnFilter?: boolean;
    /**
     * 自定义搜索匹配函数，当开启loadDataOnce时，会基于该函数计算的匹配结果进行过滤，主要用于处理列字段类型较为复杂或者字段值格式和后端返回不一致的场景
     * @since 3.5.0
     */
    matchFunc?: string | any;
    /**
     * 也可以直接从环境变量中读取，但是不太推荐。
     */
    source?: SchemaTokenizeableString;
    /**
     * 如果时内嵌模式，可以通过这个来配置默认的展开选项。
     */
    expandConfig?: {
        /**
         * 默认是展开第一个、所有、还是都不展开。
         */
        expand?: 'first' | 'all' | 'none';
        /**
         * 是否显示全部切换按钮
         */
        expandAll?: boolean;
        /**
         * 是否为手风琴模式
         */
        accordion?: boolean;
    };
    /**
     * 默认只有当分页数大于 1 是才显示，如果总是想显示请配置。
     */
    alwaysShowPagination?: boolean;
    /**
     * 开启查询区域，会根据列元素的searchable属性值，自动生成查询条件表单
     */
    autoGenerateFilter?: AutoGenerateFilterObject | boolean;
    /**
     * 内容区域占满屏幕剩余空间
     */
    autoFillHeight?: TableSchema['autoFillHeight'];
    /**
     * 是否开启Query信息转换，开启后将会对url中的Query进行转换，将字符串格式的布尔值转化为同位类型
     */
    parsePrimitiveQuery?: boolean;
}
export type CRUDCardsSchema = CRUDCommonSchema & {
    mode: 'cards';
} & Omit<CardsSchema, 'type'>;
export type CRUDListSchema = CRUDCommonSchema & {
    mode: 'list';
} & Omit<ListSchema, 'type'>;
export type CRUDTableSchema = CRUDCommonSchema & {
    mode?: 'table';
} & Omit<TableSchema, 'type'>;
/**
 * CRUD 增删改查渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/crud
 */
export type CRUDSchema = CRUDCardsSchema | CRUDListSchema | CRUDTableSchema;
export interface CRUDProps extends RendererProps, Omit<CRUDCommonSchema, 'type' | 'className'>, SpinnerExtraProps {
    store: ICRUDStore;
    pickerMode?: boolean;
}
export default class CRUD extends React.Component<CRUDProps, any> {
    static propsList: Array<keyof CRUDProps>;
    static defaultProps: {
        toolbarInline: boolean;
        headerToolbar: string[];
        footerToolbar: string[];
        primaryField: string;
        syncLocation: boolean;
        pageField: string;
        perPageField: string;
        pageDirectionField: string;
        hideQuickSaveBtn: boolean;
        autoJumpToTopOnPagerChange: boolean;
        silentPolling: boolean;
        filterTogglable: boolean;
        filterDefaultVisible: boolean;
        loadDataOnce: boolean;
        autoFillHeight: boolean;
        parsePrimitiveQuery: boolean;
    };
    control: any;
    lastQuery: any;
    lastData: any;
    timer: ReturnType<typeof setTimeout>;
    mounted: boolean;
    /** 父容器, 主要用于定位CRUD内部popover的挂载点 */
    parentContainer: Element | null;
    filterOnEvent: ((onEvent: any) => Partial<any>) & import("lodash").MemoizedFunction;
    constructor(props: CRUDProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: CRUDProps): void;
    componentWillUnmount(): void;
    /** 查找CRUD最近层级的父窗口 */
    getClosestParentContainer(): Element | null;
    controlRef(control: any): void;
    handleAction(e: React.UIEvent<any> | undefined, action: ActionObject, ctx: object, throwErrors?: boolean, delegate?: IScopedContext): any;
    handleBulkAction(selectedItems: Array<any>, unSelectedItems: Array<any>, e: React.UIEvent<any>, action: ActionObject): void;
    handleItemAction(action: ActionObject, ctx: any): void;
    handleFilterInit(values: object): void;
    handleFilterReset(values: object, action: any): void;
    handleFilterSubmit(values: Record<string, any>, jumpToFirstPage?: boolean, replaceLocation?: boolean, search?: boolean, isInit?: boolean): void;
    handleBulkGo(selectedItems: Array<any>, unSelectedItems: Array<any>, e: React.MouseEvent<any>): void | Promise<false | void>;
    handleDialogConfirm(values: object[], action: ActionObject, ctx: any, components: Array<any>): any;
    handleDialogClose(confirmed?: boolean): void;
    openFeedback(dialog: any, ctx: any): Promise<unknown>;
    search(values?: any, silent?: boolean, clearSelection?: boolean, forceReload?: boolean, isInit?: boolean): void;
    silentSearch(values?: object, clearSelection?: boolean, forceReload?: boolean): void;
    handleChangePage(page: number, perPage?: number, dir?: 'forward' | 'backward'): void;
    handleSave(rows: Array<object> | object, diff: Array<object> | object, indexes: Array<string>, unModifiedItems?: Array<any>, rowsOrigin?: Array<object> | object, options?: {
        resetOnFailed?: boolean;
        reload?: string;
    }): void;
    handleSaveOrder(moved: Array<object>, rows: Array<object>): void;
    handleSelect(items: Array<any>, unSelectedItems: Array<any>): void;
    handleChildPopOverOpen(popOver: any): void;
    handleChildPopOverClose(popOver: any): void;
    handleQuery(values: object, forceReload?: boolean, replace?: boolean, resetPage?: boolean): void;
    reload(subpath?: string, query?: any, replace?: boolean, resetPage?: boolean): void;
    receive(values: object, subPath?: string, replace?: boolean, resetPage?: boolean): void;
    reloadTarget(target: string, data: any): void;
    closeTarget(target: string): void;
    doAction(action: ActionObject, data: object, throwErrors?: boolean): any;
    unSelectItem(item: any, index: number): void;
    clearSelection(): void;
    hasBulkActionsToolbar(): any;
    hasBulkActions(): number | false;
    renderBulkActions(childProps: any): React.JSX.Element | null;
    renderPagination(toolbar: SchemaNode): React.JSX.Element | null;
    renderStatistics(): React.JSX.Element | null;
    renderSwitchPerPage(childProps: any): React.JSX.Element | null;
    renderLoadMore(): React.JSX.Element;
    renderFilterToggler(): React.JSX.Element | null;
    renderExportCSV(toolbar: Schema): React.JSX.Element;
    renderToolbar(toolbar?: SchemaNode, index?: number, childProps?: any, toolbarRenderer?: (toolbar: SchemaNode, index: number) => React.ReactNode): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null;
    renderHeaderToolbar(childProps: any, toolbarRenderer?: (toolbar: SchemaNode, index: number) => React.ReactNode): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null;
    renderFooterToolbar(childProps: any, toolbarRenderer?: (toolbar: SchemaNode, index: number) => React.ReactNode): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null;
    renderTag(item: any, index: number): React.JSX.Element;
    renderSelection(): React.ReactNode;
    render(): React.JSX.Element;
}
export declare class CRUDRenderer extends CRUD {
    static contextType: React.Context<IScopedContext>;
    constructor(props: CRUDProps, context: IScopedContext);
    componentWillUnmount(): void;
    reload(subpath?: string, query?: any, ctx?: any, silent?: boolean, replace?: boolean, args?: any): void;
    receive(values: any, subPath?: string, replace?: boolean, resetPage?: boolean): void;
    reloadTarget(target: string, data: any): void;
    closeTarget(target: string): void;
    setData(values: {
        items?: any[];
        rows?: any[];
        total?: number;
        count?: number;
    }, replace?: boolean, index?: number | string, condition?: any): Promise<void>;
    getData(): any;
}
