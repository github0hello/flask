/**
 * @file Words
 */
import React from 'react';
import { RendererProps } from 'amis-core';
import { BaseSchema, SchemaObject } from '../Schema';
import { TagSchema } from './Tag';
type Words = string | string[];
/**
 * Words
 */
export interface WordsSchema extends BaseSchema {
    type: 'words';
    /**
    * 展示限制, 为0时也无限制
    */
    limit?: number;
    /**
     * 展示文字
     */
    expendButtonText?: string;
    /**
     * 展示文字
     */
    expendButton?: SchemaObject;
    /**
     * 收起文字
     */
    collapseButtonText?: string;
    /**
     * 展示文字
     */
    collapseButton?: SchemaObject;
    /**
    * tags数据
    */
    words: Words;
    /**
     * useTag 当数据是数组时，是否使用tag的方式展示
     */
    inTag?: boolean | TagSchema;
    /**
       * 分割符
       */
    delimiter?: string;
}
export interface WordsProps extends RendererProps, Omit<WordsSchema, 'type' | 'className'> {
}
export declare class WordsField extends React.Component<WordsProps, object> {
    static defaultProps: Partial<WordsProps>;
    state: {
        isExpend: boolean;
    };
    toggleExpend(): void;
    getLimit(words: Words): number;
    renderContent(words: Words): string | React.JSX.Element[];
    renderAll(words: Words, hasBtn?: boolean): React.JSX.Element;
    renderPart(words: Words): React.JSX.Element;
    getWords(): any;
    render(): React.JSX.Element | null;
}
export declare class WordsRenderer extends WordsField {
}
export declare class TagsRenderer extends WordsField {
    static defaultProps: {
        inTag: boolean;
    };
}
export {};
