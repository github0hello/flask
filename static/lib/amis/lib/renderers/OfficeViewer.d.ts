/**
 * office 文件预览
 */
import React from 'react';
import { BaseSchema } from '../Schema';
import { ActionObject, IScopedContext, RendererProps } from 'amis-core';
import type { Word } from 'office-viewer';
export interface OfficeViewerSchema extends BaseSchema {
    type: 'office-viewer';
    /**
     * 文件地址
     */
    src: string;
    /**
     * word 文档的渲染配置
     */
    wordOptions?: any;
    /**
     * 是否显示文档
     */
    display?: boolean;
}
export interface OfficeViewerProps extends RendererProps, Omit<OfficeViewerSchema, 'className'> {
    columnsCount: number;
}
export interface OfficeViewerState {
    loading: boolean | null;
}
export default class OfficeViewer extends React.Component<OfficeViewerProps, OfficeViewerState> {
    rootElement: React.RefObject<HTMLDivElement>;
    word: Word;
    fileName?: string;
    document?: any;
    constructor(props: OfficeViewerProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: OfficeViewerProps): void;
    /**
     * 接收动作事件
     */
    doAction(action: ActionObject, args: any, throwErrors: boolean): any;
    /**
     * 执行变量替换
     */
    evalVar(text: string, data: any): any;
    renderWord(): Promise<void>;
    fetchWord(): Promise<void>;
    /**
     * 渲染远端文件
     */
    renderRemoteWord(): Promise<void>;
    /**
     * 渲染本地文件，用于预览 input-file
     */
    renderFormFile(): void;
    render(): React.JSX.Element;
}
export declare class OfficeViewerRenderer extends OfficeViewer {
    static contextType: React.Context<IScopedContext>;
    constructor(props: OfficeViewerProps, context: IScopedContext);
    componentWillUnmount(): void;
}
