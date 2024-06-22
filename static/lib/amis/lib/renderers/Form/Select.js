/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var cx = require('classnames');
var find = require('lodash/find');
var debounce = require('lodash/debounce');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');
var Transfer = require('./Transfer.js');
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var find__default = /*#__PURE__*/_interopDefaultLegacy(find);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var SelectControl = /** @class */ (function (_super) {
    tslib.__extends(SelectControl, _super);
    function SelectControl(props) {
        var _this = _super.call(this, props) || this;
        _this.lastTerm = ''; // 用来记录上一次搜索时关键字
        _this.fetchCancel = null;
        _this.changeValue = _this.changeValue.bind(_this);
        _this.lazyloadRemote = debounce__default["default"](_this.loadRemote.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        _this.inputRef = _this.inputRef.bind(_this);
        return _this;
    }
    SelectControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (amisCore.isEffectiveApi(props.autoComplete, props.data) &&
            amisCore.isApiOutdated(prevProps.autoComplete, props.autoComplete, prevProps.data, props.data)) {
            this.lazyloadRemote(this.lastTerm);
        }
    };
    SelectControl.prototype.componentWillUnmount = function () {
        this.unHook && this.unHook();
        this.fetchCancel = null;
    };
    SelectControl.prototype.inputRef = function (ref) {
        this.input = ref;
    };
    SelectControl.prototype.foucs = function () {
        this.input && this.input.focus();
    };
    SelectControl.prototype.getValue = function (value, additonalOptions) {
        if (additonalOptions === void 0) { additonalOptions = []; }
        var _a = this.props, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, multiple = _a.multiple, valueField = _a.valueField, options = _a.options;
        var newValue = value;
        (Array.isArray(value) ? value : value ? [value] : []).forEach(function (option) {
            var resolved = find__default["default"](options, function (item) {
                return item[valueField || 'value'] == option[valueField || 'value'];
            });
            resolved || additonalOptions.push(option);
        });
        if (joinValues) {
            if (multiple) {
                newValue = Array.isArray(value)
                    ? value
                        .map(function (item) { return item[valueField || 'value']; })
                        .join(delimiter)
                    : value
                        ? value[valueField || 'value']
                        : '';
            }
            else {
                newValue = newValue ? newValue[valueField || 'value'] : '';
            }
        }
        else if (extractValue) {
            if (multiple) {
                newValue = Array.isArray(value)
                    ? value.map(function (item) { return item[valueField || 'value']; })
                    : value
                        ? [value[valueField || 'value']]
                        : [];
            }
            else {
                newValue = newValue ? newValue[valueField || 'value'] : '';
            }
        }
        return newValue;
    };
    SelectControl.prototype.dispatchEvent = function (eventName, eventData) {
        if (eventData === void 0) { eventData = {}; }
        return tslib.__awaiter(this, void 0, void 0, function () {
            var event, _a, dispatchEvent, options, multiple, selectedOptions, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        event = 'on' + eventName.charAt(0).toUpperCase() + eventName.slice(1);
                        _a = this.props, dispatchEvent = _a.dispatchEvent, options = _a.options, _a.data, multiple = _a.multiple, selectedOptions = _a.selectedOptions;
                        return [4 /*yield*/, dispatchEvent(eventName, amisCore.resolveEventData(this.props, {
                                options: options,
                                items: options,
                                value: ['onEdit', 'onDelete'].includes(event)
                                    ? eventData
                                    : eventData && eventData.value,
                                selectedItems: multiple ? selectedOptions : selectedOptions[0]
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        // 触发外部方法
                        this.props[event](eventData);
                        return [2 /*return*/];
                }
            });
        });
    };
    SelectControl.prototype.changeValue = function (value) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onChange, setOptions, options, dispatchEvent, additonalOptions, newValue, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, setOptions = _a.setOptions, options = _a.options, _a.data, dispatchEvent = _a.dispatchEvent;
                        additonalOptions = [];
                        newValue = this.getValue(value, additonalOptions);
                        // 不设置没法回显
                        additonalOptions.length && setOptions(options.concat(additonalOptions));
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, {
                                value: newValue,
                                options: options,
                                items: options,
                                selectedItems: value
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    SelectControl.prototype.loadRemote = function (input) {
        var _a;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _b, autoComplete, env, data, setOptions, setLoading, formInited, addHook, ctx, ret, options, combinedOptions;
            var _this = this;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = this.props, autoComplete = _b.autoComplete, env = _b.env, data = _b.data, setOptions = _b.setOptions, setLoading = _b.setLoading, formInited = _b.formInited, addHook = _b.addHook;
                        if (!env || !env.fetcher) {
                            throw new Error('fetcher is required');
                        }
                        if (!formInited) {
                            this.unHook && this.unHook();
                            return [2 /*return*/, (this.unHook = addHook(this.loadRemote.bind(this, input), 'init'))];
                        }
                        this.lastTerm = input;
                        ctx = amisCore.createObject(data, {
                            term: input,
                            value: input
                        });
                        if (!amisCore.isEffectiveApi(autoComplete, ctx)) {
                            return [2 /*return*/, Promise.resolve({
                                    options: []
                                })];
                        }
                        if (this.fetchCancel) {
                            (_a = this.fetchCancel) === null || _a === void 0 ? void 0 : _a.call(this, 'autoComplete request cancelled.');
                            this.fetchCancel = null;
                            setLoading(false);
                        }
                        setLoading(true);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, env.fetcher(autoComplete, ctx, {
                                cancelExecutor: function (executor) { return (_this.fetchCancel = executor); }
                            })];
                    case 2:
                        ret = _c.sent();
                        this.fetchCancel = null;
                        options = (ret.data && ret.data.options) || ret.data || [];
                        combinedOptions = this.mergeOptions(options);
                        setOptions(combinedOptions);
                        return [2 /*return*/, {
                                options: combinedOptions
                            }];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SelectControl.prototype.mergeOptions = function (options) {
        var _a = this.props, selectedOptions = _a.selectedOptions, _b = _a.valueField, valueField = _b === void 0 ? 'value' : _b;
        var combinedOptions = amisCore.normalizeOptions(options, undefined, valueField).concat();
        if (Array.isArray(selectedOptions) && selectedOptions.length) {
            selectedOptions.forEach(function (option) {
                if (!find__default["default"](combinedOptions, function (item) { return item[valueField] === option[valueField]; })) {
                    combinedOptions.push(tslib.__assign(tslib.__assign({}, option), { hidden: true }));
                }
            });
        }
        return combinedOptions;
    };
    SelectControl.prototype.renderMenu = function (option, state) {
        var _a = this.props, menuTpl = _a.menuTpl, render = _a.render, data = _a.data, optionClassName = _a.optionClassName;
        return render("menu/".concat(state.index), menuTpl, {
            showNativeTitle: true,
            className: cx__default["default"]('Select-option-content', optionClassName),
            data: amisCore.createObject(amisCore.createObject(data, state), option)
        });
    };
    SelectControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    SelectControl.prototype.option2value = function () { };
    SelectControl.prototype.renderOtherMode = function () {
        var _a = this.props, selectMode = _a.selectMode, rest = tslib.__rest(_a, ["selectMode"]);
        return (_J$X_(TransferDropdownRenderer, tslib.__assign({}, rest, { selectMode: selectMode === 'group' ? 'list' : selectMode })));
    };
    SelectControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange('');
        }
        else if (actionType === 'reset') {
            var value = this.getValue(resetValue !== null && resetValue !== void 0 ? resetValue : '');
            onChange === null || onChange === void 0 ? void 0 : onChange(value);
        }
    };
    SelectControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, autoComplete = _a.autoComplete, searchable = _a.searchable, showInvalidMatch = _a.showInvalidMatch, options = _a.options, className = _a.className; _a.style; var loading = _a.loading; _a.value; var selectedOptions = _a.selectedOptions, multi = _a.multi, multiple = _a.multiple, placeholder = _a.placeholder; _a.id; var classPrefix = _a.classPrefix; _a.classnames; var creatable = _a.creatable; _a.inline; var noResultsText = _a.noResultsText, render = _a.render, menuTpl = _a.menuTpl, borderMode = _a.borderMode, selectMode = _a.selectMode, env = _a.env, mobileUI = _a.mobileUI, overlay = _a.overlay, filterOption = _a.filterOption, rest = tslib.__rest(_a, ["autoComplete", "searchable", "showInvalidMatch", "options", "className", "style", "loading", "value", "selectedOptions", "multi", "multiple", "placeholder", "id", "classPrefix", "classnames", "creatable", "inline", "noResultsText", "render", "menuTpl", "borderMode", "selectMode", "env", "mobileUI", "overlay", "filterOption"]);
        if (noResultsText) {
            noResultsText = render('noResultText', noResultsText);
        }
        return (_J$X_("div", { className: cx__default["default"]("".concat(classPrefix, "SelectControl"), className) }, ['table', 'list', 'group', 'tree', 'chained', 'associated'].includes(selectMode) ? (this.renderOtherMode()) : (_J$X_(amisUi.Select, tslib.__assign({}, rest, { mobileUI: mobileUI, popOverContainer: mobileUI
                ? env === null || env === void 0 ? void 0 : env.getModalContainer
                : rest.popOverContainer || env.getModalContainer, borderMode: borderMode, placeholder: placeholder, multiple: multiple || multi, ref: this.inputRef, value: selectedOptions, options: options, filterOption: typeof filterOption === 'string'
                ? amisCore.str2function(filterOption, 'options', 'inputValue', 'option')
                : filterOption, loadOptions: amisCore.isEffectiveApi(autoComplete) ? this.lazyloadRemote : undefined, showInvalidMatch: showInvalidMatch, creatable: creatable, searchable: searchable || !!autoComplete, onChange: this.changeValue, onBlur: function (e) { return _this.dispatchEvent('blur', e); }, onFocus: function (e) { return _this.dispatchEvent('focus', e); }, onAdd: function () { return _this.dispatchEvent('add'); }, onEdit: function (item) { return _this.dispatchEvent('edit', item); }, onDelete: function (item) { return _this.dispatchEvent('delete', item); }, loading: loading, noResultsText: noResultsText, renderMenu: menuTpl ? this.renderMenu : undefined, overlay: overlay })))));
    };
    SelectControl.defaultProps = {
        clearable: false,
        searchable: false,
        multiple: false,
        showInvalidMatch: false
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], SelectControl.prototype, "renderMenu", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], SelectControl.prototype, "render", null);
    return SelectControl;
}(React__default["default"].Component));
var TransferDropdownRenderer = /** @class */ (function (_super) {
    tslib.__extends(TransferDropdownRenderer, _super);
    function TransferDropdownRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransferDropdownRenderer.prototype.renderItem = function (item) {
        var labelField = this.props.labelField;
        return "".concat(item.scopeLabel || '').concat(item[labelField || 'label']);
    };
    TransferDropdownRenderer.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className; _b.classnames; var selectedOptions = _b.selectedOptions, sortable = _b.sortable, loading = _b.loading, searchable = _b.searchable, searchResultMode = _b.searchResultMode, showArrow = _b.showArrow, deferLoad = _b.deferLoad, disabled = _b.disabled, clearable = _b.clearable, selectTitle = _b.selectTitle, selectMode = _b.selectMode, multiple = _b.multiple, columns = _b.columns, leftMode = _b.leftMode, borderMode = _b.borderMode, mobileUI = _b.mobileUI, env = _b.env, popOverContainer = _b.popOverContainer, maxTagCount = _b.maxTagCount, overflowTagPopover = _b.overflowTagPopover, placeholder = _b.placeholder, itemHeight = _b.itemHeight, virtualThreshold = _b.virtualThreshold, rightMode = _b.rightMode, loadingConfig = _b.loadingConfig, labelField = _b.labelField, showInvalidMatch = _b.showInvalidMatch, checkAll = _b.checkAll, checkAllLabel = _b.checkAllLabel, overlay = _b.overlay;
        // 目前 LeftOptions 没有接口可以动态加载
        // 为了方便可以快速实现动态化，让选项的第一个成员携带
        // LeftOptions 信息
        var _c = this.props, options = _c.options, leftOptions = _c.leftOptions, leftDefaultValue = _c.leftDefaultValue;
        if (selectMode === 'associated' &&
            options &&
            options.length &&
            options[0].leftOptions &&
            Array.isArray(options[0].children)) {
            leftOptions = options[0].leftOptions;
            leftDefaultValue = (_a = options[0].leftDefaultValue) !== null && _a !== void 0 ? _a : leftDefaultValue;
            options = options[0].children;
        }
        return (_J$X_(React__default["default"].Fragment, null,
            _J$X_(amisUi.TransferDropDown, { selectMode: selectMode, className: className, value: selectedOptions, disabled: disabled, clearable: clearable, options: options, onChange: this.handleChange, option2value: this.option2value, itemRender: this.renderItem, sortable: sortable, searchResultMode: searchResultMode, onSearch: searchable ? this.handleSearch : undefined, showArrow: showArrow, onDeferLoad: deferLoad, selectTitle: selectTitle, multiple: multiple, columns: columns, leftMode: leftMode, rightMode: rightMode, leftOptions: leftOptions, borderMode: borderMode, mobileUI: mobileUI, popOverContainer: popOverContainer || env.getModalContainer, maxTagCount: maxTagCount, overflowTagPopover: overflowTagPopover, placeholder: placeholder, itemHeight: itemHeight, virtualThreshold: virtualThreshold, virtualListHeight: 266, labelField: labelField, showInvalidMatch: showInvalidMatch, checkAllLabel: checkAllLabel, checkAll: checkAll, overlay: overlay }),
            _J$X_(amisUi.Spinner, { overlay: true, key: "info", show: loading, loadingConfig: loadingConfig })));
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Object)
    ], TransferDropdownRenderer.prototype, "renderItem", null);
    return TransferDropdownRenderer;
}(Transfer.BaseTransferRenderer));
/** @class */ ((function (_super) {
    tslib.__extends(SelectControlRenderer, _super);
    function SelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectControlRenderer = tslib.__decorate([
        amisCore.OptionsControl({
            type: 'select'
        })
    ], SelectControlRenderer);
    return SelectControlRenderer;
})(SelectControl));
/** @class */ ((function (_super) {
    tslib.__extends(MultiSelectControlRenderer, _super);
    function MultiSelectControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiSelectControlRenderer.defaultProps = {
        multiple: true
    };
    MultiSelectControlRenderer = tslib.__decorate([
        amisCore.OptionsControl({
            type: 'multi-select'
        })
    ], MultiSelectControlRenderer);
    return MultiSelectControlRenderer;
})(SelectControl));

exports["default"] = SelectControl;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
