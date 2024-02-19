import { IColumn, IRow, ITableStore, PlainObject, SchemaNode, ThemeProps } from 'amis-core';
import { BadgeObject } from 'amis-ui';
import React from 'react';
export interface CellProps extends ThemeProps {
    region: string;
    column: IColumn;
    item: IRow;
    props: PlainObject;
    ignoreDrag?: boolean;
    render: (region: string, node: SchemaNode, props?: PlainObject) => JSX.Element;
    store: ITableStore;
    multiple: boolean;
    canAccessSuperData?: boolean;
    itemBadge?: BadgeObject;
    onCheck?: (item: IRow) => void;
    onDragStart?: (e: React.DragEvent) => void;
    popOverContainer?: any;
    quickEditFormRef: any;
    onImageEnlarge?: any;
    translate: (key: string, ...args: Array<any>) => string;
}
export default function Cell({ region, column, item, props, ignoreDrag, render, store, multiple, itemBadge, classnames: cx, classPrefix: ns, canAccessSuperData, onCheck, onDragStart, popOverContainer, quickEditFormRef, onImageEnlarge, translate: __ }: CellProps): React.JSX.Element | null;
