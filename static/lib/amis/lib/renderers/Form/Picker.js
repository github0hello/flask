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
var omit = require('lodash/omit');
var find = require('lodash/find');
var isEqual = require('lodash/isEqual');
var findIndex = require('lodash/findIndex');
var merge = require('lodash/merge');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');
var intersectionWith = require('lodash/intersectionWith');
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);
var find__default = /*#__PURE__*/_interopDefaultLegacy(find);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var findIndex__default = /*#__PURE__*/_interopDefaultLegacy(findIndex);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var intersectionWith__default = /*#__PURE__*/_interopDefaultLegacy(intersectionWith);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var PickerControl = /** @class */ (function (_super) {
    tslib.__extends(PickerControl, _super);
    function PickerControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpened: false,
            schema: _this.buildSchema(_this.props),
            isFocused: false
        };
        _this.input = React__default["default"].createRef();
        return _this;
    }
    PickerControl.prototype.componentDidMount = function () {
        this.fetchOptions();
    };
    PickerControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var detectedProps = ['multiple', 'source', 'pickerSchema'];
        if (detectedProps.some(function (key) { return !isEqual__default["default"](prevProps[key], props[key]); })) {
            this.setState({
                schema: this.buildSchema(props)
            });
        }
        else if (JSON.stringify(props.value) !== JSON.stringify(prevProps.value)) {
            this.fetchOptions();
        }
        else if (amisCore.isApiOutdated(prevProps.source, props.source, prevProps.data, props.data)) {
            this.fetchOptions();
        }
    };
    PickerControl.prototype.fetchOptions = function () {
        var _a;
        var _b = this.props, value = _b.value, formItem = _b.formItem, valueField = _b.valueField, labelField = _b.labelField, source = _b.source, data = _b.data;
        var selectedOptions;
        if (!source ||
            !formItem ||
            (valueField || 'value') === (labelField || 'label') ||
            ((selectedOptions = formItem.getSelectedOptions(value)) &&
                (!selectedOptions.length ||
                    selectedOptions[0][valueField || 'value'] !==
                        selectedOptions[0][labelField || 'label']))) {
            return;
        }
        var ctx = amisCore.createObject(data, (_a = {
                value: value
            },
            _a[valueField || 'value'] = value,
            _a.op = 'loadOptions',
            _a));
        if (amisCore.isPureVariable(source)) {
            formItem.setOptions(amisCore.resolveVariableAndFilter(source, data, '| raw'));
        }
        else if (amisCore.isEffectiveApi(source, ctx)) {
            formItem.loadOptions(source, ctx, {
                autoAppend: true
            });
        }
    };
    PickerControl.prototype.buildSchema = function (props) {
        var _a, _b;
        var isScopeData = amisCore.isPureVariable(props.source);
        return tslib.__assign(tslib.__assign({ checkOnItemClick: true }, props.pickerSchema), { labelTpl: (_b = (_a = props.pickerSchema) === null || _a === void 0 ? void 0 : _a.labelTpl) !== null && _b !== void 0 ? _b : props.labelTpl, type: 'crud', pickerMode: true, syncLocation: false, api: isScopeData ? null : props.source, source: isScopeData ? props.source : null, keepItemSelectionOnPageChange: true, valueField: props.valueField, labelField: props.labelField, 
            // 不支持批量操作，会乱套
            bulkActions: props.multiple
                ? props.pickerSchema.bulkActions
                : [] });
    };
    PickerControl.prototype.crudRef = function (ref) {
        while (ref && ref.getWrappedInstance) {
            ref = ref.getWrappedInstance();
        }
        this.crud = ref;
    };
    PickerControl.prototype.reload = function () {
        if (this.crud) {
            this.crud.search();
        }
        else {
            var reload = this.props.reloadOptions;
            reload && reload();
        }
    };
    PickerControl.prototype.open = function () {
        this.setState({
            isOpened: true
        });
    };
    PickerControl.prototype.close = function () {
        this.setState({
            isOpened: false
        });
    };
    PickerControl.prototype.handleModalConfirm = function (values, action, ctx, components) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var idx;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idx = findIndex__default["default"](components, function (item) { return item.props.type === 'crud'; });
                        return [4 /*yield*/, this.handleChange(values[idx].items)];
                    case 1:
                        _a.sent();
                        this.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    PickerControl.prototype.handleChange = function (items) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, joinValues, valueField, delimiter, extractValue, multiple, options, dispatchEvent, setOptions, onChange, value, additionalOptions, option, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, joinValues = _a.joinValues, valueField = _a.valueField, delimiter = _a.delimiter, extractValue = _a.extractValue, multiple = _a.multiple, options = _a.options, _a.data, dispatchEvent = _a.dispatchEvent, _a.selectedOptions, setOptions = _a.setOptions, onChange = _a.onChange;
                        value = items;
                        if (joinValues) {
                            value = items
                                .map(function (item) { return item[valueField || 'value']; })
                                .join(delimiter || ',');
                        }
                        else if (extractValue) {
                            value = multiple
                                ? items.map(function (item) { return item[valueField || 'value']; })
                                : (items[0] && items[0][valueField || 'value']) || '';
                        }
                        else {
                            value = multiple ? items : items[0];
                        }
                        additionalOptions = [];
                        items.forEach(function (item) {
                            if (!find__default["default"](options, function (option) { return item[valueField || 'value'] == option[valueField || 'value']; })) {
                                additionalOptions.push(item);
                            }
                        });
                        additionalOptions.length && setOptions(options.concat(additionalOptions));
                        option = multiple ? items : items[0];
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, { value: value, option: option, selectedItems: option }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    PickerControl.prototype.handleItemClick = function (item) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, data, dispatchEvent, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, data = _a.data, dispatchEvent = _a.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent('itemClick', amisCore.createObject(data, { item: item }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PickerControl.prototype.removeItem = function (index) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, selectedOptions, joinValues, extractValue, delimiter, valueField, onChange, multiple, dispatchEvent, items, _b, option, value, rendererEvent;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, selectedOptions = _a.selectedOptions, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, valueField = _a.valueField, onChange = _a.onChange, multiple = _a.multiple, dispatchEvent = _a.dispatchEvent;
                        items = selectedOptions.concat();
                        _b = tslib.__read(items.splice(index, 1), 1), option = _b[0];
                        value = items;
                        if (joinValues) {
                            value = items
                                .map(function (item) { return item[valueField || 'value']; })
                                .join(delimiter || ',');
                        }
                        else if (extractValue) {
                            value = multiple
                                ? items.map(function (item) { return item[valueField || 'value']; })
                                : (items[0] && items[0][valueField || 'value']) || '';
                        }
                        else {
                            value = multiple ? items : items[0];
                        }
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, { value: value, option: option, selectedItems: option }))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    PickerControl.prototype.handleKeyDown = function (e) {
        var selectedOptions = this.props.selectedOptions;
        if (e.key === ' ') {
            this.open();
            e.preventDefault();
        }
        else if (selectedOptions.length && e.key == 'Backspace') {
            this.removeItem(selectedOptions.length - 1);
        }
    };
    PickerControl.prototype.handleFocus = function () {
        this.setState({
            isFocused: true
        });
    };
    PickerControl.prototype.handleBlur = function () {
        this.setState({
            isFocused: false
        });
    };
    PickerControl.prototype.handleClick = function () {
        this.input.current && this.input.current.focus();
        this.open();
    };
    PickerControl.prototype.clearValue = function () {
        var _a = this.props, onChange = _a.onChange, resetValue = _a.resetValue;
        onChange(resetValue !== void 0 ? resetValue : '');
    };
    PickerControl.prototype.getOverflowConfig = function () {
        var overflowConfig = this.props.overflowConfig;
        return merge__default["default"](PickerControl.defaultProps.overflowConfig, overflowConfig);
    };
    PickerControl.prototype.renderTag = function (item, index) {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, cx = _a.classnames, labelField = _a.labelField, labelTpl = _a.labelTpl; _a.translate; var disabled = _a.disabled, env = _a.env, id = _a.id, themeCss = _a.themeCss, css = _a.css;
        return (_J$X_("div", { key: index, className: cx("".concat(ns, "Picker-value"), amisCore.setThemeClassName('pickValueWrapClassName', id, themeCss || css), {
                'is-disabled': disabled
            }) },
            _J$X_("span", { className: cx("".concat(ns, "Picker-valueIcon"), amisCore.setThemeClassName('pickValueIconClassName', id, themeCss || css)), onClick: function (e) {
                    e.stopPropagation();
                    _this.removeItem(index);
                } }, "\u00D7"),
            _J$X_("span", { className: cx("".concat(ns, "Picker-valueLabel"), amisCore.setThemeClassName('pickFontClassName', id, themeCss || css)), onClick: function (e) {
                    e.stopPropagation();
                    _this.handleItemClick(item);
                } }, labelTpl ? (_J$X_(amisUi.Html, { html: amisCore.filter(labelTpl, item), filterHtml: env.filterHtml })) : ("".concat(amisCore.getVariable(item, labelField || 'label') ||
                amisCore.getVariable(item, 'id'))))));
    };
    PickerControl.prototype.renderValues = function () {
        var _this = this;
        var _a = this.props, ns = _a.classPrefix, selectedOptions = _a.selectedOptions, __ = _a.translate, disabled = _a.disabled, multiple = _a.multiple, popOverContainer = _a.popOverContainer, id = _a.id, themeCss = _a.themeCss, css = _a.css;
        var _b = this.getOverflowConfig(), maxTagCount = _b.maxTagCount, overflowTagPopover = _b.overflowTagPopover;
        var totalCount = selectedOptions.length;
        var tags = selectedOptions;
        var enableOverflow = multiple !== false &&
            amisCore.isIntegerInRange(maxTagCount, {
                start: 0,
                end: totalCount,
                left: 'inclusive',
                right: 'exclusive'
            });
        /** 多选且开启限制标签数量 */
        if (enableOverflow) {
            tags = tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(selectedOptions.slice(0, maxTagCount)), false), [
                { label: "+ ".concat(totalCount - maxTagCount, " ..."), value: '__overflow_tag__' }
            ], false);
        }
        return (_J$X_("div", { className: "".concat(ns, "Picker-values") }, tags.map(function (item, index) {
            if (enableOverflow && index === maxTagCount) {
                return (_J$X_(amisUi.TooltipWrapper, { key: index, container: popOverContainer, tooltip: tslib.__assign(tslib.__assign({ tooltipClassName: cx__default["default"]('Picker-overflow', overflowTagPopover === null || overflowTagPopover === void 0 ? void 0 : overflowTagPopover.tooltipClassName), title: __('已选项') }, omit__default["default"](overflowTagPopover, [
                        'children',
                        'content',
                        'tooltipClassName'
                    ])), { children: function () {
                            return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "Picker-overflow-wrapper")) }, selectedOptions
                                .slice(maxTagCount, totalCount)
                                .map(function (overflowItem, rawIndex) {
                                var key = rawIndex + maxTagCount;
                                return _this.renderTag(overflowItem, key);
                            })));
                        } }) },
                    _J$X_("div", { key: index, className: cx__default["default"]("".concat(ns, "Picker-value"), {
                            'is-disabled': disabled
                        }) },
                        _J$X_("span", { className: "".concat(ns, "Picker-valueLabel ").concat(amisCore.setThemeClassName('pickFontClassName', id, themeCss || css)) }, item.label))));
            }
            return _this.renderTag(item, index);
        })));
    };
    PickerControl.prototype.renderBody = function (_a) {
        var _this = this;
        var _b = _a === void 0 ? {} : _a, popOverContainer = _b.popOverContainer;
        var _c = this.props, render = _c.render, selectedOptions = _c.selectedOptions, options = _c.options, multiple = _c.multiple, valueField = _c.valueField, embed = _c.embed, source = _c.source, strictMode = _c.strictMode;
        var _d = this.getOverflowConfig(), maxTagCount = _d.maxTagCount, overflowTagPopoverInCRUD = _d.overflowTagPopoverInCRUD, displayPosition = _d.displayPosition;
        return render('modal-body', this.state.schema, tslib.__assign({ value: selectedOptions, valueField: valueField, primaryField: valueField, options: source ? [] : options, multiple: multiple, strictMode: strictMode, onSelect: embed
                ? function (selectedItems, unSelectedItems) {
                    // 选择行后，crud 会给出连续多次事件，且selectedItems会变化，会导致初始化和点击无效
                    // 过滤掉一些无用事件，否则会导致 value 错误
                    if (!Array.isArray(selectedItems) ||
                        !Array.isArray(unSelectedItems) ||
                        (!selectedItems.length && !unSelectedItems.length)) {
                        return;
                    }
                    // 取交集，判断是否是无效事件，需要考虑顺序问题
                    var intersections = intersectionWith__default["default"](selectedItems, selectedOptions, function (a, b) {
                        // 需要考虑没有配置 valueField，而且值里面又没有 value 字段的情况
                        var aValue = a[valueField || 'value'];
                        var bValue = b[valueField || 'value'];
                        return aValue || bValue
                            ? aValue === bValue
                            : // selectedOptions 中有 Options 自动添加的 value 字段，所以去掉后才能比较
                                isEqual__default["default"](omit__default["default"](a, 'value'), omit__default["default"](b, 'value'));
                    });
                    if (
                    // 前后数量都一样说明是重复事件
                    intersections.length === selectedItems.length &&
                        intersections.length === selectedOptions.length) {
                        return;
                    }
                    _this.handleChange(selectedItems);
                }
                : undefined, ref: this.crudRef, popOverContainer: popOverContainer }, (embed ||
            (Array.isArray(displayPosition) && displayPosition.includes('crud'))
            ? { maxTagCount: maxTagCount, overflowTagPopover: overflowTagPopoverInCRUD }
            : {})));
    };
    PickerControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var modalClassName = _a.modalClassName, cx = _a.classnames, disabled = _a.disabled, render = _a.render, modalMode = _a.modalMode, source = _a.source, size = _a.size, clearable = _a.clearable, multiple = _a.multiple, placeholder = _a.placeholder, embed = _a.embed, selectedOptions = _a.selectedOptions, __ = _a.translate, popOverContainer = _a.popOverContainer, modalTitle = _a.modalTitle, data = _a.data, mobileUI = _a.mobileUI, env = _a.env, themeCss = _a.themeCss, css = _a.css, id = _a.id, ns = _a.classPrefix;
        return (_J$X_("div", { className: cx("PickerControl", { 'is-mobile': mobileUI }, className) },
            embed ? (_J$X_("div", { className: cx('Picker') }, this.renderBody({ popOverContainer: popOverContainer }))) : (_J$X_("div", { className: cx("Picker", {
                    'Picker--single': !multiple,
                    'Picker--multi': multiple,
                    'is-focused': this.state.isFocused,
                    'is-disabled': disabled
                }) },
                _J$X_("div", { onClick: this.handleClick, className: cx('Picker-input', amisCore.setThemeClassName('pickControlClassName', id, themeCss || css), amisCore.setThemeClassName('pickControlDisabledClassName', id, themeCss || css)) },
                    !selectedOptions.length && placeholder ? (_J$X_("div", { className: cx('Picker-placeholder') }, __(placeholder))) : null,
                    _J$X_("div", { className: cx('Picker-valueWrap') },
                        this.renderValues(),
                        _J$X_("input", { onChange: amisCore.noop, value: '', ref: this.input, onKeyDown: this.handleKeyDown, onFocus: this.handleFocus, onBlur: this.handleBlur, readOnly: mobileUI })),
                    clearable && !disabled && selectedOptions.length ? (_J$X_("a", { onClick: this.clearValue, className: cx('Picker-clear') },
                        _J$X_(amisUi.Icon, { icon: "input-clear", className: "icon" }))) : null,
                    _J$X_("span", { onClick: this.open, className: cx('Picker-btn') },
                        _J$X_(amisUi.Icon, { icon: "window-restore", className: cx('icon', amisCore.setThemeClassName('pickIconClassName', id, themeCss || css)), iconContent: "Picker-icon" }))),
                render('modal', {
                    title: modalTitle && typeof modalTitle === 'string'
                        ? amisCore.filter(modalTitle, data)
                        : __('Select.placeholder'),
                    size: size,
                    type: modalMode,
                    className: modalClassName,
                    body: {
                        children: this.renderBody
                    }
                }, {
                    key: 'modal',
                    lazyRender: !!source,
                    onConfirm: this.handleModalConfirm,
                    onClose: this.close,
                    show: this.state.isOpened
                }))),
            _J$X_(amisCore.CustomStyle, { config: {
                    themeCss: themeCss || css,
                    classNames: [
                        {
                            key: 'pickControlClassName',
                            weights: {
                                default: {
                                    important: true
                                },
                                hover: {
                                    important: true
                                },
                                active: {
                                    important: true
                                },
                                disabled: {
                                    important: true
                                }
                            }
                        },
                        {
                            key: 'pickControlDisabledClassName',
                            weights: {
                                default: {
                                    pre: "".concat(ns, "Picker.is-disabled> .").concat(amisCore.setThemeClassName('pickControlDisabledClassName', id, themeCss || css), ", ")
                                }
                            }
                        },
                        {
                            key: 'pickFontClassName'
                        },
                        {
                            key: 'pickValueWrapClassName',
                            weights: {
                                default: {
                                    important: true
                                }
                            }
                        },
                        {
                            key: 'pickValueIconClassName',
                            weights: {
                                default: {
                                    important: true
                                },
                                hover: {
                                    important: true
                                }
                            }
                        },
                        {
                            key: 'pickIconClassName',
                            weights: {
                                default: {
                                    suf: ' svg'
                                }
                            }
                        }
                    ],
                    id: id
                }, env: env })));
    };
    PickerControl.propsList = [
        'modalTitle',
        'modalMode',
        'pickerSchema',
        'labelField',
        'onChange',
        'options',
        'value',
        'inline',
        'multiple',
        'embed',
        'resetValue',
        'placeholder',
        'onQuery' // 防止 Form 的 onQuery 事件透传下去，不然会导致 table 先后触发 Form 和 Crud 的 onQuery
    ];
    PickerControl.defaultProps = {
        modalMode: 'dialog',
        multiple: false,
        placeholder: 'Picker.placeholder',
        labelField: 'label',
        valueField: 'value',
        pickerSchema: {
            mode: 'list',
            listItem: {
                title: '${label|raw}'
            }
        },
        embed: false,
        overflowConfig: {
            /** 默认值为-1，不开启 */
            maxTagCount: -1,
            displayPosition: ['select', 'crud'],
            overflowTagPopover: {
                placement: 'top',
                trigger: 'hover',
                showArrow: false,
                offset: [0, -10]
            },
            overflowTagPopoverInCRUD: {
                placement: 'bottom',
                trigger: 'hover',
                showArrow: false,
                offset: [0, 10]
            }
        }
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "crudRef", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "open", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "close", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Array, Object, Object, Array]),
        tslib.__metadata("design:returntype", Promise)
    ], PickerControl.prototype, "handleModalConfirm", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Array]),
        tslib.__metadata("design:returntype", Promise)
    ], PickerControl.prototype, "handleChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], PickerControl.prototype, "handleItemClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleKeyDown", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleFocus", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleBlur", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "handleClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "clearValue", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "renderBody", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], PickerControl.prototype, "render", null);
    return PickerControl;
}(React__default["default"].PureComponent));
/** @class */ ((function (_super) {
    tslib.__extends(PickerControlRenderer, _super);
    function PickerControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PickerControlRenderer = tslib.__decorate([
        amisCore.OptionsControl({
            type: 'picker',
            autoLoadOptionsFromSource: false,
            sizeMutable: false
        })
    ], PickerControlRenderer);
    return PickerControlRenderer;
})(PickerControl));

exports["default"] = PickerControl;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
