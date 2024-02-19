import React from 'react';
import { OptionsControlProps, SchemaNode, ActionObject, PlainObject } from 'amis-core';
import { FormOptionsSchema, SchemaTpl } from '../../Schema';
import type { TooltipWrapperSchema } from '../TooltipWrapper';
import type { Option } from 'amis-core';
/**
 * Picker
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/picker
 */
export interface PickerControlSchema extends FormOptionsSchema {
    type: 'picker';
    /**
     * 可用来生成选中的值的描述文字
     */
    labelTpl?: SchemaTpl;
    /**
     * 建议用 labelTpl
     * 选中一个字段名用来作为值的描述文字
     */
    labelField?: string;
    /**
     * 选一个可以用来作为值的字段。
     */
    valueField?: string;
    /**
     * 弹窗选择框详情。
     */
    pickerSchema?: any;
    /**
     * 弹窗模式，dialog 或者 drawer
     */
    modalMode?: 'dialog' | 'drawer';
    /**
     * 弹窗的标题，默认为情选择
     */
    modalTitle?: string;
    /**
     * 内嵌模式，也就是说不弹框了。
     */
    embed?: boolean;
    /**
     * 开启最大标签展示数量的相关配置
     */
    overflowConfig: {
        /**
         * 标签的最大展示数量，超出数量后以收纳浮层的方式展示，仅在多选模式开启后生效
         */
        maxTagCount?: number;
        /**
         * 开启最大标签展示数量后，收纳标签生效的位置，未开启内嵌模式默认为选择器, 开启后默认为选择器 + 模态框，可选值为'select'(选择器)、'crud'(增删改查)
         */
        displayPosition?: ('select' | 'crud')[];
        /**
         * 开启最大标签展示数量后，选择器内收纳标签的Popover配置
         */
        overflowTagPopover?: TooltipWrapperSchema;
        /**
         * 开启最大标签展示数量后，CRUD顶部内收纳标签的Popover配置
         */
        overflowTagPopoverInCRUD?: TooltipWrapperSchema;
    };
}
export interface PickerProps extends OptionsControlProps {
    modalMode: 'dialog' | 'drawer';
    pickerSchema: PlainObject;
    labelField: string;
}
export interface PickerState {
    isOpened: boolean;
    isFocused: boolean;
    schema: SchemaNode;
}
export default class PickerControl extends React.PureComponent<PickerProps, any> {
    static propsList: Array<string>;
    static defaultProps: Partial<PickerProps>;
    state: PickerState;
    input: React.RefObject<HTMLInputElement>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: PickerProps): void;
    fetchOptions(): void;
    buildSchema(props: PickerProps): {
        labelTpl: any;
        type: string;
        pickerMode: boolean;
        syncLocation: boolean;
        api: string | import("amis-core").BaseApiObject | null | undefined;
        source: string | import("amis-core").BaseApiObject | null | undefined;
        keepItemSelectionOnPageChange: boolean;
        valueField: any;
        labelField: string;
        bulkActions: any;
        checkOnItemClick: boolean;
    };
    crud: any;
    crudRef(ref: any): void;
    reload(): void;
    open(): void;
    close(): void;
    handleModalConfirm(values: Array<any>, action: ActionObject, ctx: any, components: Array<any>): Promise<void>;
    handleChange(items: Array<any>): Promise<void>;
    handleItemClick(item: any): Promise<void>;
    removeItem(index: number): Promise<void>;
    handleKeyDown(e: React.KeyboardEvent): void;
    handleFocus(): void;
    handleBlur(): void;
    handleClick(): void;
    clearValue(): void;
    getOverflowConfig(): any;
    renderTag(item: Option, index: number): React.JSX.Element;
    renderValues(): React.JSX.Element;
    renderBody({ popOverContainer }?: any): JSX.Element;
    render(): React.JSX.Element;
}
export declare class PickerControlRenderer extends PickerControl {
}
