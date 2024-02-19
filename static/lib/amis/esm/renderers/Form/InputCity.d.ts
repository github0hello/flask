/// <reference types="hoist-non-react-statics" />
import React from 'react';
import { FormControlProps } from 'amis-core';
import { ThemeProps } from 'amis-core';
import { SpinnerExtraProps } from 'amis-ui';
import { ActionObject } from 'amis-core';
import { Option } from 'amis-core';
import { LocaleProps } from 'amis-core';
import { FormBaseControlSchema } from '../../Schema';
/**
 * City 城市选择框。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/city
 */
export interface InputCityControlSchema extends FormBaseControlSchema, SpinnerExtraProps {
    /**
     * 指定为城市选择框。
     */
    type: 'input-city';
    /**
     * 开启后只会存城市的 code 信息
     */
    extractValue?: boolean;
    /**
     * 是否将各个信息拼接成字符串。
     */
    joinValues?: boolean;
    /**
     * 拼接的符号是啥？
     */
    delimiter?: string;
    /**
     * 允许选择城市？
     */
    allowCity?: boolean;
    /**
     * 允许选择地区？
     */
    allowDistrict?: boolean;
    /**
     * 允许选择街道？
     */
    allowStreet?: boolean;
    /**
     * 是否显示搜索框
     */
    searchable?: boolean;
    /**
     * 下拉框className
     */
    itemClassName?: string;
}
export interface CityPickerProps extends Omit<InputCityControlSchema, 'type' | 'className'>, LocaleProps, ThemeProps {
    value: any;
    onChange: (value: any) => void;
    extractValue: boolean;
    delimiter: string;
    allowCity: boolean;
    allowDistrict: boolean;
    allowStreet: boolean;
    mobileUI?: boolean;
    style?: {
        [propName: string]: any;
    };
    popOverContainer?: any;
}
export interface CityDb {
    province: Array<string>;
    city: {
        [propName: number]: Array<number>;
    };
    district: {
        [propName: number]: {
            [propName: number]: Array<number>;
        } | Array<number>;
    };
    [propName: string]: any;
}
export interface CityPickerState {
    code: number;
    province: string;
    provinceCode: number;
    city: string;
    cityCode: number;
    district: string;
    districtCode: number;
    street: string;
    db?: CityDb;
}
export declare class CityPicker extends React.Component<CityPickerProps, CityPickerState> {
    static defaultProps: {
        joinValues: boolean;
        extractValue: boolean;
        delimiter: string;
        allowCity: boolean;
        allowDistrict: boolean;
        allowStreet: boolean;
    };
    state: CityPickerState;
    componentDidMount(): void;
    componentDidUpdate(prevProps: CityPickerProps): void;
    loadDb(callback?: () => void): void;
    handleProvinceChange(option: Option): void;
    handleCityChange(option: Option): void;
    handleDistrictChange(option: Option, otherStates?: Partial<CityPickerState>): void;
    handleStreetChange(e: React.ChangeEvent<HTMLInputElement>): void;
    handleStreetEnd(): void;
    syncIn(props?: Readonly<CityPickerProps>): void;
    syncOut(): void;
    render(): React.JSX.Element;
}
declare const ThemedCity: {
    new (props: Omit<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
        delimiter?: string | undefined;
        joinValues?: boolean | undefined;
        extractValue?: boolean | undefined;
        allowCity?: boolean | undefined;
        allowDistrict?: boolean | undefined;
        allowStreet?: boolean | undefined;
    } & {} & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps): {
        ref: any;
        childRef(ref: any): void;
        getWrappedInstance(): any;
        render(): React.JSX.Element;
        context: unknown;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Omit<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Omit<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Omit<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Omit<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Omit<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Omit<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Omit<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }, keyof ThemeProps> & import("amis-core/lib/theme").ThemeOuterProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: React.ComponentType<{
        new (props: Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }): {
            ref: any;
            childRef(ref: any): void;
            getWrappedInstance(): any;
            render(): React.JSX.Element;
            context: unknown;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        displayName: string;
        contextType: React.Context<string>;
        ComposedComponent: React.ComponentType<typeof CityPicker>;
    } & import("hoist-non-react-statics").NonReactStatics<typeof CityPicker, {}> & {
        ComposedComponent: typeof CityPicker;
    }>;
} & import("hoist-non-react-statics").NonReactStatics<{
    new (props: Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
        delimiter?: string | undefined;
        joinValues?: boolean | undefined;
        extractValue?: boolean | undefined;
        allowCity?: boolean | undefined;
        allowDistrict?: boolean | undefined;
        allowStreet?: boolean | undefined;
    } & {} & {
        locale?: string | undefined;
        translate?: ((str: string, ...args: any[]) => string) | undefined;
    }): {
        ref: any;
        childRef(ref: any): void;
        getWrappedInstance(): any;
        render(): React.JSX.Element;
        context: unknown;
        setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>): any;
        componentDidUpdate?(prevProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, prevState: Readonly<{}>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }>, nextState: Readonly<{}>, nextContext: any): void;
    };
    displayName: string;
    contextType: React.Context<string>;
    ComposedComponent: React.ComponentType<typeof CityPicker>;
} & import("hoist-non-react-statics").NonReactStatics<typeof CityPicker, {}> & {
    ComposedComponent: typeof CityPicker;
}, {}> & {
    ComposedComponent: {
        new (props: Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
            delimiter?: string | undefined;
            joinValues?: boolean | undefined;
            extractValue?: boolean | undefined;
            allowCity?: boolean | undefined;
            allowDistrict?: boolean | undefined;
            allowStreet?: boolean | undefined;
        } & {} & {
            locale?: string | undefined;
            translate?: ((str: string, ...args: any[]) => string) | undefined;
        }): {
            ref: any;
            childRef(ref: any): void;
            getWrappedInstance(): any;
            render(): React.JSX.Element;
            context: unknown;
            setState<K_1 extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>) => {} | Pick<{}, K_1> | null) | Pick<{}, K_1> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<Pick<Omit<CityPickerProps, keyof LocaleProps>, "remark" | "hidden" | "static" | "label" | "className" | "$ref" | "disabled" | "disabledOn" | "hiddenOn" | "visible" | "visibleOn" | "id" | "onEvent" | "staticOn" | "staticPlaceholder" | "staticClassName" | "staticLabelClassName" | "staticInputClassName" | "staticSchema" | "style" | "editorSetting" | "useMobileUI" | "mobileUI" | "classnames" | "classPrefix" | "theme" | "popOverContainer" | "desc" | "name" | "itemClassName" | "placeholder" | "loadingConfig" | "size" | "onChange" | "labelRemark" | "labelAlign" | "labelWidth" | "labelClassName" | "extraName" | "hint" | "submitOnChange" | "readOnly" | "readOnlyOn" | "validateOnChange" | "description" | "descriptionClassName" | "mode" | "horizontal" | "inline" | "inputClassName" | "required" | "validationErrors" | "validations" | "value" | "clearValueOnHidden" | "validateApi" | "searchable"> & {
                delimiter?: string | undefined;
                joinValues?: boolean | undefined;
                extractValue?: boolean | undefined;
                allowCity?: boolean | undefined;
                allowDistrict?: boolean | undefined;
                allowStreet?: boolean | undefined;
            } & {} & {
                locale?: string | undefined;
                translate?: ((str: string, ...args: any[]) => string) | undefined;
            }>, nextState: Readonly<{}>, nextContext: any): void;
        };
        displayName: string;
        contextType: React.Context<string>;
        ComposedComponent: React.ComponentType<typeof CityPicker>;
    } & import("hoist-non-react-statics").NonReactStatics<typeof CityPicker, {}> & {
        ComposedComponent: typeof CityPicker;
    };
};
export default ThemedCity;
export interface LocationControlProps extends FormControlProps {
    allowCity?: boolean;
    allowDistrict?: boolean;
    extractValue?: boolean;
    joinValues?: boolean;
    allowStreet?: boolean;
}
export declare class LocationControl extends React.Component<LocationControlProps> {
    state: {
        db: null;
    };
    doAction(action: ActionObject, data: object, throwErrors: boolean): void;
    handleChange(value: number | string): Promise<void>;
    renderStatic(displayValue?: string): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class CheckboxControlRenderer extends LocationControl {
}
