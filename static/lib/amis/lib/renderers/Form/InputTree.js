/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var omit = require('lodash/omit');
var debounce = require('lodash/debounce');
var cx = require('classnames');
var matchSorter = require('match-sorter');
var amisUi = require('amis-ui');
var amisCore = require('amis-core');
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var TreeControl = /** @class */ (function (_super) {
    tslib.__extends(TreeControl, _super);
    function TreeControl(props) {
        var _this = this;
        var _a;
        _this = _super.call(this, props) || this;
        _this.state = {
            keyword: '',
            filteredOptions: (_a = _this.props.options) !== null && _a !== void 0 ? _a : []
        };
        _this.handleSearch = debounce__default["default"](_this.handleSearch.bind(_this), 250, {
            trailing: true,
            leading: false
        });
        return _this;
    }
    TreeControl.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var keyword = this.state.keyword;
        if (prevProps.options !== props.options ||
            prevProps.searchable !== props.searchable) {
            var options = props.options, searchable = props.searchable;
            this.setState({
                filteredOptions: searchable && keyword ? this.filterOptions(options, keyword) : options
            });
        }
    };
    TreeControl.prototype.reload = function () {
        var reload = this.props.reloadOptions;
        reload && reload();
    };
    TreeControl.prototype.doAction = function (action, data, throwErrors) {
        var _a, _b, _c, _d, _e, _f;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        var _g = this.props, resetValue = _g.resetValue, onChange = _g.onChange;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange('');
        }
        else if (actionType === 'reset') {
            onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
        else if (action.actionType === 'expand') {
            this.treeRef.syncUnFolded(this.props, (_a = action.args) === null || _a === void 0 ? void 0 : _a.openLevel);
        }
        else if (action.actionType === 'collapse') {
            this.treeRef.syncUnFolded(this.props, 1);
        }
        else if (action.actionType === 'add') {
            this.addItemFromAction((_b = action.args) === null || _b === void 0 ? void 0 : _b.item, (_c = action.args) === null || _c === void 0 ? void 0 : _c.parentValue);
        }
        else if (action.actionType === 'edit') {
            this.editItemFromAction((_d = action.args) === null || _d === void 0 ? void 0 : _d.item, (_e = action.args) === null || _e === void 0 ? void 0 : _e.originValue);
        }
        else if (action.actionType === 'delete') {
            this.deleteItemFromAction((_f = action.args) === null || _f === void 0 ? void 0 : _f.value);
        }
        else if (action.actionType === 'reload') {
            this.reload();
        }
    };
    TreeControl.prototype.addItemFromAction = function (item, parentValue) {
        var _a = this.props, onAdd = _a.onAdd, options = _a.options, valueField = _a.valueField;
        var idxes = amisCore.findTreeIndex(options, function (item) {
            var valueAbility = valueField || 'value';
            var value = amisCore.hasAbility(item, valueAbility) ? item[valueAbility] : '';
            return value === parentValue;
        }) || [];
        onAdd && onAdd(idxes.concat(0), item, true);
    };
    TreeControl.prototype.editItemFromAction = function (item, originValue) {
        var _a = this.props, onEdit = _a.onEdit, options = _a.options, valueField = _a.valueField;
        var editItem = amisCore.findTree(options, function (item) {
            var valueAbility = valueField || 'value';
            var value = amisCore.hasAbility(item, valueAbility) ? item[valueAbility] : '';
            return value === originValue;
        });
        onEdit && editItem && onEdit(item, editItem, true);
    };
    TreeControl.prototype.deleteItemFromAction = function (value) {
        var _a = this.props, onDelete = _a.onDelete, options = _a.options, valueField = _a.valueField;
        var deleteItem = amisCore.findTree(options, function (item) {
            var valueAbility = valueField || 'value';
            var itemValue = amisCore.hasAbility(item, valueAbility)
                ? item[valueAbility]
                : '';
            return itemValue === value;
        });
        onDelete && deleteItem && onDelete(deleteItem);
    };
    TreeControl.prototype.filterOptions = function (options, keywords) {
        var _this = this;
        var _a = this.props, labelField = _a.labelField, valueField = _a.valueField;
        return options.map(function (option) {
            option = tslib.__assign({}, option);
            option.visible = !!matchSorter.matchSorter([option], keywords, {
                keys: [labelField || 'label', valueField || 'value'],
                threshold: matchSorter.matchSorter.rankings.CONTAINS
            }).length;
            if (!option.visible && option.children) {
                option.children = _this.filterOptions(option.children, keywords);
                var visibleCount = option.children.filter(function (item) { return item.visible; }).length;
                option.visible = !!visibleCount;
            }
            option.visible && (option.collapsed = false);
            return option;
        });
    };
    TreeControl.prototype.handleChange = function (value) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, onChange, searchable, options, dispatchEvent, filteredOptions, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, searchable = _a.searchable, options = _a.options, dispatchEvent = _a.dispatchEvent;
                        filteredOptions = this.state.filteredOptions;
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, {
                                value: value,
                                items: searchable ? filteredOptions : options
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange && onChange(value);
                        return [2 /*return*/];
                }
            });
        });
    };
    TreeControl.prototype.handleSearch = function (keyword) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, searchApi, options, env, data, __, filterOptions, payload, result, e_1;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, searchApi = _a.searchApi, options = _a.options, env = _a.env, data = _a.data, __ = _a.translate;
                        filterOptions = [];
                        if (!amisCore.isEffectiveApi(searchApi)) return [3 /*break*/, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, env.fetcher(searchApi, amisCore.createObject(data, { term: keyword }))];
                    case 2:
                        payload = _b.sent();
                        if (!payload.ok) {
                            throw new Error(__(payload.msg || 'networkError'));
                        }
                        result = payload.data.options || payload.data.items || payload.data;
                        if (!Array.isArray(result)) {
                            throw new Error(__('Tree.invalidArray'));
                        }
                        filterOptions = result;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        if (!env.isCancel(e_1)) {
                            !searchApi.silent &&
                                env.notify('error', e_1.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (keyword) {
                            filterOptions = this.filterOptions(options, keyword);
                        }
                        _b.label = 6;
                    case 6:
                        this.setState({
                            keyword: keyword,
                            filteredOptions: keyword ? filterOptions : options
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    TreeControl.prototype.domRef = function (ref) {
        this.treeRef = ref;
    };
    TreeControl.prototype.validate = function () {
        var _a = this.props, value = _a.value, minLength = _a.minLength, maxLength = _a.maxLength, delimiter = _a.delimiter;
        var curValue = Array.isArray(value)
            ? value
            : (value ? String(value) : '').split(delimiter || ',');
        if (minLength && curValue.length < minLength) {
            return "\u5DF2\u9009\u62E9\u6570\u91CF\u4F4E\u4E8E\u8BBE\u5B9A\u7684\u6700\u5C0F\u4E2A\u6570".concat(minLength, "\uFF0C\u8BF7\u9009\u62E9\u66F4\u591A\u7684\u9009\u9879\u3002");
        }
        else if (maxLength && curValue.length > maxLength) {
            return "\u5DF2\u9009\u62E9\u6570\u91CF\u8D85\u51FA\u8BBE\u5B9A\u7684\u6700\u5927\u4E2A\u6570".concat(maxLength, "\uFF0C\u8BF7\u53D6\u6D88\u9009\u62E9\u8D85\u51FA\u7684\u9009\u9879\u3002");
        }
    };
    TreeControl.prototype.renderOptionItem = function (option, states) {
        var _a = this.props, menuTpl = _a.menuTpl, render = _a.render, data = _a.data;
        return render("option/".concat(states.index), menuTpl, {
            data: amisCore.createObject(amisCore.createObject(data, tslib.__assign({}, states)), option)
        });
    };
    TreeControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var treeContainerClassName = _a.treeContainerClassName, ns = _a.classPrefix, value = _a.value, enableNodePath = _a.enableNodePath, _b = _a.pathSeparator, pathSeparator = _b === void 0 ? '/' : _b, disabled = _a.disabled, joinValues = _a.joinValues, extractValue = _a.extractValue, delimiter = _a.delimiter, placeholder = _a.placeholder, options = _a.options, multiple = _a.multiple, valueField = _a.valueField, initiallyOpen = _a.initiallyOpen, unfoldedLevel = _a.unfoldedLevel, withChildren = _a.withChildren, onlyChildren = _a.onlyChildren, onlyLeaf = _a.onlyLeaf, loading = _a.loading, hideRoot = _a.hideRoot, rootLabel = _a.rootLabel, autoCheckChildren = _a.autoCheckChildren, cascade = _a.cascade, rootValue = _a.rootValue, showIcon = _a.showIcon, showRadio = _a.showRadio, showOutline = _a.showOutline, onAdd = _a.onAdd, creatable = _a.creatable, createTip = _a.createTip, addControls = _a.addControls, onEdit = _a.onEdit, editable = _a.editable, editTip = _a.editTip, editControls = _a.editControls, removable = _a.removable, removeTip = _a.removeTip, onDelete = _a.onDelete, rootCreatable = _a.rootCreatable, rootCreateTip = _a.rootCreateTip, labelField = _a.labelField, iconField = _a.iconField, deferField = _a.deferField, nodePath = _a.nodePath, deferLoad = _a.deferLoad, expandTreeOptions = _a.expandTreeOptions, __ = _a.translate, data = _a.data, virtualThreshold = _a.virtualThreshold, itemHeight = _a.itemHeight, loadingConfig = _a.loadingConfig, menuTpl = _a.menuTpl, enableDefaultIcon = _a.enableDefaultIcon, searchable = _a.searchable, _c = _a.searchConfig, searchConfig = _c === void 0 ? {} : _c, heightAuto = _a.heightAuto, mobileUI = _a.mobileUI;
        var highlightTxt = this.props.highlightTxt;
        var _d = this.state, filteredOptions = _d.filteredOptions, keyword = _d.keyword;
        if (amisCore.isPureVariable(highlightTxt)) {
            highlightTxt = amisCore.resolveVariableAndFilter(highlightTxt, data);
        }
        var TreeCmpt = (_J$X_(amisUi.Tree, { classPrefix: ns, onRef: this.domRef, labelField: labelField, valueField: valueField, iconField: iconField, deferField: deferField, disabled: disabled, onChange: this.handleChange, joinValues: joinValues, extractValue: extractValue, delimiter: delimiter, placeholder: __(placeholder), options: searchable ? filteredOptions : options, highlightTxt: searchable ? keyword : highlightTxt, multiple: multiple, initiallyOpen: initiallyOpen, unfoldedLevel: unfoldedLevel, withChildren: withChildren, onlyChildren: onlyChildren, onlyLeaf: onlyLeaf, hideRoot: hideRoot, rootLabel: __(rootLabel), rootValue: rootValue, showIcon: showIcon, showRadio: showRadio, showOutline: showOutline, autoCheckChildren: autoCheckChildren, cascade: cascade, foldedField: "collapsed", value: value || '', nodePath: nodePath, enableNodePath: enableNodePath, pathSeparator: pathSeparator, selfDisabledAffectChildren: false, onAdd: onAdd, creatable: creatable, createTip: createTip, rootCreatable: rootCreatable, rootCreateTip: rootCreateTip, onEdit: onEdit, editable: editable, editTip: editTip, removable: removable, removeTip: removeTip, onDelete: onDelete, bultinCUD: !addControls && !editControls, onDeferLoad: deferLoad, onExpandTree: expandTreeOptions, virtualThreshold: virtualThreshold, itemHeight: amisCore.toNumber(itemHeight) > 0 ? amisCore.toNumber(itemHeight) : undefined, itemRender: menuTpl ? this.renderOptionItem : undefined, enableDefaultIcon: enableDefaultIcon, mobileUI: mobileUI }));
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "TreeControl"), className, treeContainerClassName, {
                'is-sticky': searchable && (searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.sticky),
                'h-auto': heightAuto
            }) },
            _J$X_(amisUi.Spinner, { size: "sm", key: "info", show: loading, loadingConfig: loadingConfig }),
            loading ? null : searchable ? (_J$X_(React__default["default"].Fragment, null,
                _J$X_(amisUi.SearchBox, tslib.__assign({ className: cx__default["default"]("".concat(ns, "TreeControl-searchbox"), searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.className, { 'is-sticky': searchConfig === null || searchConfig === void 0 ? void 0 : searchConfig.sticky }), mini: false, clearable: true }, omit__default["default"](searchConfig, 'className', 'sticky'), { onSearch: this.handleSearch, mobileUI: mobileUI })),
                TreeCmpt)) : (TreeCmpt)));
    };
    TreeControl.defaultProps = {
        placeholder: 'placeholder.noData',
        multiple: false,
        rootLabel: 'Tree.root',
        rootValue: '',
        showIcon: true,
        enableNodePath: false,
        pathSeparator: '/'
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TreeControl.prototype, "addItemFromAction", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TreeControl.prototype, "editItemFromAction", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TreeControl.prototype, "deleteItemFromAction", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], TreeControl.prototype, "handleChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TreeControl.prototype, "domRef", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TreeControl.prototype, "renderOptionItem", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], TreeControl.prototype, "render", null);
    return TreeControl;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(TreeControlRenderer, _super);
    function TreeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeControlRenderer = tslib.__decorate([
        amisCore.OptionsControl({
            type: 'input-tree'
        })
    ], TreeControlRenderer);
    return TreeControlRenderer;
})(TreeControl));

exports["default"] = TreeControl;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
