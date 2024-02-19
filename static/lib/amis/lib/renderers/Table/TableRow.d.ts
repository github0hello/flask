import React from 'react';
import type { IColumn, IRow } from 'amis-core/lib/store/table';
import { ITableStore, RendererEvent, RendererProps } from 'amis-core';
import { Action } from '../Action';
interface TableRowProps extends Pick<RendererProps, 'render'> {
    store: ITableStore;
    onCheck: (item: IRow, value: boolean, shift?: boolean) => Promise<void>;
    onRowClick: (item: IRow, index: number) => Promise<RendererEvent<any> | void>;
    onRowDbClick: (item: IRow, index: number) => Promise<RendererEvent<any> | void>;
    onRowMouseEnter: (item: IRow, index: number) => Promise<RendererEvent<any> | void>;
    onRowMouseLeave: (item: IRow, index: number) => Promise<RendererEvent<any> | void>;
    classPrefix: string;
    renderCell: (region: string, column: IColumn, item: IRow, props: any) => React.ReactNode;
    columns: Array<IColumn>;
    item: IRow;
    parent?: IRow;
    itemClassName?: string;
    itemIndex: number;
    regionPrefix?: string;
    checkOnItemClick?: boolean;
    ignoreFootableContent?: boolean;
    [propName: string]: any;
}
export declare class TableRow extends React.PureComponent<TableRowProps & {
    expanded: boolean;
    parentExpanded?: boolean;
    id: string;
    newIndex: number;
    isHover: boolean;
    checked: boolean;
    partial?: boolean;
    modified: boolean;
    moved: boolean;
    depth: number;
    expandable: boolean;
    appeard?: boolean;
    loading?: boolean;
    error?: string;
    checkdisable: boolean;
    trRef?: React.Ref<any>;
    isNested?: boolean;
}> {
    handleMouseEnter(e: React.MouseEvent<HTMLTableRowElement>): void;
    handleMouseLeave(e: React.MouseEvent<HTMLTableRowElement>): void;
    handleItemClick(e: React.MouseEvent<HTMLTableRowElement>): Promise<void>;
    handleDbClick(e: React.MouseEvent<HTMLTableRowElement>): void;
    handleAction(e: React.UIEvent<any>, action: Action, ctx: any): void;
    handleQuickChange(values: object, saveImmediately?: boolean, savePristine?: boolean, options?: {
        resetOnFailed?: boolean;
        reload?: string;
    }): void;
    handleChange(value: any, name: string, submit?: boolean, changePristine?: boolean): void;
    render(): React.JSX.Element | null;
}
declare const _default: (props: TableRowProps) => React.JSX.Element;
export default _default;
