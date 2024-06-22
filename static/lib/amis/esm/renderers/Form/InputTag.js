/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { resolveEventData, filterTree, Overlay, PopOver, autobind, OptionsControl } from 'amis-core';
import Downshift from 'downshift';
import find from 'lodash/find';
import isInteger from 'lodash/isInteger';
import unionWith from 'lodash/unionWith';
import { findDOMNode } from 'react-dom';
import { ResultBox, Spinner, PopUp, ListMenu } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';
import { matchSorter } from 'match-sorter';

var TagControl = /** @class */ (function (_super) {
    __extends(TagControl, _super);
    function TagControl(props) {
        var _this = _super.call(this, props) || this;
        _this.input = React.createRef();
        _this.state = {
            isOpened: false,
            inputValue: '',
            isFocused: false,
            selectedOptions: props.selectedOptions,
            cacheOptions: []
        };
        return _this;
    }
    TagControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (prevProps.value !== props.value) {
            this.setState({
                inputValue: ''
            });
        }
    };
    TagControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange('');
        }
        else if (actionType === 'reset') {
            onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    TagControl.prototype.dispatchEvent = function (eventName, eventData) {
        if (eventData === void 0) { eventData = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, options, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, options = _a.options;
                        return [4 /*yield*/, dispatchEvent(eventName, resolveEventData(this.props, __assign({ options: options, items: options }, eventData)))];
                    case 1:
                        rendererEvent = _b.sent();
                        // 返回阻塞标识
                        return [2 /*return*/, !!(rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented)];
                }
            });
        });
    };
    /** 处理输入的内容 */
    TagControl.prototype.normalizeInputValue = function (inputValue) {
        var _a = this.props, enableBatchAdd = _a.enableBatchAdd, separator = _a.separator, valueField = _a.valueField, labelField = _a.labelField;
        var batchValues = [];
        if (enableBatchAdd && separator && typeof separator === 'string') {
            batchValues = inputValue.split(separator);
        }
        else {
            batchValues.push(inputValue);
        }
        return batchValues.filter(Boolean).map(function (item) {
            var _a;
            return (_a = {},
                _a["".concat(valueField || 'value')] = item,
                _a["".concat(labelField || 'label')] = item,
                _a);
        });
    };
    TagControl.prototype.normalizeOptions = function (options) {
        var _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField;
        return joinValues
            ? options.map(function (item) { return item[valueField || 'value']; }).join(delimiter || ',')
            : extractValue
                ? options.map(function (item) { return item[valueField || 'value']; })
                : options;
    };
    /** 输入的内容和存量的内容合并，过滤掉value值相同的 */
    TagControl.prototype.normalizeMergedValue = function (inputValue, normalized) {
        if (normalized === void 0) { normalized = true; }
        var _a = this.props, selectedOptions = _a.selectedOptions, valueField = _a.valueField;
        var options = unionWith(selectedOptions.concat(), this.normalizeInputValue(inputValue), function (origin, input) {
            return origin[valueField || 'value'] === input[valueField || 'value'];
        });
        return normalized ? this.normalizeOptions(options) : options;
    };
    TagControl.prototype.validateInputValue = function (inputValue) {
        var _a = this.props, max = _a.max, maxTagLength = _a.maxTagLength; _a.enableBatchAdd; _a.separator; var onInputValidateFailed = _a.onInputValidateFailed, valueField = _a.valueField;
        var normalizedValue = this.normalizeMergedValue(inputValue, false);
        if (max != null && isInteger(max) && normalizedValue.length > max) {
            onInputValidateFailed === null || onInputValidateFailed === void 0 ? void 0 : onInputValidateFailed(normalizedValue.map(function (item) { return item[valueField || 'value']; }), 'max');
            return false;
        }
        var addedValues = this.normalizeInputValue(inputValue);
        if (maxTagLength != null &&
            isInteger(maxTagLength) &&
            addedValues.some(function (item) { return item[valueField || 'value'].length > maxTagLength; })) {
            onInputValidateFailed === null || onInputValidateFailed === void 0 ? void 0 : onInputValidateFailed(addedValues.map(function (item) { return item[valueField || 'value']; }), 'maxLength');
            return false;
        }
        return true;
    };
    TagControl.prototype.getValue = function (type, option, selectedOptions) {
        if (type === void 0) { type = 'normal'; }
        if (option === void 0) { option = {}; }
        var _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField;
        selectedOptions = selectedOptions
            ? selectedOptions
            : this.props.selectedOptions;
        var newValue = selectedOptions.concat();
        if (type === 'push') {
            newValue.push(option);
        }
        else if (type === 'pop') {
            newValue.pop();
        }
        return joinValues
            ? newValue.map(function (item) { return item[valueField || 'value']; }).join(delimiter || ',')
            : extractValue
                ? newValue.map(function (item) { return item[valueField || 'value']; })
                : newValue;
    };
    TagControl.prototype.addItem = function (option) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, selectedOptions, onChange, valueField, newValue, newValueRes, isPrevented;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isReachMax()) {
                            return [2 /*return*/];
                        }
                        _a = this.props, selectedOptions = _a.selectedOptions, onChange = _a.onChange, valueField = _a.valueField;
                        newValue = selectedOptions.concat();
                        if (find(newValue, function (item) { return item[valueField || 'value'] == option[valueField || 'value']; })) {
                            return [2 /*return*/];
                        }
                        newValueRes = this.getValue('push', option);
                        return [4 /*yield*/, this.dispatchEvent('change', {
                                value: newValueRes,
                                selectedItems: selectedOptions.concat(option)
                            })];
                    case 1:
                        isPrevented = _b.sent();
                        isPrevented || onChange(newValueRes);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 移动端特殊处理
    TagControl.prototype.addItem2 = function (option) {
        var _a = this.props, mobileUI = _a.mobileUI, _b = _a.valueField, valueField = _b === void 0 ? 'value' : _b;
        if (mobileUI) {
            var selectedOptions = this.state.selectedOptions.concat();
            var index = selectedOptions.findIndex(function (item) { return item[valueField] === option[valueField]; });
            if (~index) {
                selectedOptions.splice(index, 1);
            }
            else if (!this.isReachMaxFromState()) {
                selectedOptions.push(option);
            }
            this.setState({
                selectedOptions: selectedOptions
            });
        }
    };
    // 手机端校验
    TagControl.prototype.isExist = function (inputValue) {
        var _a = this.props, options = _a.options, _b = _a.valueField, valueField = _b === void 0 ? 'value' : _b;
        var cacheOptions = this.state.cacheOptions;
        return (options.some(function (item) { return item[valueField] === inputValue; }) ||
            cacheOptions.some(function (item) { return item[valueField] === inputValue; }));
    };
    TagControl.prototype.addSelection = function () {
        var inputValue = this.state.inputValue;
        var maxTagLength = this.props.maxTagLength;
        var selectedOptions = this.state.selectedOptions.slice();
        var cacheOptions = this.state.cacheOptions.slice();
        if (maxTagLength !== undefined) {
            inputValue = inputValue.trim();
            inputValue = inputValue.slice(0, maxTagLength);
        }
        if (this.isExist(inputValue)) {
            return;
        }
        if (inputValue && !this.isReachMaxFromState()) {
            var addedValues = this.normalizeInputValue(inputValue);
            selectedOptions.push(addedValues[0]);
            cacheOptions.push(addedValues[0]);
            this.setState({
                inputValue: '',
                selectedOptions: selectedOptions,
                cacheOptions: cacheOptions
            });
        }
    };
    TagControl.prototype.onConfirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectedOptions, onChange, newValueRes, isPrevented;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selectedOptions = this.state.selectedOptions;
                        onChange = this.props.onChange;
                        newValueRes = this.getValue('normal', {}, selectedOptions);
                        return [4 /*yield*/, this.dispatchEvent('change', {
                                value: newValueRes,
                                selectedItems: selectedOptions
                            })];
                    case 1:
                        isPrevented = _a.sent();
                        isPrevented || onChange(newValueRes);
                        this.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    TagControl.prototype.handleFocus = function (e) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var newValueRes, isPrevented;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.setState({
                            isFocused: true,
                            isOpened: true,
                            selectedOptions: this.props.selectedOptions
                        });
                        newValueRes = this.getValue('normal');
                        return [4 /*yield*/, this.dispatchEvent('focus', {
                                value: newValueRes,
                                selectedItems: this.props.selectedOptions
                            })];
                    case 1:
                        isPrevented = _c.sent();
                        isPrevented || ((_b = (_a = this.props).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, e));
                        return [2 /*return*/];
                }
            });
        });
    };
    TagControl.prototype.handleBlur = function (e) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, selectedOptions, onChange, mobileUI, options, value, newValueRes, isPrevented;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.props, selectedOptions = _c.selectedOptions, onChange = _c.onChange, mobileUI = _c.mobileUI, options = _c.options;
                        if (mobileUI && options.length) {
                            return [2 /*return*/];
                        }
                        value = this.state.inputValue.trim();
                        if (!this.validateInputValue(value)) {
                            this.setState({ isFocused: false, isOpened: false });
                            return [2 /*return*/];
                        }
                        newValueRes = this.normalizeMergedValue(value);
                        return [4 /*yield*/, this.dispatchEvent('blur', {
                                value: newValueRes,
                                selectedItems: selectedOptions
                            })];
                    case 1:
                        isPrevented = _d.sent();
                        isPrevented || ((_b = (_a = this.props).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, e));
                        this.setState({
                            isFocused: false,
                            isOpened: false,
                            inputValue: ''
                        }, value
                            ? function () {
                                if (selectedOptions.length !== newValueRes.length) {
                                    onChange === null || onChange === void 0 ? void 0 : onChange(newValueRes);
                                }
                            }
                            : undefined);
                        return [2 /*return*/];
                }
            });
        });
    };
    TagControl.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    TagControl.prototype.handleInputChange = function (text) {
        this.setState({ inputValue: text });
    };
    TagControl.prototype.handleChange = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, joinValues, extractValue, delimiter, valueField, onChange, newValue, isPrevented;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField, onChange = _a.onChange;
                        newValue = Array.isArray(value) ? value.concat() : [];
                        if (joinValues || extractValue) {
                            newValue = value.map(function (item) { return item[valueField || 'value']; });
                        }
                        if (joinValues) {
                            newValue = newValue.join(delimiter || ',');
                        }
                        return [4 /*yield*/, this.dispatchEvent('change', {
                                value: newValue,
                                selectedItems: value
                            })];
                    case 1:
                        isPrevented = _b.sent();
                        isPrevented || onChange(newValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    TagControl.prototype.renderItem = function (item) {
        var labelField = this.props.labelField;
        return "".concat(item[labelField || 'label']);
    };
    TagControl.prototype.handleKeyDown = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, selectedOptions, onChange, delimiter, labelField, valueField, value, selectedItems, newValueRes, isPrevented, newValueRes, isPrevented;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, selectedOptions = _a.selectedOptions, onChange = _a.onChange, delimiter = _a.delimiter, labelField = _a.labelField, valueField = _a.valueField;
                        value = this.state.inputValue.trim();
                        selectedItems = selectedOptions.concat((_b = {},
                            _b["".concat(labelField || 'label')] = value,
                            _b["".concat(valueField || 'value')] = value,
                            _b));
                        if (!(selectedOptions.length && !value && evt.key == 'Backspace')) return [3 /*break*/, 2];
                        newValueRes = this.getValue('pop');
                        return [4 /*yield*/, this.dispatchEvent('change', {
                                value: newValueRes,
                                selectedItems: selectedItems
                            })];
                    case 1:
                        isPrevented = _c.sent();
                        isPrevented || onChange(newValueRes);
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(value && (evt.key === 'Enter' || evt.key === delimiter))) return [3 /*break*/, 4];
                        evt.preventDefault();
                        evt.stopPropagation();
                        newValueRes = this.normalizeMergedValue(value);
                        return [4 /*yield*/, this.dispatchEvent('change', {
                                value: newValueRes,
                                selectedItems: selectedItems
                            })];
                    case 3:
                        isPrevented = _c.sent();
                        if (!this.validateInputValue(value)) {
                            this.setState({ isFocused: false, isOpened: false });
                            return [2 /*return*/];
                        }
                        if (!isPrevented && selectedOptions.length !== newValueRes.length) {
                            onChange(newValueRes);
                        }
                        this.setState({
                            inputValue: ''
                        });
                        _c.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    TagControl.prototype.handleOptionChange = function (option) {
        var mobileUI = this.props.mobileUI;
        if (mobileUI) {
            this.addItem2(option);
            return;
        }
        if (this.isReachMax() || !option) {
            return;
        }
        this.addItem(option);
    };
    TagControl.prototype.getTarget = function () {
        return this.input.current;
    };
    TagControl.prototype.getParent = function () {
        return this.input.current && findDOMNode(this.input.current).parentElement;
    };
    TagControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload === null || reload === void 0 ? void 0 : reload();
    };
    TagControl.prototype.isReachMax = function () {
        var _a = this.props, max = _a.max, selectedOptions = _a.selectedOptions;
        return max != null && isInteger(max) && selectedOptions.length >= max;
    };
    TagControl.prototype.isReachMaxFromState = function () {
        var selectedOptions = this.state.selectedOptions;
        var max = this.props.max;
        return max != null && isInteger(max) && selectedOptions.length >= max;
    };
    TagControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className; _a.style; var cx = _a.classnames, disabled = _a.disabled, placeholder = _a.placeholder, name = _a.name, clearable = _a.clearable, selectedOptions = _a.selectedOptions, loading = _a.loading, popOverContainer = _a.popOverContainer, dropdown = _a.dropdown, options = _a.options, optionsTip = _a.optionsTip, maxTagCount = _a.maxTagCount, overflowTagPopover = _a.overflowTagPopover, __ = _a.translate, loadingConfig = _a.loadingConfig, valueField = _a.valueField, env = _a.env, mobileUI = _a.mobileUI, labelField = _a.labelField;
        var term = this.state.inputValue;
        var finnalOptions = Array.isArray(options)
            ? filterTree(options, function (item, key, level, paths) {
                return item[valueField || 'value'] !== undefined &&
                    (mobileUI || !~selectedOptions.indexOf(item)) &&
                    (matchSorter([item].concat(paths), term, {
                        keys: [labelField || 'label', valueField || 'value'],
                        threshold: matchSorter.rankings.CONTAINS
                    }).length ||
                        (Array.isArray(item.children) && !!item.children.length));
            }, 0, true)
            : [];
        var reachMax = this.isReachMax();
        return (React.createElement(Downshift, { selectedItem: selectedOptions, isOpen: mobileUI ? this.state.isOpened : this.state.isFocused, inputValue: this.state.inputValue, onChange: this.handleOptionChange, itemToString: this.renderItem }, function (_a) {
            var isOpen = _a.isOpen, highlightedIndex = _a.highlightedIndex, getItemProps = _a.getItemProps, getInputProps = _a.getInputProps;
            return (React.createElement("div", { className: cx(className, "TagControl") },
                React.createElement(ResultBox, __assign({}, getInputProps({
                    name: name,
                    ref: _this.input,
                    placeholder: __(placeholder !== null && placeholder !== void 0 ? placeholder : 'Tag.placeholder'),
                    value: _this.state.inputValue,
                    onKeyDown: _this.handleKeyDown,
                    onFocus: !mobileUI ? _this.handleFocus : undefined,
                    onBlur: _this.handleBlur,
                    disabled: disabled
                }), { onResultClick: mobileUI ? _this.handleFocus : undefined, inputPlaceholder: '', onChange: _this.handleInputChange, className: cx('TagControl-input'), result: selectedOptions, onResultChange: _this.handleChange, itemRender: _this.renderItem, clearable: clearable, maxTagCount: maxTagCount, overflowTagPopover: overflowTagPopover, popOverContainer: popOverContainer || env.getModalContainer, allowInput: !mobileUI || (mobileUI && !(options === null || options === void 0 ? void 0 : options.length)), mobileUI: mobileUI }), loading ? (React.createElement(Spinner, { loadingConfig: loadingConfig, size: "sm" })) : undefined),
                dropdown !== false ? (mobileUI ? (React.createElement(PopUp, { className: cx("Tag-popup"), container: mobileUI
                        ? env === null || env === void 0 ? void 0 : env.getModalContainer
                        : popOverContainer || env.getModalContainer, isShow: isOpen && !!finnalOptions.length, showConfirm: true, onConfirm: _this.onConfirm, onHide: _this.close },
                    React.createElement("div", null,
                        React.createElement(ListMenu, { selectedOptions: selectedOptions, mobileUI: mobileUI, options: finnalOptions.concat(_this.state.cacheOptions), itemRender: _this.renderItem, highlightIndex: highlightedIndex, getItemProps: function (_a) {
                                var item = _a.item, index = _a.index;
                                return (__assign({}, getItemProps({
                                    index: index,
                                    item: item,
                                    className: cx('ListMenu-item', {
                                        'is-active': ~(_this.state.selectedOptions.map(function (item) { return item[valueField]; }) || []).indexOf(item[valueField])
                                    })
                                })));
                            } }),
                        mobileUI && !_this.isReachMaxFromState() ? (React.createElement("div", { className: cx('ListMenu-add-wrap') },
                            React.createElement(ResultBox, { placeholder: __('placeholder.enter') + '...', allowInput: true, value: _this.state.inputValue, mobileUI: mobileUI, clearable: true, maxTagCount: maxTagCount, onChange: function (value) {
                                    _this.setState({ inputValue: value });
                                }, onBlur: _this.addSelection }))) : null))) : (React.createElement(Overlay, { container: popOverContainer || _this.getParent, target: _this.getTarget, placement: 'auto', show: isOpen && !!finnalOptions.length },
                    React.createElement(PopOver, { overlay: true, className: cx('TagControl-popover'), onHide: _this.close },
                        React.createElement(ListMenu, { options: finnalOptions, itemRender: _this.renderItem, highlightIndex: highlightedIndex, getItemProps: function (_a) {
                                var item = _a.item, index = _a.index;
                                return (__assign({}, getItemProps({
                                    index: index,
                                    item: item,
                                    disabled: reachMax || item.disabled,
                                    className: cx('ListMenu-item', {
                                        'is-disabled': reachMax
                                    })
                                })));
                            } }))))) : (
                // 保留原来的展现方式，不推荐
                React.createElement("div", { className: cx('TagControl-sug') },
                    optionsTip ? (React.createElement("div", { className: cx('TagControl-sugTip') }, __(optionsTip))) : null,
                    options.map(function (item, index) { return (React.createElement("div", { className: cx('TagControl-sugItem', {
                            'is-disabled': item.disabled || disabled || reachMax
                        }), key: index, onClick: _this.addItem.bind(_this, item) }, item.label)); })))));
        }));
    };
    TagControl.defaultProps = {
        resetValue: '',
        labelField: 'label',
        valueField: 'value',
        multiple: true,
        placeholder: 'Tag.placeholder',
        optionsTip: 'Tag.tip',
        separator: '-'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], TagControl.prototype, "dispatchEvent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Array]),
        __metadata("design:returntype", void 0)
    ], TagControl.prototype, "getValue", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TagControl.prototype, "addSelection", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], TagControl.prototype, "onConfirm", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TagControl.prototype, "handleFocus", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TagControl.prototype, "handleBlur", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TagControl.prototype, "close", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], TagControl.prototype, "handleInputChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Array]),
        __metadata("design:returntype", Promise)
    ], TagControl.prototype, "handleChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Object)
    ], TagControl.prototype, "renderItem", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], TagControl.prototype, "handleKeyDown", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TagControl.prototype, "handleOptionChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TagControl.prototype, "getTarget", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TagControl.prototype, "getParent", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TagControl.prototype, "isReachMax", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TagControl.prototype, "isReachMaxFromState", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TagControl.prototype, "render", null);
    return TagControl;
}(React.PureComponent));
/** @class */ ((function (_super) {
    __extends(TagControlRenderer, _super);
    function TagControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TagControlRenderer = __decorate([
        OptionsControl({
            type: 'input-tag'
        })
    ], TagControlRenderer);
    return TagControlRenderer;
})(TagControl));

export { TagControl as default };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
