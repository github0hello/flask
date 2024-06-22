import React from 'react';
import { RendererProps } from 'amis-core';
import { IServiceStore } from 'amis-core';
import { Api, RendererData, ActionObject } from 'amis-core';
import { IScopedContext } from 'amis-core';
import { SpinnerExtraProps } from 'amis-ui';
import { BaseSchema, SchemaApi, SchemaCollection, SchemaExpression, SchemaMessage, SchemaName } from '../Schema';
import type { ListenerAction } from 'amis-core';
export declare const eventTypes: readonly ["inited", "onApiFetched", "onSchemaApiFetched", "onWsFetched"];
export type ProviderEventType = (typeof eventTypes)[number];
export type DataProviderCollection = Partial<Record<ProviderEventType, DataProvider>>;
export type DataProvider = string | Function;
export type ComposedDataProvider = DataProvider | DataProviderCollection;
/**
 * Service 服务类控件。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/service
 */
export interface ServiceSchema extends BaseSchema, SpinnerExtraProps {
    /**
     * 指定为 Service 数据拉取控件。
     */
    type: 'service';
    /**
     * 页面初始化的时候，可以设置一个 API 让其取拉取，发送数据会携带当前 data 数据（包含地址栏参数），获取得数据会合并到 data 中，供组件内使用。
     */
    api?: SchemaApi;
    /**
     * WebScocket 地址，用于实时获取数据
     */
    ws?: string;
    /**
     * 通过调用外部函数来获取数据
     */
    dataProvider?: ComposedDataProvider;
    /**
     * 内容区域
     */
    body?: SchemaCollection;
    /**
     * @deprecated 改成 api 的 sendOn。
     */
    fetchOn?: SchemaExpression;
    /**
     * 是否默认就拉取？
     */
    initFetch?: boolean;
    /**
     * 是否默认就拉取？通过表达式来决定.
     *
     * @deprecated 改成 api 的 sendOn。
     */
    initFetchOn?: SchemaExpression;
    /**
     * 用来获取远程 Schema 的 api
     */
    schemaApi?: SchemaApi;
    /**
     * 是否默认加载 schemaApi
     */
    initFetchSchema?: boolean;
    /**
     * 用表达式来配置。
     * @deprecated 改成 api 的 sendOn。
     */
    initFetchSchemaOn?: SchemaExpression;
    /**
     * 是否轮询拉取
     */
    interval?: number;
    /**
     * 是否静默拉取
     */
    silentPolling?: boolean;
    /**
     * 关闭轮询的条件。
     */
    stopAutoRefreshWhen?: SchemaExpression;
    messages?: SchemaMessage;
    name?: SchemaName;
    /**
     * 是否以Alert的形式显示api接口响应的错误信息，默认展示
     */
    showErrorMsg?: boolean;
}
export interface ServiceProps extends RendererProps, Omit<ServiceSchema, 'type' | 'className'> {
    store: IServiceStore;
    messages: SchemaMessage;
}
export default class Service extends React.Component<ServiceProps> {
    timer: ReturnType<typeof setTimeout>;
    mounted: boolean;
    socket: any;
    dataProviders: DataProviderCollection;
    dataProviderUnsubscribe?: Partial<Record<ProviderEventType, Function>>;
    static defaultProps: Partial<ServiceProps>;
    static propsList: Array<string>;
    constructor(props: ServiceProps);
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: ServiceProps): void;
    componentWillUnmount(): void;
    doAction(action: ListenerAction, args: any): void;
    initFetch(): void;
    /**
     * 初始化Provider函数集，将Schema配置统一转化为DataProviderCollection格式
     */
    initDataProviders(provider?: ComposedDataProvider): Partial<Record<"inited" | "onApiFetched" | "onSchemaApiFetched" | "onWsFetched", DataProvider>>;
    /**
     * 标准化处理Provider函数
     */
    normalizeProvider(provider: any, event?: ProviderEventType): DataProviderCollection | null;
    /**
     * 使用外部函数获取数据
     *
     * @param {ProviderEventType} event 触发provider函数执行的事件，默认初始时执行
     */
    runDataProvider(event: ProviderEventType): Promise<void>;
    /**
     * 运行销毁外部函数的方法
     *
     * @param {ProviderEventType} event 事件名称，不传参数即执行所有销毁函数
     */
    runDataProviderUnsubscribe(event?: ProviderEventType): void;
    dataProviderSetData(data: any): void;
    fetchWSData(ws: string | Api, data: any): void;
    afterDataFetch(result: any): void;
    afterSchemaFetch(schema: any): void;
    initInterval(value: any): any;
    reload(subpath?: string, query?: any, ctx?: RendererData, silent?: boolean, replace?: boolean): void;
    silentReload(target?: string, query?: any): void;
    receive(values: object, subPath?: string, replace?: boolean): void;
    handleQuery(query: any): any;
    reloadTarget(target: string, data?: any): void;
    handleDialogConfirm(values: object[], action: ActionObject, ctx: any, targets: Array<any>): void;
    handleDialogClose(confirmed?: boolean): void;
    openFeedback(dialog: any, ctx: any): Promise<unknown>;
    handleAction(e: React.UIEvent<any> | void, action: ActionObject, data: object, throwErrors?: boolean, delegate?: IScopedContext): void;
    handleChange(value: any, name: string, submit?: boolean, changePristine?: boolean): void;
    renderBody(): JSX.Element;
    render(): React.JSX.Element;
}
export declare class ServiceRenderer extends Service {
    static contextType: React.Context<IScopedContext>;
    constructor(props: ServiceProps, context: IScopedContext);
    reload(subpath?: string, query?: any, ctx?: any, silent?: boolean, replace?: boolean): void;
    receive(values: any, subPath?: string, replace?: boolean): void;
    componentWillUnmount(): void;
    reloadTarget(target: string, data?: any): void;
    setData(values: object, replace?: boolean): void;
    getData(): any;
}
