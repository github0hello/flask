import React from 'react';
import { OptionsControlProps, FormOptionsControl } from 'amis-core';
import type { Option } from 'amis-core';
import { ActionObject } from 'amis-core';
import type { BadgeObject } from 'amis-ui';
import { ButtonGroupSchema } from '../ButtonGroup';
/**
 * 按钮组控件。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/button-group
 */
export interface ButtonGroupControlSchema extends Omit<ButtonGroupSchema, 'type'>, Omit<FormOptionsControl, 'size'> {
    type: 'button-group-select';
}
export interface ButtonGroupProps extends OptionsControlProps, Omit<ButtonGroupControlSchema, 'size' | 'source' | 'type' | 'className' | 'descriptionClassName' | 'inputClassName' | 'btnClassName'> {
    options: Array<Option>;
}
export default class ButtonGroupControl extends React.Component<ButtonGroupProps, any> {
    static defaultProps: Partial<ButtonGroupProps>;
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    handleToggle(option: Option): void;
    reload(): void;
    getBadgeConfig(config: BadgeObject, item: Option): any;
    render(props?: Readonly<ButtonGroupProps>): React.JSX.Element;
}
export declare class ButtonGroupControlRenderer extends ButtonGroupControl {
}
