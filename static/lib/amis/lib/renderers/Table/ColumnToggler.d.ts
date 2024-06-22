import React from 'react';
import Sortable from 'sortablejs';
import { RendererProps } from 'amis-core';
import type { TooltipObject } from 'amis-ui/lib/components/TooltipWrapper';
import { IColumn } from 'amis-core';
import type { IColumn2 } from 'amis-core';
export interface ColumnTogglerProps extends RendererProps {
    /**
     * 按钮文字
     */
    label?: string | React.ReactNode;
    /**
     * 按钮提示文字，hover focus 时显示
     */
    tooltip?: string | TooltipObject;
    /**
     * 禁用状态下的提示
     */
    disabledTip?: string | TooltipObject;
    /**
     * 点击外部是否关闭
     */
    closeOnOutside?: boolean;
    /**
     * 点击内容是否关闭
     */
    closeOnClick?: boolean;
    /**
     * 下拉菜单对齐方式
     */
    align?: 'left' | 'right';
    /**
     *  ColumnToggler的CSS类名
     */
    className?: string;
    /**
     * 按钮的CSS类名
     */
    btnClassName?: string;
    /**
     * 按钮大小
     */
    size?: 'xs' | 'sm' | 'md' | 'lg';
    /**
     * 按钮级别，样式
     */
    level?: 'info' | 'success' | 'danger' | 'warning' | 'primary' | 'link';
    /**
     * 是否独占一行 `display: block`
     */
    block?: boolean;
    /**
     * 是否可通过拖拽排序
     */
    draggable?: boolean;
    /**
     * 默认是否展开
     */
    defaultIsOpened?: boolean;
    /**
     * 激活状态
     */
    isActived?: boolean;
    /**
     * ICON名称
     */
    icon?: string | React.ReactNode;
    /**
     * 是否只显示图标。
     */
    iconOnly?: boolean;
    /**
     * 是否隐藏展开的Icon
     */
    hideExpandIcon?: boolean;
    /**
     * 是否显示遮罩层
     */
    overlay?: boolean;
    /**
     * 列数据
     */
    columns: Array<IColumn | IColumn2>;
    /**
     * 弹窗底部按钮大小
     */
    footerBtnSize?: 'xs' | 'sm' | 'md' | 'lg';
    activeToggaleColumns: Array<IColumn | IColumn2>;
    onColumnToggle: (columns: Array<IColumn>) => void;
    modalContainer?: () => HTMLElement;
    tooltipContainer?: any;
}
export interface ColumnTogglerState {
    isOpened: boolean;
    enableSorting: boolean;
    tempColumns: any[];
}
export default class ColumnToggler extends React.Component<ColumnTogglerProps, ColumnTogglerState> {
    state: ColumnTogglerState;
    static defaultProps: Pick<ColumnTogglerProps, 'placement' | 'tooltipTrigger' | 'tooltipRootClose' | 'draggable'>;
    target: any;
    sortable?: Sortable;
    dragRefDOM: HTMLElement;
    constructor(props: ColumnTogglerProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ColumnTogglerProps): void;
    componentWillUnmount(): void;
    domRef(ref: any): void;
    toggle(e: React.MouseEvent<any>): void;
    open(): void;
    close(): void;
    swapColumnPosition(oldIndex: number, newIndex: number): void;
    updateToggledColumn(column: IColumn, index: number, value: any, shift?: boolean): Promise<void>;
    dragRef(ref: any): void;
    initDragging(): void;
    destroyDragging(): void;
    onConfirm(): Promise<void>;
    renderOuter(): React.JSX.Element;
    renderModal(): React.JSX.Element;
    render(): React.JSX.Element;
}
