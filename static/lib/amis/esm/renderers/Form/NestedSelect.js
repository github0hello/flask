/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { Checkbox, Icon, ResultBox, Spinner, PopUp, Cascader } from 'amis-ui';
import { resolveEventData, string2regExp, getTreeAncestors, renderTextByKeyword, flattenTree, getTreeParent, filterTree, getTreeDepth, RootClose, Overlay, PopOver, ucFirst, autobind, OptionsControl } from 'amis-core';
import { findDOMNode } from 'react-dom';
import xor from 'lodash/xor';
import union from 'lodash/union';
import compact from 'lodash/compact';
import { supportStatic } from './StaticHoc.js';
import { matchSorter } from 'match-sorter';

var NestedSelectControl = /** @class */ (function (_super) {
    __extends(NestedSelectControl, _super);
    function NestedSelectControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.outTarget = React.createRef();
        _this.state = {
            isOpened: false,
            isFocused: false,
            inputValue: '',
            stack: [_this.props.options]
        };
        return _this;
    }
    NestedSelectControl.prototype.domRef = function (ref) {
        this.target = ref;
    };
    NestedSelectControl.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.options !== this.props.options) {
            this.setState({
                stack: [this.props.options]
            });
        }
    };
    NestedSelectControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange('');
        }
        else if (actionType === 'reset') {
            onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    NestedSelectControl.prototype.dispatchEvent = function (eventName, eventData) {
        if (eventData === void 0) { eventData = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var dispatchEvent, rendererEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatchEvent = this.props.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent(eventName, resolveEventData(this.props, eventData))];
                    case 1:
                        rendererEvent = _a.sent();
                        // 返回阻塞标识
                        return [2 /*return*/, !!(rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented)];
                }
            });
        });
    };
    /** 是否为父节点 */
    NestedSelectControl.prototype.isParentNode = function (option) {
        return Array.isArray(option.children) && option.children.length > 0;
    };
    NestedSelectControl.prototype.handleOutClick = function (e) {
        var _a;
        this.props.options;
        this.outTargetWidth = (_a = this.outTarget.current) === null || _a === void 0 ? void 0 : _a.clientWidth;
        e.defaultPrevented ||
            this.setState({
                isOpened: true
            });
    };
    NestedSelectControl.prototype.handleResultClear = function () {
        this.setState({
            inputValue: undefined
        });
    };
    NestedSelectControl.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    NestedSelectControl.prototype.removeItem = function (index, e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onChange, selectedOptions, joinValues, valueField, extractValue, delimiter, value, isPrevented;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, selectedOptions = _a.selectedOptions, joinValues = _a.joinValues, valueField = _a.valueField, extractValue = _a.extractValue, delimiter = _a.delimiter, value = _a.value;
                        e && e.stopPropagation();
                        selectedOptions.splice(index, 1);
                        if (joinValues) {
                            value = selectedOptions
                                .map(function (item) { return item[valueField || 'value']; })
                                .join(delimiter || ',');
                        }
                        else if (extractValue) {
                            value = selectedOptions.map(function (item) { return item[valueField || 'value']; });
                        }
                        return [4 /*yield*/, this.dispatchEvent('change', {
                                value: value
                            })];
                    case 1:
                        isPrevented = _b.sent();
                        isPrevented || onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    NestedSelectControl.prototype.renderValue = function (option, key) {
        var _a = this.props, cx = _a.classnames, labelField = _a.labelField, valueField = _a.valueField, options = _a.options, hideNodePathLabel = _a.hideNodePathLabel;
        var inputValue = this.state.inputValue || '';
        var regexp = string2regExp(inputValue);
        if (hideNodePathLabel) {
            return option[labelField || 'label'];
        }
        var ancestors = getTreeAncestors(options, option, true);
        var optionText = option[labelField || 'label'];
        var splitJoin = ' / ';
        var title = ancestors
            ? ancestors.map(function (item) { return item[labelField || 'label']; }).join(splitJoin)
            : optionText;
        return (React.createElement("span", { className: cx('Select-valueLabel'), key: key || option[valueField || 'value'], title: title }, ancestors
            ? ancestors.map(function (item, index) {
                var label = item[labelField || 'label'];
                var value = item[valueField || 'value'];
                var isEnd = index === ancestors.length - 1;
                return (React.createElement("span", { key: index },
                    regexp.test(value) || regexp.test(label)
                        ? renderTextByKeyword(label, inputValue)
                        : label,
                    !isEnd && splitJoin));
            })
            : optionText));
    };
    NestedSelectControl.prototype.handleOptionClick = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, multiple, onChange, joinValues, extractValue, valueField, onlyLeaf, value, isPrevented;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, multiple = _a.multiple, onChange = _a.onChange, joinValues = _a.joinValues, extractValue = _a.extractValue, valueField = _a.valueField, onlyLeaf = _a.onlyLeaf;
                        if (multiple) {
                            return [2 /*return*/];
                        }
                        value = joinValues
                            ? option[valueField || 'value']
                            : extractValue
                                ? option[valueField || 'value']
                                : option;
                        if (value === undefined) {
                            return [2 /*return*/];
                        }
                        if (onlyLeaf && this.isParentNode(option)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.dispatchEvent('change', {
                                value: value
                            })];
                    case 1:
                        isPrevented = _b.sent();
                        isPrevented || onChange(value);
                        isPrevented || this.handleResultClear();
                        /** 选项选择后需要重置下拉数据源：搜索结果 => 原始数据 */
                        this.setState({ stack: [this.props.options] });
                        this.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    NestedSelectControl.prototype.handleCheck = function (option, index) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onChange, selectedOptions, joinValues, delimiter, extractValue, withChildren, onlyChildren, cascade, options, onlyLeaf, stack, valueField, items, value, flattenTreeWithLeafNodes, isEvery, isEvery, toCheck, parent_1, newValue, isPrevented;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, selectedOptions = _a.selectedOptions, joinValues = _a.joinValues, delimiter = _a.delimiter, extractValue = _a.extractValue, withChildren = _a.withChildren, onlyChildren = _a.onlyChildren, cascade = _a.cascade, options = _a.options, onlyLeaf = _a.onlyLeaf;
                        stack = this.state.stack;
                        valueField = this.props.valueField || 'value';
                        if (onlyLeaf && !Array.isArray(option) && this.isParentNode(option)) {
                            return [2 /*return*/];
                        }
                        if (!Array.isArray(option) &&
                            option.children &&
                            option.children.length &&
                            typeof index === 'number') {
                            if (stack[index]) {
                                stack.splice(index + 1, 1, option.children);
                            }
                            else {
                                stack.push(option.children);
                            }
                        }
                        items = selectedOptions;
                        flattenTreeWithLeafNodes = function (option) {
                            return compact(flattenTree(Array.isArray(option) ? option : [option], function (node) {
                                return node.children && node.children.length ? null : node;
                            }));
                        };
                        // 三种情况：
                        // 1.全选，option为数组
                        // 2.单个选中，且有children
                        // 3.单个选中，没有children
                        if (Array.isArray(option)) {
                            if (withChildren) {
                                option = flattenTree(option);
                            }
                            else if (onlyChildren) {
                                option = flattenTreeWithLeafNodes(option);
                            }
                            value = items.length === option.length ? [] : option;
                        }
                        else if (Array.isArray(option.children)) {
                            if (cascade) {
                                value = xor(items, [option]);
                            }
                            else if (withChildren) {
                                option = flattenTree([option]);
                                isEvery = option.every(function (opt) { return !!~items.indexOf(opt); });
                                value = (isEvery ? xor : union)(items, option);
                            }
                            else if (onlyChildren) {
                                option = flattenTreeWithLeafNodes(option);
                                isEvery = option.every(function (opt) { return !!~items.indexOf(opt); });
                                value = (isEvery ? xor : union)(items, option);
                            }
                            else {
                                value = items.filter(function (item) { return !~flattenTree([option]).indexOf(item); });
                                !~items.indexOf(option) && value.push(option);
                            }
                        }
                        else {
                            value = xor(items, [option]);
                        }
                        if (!cascade) {
                            toCheck = option;
                            while (true) {
                                parent_1 = getTreeParent(options, toCheck);
                                if (parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.value) {
                                    // 如果所有孩子节点都勾选了，应该自动勾选父级。
                                    if (parent_1.children.every(function (child) { return ~value.indexOf(child); })) {
                                        parent_1.children.forEach(function (child) {
                                            var index = value.indexOf(child);
                                            if (~index && !withChildren && !onlyChildren) {
                                                value.splice(index, 1);
                                            }
                                        });
                                        if (!onlyChildren) {
                                            value.push(parent_1);
                                        }
                                        toCheck = parent_1;
                                        continue;
                                    }
                                }
                                break;
                            }
                        }
                        newValue = joinValues
                            ? value.map(function (item) { return item[valueField]; }).join(delimiter)
                            : extractValue
                                ? value.map(function (item) { return item[valueField]; })
                                : value;
                        return [4 /*yield*/, this.dispatchEvent('change', {
                                value: newValue
                            })];
                    case 1:
                        isPrevented = _b.sent();
                        isPrevented || onChange(newValue);
                        isPrevented || this.handleResultClear();
                        /** 选项选择后需要重置下拉数据源：搜索结果 => 原始数据 */
                        this.setState({ stack: [this.props.options] });
                        return [2 /*return*/];
                }
            });
        });
    };
    NestedSelectControl.prototype.allChecked = function (options) {
        var _this = this;
        var _a = this.props, selectedOptions = _a.selectedOptions, withChildren = _a.withChildren, onlyChildren = _a.onlyChildren;
        return options.every(function (option) {
            if ((withChildren || onlyChildren) && option.children) {
                return _this.allChecked(option.children);
            }
            return selectedOptions.some(function (item) { return item === option; });
        });
    };
    NestedSelectControl.prototype.partialChecked = function (options) {
        var _this = this;
        return options.some(function (option) {
            var childrenPartialChecked = option.children && _this.partialChecked(option.children);
            return (childrenPartialChecked ||
                _this.props.selectedOptions.some(function (item) { return item === option; }));
        });
    };
    NestedSelectControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    NestedSelectControl.prototype.getValue = function () {
        var _a = this.props, selectedOptions = _a.selectedOptions, joinValues = _a.joinValues, valueField = _a.valueField, extractValue = _a.extractValue, delimiter = _a.delimiter, value = _a.value;
        if (joinValues) {
            value = selectedOptions
                .map(function (item) { return item[valueField || 'value']; })
                .join(delimiter || ',');
        }
        else if (extractValue) {
            value = selectedOptions.map(function (item) { return item[valueField || 'value']; });
        }
        return value;
    };
    NestedSelectControl.prototype.onFocus = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onFocus, disabled, value, isPrevented;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onFocus = _a.onFocus, disabled = _a.disabled;
                        value = this.getValue();
                        if (!(!disabled && !this.state.isOpened)) return [3 /*break*/, 2];
                        this.setState({
                            isFocused: true
                        });
                        return [4 /*yield*/, this.dispatchEvent('focus', {
                                value: value
                            })];
                    case 1:
                        isPrevented = _b.sent();
                        isPrevented || (onFocus && onFocus(e));
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    NestedSelectControl.prototype.onBlur = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var onBlur, value, isPrevented;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        onBlur = this.props.onBlur;
                        value = this.getValue();
                        this.setState({
                            isFocused: false
                        });
                        return [4 /*yield*/, this.dispatchEvent('blur', {
                                value: value
                            })];
                    case 1:
                        isPrevented = _a.sent();
                        isPrevented || (onBlur && onBlur(e));
                        return [2 /*return*/];
                }
            });
        });
    };
    NestedSelectControl.prototype.getTarget = function () {
        if (!this.target) {
            this.target = findDOMNode(this);
        }
        return this.target;
    };
    NestedSelectControl.prototype.handleKeyPress = function (e) {
        if (e.key === ' ') {
            this.handleOutClick(e);
            e.preventDefault();
        }
    };
    NestedSelectControl.prototype.handleInputKeyDown = function (event) {
        var inputValue = this.state.inputValue;
        var _a = this.props, multiple = _a.multiple, selectedOptions = _a.selectedOptions;
        if (event.key === 'Backspace' &&
            !inputValue &&
            selectedOptions.length &&
            multiple) {
            this.removeItem(selectedOptions.length - 1);
        }
    };
    NestedSelectControl.prototype.handleInputChange = function (inputValue) {
        var _a = this.props, options = _a.options, labelField = _a.labelField, valueField = _a.valueField;
        var filtedOptions = inputValue && this.state.isOpened
            ? filterTree(options, function (option, key, level, paths) {
                return !!matchSorter([option].concat(paths), inputValue, {
                    keys: [labelField || 'label', valueField || 'value'],
                    threshold: matchSorter.rankings.CONTAINS
                }).length || !!(option.children && option.children.length);
            }, 1, true)
            : options.concat();
        this.setState({
            inputValue: inputValue,
            stack: [filtedOptions]
        });
    };
    NestedSelectControl.prototype.handleResultChange = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, joinValues, extractValue, delimiter, valueField, onChange, multiple, newValue, isPrevented_1, isPrevented;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField, onChange = _a.onChange, multiple = _a.multiple;
                        newValue = Array.isArray(value) ? value.concat() : [];
                        if (!(!multiple && !newValue.length)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.dispatchEvent('change', {
                                value: ''
                            })];
                    case 1:
                        isPrevented_1 = _b.sent();
                        isPrevented_1 || onChange('');
                        return [2 /*return*/];
                    case 2:
                        if (joinValues || extractValue) {
                            newValue = value.map(function (item) { return item[valueField || 'value']; });
                        }
                        if (joinValues) {
                            newValue = newValue.join(delimiter || ',');
                        }
                        return [4 /*yield*/, this.dispatchEvent('change', {
                                value: newValue
                            })];
                    case 3:
                        isPrevented = _b.sent();
                        isPrevented || onChange(newValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    NestedSelectControl.prototype.getMenuSelectMenuStyle = function () {
        var options = this.props.options;
        var width = this.outTargetWidth;
        var depth = getTreeDepth(options);
        var style = {};
        if (width) {
            style = {
                width: width / depth
            };
        }
        return style;
    };
    NestedSelectControl.prototype.renderOptions = function () {
        var _this = this;
        var _a = this.props, multiple = _a.multiple, selectedOptions = _a.selectedOptions, cx = _a.classnames, propOptions = _a.options, disabled = _a.disabled, checkAll = _a.checkAll, checkAllLabel = _a.checkAllLabel, __ = _a.translate, labelField = _a.labelField, menuClassName = _a.menuClassName, cascade = _a.cascade, onlyChildren = _a.onlyChildren;
        var valueField = this.props.valueField || 'value';
        var stack = this.state.stack;
        var partialChecked = this.partialChecked(propOptions);
        var allChecked = this.allChecked(propOptions);
        return (React.createElement(React.Fragment, null, stack.map(function (options, index) { return (React.createElement("div", { key: index, className: cx('NestedSelect-menu', menuClassName), style: _this.getMenuSelectMenuStyle() },
            multiple && checkAll && index === 0 ? (React.createElement("div", { className: cx('NestedSelect-option', 'checkall') },
                React.createElement(Checkbox, { size: "sm", onChange: _this.handleCheck.bind(_this, options), checked: partialChecked, partial: partialChecked && !allChecked }),
                React.createElement("span", { onClick: _this.handleCheck.bind(_this, options) }, __(checkAllLabel)))) : null,
            options.map(function (option, idx) {
                var ancestors = getTreeAncestors(propOptions, option);
                var parentChecked = ancestors === null || ancestors === void 0 ? void 0 : ancestors.some(function (item) { return !!~selectedOptions.indexOf(item); });
                var uncheckable = cascade ? false : multiple && parentChecked;
                var parentDisabled = ancestors === null || ancestors === void 0 ? void 0 : ancestors.some(function (item) { return !!item.disabled; });
                var nodeDisabled = uncheckable || option.disabled || parentDisabled || !!disabled;
                var selfChildrenChecked = !!(option.children && _this.partialChecked(option.children));
                var selfChecked = uncheckable || !!~selectedOptions.indexOf(option);
                if (!selfChecked &&
                    onlyChildren &&
                    _this.isParentNode(option) &&
                    _this.allChecked(option.children)) {
                    selfChecked = true;
                }
                var label = option[labelField || 'label'];
                return (React.createElement("div", { key: idx, className: cx('NestedSelect-option', {
                        'is-active': !nodeDisabled &&
                            (selfChecked || (!cascade && selfChildrenChecked))
                    }), onMouseEnter: _this.onMouseEnter.bind(_this, option, index) },
                    multiple ? (React.createElement(Checkbox, { size: "sm", onChange: _this.handleCheck.bind(_this, option, index), trueValue: option[valueField], checked: selfChecked || (!cascade && selfChildrenChecked), partial: !selfChecked, disabled: nodeDisabled })) : null,
                    React.createElement("div", { className: cx('NestedSelect-optionLabel', {
                            'is-disabled': nodeDisabled
                        }), onClick: function () {
                            return !nodeDisabled &&
                                (multiple
                                    ? _this.handleCheck(option, index)
                                    : _this.handleOptionClick(option));
                        }, title: label }, label),
                    option.children && option.children.length ? (React.createElement("div", { className: cx('NestedSelect-optionArrowRight', {
                            'is-disabled': nodeDisabled
                        }) },
                        React.createElement(Icon, { icon: "right-arrow-bold", className: "icon" }))) : null));
            }))); })));
    };
    NestedSelectControl.prototype.renderSearchResult = function () {
        var _this = this;
        var _a = this.state, stack = _a.stack, inputValue = _a.inputValue;
        var _b = this.props, cx = _b.classnames, __ = _b.translate, propOptions = _b.options, labelField = _b.labelField, valueField = _b.valueField, cascade = _b.cascade, selectedOptions = _b.selectedOptions, multiple = _b.multiple, disabled = _b.disabled, onlyChildren = _b.onlyChildren, render = _b.render;
        var noResultsText = this.props.noResultsText;
        if (noResultsText) {
            noResultsText = render('noResultText', __(noResultsText));
        }
        var regexp = string2regExp(inputValue || '');
        var flattenTreeWithNodes = flattenTree(stack[0]).filter(function (option) {
            return !!(regexp.test(option[valueField || 'value']) ||
                regexp.test(option[labelField || 'label']));
        });
        // 一个stack一个menu
        var resultBody = (React.createElement("div", { className: cx('NestedSelect-menu'), style: this.getMenuSelectMenuStyle() }, flattenTreeWithNodes.length ? (flattenTreeWithNodes.map(function (option, index) {
            var ancestors = getTreeAncestors(propOptions, option);
            var uncheckable = cascade
                ? false
                : multiple &&
                    (ancestors === null || ancestors === void 0 ? void 0 : ancestors.some(function (item) { return !!~selectedOptions.indexOf(item); }));
            var isNodeDisabled = uncheckable ||
                option.disabled ||
                !!disabled ||
                (ancestors === null || ancestors === void 0 ? void 0 : ancestors.some(function (item) { return !!item.disabled; }));
            var isChildrenChecked = !!(option.children && _this.partialChecked(option.children));
            var isChecked = uncheckable || !!~selectedOptions.indexOf(option);
            if (!isChecked &&
                onlyChildren &&
                _this.isParentNode(option) &&
                _this.allChecked(option.children)) {
                isChecked = true;
            }
            return (React.createElement("div", { className: cx('NestedSelect-option', {
                    'is-active': !isNodeDisabled &&
                        (isChecked || (!cascade && isChildrenChecked))
                }), key: index },
                React.createElement("div", { className: cx('NestedSelect-optionLabel', {
                        'is-disabled': isNodeDisabled
                    }), onClick: function () {
                        !isNodeDisabled &&
                            (multiple
                                ? _this.handleCheck(option, option.value)
                                : _this.handleOptionClick(option));
                    } }, _this.renderValue(option, option.value))));
        })) : (React.createElement("div", { className: cx('NestedSelect-option', {
                'no-result': true
            }) }, noResultsText))));
        return resultBody;
    };
    NestedSelectControl.prototype.onMouseEnter = function (option, index, e) {
        var stack = this.state.stack;
        index = index + 1;
        var children = option.children;
        if (children && children.length) {
            if (stack[index]) {
                stack.splice(index, 1, children);
            }
            else {
                stack.push(children);
            }
        }
        else {
            stack[index] && stack.splice(index, 1);
        }
        this.setState({ stack: stack.slice(0, index + 1) });
    };
    NestedSelectControl.prototype.renderOuter = function () {
        var _this = this;
        var _a = this.props, popOverContainer = _a.popOverContainer, __ = _a.translate, cx = _a.classnames, options = _a.options, render = _a.render;
        var isSearch = !!this.state.inputValue;
        var noResultsText = this.props.noResultsText;
        if (noResultsText) {
            noResultsText = render('noResultText', __(noResultsText));
        }
        var body = (React.createElement(RootClose, { disabled: !this.state.isOpened, onRootClose: this.close }, function (ref) {
            return (React.createElement("div", { className: cx('NestedSelect-menuOuter'), ref: ref }, isSearch ? (_this.renderSearchResult()) : options.length ? (_this.renderOptions()) : (React.createElement("div", { className: cx('NestedSelect-noResult') }, noResultsText))));
        }));
        return (React.createElement(Overlay, { target: this.getTarget, container: popOverContainer || (function () { return findDOMNode(_this); }), placement: 'auto', show: true },
            React.createElement(PopOver, { className: cx('NestedSelect-popover') }, body)));
    };
    NestedSelectControl.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className; _b.style; var disabled = _b.disabled, cx = _b.classnames, multiple = _b.multiple, placeholder = _b.placeholder, __ = _b.translate, inline = _b.inline, searchable = _b.searchable, selectedOptions = _b.selectedOptions, clearable = _b.clearable, loading = _b.loading, borderMode = _b.borderMode, mobileUI = _b.mobileUI; _b.popOverContainer; var env = _b.env, loadingConfig = _b.loadingConfig, maxTagCount = _b.maxTagCount, overflowTagPopover = _b.overflowTagPopover;
        return (React.createElement("div", { className: cx('NestedSelectControl', className), ref: this.outTarget },
            React.createElement(ResultBox, { mobileUI: mobileUI, maxTagCount: maxTagCount, overflowTagPopover: overflowTagPopover, disabled: disabled, ref: this.domRef, placeholder: __(placeholder !== null && placeholder !== void 0 ? placeholder : 'placeholder.empty'), inputPlaceholder: '', className: cx("NestedSelect", (_a = {
                        'NestedSelect--inline': inline,
                        'NestedSelect--single': !multiple,
                        'NestedSelect--multi': multiple,
                        'NestedSelect--searchable': searchable,
                        'is-opened': this.state.isOpened,
                        'is-focused': this.state.isFocused
                    },
                    _a["NestedSelect--border".concat(ucFirst(borderMode))] = borderMode,
                    _a)), result: multiple
                    ? selectedOptions
                    : selectedOptions.length
                        ? selectedOptions[0]
                        : '', onResultClick: this.handleOutClick, value: this.state.inputValue, onChange: this.handleInputChange, onResultChange: this.handleResultChange, onClear: this.handleResultClear, itemRender: this.renderValue, onKeyPress: this.handleKeyPress, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.handleInputKeyDown, clearable: clearable, hasDropDownArrow: true, allowInput: searchable && !mobileUI }, loading ? (React.createElement(Spinner, { loadingConfig: loadingConfig, size: "sm" })) : undefined),
            mobileUI ? (React.createElement(PopUp, { className: cx("NestedSelect-popup"), container: env.getModalContainer, isShow: this.state.isOpened, onHide: this.close, showConfirm: false, showClose: false },
                React.createElement(Cascader, __assign({ onClose: this.close }, this.props, { onChange: this.handleResultChange, options: this.props.options.slice(), value: selectedOptions })))) : this.state.isOpened ? (this.renderOuter()) : null));
    };
    NestedSelectControl.defaultProps = {
        cascade: false,
        withChildren: false,
        onlyChildren: false,
        onlyLeaf: false,
        searchPromptText: 'Select.searchPromptText',
        noResultsText: 'noResult',
        checkAll: true,
        checkAllLabel: 'Select.checkAll',
        hideNodePathLabel: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "domRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], NestedSelectControl.prototype, "dispatchEvent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "handleOutClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "handleResultClear", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "close", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "renderValue", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], NestedSelectControl.prototype, "handleOptionClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Number]),
        __metadata("design:returntype", Promise)
    ], NestedSelectControl.prototype, "handleCheck", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "getValue", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], NestedSelectControl.prototype, "onFocus", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], NestedSelectControl.prototype, "onBlur", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "getTarget", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "handleKeyPress", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "handleInputKeyDown", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "handleInputChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], NestedSelectControl.prototype, "handleResultChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "getMenuSelectMenuStyle", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], NestedSelectControl.prototype, "render", null);
    return NestedSelectControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(NestedSelectControlRenderer, _super);
    function NestedSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NestedSelectControlRenderer = __decorate([
        OptionsControl({
            type: 'nested-select'
        })
    ], NestedSelectControlRenderer);
    return NestedSelectControlRenderer;
})(NestedSelectControl));
/** @class */ ((function (_super) {
    __extends(CascaderSelectControlRenderer, _super);
    function CascaderSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CascaderSelectControlRenderer = __decorate([
        OptionsControl({
            type: 'cascader-select'
        })
    ], CascaderSelectControlRenderer);
    return CascaderSelectControlRenderer;
})(NestedSelectControl));

export { NestedSelectControl as default };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
