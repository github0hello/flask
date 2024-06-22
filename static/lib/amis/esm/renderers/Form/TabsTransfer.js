/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import { filterTree, optionValueCompare, createObject, findTreeIndex, getTree, spliceTree, resolveEventData, autobind, toNumber, OptionsControl } from 'amis-core';
import React from 'react';
import find from 'lodash/find';
import { TabsTransfer, Spinner } from 'amis-ui';
import { BaseTransferRenderer } from './Transfer.js';
import { BaseSelection } from 'amis-ui/lib/components/Selection';
import { supportStatic } from './StaticHoc.js';
import { matchSorter } from 'match-sorter';

var BaseTabsTransferRenderer = /** @class */ (function (_super) {
    __extends(BaseTabsTransferRenderer, _super);
    function BaseTabsTransferRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            activeKey: 0
        };
        return _this;
    }
    BaseTabsTransferRenderer.prototype.onTabChange = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var dispatchEvent, rendererEvent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatchEvent = this.props.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent('tab-change', { key: key })];
                    case 1:
                        rendererEvent = _a.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        this.setState({
                            activeKey: key
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    BaseTabsTransferRenderer.prototype.handleTabSearch = function (term, option, cancelExecutor) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, options, labelField, valueField, env, data, searchApi, __, payload, result, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, options = _a.options, labelField = _a.labelField, valueField = _a.valueField, env = _a.env, data = _a.data, searchApi = _a.searchApi, __ = _a.translate;
                        if (!searchApi) return [3 /*break*/, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, env.fetcher(searchApi, createObject(data, { term: term }), {
                                cancelExecutor: cancelExecutor
                            })];
                    case 2:
                        payload = _b.sent();
                        if (!payload.ok) {
                            throw new Error(__(payload.msg || 'networkError'));
                        }
                        result = payload.data.options || payload.data.items || payload.data;
                        if (!Array.isArray(result)) {
                            throw new Error(__('CRUD.invalidArray'));
                        }
                        return [2 /*return*/, result.map(function (item) {
                                var resolved = null;
                                var value = item[valueField || 'value'];
                                // 只有 value 值有意义的时候，再去找；否则直接返回
                                if (Array.isArray(options) && value !== null && value !== undefined) {
                                    resolved = find(options, optionValueCompare(value, valueField));
                                }
                                return resolved || item;
                            })];
                    case 3:
                        e_1 = _b.sent();
                        if (!env.isCancel(e_1)) {
                            !searchApi.silent && env.notify('error', e_1.message);
                        }
                        return [2 /*return*/, []];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        if (term) {
                            return [2 /*return*/, filterTree(options, function (option, key, level, paths) {
                                    return !!((Array.isArray(option.children) && option.children.length) ||
                                        !!matchSorter([option].concat(paths), term, {
                                            keys: [labelField || 'label', valueField || 'value'],
                                            threshold: matchSorter.rankings.CONTAINS
                                        }).length);
                                }, 0, true)];
                        }
                        else {
                            return [2 /*return*/, options];
                        }
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BaseTabsTransferRenderer.prototype.handleChange = function (value, optionModified) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, onChange, joinValues, delimiter, valueField, extractValue, options, dispatchEvent, setOptions, __, newValue, newOptions, UN_MATCH_RESULT, rendererEvent;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, onChange = _a.onChange, joinValues = _a.joinValues, delimiter = _a.delimiter, valueField = _a.valueField, extractValue = _a.extractValue, options = _a.options, dispatchEvent = _a.dispatchEvent, setOptions = _a.setOptions, __ = _a.translate;
                        newValue = value;
                        newOptions = options.concat();
                        UN_MATCH_RESULT = 'UN_MATCH_RESULT';
                        if (Array.isArray(value)) {
                            newValue = value.map(function (item) {
                                var indexes = findTreeIndex(options, optionValueCompare(item[valueField || 'value'], valueField || 'value'));
                                // 这里主要是把查询出来的没有匹配的搜索的结果（一般是DEFFER时）聚合在一个分类下
                                if (!indexes) {
                                    var searchIndexes = findTreeIndex(newOptions, function (item) { return item.value === UN_MATCH_RESULT; });
                                    if (!searchIndexes) {
                                        newOptions.push({
                                            label: __('searchResult'),
                                            value: UN_MATCH_RESULT,
                                            visible: false,
                                            children: [item]
                                        });
                                    }
                                    else {
                                        var origin_1 = getTree(newOptions, searchIndexes);
                                        if (origin_1 === null || origin_1 === void 0 ? void 0 : origin_1.children) {
                                            origin_1.children.push(item);
                                            newOptions = spliceTree(newOptions, searchIndexes, 1, __assign(__assign({}, origin_1), item));
                                        }
                                    }
                                }
                                else if (optionModified) {
                                    var origin_2 = getTree(newOptions, indexes);
                                    newOptions = spliceTree(newOptions, indexes, 1, __assign(__assign({}, origin_2), item));
                                }
                                return joinValues || extractValue
                                    ? item[valueField || 'value']
                                    : item;
                            });
                            if (joinValues) {
                                newValue = newValue.join(delimiter || ',');
                            }
                        }
                        else if (value) {
                            newValue =
                                joinValues || extractValue
                                    ? value[valueField || 'value']
                                    : value;
                        }
                        (newOptions.length > options.length || optionModified) &&
                            setOptions(newOptions, true);
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, {
                                value: newValue,
                                options: options,
                                items: options // 为了保持名字统一
                            }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange(newValue);
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", Promise)
    ], BaseTabsTransferRenderer.prototype, "onTabChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object, Function]),
        __metadata("design:returntype", Promise)
    ], BaseTabsTransferRenderer.prototype, "handleTabSearch", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Boolean]),
        __metadata("design:returntype", Promise)
    ], BaseTabsTransferRenderer.prototype, "handleChange", null);
    return BaseTabsTransferRenderer;
}(BaseTransferRenderer));
/** @class */ ((function (_super) {
    __extends(TabsTransferRenderer, _super);
    function TabsTransferRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabsTransferRenderer.prototype.optionItemRender = function (option, states) {
        var _a = this.props, menuTpl = _a.menuTpl, render = _a.render, data = _a.data, classnames = _a.classnames;
        var ctx = arguments[2] || {};
        if (menuTpl) {
            return render("item/".concat(states.index), menuTpl, {
                data: createObject(createObject(data, __assign(__assign({}, states), ctx)), option)
            });
        }
        return BaseSelection.itemRender(option, __assign(__assign({}, states), { classnames: classnames }));
    };
    // 动作
    TabsTransferRenderer.prototype.doAction = function (action, args) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var activeKey = args === null || args === void 0 ? void 0 : args.activeKey;
        switch (action.actionType) {
            case 'clear':
                onChange === null || onChange === void 0 ? void 0 : onChange('');
                break;
            case 'reset':
                onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
                break;
            case 'changeTabKey':
                this.setState({
                    activeKey: activeKey
                });
                break;
        }
    };
    TabsTransferRenderer.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var cx = _a.classnames, options = _a.options, selectedOptions = _a.selectedOptions, sortable = _a.sortable, loading = _a.loading, searchResultMode = _a.searchResultMode, selectMode = _a.selectMode, searchable = _a.searchable, showArrow = _a.showArrow, deferLoad = _a.deferLoad, leftDeferLoad = _a.leftDeferLoad, disabled = _a.disabled, selectTitle = _a.selectTitle, resultTitle = _a.resultTitle, itemHeight = _a.itemHeight, virtualThreshold = _a.virtualThreshold, onlyChildren = _a.onlyChildren, loadingConfig = _a.loadingConfig, _b = _a.valueField, valueField = _b === void 0 ? 'value' : _b, _c = _a.labelField, labelField = _c === void 0 ? 'label' : _c, valueTpl = _a.valueTpl, menuTpl = _a.menuTpl, data = _a.data, mobileUI = _a.mobileUI;
        return (React.createElement("div", { className: cx('TabsTransferControl', className) },
            React.createElement(TabsTransfer, { onlyChildren: onlyChildren, activeKey: this.state.activeKey, value: selectedOptions, disabled: disabled, options: options, onChange: this.handleChange, option2value: this.option2value, sortable: sortable, searchResultMode: searchResultMode, onSearch: this.handleTabSearch, showArrow: showArrow, onDeferLoad: deferLoad, onLeftDeferLoad: leftDeferLoad, selectTitle: selectTitle, resultTitle: resultTitle, selectMode: selectMode, searchable: searchable, optionItemRender: menuTpl ? this.optionItemRender : undefined, resultItemRender: valueTpl ? this.resultItemRender : undefined, onTabChange: this.onTabChange, itemHeight: toNumber(itemHeight) > 0 ? toNumber(itemHeight) : undefined, virtualThreshold: virtualThreshold, labelField: labelField, valueField: valueField, ctx: data, mobileUI: mobileUI }),
            React.createElement(Spinner, { overlay: true, key: "info", show: loading, loadingConfig: loadingConfig })));
    };
    TabsTransferRenderer.defaultProps = {
        multiple: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], TabsTransferRenderer.prototype, "optionItemRender", null);
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TabsTransferRenderer.prototype, "render", null);
    TabsTransferRenderer = __decorate([
        OptionsControl({
            type: 'tabs-transfer'
        })
    ], TabsTransferRenderer);
    return TabsTransferRenderer;
})(BaseTabsTransferRenderer));

export { BaseTabsTransferRenderer };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
