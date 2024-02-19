import { OptionsControlProps } from 'amis-core';
import React from 'react';
import { SpinnerExtraProps } from 'amis-ui';
import { BaseTransferRenderer, TransferControlSchema } from './Transfer';
import { ActionObject } from 'amis-core';
/**
 * TransferPicker 穿梭器的弹框形态
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/transfer-picker
 */
export interface TransferPickerControlSchema extends Omit<TransferControlSchema, 'type'>, SpinnerExtraProps {
    type: 'transfer-picker';
    /**
     * 边框模式，全边框，还是半边框，或者没边框。
     */
    borderMode?: 'full' | 'half' | 'none';
    /**
     * 弹窗大小
     */
    pickerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
export interface TabsTransferProps extends OptionsControlProps, Omit<TransferPickerControlSchema, 'type' | 'options' | 'inputClassName' | 'className' | 'descriptionClassName'> {
}
export declare class TransferPickerRenderer extends BaseTransferRenderer<TabsTransferProps> {
    dispatchEvent(name: string): void;
    doAction(action: ActionObject): void;
    render(): React.JSX.Element;
}
