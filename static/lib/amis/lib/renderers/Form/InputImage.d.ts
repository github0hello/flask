import React from 'react';
import { FormControlProps } from 'amis-core';
import { FileRejection, DropEvent } from 'react-dropzone';
import 'blueimp-canvastoblob';
import { Payload, ActionObject } from 'amis-core';
import { ImageThumbProps } from '../Image';
import { TranslateFn } from 'amis-core';
import { FormBaseControlSchema, SchemaApi, SchemaClassName, SchemaTokenizeableString, SchemaUrlPath } from '../../Schema';
import { TplSchema } from '../Tpl';
import Sortable from 'sortablejs';
/**
 * Image 图片上传控件
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/image
 */
export interface ImageControlSchema extends FormBaseControlSchema {
    /**
     * 指定为图片上传控件
     */
    type: 'input-image';
    /**
     * 默认展示图片的链接
     */
    src?: SchemaUrlPath;
    /**
     * 默认展示图片的类名
     */
    imageClassName?: string;
    /**
     * 配置接收的图片类型
     *
     * 建议直接填写文件后缀
     * 如：.txt,.csv
     *
     * 多个类型用逗号隔开。
     */
    accept?: string;
    /**
     * 默认都是通过用户选择图片后上传返回图片地址，如果开启此选项，则可以允许用户图片地址。
     */
    allowInput?: boolean;
    /**
     * 是否自动开始上传
     */
    autoUpload?: boolean;
    /**
     * 上传按钮文案
     */
    uploadBtnText?: string | TplSchema;
    /**
     * 选择图片按钮的 CSS 类名
     */
    btnClassName?: SchemaClassName;
    /**
     * 上传按钮的 CSS 类名
     */
    btnUploadClassName?: SchemaClassName;
    /**
     * @deprecated
     */
    compress?: boolean;
    /**
     * @deprecated
     */
    compressOptions?: {
        maxHeight?: number;
        maxWidth?: number;
    };
    crop?: boolean | {
        /**
         * 默认 `1` 即 `1:1`
         *
         * 留空将不限制
         */
        aspectRatio?: number;
        guides?: boolean;
        dragMode?: string;
        viewMode?: number;
        rotatable?: boolean;
        scalable?: boolean;
    };
    /**
     * 裁剪后的图片类型
     */
    cropFormat?: string;
    /**
     * 裁剪后的质量
     */
    cropQuality?: number;
    /**
     * 是否允许二次裁剪。
     */
    reCropable?: boolean;
    /**
     * 是否隐藏上传按钮
     */
    hideUploadButton?: boolean;
    /**
     * 限制图片大小，超出不让上传。
     */
    limit?: {
        /**
         * 比率不对时的提示文字
         */
        aspectRatioLabel?: string;
        /**
         * 限制比率
         */
        aspectRatio?: number;
        /**
         * 限制图片高度
         */
        height?: number;
        /**
         *  限制图片宽度
         */
        width?: number;
        /**
         * 限制图片最大高度
         */
        maxHeight?: number;
        /**
         * 限制图片最大宽度
         */
        maxWidth?: number;
        /**
         * 限制图片最小高度
         */
        minHeight?: number;
        /**
         *  限制图片最小宽度
         */
        minWidth?: number;
    };
    /**
     * 最多的个数
     */
    maxLength?: number;
    /**
     * 默认没有限制，当设置后，文件大小大于此值将不允许上传。
     */
    maxSize?: number;
    /**
     * 默认 `/api/upload` 如果想自己存储，请设置此选项。
     */
    receiver?: SchemaApi;
    /**
     * 默认为 false, 开启后，允许用户输入压缩选项。
     *
     * @deprecated
     */
    showCompressOptions?: boolean;
    /**
     * 是否为多选
     */
    multiple?: boolean;
    /**
     * 可配置移动端的拍照功能，比如配置 `camera` 移动端只能拍照，等
     */
    capture?: string;
    /**
     * 单选模式：当用户选中某个选项时，选项中的 value 将被作为该表单项的值提交，否则，整个选项对象都会作为该表单项的值提交。
     * 多选模式：选中的多个选项的 `value` 会通过 `delimiter` 连接起来，否则直接将以数组的形式提交值。
     */
    joinValues?: boolean;
    /**
     * 分割符
     */
    delimiter?: string;
    /**
     * 开启后将选中的选项 value 的值封装为数组，作为当前表单项的值。
     */
    extractValue?: boolean;
    /**
     * 清除时设置的值
     */
    resetValue?: any;
    /**
     * 缩路图展示模式
     */
    thumbMode?: 'w-full' | 'h-full' | 'contain' | 'cover';
    /**
     * 缩路图展示比率。
     */
    thumbRatio?: '1:1' | '4:3' | '16:9';
    /**
     * 上传后把其他字段同步到表单内部。
     */
    autoFill?: {
        [propName: string]: SchemaTokenizeableString;
    };
    /**
     * 初始化时是否把其他字段同步到表单内部。
     */
    initAutoFill?: boolean;
    /**
     * 初始化时是否打开裁剪模式
     */
    initCrop?: boolean;
    /**
     * 图片上传完毕是否进入裁剪模式
     */
    dropCrop?: boolean;
    /**
     * 默认占位图图片地址
     */
    frameImage?: SchemaUrlPath;
    /**
     * 是否开启固定尺寸
     */
    fixedSize?: boolean;
    /**
     * 固定尺寸的 CSS类名
     */
    fixedSizeClassName?: SchemaClassName;
    /**
     * 是否可拖拽排序
     */
    draggable?: boolean;
    /**
     * 可拖拽排序的提示信息。
     *
     * @default 可拖拽排序
     */
    draggableTip?: string;
}
export interface ImageProps extends FormControlProps, Omit<ImageControlSchema, 'type' | 'className' | 'descriptionClassName' | 'inputClassName'> {
    onImageEnlarge?: (info: Pick<ImageThumbProps, 'src' | 'originalSrc' | 'title' | 'caption'> & {
        index?: number;
        list?: Array<Pick<ImageThumbProps, 'src' | 'originalSrc' | 'title' | 'caption'>>;
    }) => void;
}
export interface ImageState {
    uploading: boolean;
    locked: boolean;
    lockedReason?: string;
    files: Array<FileValue | FileX>;
    crop?: any;
    error?: string;
    cropFile?: FileValue;
    cropFileName?: string;
    submitOnChange?: boolean;
    frameImageWidth?: number;
    dropMultiple?: boolean;
}
export interface FileValue {
    value?: any;
    state: 'init' | 'error' | 'pending' | 'uploading' | 'uploaded' | 'invalid';
    url?: string;
    error?: string;
    info?: {
        width: number;
        height: number;
        len?: number;
    };
    [propName: string]: any;
}
export interface FileX extends File {
    id?: string | number;
    preview?: string;
    state?: 'init' | 'error' | 'pending' | 'uploading' | 'uploaded' | 'invalid';
    progress?: number;
    error?: string;
    [propName: string]: any;
}
export type InputImageRendererEvent = 'change' | 'success' | 'fail' | 'remove';
export type InputImageRendererAction = 'clear';
export default class ImageControl extends React.Component<ImageProps, ImageState> {
    static defaultProps: {
        limit: undefined;
        accept: string;
        receiver: string;
        hideUploadButton: boolean;
        placeholder: string;
        placeholderPlacement: string;
        joinValues: boolean;
        extractValue: boolean;
        delimiter: string;
        autoUpload: boolean;
        multiple: boolean;
        capture: undefined;
        dropCrop: boolean;
        initAutoFill: boolean;
    };
    static valueToFile(value: string | object, props?: ImageProps): FileValue | undefined;
    static sizeInfo(width: number | undefined, height: number | undefined, __: TranslateFn): string;
    state: ImageState;
    files: Array<FileValue | FileX>;
    fileKeys: WeakMap<FileValue | FileX, string>;
    fileUploadCancelExecutors: Array<{
        file: any;
        executor: () => void;
    }>;
    cropper: Cropper;
    dropzone: React.RefObject<any>;
    frameImageRef: React.RefObject<any>;
    current: FileValue | FileX | null;
    resolve?: (value?: any) => void;
    emitValue: any;
    unmounted: boolean;
    initedFilled: boolean;
    reuploadIndex: undefined | number;
    constructor(props: ImageProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ImageProps): void;
    componentWillUnmount(): void;
    getFileKey(file: FileValue | FileX): any;
    buildCrop(props: ImageProps): false | {
        /**
         * 默认 `1` 即 `1:1`
         *
         * 留空将不限制
         */
        aspectRatio?: number | undefined;
        guides?: boolean | undefined;
        dragMode?: string | undefined;
        viewMode?: number | undefined;
        rotatable?: boolean | undefined;
        scalable?: boolean | undefined;
    } | null | undefined;
    handleDropRejected(rejectedFiles: FileRejection[], evt: React.DragEvent<any>): void;
    handleFileCancel(): void;
    startUpload(retry?: boolean): void;
    toggleUpload(): void;
    stopUpload(): void;
    tick(): void;
    removeFile(file: FileValue, index: number): Promise<void>;
    previewImage(file: FileX, index: number, e: React.MouseEvent<any>): void;
    editImage(index: number): void;
    onChange(changeImmediately?: boolean, changeEvent?: boolean, initAutoFill?: boolean): Promise<void>;
    syncAutoFill(): void;
    handleSelect(): void;
    handleRetry(index: number): void;
    handleDrop(files: Array<FileX>, e?: any, event?: DropEvent): void;
    handlePaste(e: React.ClipboardEvent<any>): void;
    handleCrop(): void;
    cancelCrop(): void;
    rotatableCrop(): void;
    addFiles(files: Array<FileX>): void;
    sendFile(file: FileX, cb: (error: null | string, file: FileX, obj?: FileValue) => void, onProgress: (progress: number) => void): void;
    _upload(file: FileX, cb: (error: null | string, file: Blob, obj?: FileValue) => void, onProgress: (progress: number) => void): void;
    _send(file: Blob, receiver: string, params: object, onProgress: (progress: number) => void): Promise<Payload>;
    removeFileCanelExecutor(file: any, execute?: boolean): void;
    handleClick(): void;
    handleImageLoaded(index: number, e: React.UIEvent<any>): void;
    handleFrameImageLoaded(e: React.UIEvent<any>): void;
    validate(): any;
    dispatchEvent(e: string, data?: Record<string, any>): Promise<any>;
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    handleReSelect(index: number): void;
    dragTip?: HTMLElement;
    sortable?: Sortable;
    id: string;
    dragTipRef(ref: any): void;
    initDragging(dom: HTMLElement): void;
    destroyDragging(): void;
    render(): React.JSX.Element;
}
export declare class ImageControlRenderer extends ImageControl {
}
