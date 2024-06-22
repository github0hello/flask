import React from 'react';
import { IScopedContext, RendererProps, ActionObject, ITableStore2, IRow2, ClassNamesFn } from 'amis-core';
import { BadgeObject, SpinnerExtraProps } from 'amis-ui';
import type { SortProps, ColumnProps, OnRowProps, SummaryProps, RowSelectionProps, ExpandableProps, AutoFillHeightObject } from 'amis-ui/lib/components/table';
import { BaseSchema, SchemaObject, SchemaTokenizeableString, SchemaApi, SchemaMessage } from '../../Schema';
import { ActionSchema } from '../Action';
import './TableCell';
import './ColumnToggler';
import { Action } from '../../types';
import { SchemaQuickEdit } from '../QuickEdit';
/**
 * Table 表格2渲染器。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/table2
 */
export interface CellSpan {
    colIndex: number;
    rowIndex: number;
    colSpan?: number;
    rowSpan?: number;
}
export interface RenderProps {
    colSpan?: number;
    rowSpan?: number;
}
export interface ColumnSchema {
    /**
     * 指定列唯一标识
     */
    name: string;
    /**
     * 指定列标题
     */
    title: string | SchemaObject;
    /**
     * 指定列内容渲染器
     */
    type?: string;
    /**
     * 指定行合并表达式
     */
    rowSpanExpr?: string;
    /**
     * 指定列合并表达式
     */
    colSpanExpr?: string;
    /**
     * 表头分组
     */
    children?: Array<ColumnSchema>;
    /**
     * 可复制
     */
    copyable?: boolean;
    /**
     * 列表头提示
     */
    remark?: string;
    /**
     * 快速搜索
     */
    searchable?: boolean | SchemaObject;
    /**
     * 快速排序
     */
    sorter?: boolean;
    /**
     * 内容居左、居中、居右
     */
    align?: string;
    /**
     * 是否固定在左侧/右侧
     */
    fixed?: boolean | string;
    /**
     * 当前列是否展示
     */
    toggled?: boolean;
    /**
     * 列样式
     */
    className?: string;
    /**
     * 表头单元格样式
     */
    titleClassName?: string;
    /**
     * 单元格样式
     */
    classNameExpr?: string;
    /**
     * 配置快速编辑功能
     */
    quickEdit?: SchemaQuickEdit;
    width?: string | number;
}
export interface RowSelectionOptionsSchema {
    /**
     * 选择类型 选择全部
     */
    key: string;
    /**
     * 选项显示文本
     */
    text: string;
}
export interface RowSelectionSchema {
    /**
     * 选择类型 单选/多选
     */
    type: string;
    /**
     * 对应数据源的key值
     */
    keyField?: string;
    /**
     * 行是否禁用表达式
     */
    disableOn?: string;
    /**
     * 自定义选择菜单
     */
    selections?: Array<RowSelectionOptionsSchema>;
    /**
     * 已选择的key值
     */
    selectedRowKeys?: Array<string | number>;
    /**
     * 已选择的key值表达式
     */
    selectedRowKeysExpr?: string;
    /**
     * 已选择的key值表达式
     */
    columnWidth?: number;
    /**
     * 是否点击行触发选中或取消选中
     */
    rowClick?: boolean;
}
export interface ExpandableSchema {
    /**
     * 对应渲染器类型
     */
    type: string;
    /**
     * 对应数据源的key值
     */
    keyField: string;
    /**
     * 行是否可展开表达式
     */
    expandableOn: string;
    /**
     * 展开行自定义样式表达式
     */
    expandedRowClassNameExpr: string;
    /**
     * 已展开的key值
     */
    expandedRowKeys: Array<string | number>;
    /**
     * 已展开的key值表达式
     */
    expandedRowKeysExpr: string;
}
export interface TableSchema2 extends BaseSchema {
    /**
     * 指定为表格类型
     */
    type: 'table2';
    /**
     * 表格标题
     */
    title?: string | SchemaObject | Array<SchemaObject>;
    /**
     * 表格数据源
     */
    source: SchemaTokenizeableString;
    /**
     * 表格可自定义列
     */
    columnsTogglable?: 'auto' | boolean | SchemaObject;
    /**
     * 表格列配置
     */
    columns: Array<ColumnSchema>;
    /**
     * 表格可选择配置
     */
    rowSelection?: RowSelectionSchema | boolean;
    /**
     * 表格行可展开配置
     */
    expandable?: ExpandableSchema;
    /**
     * 粘性头部
     */
    sticky?: boolean;
    /**
     * 加载中
     */
    loading?: boolean | string | SchemaObject;
    /**
     * 行角标内容
     */
    itemBadge?: BadgeObject;
    /**
     * 是否展示行角标
     */
    showBadge?: boolean;
    /**
     * 指定挂载dom
     */
    popOverContainer?: any;
    /**
     * 多选、嵌套展开记录的ID字段名 默认id
     */
    keyField?: string;
    /**
     * 数据源嵌套自定义字段名
     */
    childrenColumnName?: string;
    /**
     * 自定义行样式
     */
    rowClassNameExpr?: string;
    /**
     * 是否固定内容行高度
     */
    lineHeight?: string;
    /**
     * 是否展示边框
     */
    bordered?: boolean;
    /**
     * 是否展示表头
     */
    showHeader?: boolean;
    /**
     * 指定表尾
     */
    footer?: string | SchemaObject | Array<SchemaObject>;
    /**
     * 快速编辑后用来批量保存的 API
     */
    quickSaveApi?: SchemaApi;
    /**
     * 快速编辑配置成及时保存时使用的 API
     */
    quickSaveItemApi?: SchemaApi;
    /**
     * 接口报错信息配置
     */
    messages?: SchemaMessage;
    /**
     * 重新加载的组件名称
     */
    reload?: string;
    /**
     * 操作列配置
     */
    actions?: Array<ActionSchema>;
    /**
     * 批量操作最大限制数
     */
    maxKeepItemSelectionLength?: number;
    /**
     * 翻页是否保存数据
     */
    keepItemSelectionOnPageChange?: boolean;
    /**
     * 是否可选择 作用同rowSelection 兼容原CRUD属性 默认多选
     */
    selectable?: boolean;
    /**
     * 是否可多选 作用同rowSelection.type 兼容原CRUD属性 不设置认为是多选 仅设置selectable才起作用
     */
    multiple?: boolean;
    /**
     * 设置ID字段名 作用同keyFiled 兼容原CURD属性
     */
    primaryField?: string;
    tableLayout?: 'fixed' | 'auto';
    /**
     * 表格自动计算高度
     */
    autoFillHeight?: boolean | AutoFillHeightObject;
}
export type Table2RendererEvent = 'selectedChange' | 'columnSort' | 'columnFilter' | 'columnSearch' | 'columnToggled' | 'orderChange' | 'rowClick' | 'rowDbClick' | 'rowMouseEnter' | 'rowMouseLeave';
export type Table2RendererAction = 'selectAll' | 'clearAll' | 'select' | 'expand';
export interface Table2Props extends RendererProps, SpinnerExtraProps {
    title?: string;
    columns: Array<ColumnSchema | ColumnProps>;
    onSelect?: Function;
    reUseRow?: boolean;
    getEntryId?: (entry: any, index: number) => string;
    store: ITableStore2;
    rowSelection?: RowSelectionSchema;
    expandable?: ExpandableSchema;
    classnames: ClassNamesFn;
    onSave?: Function;
    onSaveOrder?: Function;
    onPristineChange?: Function;
    onAction?: Function;
    onSort?: (payload: {
        orderBy: string;
        orderDir: string;
    }) => void;
    onSearch?: Function;
    onRow?: OnRowProps;
    placeholder?: string | SchemaObject;
    itemActions?: Array<ActionObject>;
    headSummary?: Array<SummaryProps | Array<SummaryProps>>;
    footSummary?: Array<SummaryProps | Array<SummaryProps>>;
    headingClassName?: string;
    keepItemSelectionOnPageChange?: boolean;
    maxKeepItemSelectionLength?: number;
}
export default class Table2 extends React.Component<Table2Props, object> {
    static contextType: React.Context<IScopedContext>;
    static propsList: Array<string>;
    renderedToolbars: Array<string>;
    tableRef?: any;
    subForms: any;
    columns: Array<ColumnProps>;
    rowSelection: RowSelectionProps;
    expandable: ExpandableProps;
    reactions: Array<any>;
    static defaultProps: Partial<Table2Props>;
    constructor(props: Table2Props, context: IScopedContext);
    componentWillUnmount(): void;
    syncSelected(): void;
    static syncRows(store: ITableStore2, props: Table2Props, prevProps?: Table2Props): boolean;
    componentDidUpdate(prevProps: Table2Props): void;
    getPopOverContainer(): Element | Text | null;
    subFormRef(form: any, x: number, y: number): void;
    reset(): void;
    renderCellSchema(schema: any, props: any): any;
    renderSchema(key: string, schema: any, props?: any): any;
    buildColumns(columns: Array<any>, rowSpans: Array<CellSpan>, colSpans: Array<CellSpan>): any[];
    buildSummary(key: string, summary?: Array<any>): any[] | null;
    rowClassName(record: any, rowIndex: number): string;
    buildRowSelection(): any;
    expandedRowClassName(record: any, rowIndex: number): string;
    expandedRowRender(record: any, rowIndex: number): any;
    rowExpandable(record: any, rowIndex: number, rowIndexes: number[]): boolean;
    buildExpandable(): any;
    reloadTarget(target: string, data: any): void;
    handleSave(): Promise<void>;
    handleQuickSave(rows: Array<object> | object, diff: Array<object> | object, indexes: Array<string>, unModifiedItems?: Array<any>, rowsOrigin?: Array<object> | object, options?: {
        resetOnFailed?: boolean;
        reload?: string;
    }): void;
    handleQuickChange(item: IRow2, values: object, saveImmediately?: boolean | any, savePristine?: boolean, options?: {
        resetOnFailed?: boolean;
        reload?: string;
    }): void;
    handleAction(e: React.UIEvent<any>, action: Action, ctx: object): void;
    renderActions(region: string): React.JSX.Element | null;
    handleSelected(selectedRows: Array<any>, selectedRowKeys: Array<string | number>, unSelectedRows: Array<string | number>): Promise<any>;
    handleSort(payload: SortProps): Promise<any>;
    handleFilter(payload: {
        filterName: string;
        filterValue: string;
    }): Promise<any>;
    handleSearch(name: string, values: any): Promise<void>;
    handleRowClick(event: React.ChangeEvent<any>, rowItem: any, rowIndex?: number): Promise<void>;
    handleRowDbClick(event: React.ChangeEvent<any>, rowItem: any, rowIndex?: number): Promise<boolean>;
    handleRowMouseEnter(event: React.MouseEvent<HTMLTableRowElement>, rowItem: any, rowIndex?: number): Promise<void>;
    handleRowMouseLeave(event: React.MouseEvent<HTMLTableRowElement>, rowItem: any, rowIndex?: number): Promise<void>;
    handleOrderChange(oldIndex: number, newIndex: number, levels: Array<number>): Promise<void>;
    handleSaveOrder(): Promise<void>;
    doAction(action: ActionObject, args: any, throwErrors: boolean): any;
    getRef(ref: any): void;
    renderTable(): React.JSX.Element | null;
    renderHeading(): React.JSX.Element | null;
    render(): React.JSX.Element;
}
export declare class TableRenderer extends Table2 {
    receive(values: any, subPath?: string): void;
}
