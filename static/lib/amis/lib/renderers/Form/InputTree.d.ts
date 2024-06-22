import React from 'react';
import { SpinnerExtraProps } from 'amis-ui';
import { Option, OptionsControlProps, ActionObject } from 'amis-core';
import { FormOptionsSchema, SchemaApi } from '../../Schema';
import type { ItemRenderStates } from 'amis-ui/lib/components/Selection';
/**
 * Tree 下拉选择框。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/form/tree
 */
export interface TreeControlSchema extends FormOptionsSchema {
    type: 'input-tree';
    /**
     * 是否隐藏顶级
     */
    hideRoot?: boolean;
    /**
     * 顶级选项的名称
     */
    rootLabel?: string;
    /**
     * 顶级选项的值
     */
    rootValue?: any;
    /**
     * 显示图标
     */
    showIcon?: boolean;
    /**
     * ui级联关系，true代表级联选中，false代表不级联，默认为true
     */
    autoCheckChildren?: boolean;
    /**
     * 该属性代表数据级联关系，autoCheckChildren为true时生效，默认为false，具体数据级联关系如下：
     * 1.casacde为false，ui行为为级联选中子节点，子节点禁用；值只包含父节点的值
     * 2.cascade为false，withChildren为true，ui行为为级联选中子节点，子节点禁用；值包含父子节点的值
     * 3.cascade为true，ui行为级联选中子节点，子节点可反选，值包含父子节点的值，此时withChildren属性失效
     * 4.cascade不论为true还是false，onlyChildren为true，ui行为级联选中子节点，子节点可反选，值只包含子节点的值
     */
    cascade?: boolean;
    /**
     * 选父级的时候是否把子节点的值也包含在内。
     */
    withChildren?: boolean;
    /**
     * 选父级的时候，是否只把子节点的值包含在内
     */
    onlyChildren?: boolean;
    /**
     * 单选时，只运行选择叶子节点
     */
    onlyLeaf?: boolean;
    /**
     * 顶级节点是否可以创建子节点
     */
    rootCreatable?: boolean;
    /**
     * 是否开启节点路径模式
     */
    enableNodePath?: boolean;
    /**
     * 开启节点路径模式后，节点路径的分隔符
     */
    pathSeparator?: string;
    /**
     * 是否显示展开线
     */
    showOutline?: boolean;
    /**
     * 懒加载接口
     */
    deferApi?: SchemaApi;
    /**
     * 需要高亮的字符串
     */
    highlightTxt?: string;
    /**
     * 是否为选项添加默认的Icon，默认值为true
     */
    enableDefaultIcon?: boolean;
    /**
     * 是否开启搜索
     */
    searchable?: boolean;
    /**
     * 搜索 API
     */
    searchApi?: SchemaApi;
    /**
     * 搜索框的配置
     */
    searchConfig?: {
        /**
         * 搜索框外层CSS样式类
         */
        className?: string;
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
         * 搜索框是否吸顶
         */
        sticky?: boolean;
    };
    /**
     * 高度自动增长？
     */
    heightAuto?: boolean;
}
export interface TreeProps extends OptionsControlProps, Omit<TreeControlSchema, 'type' | 'options' | 'className' | 'inputClassName' | 'descriptionClassName' | 'deferApi'>, SpinnerExtraProps {
    enableNodePath?: boolean;
    pathSeparator?: string;
    mobileUI?: boolean;
}
interface TreeState {
    filteredOptions: Option[];
    keyword: string;
}
export default class TreeControl extends React.Component<TreeProps, TreeState> {
    static defaultProps: Partial<TreeProps>;
    treeRef: any;
    constructor(props: TreeProps);
    componentDidUpdate(prevProps: TreeProps): void;
    reload(): void;
    doAction(action: ActionObject, data: any, throwErrors: boolean): void;
    addItemFromAction(item: Option, parentValue?: any): void;
    editItemFromAction(item: Option, originValue: any): void;
    deleteItemFromAction(value: any): void;
    filterOptions(options: Array<Option>, keywords: string): Array<Option>;
    handleChange(value: any): Promise<void>;
    handleSearch(keyword: string): Promise<void>;
    domRef(ref: any): void;
    validate(): any;
    renderOptionItem(option: Option, states: ItemRenderStates): JSX.Element;
    render(): React.JSX.Element;
}
export declare class TreeControlRenderer extends TreeControl {
}
export {};
