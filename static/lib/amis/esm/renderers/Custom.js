/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __spreadArray, __read, __extends, __decorate } from 'tslib';
import React from 'react';
import ReactDOM from 'react-dom';
import memoize from 'lodash/memoize';
import isString from 'lodash/isString';
import { Renderer } from 'amis-core';
import isEqual from 'lodash/isEqual';

// 添加resolver，指定所有参数的联合字符串为key。因为最后一个参数为函数体
// 缓存一下，避免在 crud 中的自定义组件被大量执行
var getFunction = memoize(function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return new (Function.bind.apply(Function, __spreadArray([void 0], __read(args), false)))();
}, function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return JSON.stringify(args);
});
var Custom = /** @class */ (function (_super) {
    __extends(Custom, _super);
    function Custom(props) {
        var _this = _super.call(this, props) || this;
        _this.onUpdate = function () { };
        _this.onMount = function () { };
        _this.onUnmount = function () { };
        _this.childElemArr = []; // 用于记录子元素的Dom节点，以便销毁
        _this.dom = React.createRef();
        _this.initOnMount(props);
        _this.initOnUpdate(props);
        _this.initOnUnmount(props);
        _this.renderChild = _this.renderChild.bind(_this);
        _this.recordChildElem = _this.recordChildElem.bind(_this);
        _this.unmountChildElem = _this.unmountChildElem.bind(_this);
        return _this;
    }
    Custom.prototype.initOnMount = function (props) {
        if (props.onMount) {
            if (typeof props.onMount === 'string') {
                this.onMount = getFunction('dom', 'value', 'onChange', 'props', props.onMount);
            }
            else {
                this.onMount = props.onMount;
            }
        }
    };
    Custom.prototype.initOnUpdate = function (props) {
        if (props.onUpdate) {
            if (typeof props.onUpdate === 'string') {
                this.onUpdate = getFunction('dom', 'data', 'prevData', 'props', props.onUpdate);
            }
            else {
                this.onUpdate = props.onUpdate;
            }
        }
    };
    Custom.prototype.initOnUnmount = function (props) {
        if (props.onUnmount) {
            if (typeof props.onUnmount === 'string') {
                this.onUnmount = getFunction('props', props.onUnmount);
            }
            else {
                this.onUnmount = props.onUnmount;
            }
        }
    };
    Custom.prototype.componentDidUpdate = function (prevProps) {
        if (!isEqual(this.props.onUpdate, prevProps.onUpdate)) {
            this.initOnUpdate(this.props);
        }
        if (!isEqual(this.props.onUpdate, prevProps.onUpdate) ||
            !isEqual(this.props.data, prevProps.data)) {
            this.onUpdate(this.dom, this.props.data, prevProps.data, this.props);
        }
        if (!isEqual(this.props.onMount, prevProps.onMount)) {
            this.initOnMount(this.props);
        }
        if (!isEqual(this.props.onUnmount, prevProps.onUnmount)) {
            this.initOnUnmount(this.props);
        }
    };
    Custom.prototype.componentDidMount = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange;
        this.onMount(this.dom.current, value, onChange, this.props);
    };
    Custom.prototype.componentWillUnmount = function () {
        this.onUnmount(this.props);
        // 自动销毁所有子节点
        this.unmountChildElem();
    };
    // 记录子元素的dom节点
    Custom.prototype.recordChildElem = function (insertElem) {
        if (insertElem && !this.childElemArr.some(function (item) { return item === insertElem; })) {
            this.childElemArr.push(insertElem);
        }
    };
    // 销毁所有子元素的dom节点
    Custom.prototype.unmountChildElem = function () {
        if (this.childElemArr && this.childElemArr.length > 0) {
            this.childElemArr.forEach(function (childElemItem) {
                return ReactDOM.unmountComponentAtNode(childElemItem);
            });
        }
    };
    /**
     * 渲染子元素
     * 备注：现有custom组件通过props.render生成的子元素是react虚拟dom对象，需要使用ReactDOM.render渲染，不能直接插入到当前dom中。
     **/
    Custom.prototype.renderChild = function (schemaPosition, childSchema, insertElemDom) {
        var _this = this;
        var render = this.props.render;
        var childEleCont = null;
        var curInsertElemDom = null;
        if (isString(insertElemDom)) {
            var _curInsertElem = document.getElementById(insertElemDom);
            if (_curInsertElem) {
                curInsertElemDom = _curInsertElem;
            }
        }
        else {
            curInsertElemDom = insertElemDom;
        }
        if (childSchema && curInsertElemDom) {
            var childHTMLElem = render(schemaPosition, childSchema);
            childEleCont = ReactDOM.render(childHTMLElem, curInsertElemDom, function () {
                _this.recordChildElem(curInsertElemDom);
            });
        }
        return childEleCont;
    };
    Custom.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, html = _a.html, id = _a.id, wrapperComponent = _a.wrapperComponent, inline = _a.inline; _a.translate; var cx = _a.classnames;
        var Component = wrapperComponent || inline ? 'span' : 'div';
        return (React.createElement(Component, { ref: this.dom, className: cx(className), style: style, id: id, dangerouslySetInnerHTML: { __html: html ? html : '' } }));
    };
    Custom.defaultProps = {
        inline: false
    };
    return Custom;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(CustomRenderer, _super);
    function CustomRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomRenderer = __decorate([
        Renderer({
            type: 'custom'
        })
    ], CustomRenderer);
    return CustomRenderer;
})(Custom));

export { Custom };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
