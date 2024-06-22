import { IScopedContext, RendererProps } from 'amis-core';
import React from 'react';
import { BaseSchema, SchemaClassName } from '../Schema';
import type { ListenerAction } from 'amis-core';
/**
 * 搜索框渲染器
 */
export interface SearchBoxSchema extends BaseSchema {
    /**
     * 指定为搜索框。
     *
     * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/search-box
     */
    type: 'search-box';
    /**
     * 外层 css 类名
     */
    className?: SchemaClassName;
    /**
     * 关键字名字。
     *
     * @default keywords
     */
    name?: string;
    /**
     * 占位符
     */
    placeholder?: string;
    /**
     * 是否为 Mini 样式。
     */
    mini?: boolean;
    /**
     * 是否为加强样式
     */
    enhance?: boolean;
    /**
     * 是否可清除
     */
    clearable?: boolean;
    /**
     * 是否立马搜索。
     */
    searchImediately?: boolean;
    /**
     * 是否开启清空内容后立即重新搜索
     */
    clearAndSubmit?: boolean;
}
interface SearchBoxProps extends RendererProps, Omit<SearchBoxSchema, 'type' | 'className'> {
    name: string;
    onQuery?: (query: {
        [propName: string]: string;
    }) => any;
}
export interface SearchBoxState {
    value: string;
}
export declare class SearchBoxRenderer extends React.Component<SearchBoxProps, SearchBoxState> {
    static defaultProps: {
        name: string;
        mini: boolean;
        enhance: boolean;
        clearable: boolean;
        searchImediately: boolean;
        clearAndSubmit: boolean;
    };
    static contextType: React.Context<IScopedContext>;
    static propsList: Array<string>;
    constructor(props: SearchBoxProps, context: IScopedContext);
    componentWillUnmount(): void;
    handleChange(value: string): Promise<void>;
    handleCancel(): void;
    handleSearch(text: string): Promise<void>;
    dispatchEvent(name: string): void;
    doAction(action: ListenerAction, args: any): void;
    setData(value: any): void;
    render(): React.JSX.Element;
}
export {};
