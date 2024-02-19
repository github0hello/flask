import React from 'react';
import { OptionsControlProps, ActionObject } from 'amis-core';
import { SpinnerExtraProps } from 'amis-ui';
import { FormOptionsSchema, SchemaApi, SchemaObject, SchemaExpression, SchemaClassName } from '../../Schema';
import type { ItemRenderStates } from 'amis-ui/lib/components/Selection';
import type { Option } from 'amis-core';
import type { PaginationSchema } from '../Pagination';
/**
 * Transfer
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/transfer
 */
export interface TransferControlSchema extends FormOptionsSchema, SpinnerExtraProps {
    type: 'transfer';
    /**
     * 是否显示剪头
     */
    showArrow?: boolean;
    /**
     * 可排序？
     */
    sortable?: boolean;
    /**
     * 勾选展示模式
     */
    selectMode?: 'table' | 'list' | 'tree' | 'chained' | 'associated';
    /**
     * 结果面板是否追踪显示
     */
    resultListModeFollowSelect?: boolean;
    /**
     * 当 selectMode 为 associated 时用来定义左侧的选项
     */
    leftOptions?: Array<Option>;
    /**
     * 当 selectMode 为 associated 时用来定义左侧的选择模式
     */
    leftMode?: 'tree' | 'list';
    /**
     * 当 selectMode 为 associated 时用来定义右侧的选择模式
     */
    rightMode?: 'table' | 'list' | 'tree' | 'chained';
    /**
     * 搜索结果展示模式
     */
    searchResultMode?: 'table' | 'list' | 'tree' | 'chained';
    /**
     * 当 selectMode 为 table 时定义表格列信息。
     */
    columns?: Array<any>;
    /**
     * 当 searchResultMode 为 table 时定义表格列信息。
     */
    searchResultColumns?: Array<any>;
    /**
     * 可搜索？
     */
    searchable?: boolean;
    /**
     * 结果（右则）列表的检索功能，当设置为true时，可以通过输入检索模糊匹配检索内容
     */
    resultSearchable?: boolean;
    /**
     * 搜索 API
     */
    searchApi?: SchemaApi;
    /**
     * 左侧的标题文字
     */
    selectTitle?: string;
    /**
     * 右侧结果的标题文字
     */
    resultTitle?: string;
    /**
     * 用来丰富选项展示
     */
    menuTpl?: SchemaObject;
    /**
     * 用来丰富值的展示
     */
    valueTpl?: SchemaObject;
    /**
     * 左侧列表搜索框提示
     */
    searchPlaceholder?: string;
    /**
     * 右侧列表搜索框提示
     */
    resultSearchPlaceholder?: string;
    /**
     * 统计数字
     */
    statistics?: boolean;
    /**
     * 单个选项的高度，主要用于虚拟渲染
     */
    itemHeight?: number;
    /**
     * 在选项数量达到多少时开启虚拟渲染
     */
    virtualThreshold?: number;
    /**
     * 当在value值未匹配到当前options中的选项时，是否value值对应文本飘红显示
     */
    showInvalidMatch?: boolean;
    /**
     * 树形模式下，仅选中子节点
     */
    onlyChildren?: boolean;
    /**
     * 分页配置，selectMode为默认和table才会生效
     * @since 3.6.0
     */
    pagination?: {
        /** 是否左侧选项分页，默认不开启 */
        enable: SchemaExpression;
        /** 分页组件CSS类名 */
        className?: SchemaClassName;
        /** 是否开启前端分页 */
        loadDataOnce?: boolean;
    } & Pick<PaginationSchema, 'layout' | 'maxButtons' | 'perPageAvailable' | 'popOverContainerSelector'>;
}
export interface BaseTransferProps extends OptionsControlProps, Omit<TransferControlSchema, 'type' | 'options' | 'className' | 'descriptionClassName' | 'inputClassName'>, SpinnerExtraProps {
    resultItemRender?: (option: Option) => JSX.Element;
    virtualThreshold?: number;
    itemHeight?: number;
    /**
     * 检索函数
     */
    filterOption?: 'string';
}
type OptionsControlWithSpinnerProps = OptionsControlProps & SpinnerExtraProps;
export declare const getCustomFilterOption: (filterOption?: string) => Function | null;
export declare class BaseTransferRenderer<T extends OptionsControlWithSpinnerProps = BaseTransferProps> extends React.Component<T> {
    static defaultProps: {
        multiple: boolean;
    };
    tranferRef?: any;
    reload(): void;
    handleChange(value: Array<Option> | Option, optionModified?: boolean): Promise<void>;
    option2value(option: Option): Option;
    handleSearch(term: string, cancelExecutor: Function): Promise<any>;
    handleResultSearch(term: string, item: Option): boolean;
    handlePageChange(page: number, perPage?: number, direction?: 'forward' | 'backward'): void;
    optionItemRender(option: Option, states: ItemRenderStates): JSX.Element;
    resultItemRender(option: Option, states: ItemRenderStates): JSX.Element;
    renderCell(column: {
        name: string;
        label: string;
        [propName: string]: any;
    }, option: Option, colIndex: number, rowIndex: number): JSX.Element;
    getRef(ref: any): void;
    onSelectAll(options: Option[]): void;
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    render(): React.JSX.Element;
}
export declare class TransferRender extends BaseTransferRenderer {
}
declare const _default: typeof TransferRender;
export default _default;
