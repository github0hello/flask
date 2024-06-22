import React from 'react';
import { RendererProps } from 'amis-core';
import { StepStatus } from 'amis-ui';
import { BaseSchema, SchemaCollection } from '../Schema';
import type { SchemaExpression } from 'amis-core';
export type StepSchema = {
    /**
     * 标题
     */
    title: string | SchemaCollection;
    /**
     * 子标题
     */
    subTitle?: string | SchemaCollection;
    /**
     * 图标
     */
    icon?: string;
    value?: string | number;
    /**
     * 描述
     */
    description?: string | SchemaCollection;
} & Omit<BaseSchema, 'type'>;
export interface StepsSchema extends BaseSchema {
    /**
     * 指定为 Steps 步骤条渲染器
     */
    type: 'steps';
    /**
     * 步骤
     */
    steps?: Array<StepSchema>;
    /**
     * API 或 数据映射
     */
    source?: string;
    /**
     * 指定当前步骤
     */
    value?: number | string;
    /**
     * 变量映射
     */
    name?: string;
    status?: StepStatus | {
        [propName: string]: StepStatus;
    } | SchemaExpression;
    /**
     * 展示模式
     */
    mode?: 'horizontal' | 'vertical';
    /**
     * 标签放置位置
     */
    labelPlacement?: 'horizontal' | 'vertical';
    /**
     * 点状步骤条
     */
    progressDot?: boolean;
}
export interface StepsProps extends RendererProps, Omit<StepsSchema, 'className'> {
}
export declare function StepsCmpt(props: StepsProps): React.JSX.Element;
export declare class StepsRenderer extends React.Component<StepsProps> {
    render(): React.JSX.Element;
}
