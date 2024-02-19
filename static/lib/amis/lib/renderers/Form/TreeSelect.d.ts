import React from 'react';
import { SpinnerExtraProps } from 'amis-ui';
import { OptionsControlProps, Option } from 'amis-core';
import { Api } from 'amis-core';
import { ActionObject } from 'amis-core';
import { FormOptionsSchema, SchemaApi } from '../../Schema';
import { TooltipWrapperSchema } from '../TooltipWrapper';
import type { ItemRenderStates } from 'amis-ui/lib/components/Selection';
/**
 * Tree 下拉选择框。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/tree
 */
export interface TreeSelectControlSchema extends FormOptionsSchema {
    type: 'tree-select';
    /**
     * 是否隐藏顶级
     */
    hideRoot?: boolean;
    /**
     * 顶级选项的名称
     */
    rootLabel?: string;
    /**
     * 顶级选项的值
     */
    rootValue?: any;
    /**
     * 显示图标
     */
    showIcon?: boolean;
    /**
     * 父子之间是否完全独立。
     */
    cascade?: boolean;
    /**
     * 选父级的时候是否把子节点的值也包含在内。
     */
    withChildren?: boolean;
    /**
     * 选父级的时候，是否只把子节点的值包含在内
     */
    onlyChildren?: boolean;
    /**
     * 单选时，只运行选择叶子节点
     */
    onlyLeaf?: boolean;
    /**
     * 顶级节点是否可以创建子节点
     */
    rootCreatable?: boolean;
    /**
     * 是否隐藏选择框中已选中节点的祖先节点的文本信息
     */
    hideNodePathLabel?: boolean;
    /**
     * 是否开启节点路径模式
     */
    enableNodePath?: boolean;
    /**
     * 开启节点路径模式后，节点路径的分隔符
     */
    pathSeparator?: string;
    /**
     * 是否显示展开线
     */
    showOutline?: boolean;
    /**
     * 懒加载接口
     */
    deferApi?: SchemaApi;
    /**
     * 标签的最大展示数量，超出数量后以收纳浮层的方式展示，仅在多选模式开启后生效
     */
    maxTagCount?: number;
    /**
     * 收纳标签的Popover配置
     */
    overflowTagPopover?: TooltipWrapperSchema;
    /**
     * 自定义选项
     */
    menuTpl?: string;
    /**
     * 是否为选项添加默认的Icon，默认值为true
     */
    enableDefaultIcon?: boolean;
}
export interface TreeSelectProps extends OptionsControlProps, SpinnerExtraProps {
    placeholder?: any;
    autoComplete?: Api;
    hideNodePathLabel?: boolean;
    enableNodePath?: boolean;
    pathSeparator?: string;
    mobileUI?: boolean;
}
export interface TreeSelectState {
    isOpened: boolean;
    inputValue: string;
    tempValue: string;
}
export default class TreeSelectControl extends React.Component<TreeSelectProps, TreeSelectState> {
    static defaultProps: {
        hideRoot: boolean;
        placeholder: string;
        optionsPlaceholder: string;
        multiple: boolean;
        clearable: boolean;
        rootLabel: string;
        rootValue: string;
        showIcon: boolean;
        joinValues: boolean;
        extractValue: boolean;
        delimiter: string;
        resetValue: string;
        hideNodePathLabel: boolean;
        enableNodePath: boolean;
        pathSeparator: string;
        selfDisabledAffectChildren: boolean;
    };
    treeRef: any;
    container: React.RefObject<HTMLDivElement>;
    input: React.RefObject<any>;
    cache: {
        [propName: string]: any;
    };
    target: HTMLElement | null;
    targetRef: (ref: any) => HTMLElement | null;
    /** source数据源是否已加载 */
    sourceLoaded: boolean;
    constructor(props: TreeSelectProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    open(fn?: () => void): void;
    close(): void;
    handleFocus(e: any): void;
    handleBlur(e: any): void;
    handleKeyPress(e: React.KeyboardEvent): void;
    validate(): any;
    removeItem(index: number, e?: React.MouseEvent<HTMLElement>): void;
    handleChange(value: any): void;
    handleTempChange(value: any): void;
    handleConfirm(): void;
    handleInputChange(value: string): void;
    handleInputKeyDown(event: React.KeyboardEvent): void;
    clearValue(): void;
    filterOptions(options: Array<Option>, keywords: string): Array<Option>;
    loadRemote(input: string): Promise<{
        options: Option[];
    } | undefined>;
    mergeOptions(options: Array<object>): Option[];
    reload(): void;
    handleOutClick(e: React.MouseEvent<any>): void;
    handleResultChange(value: Array<Option>): void;
    doAction(action: ActionObject, data: any, throwErrors: boolean): void;
    addItemFromAction(item: Option, parentValue?: any): void;
    editItemFromAction(item: Option, originValue: any): void;
    deleteItemFromAction(value: any): void;
    resultChangeEvent(value: any): Promise<void>;
    /** 下拉框选项渲染 */
    renderOptionItem(option: Option, states: ItemRenderStates): JSX.Element;
    /** 输入框选项渲染 */
    renderItem(item: Option): any;
    domRef(ref: any): void;
    renderOuter(): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class TreeSelectControlRenderer extends TreeSelectControl {
}
