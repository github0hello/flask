/// <reference types="hoist-non-react-statics" />
import React from 'react';
import { RendererProps, ActionObject, IScopedContext } from 'amis-core';
import { ThemeProps } from 'amis-core';
import { LocaleProps } from 'amis-core';
import { BaseSchema, SchemaClassName, SchemaTpl, SchemaUrlPath } from '../Schema';
import type { ImageAction, ImageActionKey } from 'amis-ui/lib/components/ImageGallery';
export interface ImageToolbarAction {
    key: keyof typeof ImageActionKey;
    label?: string;
    icon?: string;
    iconClassName?: string;
    disabled?: boolean;
}
/**
 * 图片展示控件。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/image
 */
export interface ImageSchema extends BaseSchema {
    /**
     * 指定为图片展示类型
     */
    type: 'image' | 'static-image';
    /**
     * 默认图片地址
     */
    defaultImage?: SchemaUrlPath;
    /**
     * 图片标题
     */
    title?: SchemaTpl;
    /**
     * 关联字段名，也可以直接配置 src
     */
    name?: string;
    /**
     * 图片描述信息
     */
    imageCaption?: SchemaTpl;
    /**
     * 图片地址，如果配置了 name，这个属性不用配置。
     */
    src?: SchemaUrlPath;
    /**
     * 大图地址，不设置用 src
     */
    originalSrc?: SchemaUrlPath;
    /**
     * 是否启动放大功能。
     */
    enlargeAble?: boolean;
    /**
     * 放大时是否显示图片集
     */
    enlargeWithGallary?: boolean;
    /**
     * 是否显示尺寸。
     */
    /**
     * 图片无法显示时的替换文本
     */
    alt?: string;
    /**
     * 高度
     */
    height?: number;
    /**
     * 宽度
     */
    width?: number;
    /**
     * 外层 css 类名
     */
    className?: SchemaClassName;
    /** 组件内层 css 类名 */
    innerClassName?: SchemaClassName;
    /**
     * 图片 css 类名
     */
    imageClassName?: SchemaClassName;
    /**
     * 图片缩略图外层 css 类名
     */
    thumbClassName?: SchemaClassName;
    /**
     * 放大详情图 CSS 类名
     */
    imageGallaryClassName?: SchemaClassName;
    /** 图片说明文字 */
    caption?: SchemaTpl;
    /**
     * 图片展示模式，默认为缩略图模式、可以配置成原图模式
     */
    imageMode?: 'thumb' | 'original';
    /**
     * 预览图模式
     */
    thumbMode?: 'w-full' | 'h-full' | 'contain' | 'cover';
    /**
     * 预览图比率
     */
    thumbRatio?: '1:1' | '4:3' | '16:9';
    /**
     * 链接地址
     */
    href?: SchemaTpl;
    /**
     * 是否新窗口打开
     */
    blank?: boolean;
    /**
     * 链接的 target
     */
    htmlTarget?: string;
    /**
     * 是否展示图片工具栏
     */
    showToolbar?: boolean;
    /**
     * 工具栏配置
     */
    toolbarActions?: ImageToolbarAction[];
}
export interface ImageThumbProps extends LocaleProps, ThemeProps, Omit<ImageSchema, 'type' | 'className' | 'innerClassName'> {
    onEnlarge?: (info: ImageThumbProps) => void;
    index?: number;
    onLoad?: React.EventHandler<any>;
    overlays?: JSX.Element;
    imageControlClassName?: string;
    titleControlClassName?: string;
    desControlClassName?: string;
    iconControlClassName?: string;
}
interface ImageThumbState {
    imageLoading: boolean;
}
export declare class ImageThumb extends React.Component<ImageThumbProps, ImageThumbState> {
    constructor(props: ImageThumbProps);
    componentDidUpdate(preProps: ImageThumbProps): void;
    handleImgLoaded(e: React.SyntheticEvent<HTMLImageElement, Event>): void;
    handleImgError(e: React.SyntheticEvent<HTMLImageElement, Event>): void;
    handleEnlarge(): void;
    render(): React.JSX.Element;
}
declare const ThemedImageThumb: {
    new (props: Omit<Omit<ImageThumbProps, keyof LocaleProps> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps): {
        ref: any;
        childRef(ref: any): void;
        getWrappedInstance(): any;
        render(): React.JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Omit<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Omit<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>;
        state: Readonly<{}>; /**
         * 工具栏配置
         */
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Omit<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Omit<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Omit<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Omit<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Omit<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: React.ComponentType<{
        new (props: Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }): {
            /**
             * 图片描述信息
             */
            ref: any;
            childRef(ref: any): void;
            /**
             * 图片地址，如果配置了 name，这个属性不用配置。
             */
            getWrappedInstance(): any;
            render(): React.JSX.Element;
            context: unknown;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                /**
                 * 图片无法显示时的替换文本
                 */
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void; /**
             * 预览图比率
             */
            shouldComponentUpdate?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined; /**
                 * 工具栏配置
                 */
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        displayName: string;
        contextType: React.Context<string>;
        ComposedComponent: React.ComponentType<typeof ImageThumb>;
    } & import("hoist-non-react-statics").NonReactStatics<typeof ImageThumb, {}> & {
        ComposedComponent: typeof ImageThumb;
    }>;
} & import("hoist-non-react-statics").NonReactStatics<{
    new (props: Omit<ImageThumbProps, keyof LocaleProps> & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }): {
        /**
         * 图片描述信息
         */
        ref: any;
        childRef(ref: any): void;
        /**
         * 图片地址，如果配置了 name，这个属性不用配置。
         */
        getWrappedInstance(): any;
        render(): React.JSX.Element;
        context: unknown;
        setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
            /**
             * 图片无法显示时的替换文本
             */
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void; /**
         * 预览图比率
         */
        shouldComponentUpdate?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined; /**
             * 工具栏配置
             */
        }>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: React.ComponentType<typeof ImageThumb>;
} & import("hoist-non-react-statics").NonReactStatics<typeof ImageThumb, {}> & {
    ComposedComponent: typeof ImageThumb;
}, {}> & {
    ComposedComponent: {
        new (props: Omit<ImageThumbProps, keyof LocaleProps> & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }): {
            /**
             * 图片描述信息
             */
            ref: any;
            childRef(ref: any): void;
            /**
             * 图片地址，如果配置了 name，这个属性不用配置。
             */
            getWrappedInstance(): any;
            render(): React.JSX.Element;
            context: unknown;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                /**
                 * 图片无法显示时的替换文本
                 */
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void; /**
             * 预览图比率
             */
            shouldComponentUpdate?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined; /**
                 * 工具栏配置
                 */
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<ImageThumbProps, keyof LocaleProps> & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        displayName: string;
        contextType: React.Context<string>;
        ComposedComponent: React.ComponentType<typeof ImageThumb>;
    } & import("hoist-non-react-statics").NonReactStatics<typeof ImageThumb, {}> & {
        ComposedComponent: typeof ImageThumb;
    };
};
export default ThemedImageThumb;
export declare const imagePlaceholder = "data:image/svg+xml,%3C%3Fxml version='1.0' standalone='no'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg t='1631083237695' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2420' xmlns:xlink='http://www.w3.org/1999/xlink' width='1024' height='1024'%3E%3Cdefs%3E%3Cstyle type='text/css'%3E%3C/style%3E%3C/defs%3E%3Cpath d='M959.872 128c0.032 0.032 0.096 0.064 0.128 0.128v767.776c-0.032 0.032-0.064 0.096-0.128 0.128H64.096c-0.032-0.032-0.096-0.064-0.128-0.128V128.128c0.032-0.032 0.064-0.096 0.128-0.128h895.776zM960 64H64C28.8 64 0 92.8 0 128v768c0 35.2 28.8 64 64 64h896c35.2 0 64-28.8 64-64V128c0-35.2-28.8-64-64-64z' p-id='2421' fill='%23bfbfbf'%3E%3C/path%3E%3Cpath d='M832 288c0 53.024-42.976 96-96 96s-96-42.976-96-96 42.976-96 96-96 96 42.976 96 96zM896 832H128V704l224-384 256 320h64l224-192z' p-id='2422' fill='%23bfbfbf'%3E%3C/path%3E%3C/svg%3E";
export interface ImageFieldProps extends RendererProps {
    className?: string;
    innerClassName?: string;
    imageClassName?: string;
    thumbClassName?: string;
    placeholder: string;
    description?: string;
    enlargeTitle?: string;
    enlargeCaption?: string;
    imageMode?: 'thumb' | 'original';
    thumbMode: 'w-full' | 'h-full' | 'contain' | 'cover';
    thumbRatio: '1:1' | '4:3' | '16:9';
    originalSrc?: string;
    enlargeAble?: boolean;
    enlargeWithGallary?: boolean;
    showToolbar?: boolean;
    toolbarActions?: ImageAction[];
    maxScale?: number;
    minScale?: number;
    onImageEnlarge?: (info: {
        src: string;
        originalSrc: string;
        title?: string;
        caption?: string;
        thumbMode?: 'w-full' | 'h-full' | 'contain' | 'cover';
        thumbRatio?: '1:1' | '4:3' | '16:9';
        showToolbar?: boolean;
        imageGallaryClassName?: string;
        toolbarActions?: ImageAction[];
        enlargeWithGallary?: boolean;
    }, target: any) => void;
    imageGallaryClassName?: string;
    onClick?: ((e: React.MouseEvent<any>, props: any) => void) | string | Function | null;
}
interface ImageFieldState {
    scale: number;
}
export declare class ImageField extends React.Component<ImageFieldProps, ImageFieldState> {
    static defaultProps: Pick<ImageFieldProps, 'defaultImage' | 'thumbMode' | 'thumbRatio'>;
    state: ImageFieldState;
    handleEnlarge({ src, originalSrc, title, caption, thumbMode, thumbRatio }: ImageThumbProps): void;
    handleClick(e: React.MouseEvent<HTMLElement>): Promise<void>;
    handleMouseEnter(e: React.MouseEvent<any>): void;
    handleMouseLeave(e: React.MouseEvent<any>): void;
    handleSelfAction(actionType: string, action: ActionObject): void;
    render(): React.JSX.Element;
}
export declare class ImageFieldRenderer extends ImageField {
    static contextType: React.Context<IScopedContext>;
    constructor(props: ImageFieldProps, context: IScopedContext);
    componentWillUnmount(): void;
    doAction(action: ActionObject): void;
}
