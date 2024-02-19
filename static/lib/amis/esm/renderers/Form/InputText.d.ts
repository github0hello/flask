import React from 'react';
import { OptionsControlProps } from 'amis-core';
import { ActionObject } from 'amis-core';
import { StateChangeOptions } from 'downshift';
import { SpinnerExtraProps } from 'amis-ui';
import { ActionSchema } from '../Action';
import { FormOptionsSchema, SchemaApi } from '../../Schema';
import type { Option } from 'amis-core';
import type { ListenerAction } from 'amis-core';
/**
 * Text 文本输入框。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/text
 */
export interface TextControlSchema extends FormOptionsSchema {
    type: 'input-text' | 'input-email' | 'input-url' | 'input-password' | 'native-date' | 'native-time' | 'native-number';
    addOn?: {
        position?: 'left' | 'right';
        label?: string;
        icon?: string;
        className?: string;
    } & ActionSchema;
    /**
     * 是否去除首尾空白文本。
     */
    trimContents?: boolean;
    /**
     * 自动完成 API，当输入部分文字的时候，会将这些文字通过 ${term} 可以取到，发送给接口。
     * 接口可以返回匹配到的选项，帮助用户输入。
     */
    autoComplete?: SchemaApi;
    /**
     * 配置原生 input 的 autoComplete 属性
     * @default off
     */
    nativeAutoComplete?: string;
    /**
     * 边框模式，全边框，还是半边框，或者没边框。
     */
    borderMode?: 'full' | 'half' | 'none';
    /**
     * 限制文字最小输入个数
     */
    minLength?: number;
    /**
     * 限制文字最大输入个数
     */
    maxLength?: number;
    /**
     * 是否显示计数
     */
    showCounter?: boolean;
    /**
     * 前缀
     */
    prefix?: string;
    /**
     * 后缀
     */
    suffix?: string;
    /**
     * 自动转换值
     */
    transform?: {
        /** 用户输入的字符自动转小写 */
        lowerCase?: boolean;
        /** 用户输入的字符自动转大写 */
        upperCase?: boolean;
    };
    /** control节点的CSS类名 */
    inputControlClassName?: string;
    /** 原生input标签的CSS类名 */
    nativeInputClassName?: string;
    /** 在内容为空的时候清除值 */
    clearValueOnEmpty?: boolean;
}
export type InputTextRendererEvent = 'blur' | 'focus' | 'click' | 'change' | 'enter';
export interface TextProps extends OptionsControlProps, SpinnerExtraProps {
    placeholder?: string;
    addOn?: ActionObject & {
        position?: 'left' | 'right';
        label?: string;
        icon?: string;
        className?: string;
    };
    creatable?: boolean;
    clearable: boolean;
    resetValue?: any;
    autoComplete?: any;
    allowInputText?: boolean;
    spinnerClassName: string;
    revealPassword?: boolean;
    transform?: {
        lowerCase?: boolean;
        upperCase?: boolean;
    };
    /** control节点的CSS类名 */
    inputControlClassName?: string;
    /** 原生input标签的CSS类名 */
    nativeInputClassName?: string;
    popOverContainer?: any;
}
export interface TextState {
    isOpen?: boolean;
    inputValue?: string;
    isFocused?: boolean;
    revealPassword?: boolean;
}
export default class TextControl extends React.PureComponent<TextProps, TextState> {
    input?: HTMLInputElement;
    highlightedIndex?: any;
    unHook: Function;
    constructor(props: TextProps);
    static defaultProps: Partial<TextProps>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: TextProps): void;
    componentWillUnmount(): void;
    inputRef(ref: any): void;
    doAction(action: ListenerAction, args: any): void;
    focus(): void;
    clearValue(): Promise<void>;
    removeItem(index: number): void;
    handleClick(): Promise<void>;
    handleFocus(e: any): Promise<void>;
    handleBlur(e: any): Promise<void>;
    close(): void;
    handleInputChange(evt: React.ChangeEvent<HTMLInputElement>): Promise<void>;
    handleKeyDown(evt: React.KeyboardEvent<HTMLInputElement>): Promise<void>;
    handleChange(value: any): void;
    handleStateChange(changes: StateChangeOptions<any>): void;
    handleNormalInputChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void>;
    normalizeValue(value: Option[] | Option | undefined | null): any;
    transformValue(value: string): string;
    loadAutoComplete(): void;
    reload(): void;
    valueToString(value: any): string;
    getTarget(): HTMLElement | null | undefined;
    renderSugestMode(): React.JSX.Element;
    toggleRevealPassword(): void;
    renderNormal(): JSX.Element;
    renderBody(body: JSX.Element): React.JSX.Element;
    /**
     * 处理input的自定义样式
     */
    render(): JSX.Element;
}
export declare function mapItemIndex(items: Array<any>, values: Array<any>, valueField?: string): any;
export declare class TextControlRenderer extends TextControl {
}
export declare class PasswordControlRenderer extends TextControl {
}
export declare class EmailControlRenderer extends TextControl {
}
export declare class UrlControlRenderer extends TextControl {
}
export declare class NativeDateControlRenderer extends TextControl {
}
export declare class NativeTimeControlRenderer extends TextControl {
}
export declare class NativeNumberControlRenderer extends TextControl {
}
