import React from 'react';
import { SpinnerExtraProps } from 'amis-ui';
import { Option, Options, OptionsControlProps, ActionObject } from 'amis-core';
import { FormOptionsSchema } from '../../Schema';
import type { TooltipObject } from 'amis-ui/lib/components/TooltipWrapper';
/**
 * Nested Select
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/nested-select
 */
export interface NestedSelectControlSchema extends FormOptionsSchema {
    type: 'nested-select';
    /**
     * 边框模式，全边框，还是半边框，或者没边框。
     */
    borderMode?: 'full' | 'half' | 'none';
    /**
     * 弹框的 css 类
     */
    menuClassName?: string;
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
     * 只允许选择叶子节点
     */
    onlyLeaf?: boolean;
    /**
     * 是否隐藏选择框中已选中节点的祖先节点的文本信息
     */
    hideNodePathLabel?: boolean;
    /**
     * 标签的最大展示数量，超出数量后以收纳浮层的方式展示，仅在多选模式开启后生效
     */
    maxTagCount?: number;
    /**
     * 收纳标签的Popover配置
     */
    overflowTagPopover?: object;
}
export interface NestedSelectProps extends OptionsControlProps, SpinnerExtraProps {
    cascade?: boolean;
    noResultsText?: string;
    withChildren?: boolean;
    onlyChildren?: boolean;
    hideNodePathLabel?: boolean;
    mobileUI?: boolean;
    maxTagCount?: number;
    overflowTagPopover?: TooltipObject;
}
export interface NestedSelectState {
    isOpened?: boolean;
    isFocused?: boolean;
    inputValue?: string;
    stack: Array<Array<Option>>;
}
export default class NestedSelectControl extends React.Component<NestedSelectProps, NestedSelectState> {
    static defaultProps: Partial<NestedSelectProps>;
    outTarget: React.RefObject<HTMLDivElement>;
    outTargetWidth?: number;
    target: any;
    input: HTMLInputElement;
    state: NestedSelectState;
    domRef(ref: any): void;
    componentDidUpdate(prevProps: NestedSelectProps): void;
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    dispatchEvent(eventName: string, eventData?: any): Promise<boolean>;
    /** 是否为父节点 */
    isParentNode(option: Option): boolean;
    handleOutClick(e: React.MouseEvent<any>): void;
    handleResultClear(): void;
    close(): void;
    removeItem(index: number, e?: React.MouseEvent<HTMLElement>): Promise<void>;
    renderValue(option: Option, key?: any): any;
    handleOptionClick(option: Option): Promise<void>;
    handleCheck(option: Option | Options, index?: number): Promise<void>;
    allChecked(options: Options): boolean;
    partialChecked(options: Options): boolean;
    reload(): void;
    getValue(): any;
    onFocus(e: any): Promise<void>;
    onBlur(e: any): Promise<void>;
    getTarget(): HTMLElement;
    handleKeyPress(e: React.KeyboardEvent): void;
    handleInputKeyDown(event: React.KeyboardEvent): void;
    handleInputChange(inputValue: string): void;
    handleResultChange(value: Array<Option>): Promise<void>;
    getMenuSelectMenuStyle(): {};
    renderOptions(): React.JSX.Element;
    renderSearchResult(): React.JSX.Element;
    onMouseEnter(option: Option, index: number, e: MouseEvent): void;
    renderOuter(): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class NestedSelectControlRenderer extends NestedSelectControl {
}
export declare class CascaderSelectControlRenderer extends NestedSelectControl {
}
