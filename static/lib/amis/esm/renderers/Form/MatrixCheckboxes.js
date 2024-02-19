/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __awaiter, __generator, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { buildApi, isValidApi, setVariable, isEffectiveApi, resolveEventData, isMobile, FormItem } from 'amis-core';
import { Checkbox, Spinner } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

/**
 * @file filter
 * @author fex
 */
var MatrixCheckbox = /** @class */ (function (_super) {
    __extends(MatrixCheckbox, _super);
    function MatrixCheckbox(props) {
        var _this = _super.call(this, props) || this;
        _this.mounted = false;
        _this.state = {
            columns: props.columns || [],
            rows: props.rows || [],
            loading: false
        };
        _this.toggleItem = _this.toggleItem.bind(_this);
        _this.reload = _this.reload.bind(_this);
        _this.initOptions = _this.initOptions.bind(_this);
        _this.mounted = true;
        return _this;
    }
    MatrixCheckbox.prototype.componentDidMount = function () {
        var _a = this.props, formInited = _a.formInited, addHook = _a.addHook;
        formInited || !addHook ? this.reload() : addHook(this.initOptions, 'init');
    };
    MatrixCheckbox.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        if (prevProps.columns !== props.columns || prevProps.rows !== props.rows) {
            this.setState({
                columns: props.columns || [],
                rows: props.rows || []
            });
        }
        else if (props.formInited &&
            (props.source !== prevProps.source || prevProps.data !== props.data)) {
            var prevApi = buildApi(prevProps.source, prevProps.data, {
                ignoreData: true
            });
            var nextApi = buildApi(props.source, props.data, {
                ignoreData: true
            });
            if (prevApi.url !== nextApi.url && isValidApi(nextApi.url)) {
                this.reload();
            }
        }
    };
    MatrixCheckbox.prototype.componentWillUnmount = function () {
        this.mounted = false;
        var removeHook = this.props.removeHook;
        removeHook === null || removeHook === void 0 ? void 0 : removeHook(this.initOptions, 'init');
    };
    MatrixCheckbox.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange === null || onChange === void 0 ? void 0 : onChange('');
        }
        else if (actionType === 'reset') {
            onChange === null || onChange === void 0 ? void 0 : onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    MatrixCheckbox.prototype.initOptions = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, formItem, name;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.reload()];
                    case 1:
                        _b.sent();
                        _a = this.props, formItem = _a.formItem, name = _a.name;
                        if (!formItem) {
                            return [2 /*return*/];
                        }
                        if (formItem.value) {
                            setVariable(data, name, formItem.value);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MatrixCheckbox.prototype.reload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, source, data, env, onChange, __;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, source = _a.source, data = _a.data, env = _a.env, onChange = _a.onChange, __ = _a.translate;
                        if (!isEffectiveApi(source, data) || this.state.loading) {
                            return [2 /*return*/];
                        }
                        if (!env || !env.fetcher) {
                            throw new Error('fetcher is required');
                        }
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                if (!_this.mounted) {
                                    return resolve();
                                }
                                _this.setState({
                                    loading: true
                                }, function () {
                                    if (!_this.mounted) {
                                        return resolve();
                                    }
                                    env
                                        .fetcher(source, data)
                                        .then(function (ret) {
                                        if (!ret.ok) {
                                            throw new Error(ret.msg || __('fetchFailed'));
                                        }
                                        if (!_this.mounted) {
                                            return resolve();
                                        }
                                        _this.setState({
                                            loading: false,
                                            rows: ret.data.rows || [],
                                            columns: ret.data.columns || []
                                        }, function () {
                                            source && source.replaceData;
                                            var value = ret.data.value;
                                            if (value) {
                                                value = source.replaceData
                                                    ? value
                                                    : mergeValue(value, _this.state.columns, _this.state.rows);
                                                onChange(value);
                                            }
                                            resolve();
                                        });
                                    })
                                        .catch(function (reason) {
                                        return _this.setState({
                                            error: reason,
                                            loading: false
                                        }, function () { return resolve(); });
                                    });
                                });
                            })];
                    case 1: 
                    // todo 优化这块
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    MatrixCheckbox.prototype.toggleItem = function (checked, x, y) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, columns, rows, _b, multiple, singleSelectMode, dispatchEvent, value, x2, len, y2, len, y2, len, x2, len2, rendererEvent;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.state, columns = _a.columns, rows = _a.rows;
                        _b = this.props, multiple = _b.multiple, singleSelectMode = _b.singleSelectMode, dispatchEvent = _b.dispatchEvent, _b.data;
                        value = this.props.value || buildDefaultValue(columns, rows);
                        if (multiple) {
                            value[x][y] = __assign(__assign({}, value[x][y]), { checked: checked });
                        }
                        else if (singleSelectMode === 'row') {
                            for (x2 = 0, len = columns.length; x2 < len; x2++) {
                                value[x2][y] = __assign(__assign({}, value[x2][y]), { checked: x === x2 ? checked : !checked });
                            }
                        }
                        else if (singleSelectMode === 'column') {
                            for (y2 = 0, len = rows.length; y2 < len; y2++) {
                                value[x][y2] = __assign(__assign({}, value[x][y2]), { checked: y === y2 ? checked : !checked });
                            }
                        }
                        else {
                            // 只剩下 cell 了
                            for (y2 = 0, len = rows.length; y2 < len; y2++) {
                                for (x2 = 0, len2 = columns.length; x2 < len2; x2++) {
                                    value[x2][y2] = __assign(__assign({}, value[x2][y2]), { checked: x === x2 && y === y2 ? checked : !checked });
                                }
                            }
                        }
                        return [4 /*yield*/, dispatchEvent('change', resolveEventData(this.props, { value: value.concat() }))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        this.props.onChange(value.concat());
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 检查列是否有选中
     *
     * @param value
     * @param columnIndex
     */
    MatrixCheckbox.prototype.isColumChecked = function (value, columnIndex) {
        var rows = value[columnIndex];
        if (!rows) {
            return false;
        }
        return rows.some(function (item) { return item && item.checked; });
    };
    /**
     * 检查列是全选还是部分选择
     * @param value
     * @param columnIndex
     */
    MatrixCheckbox.prototype.isColumnPartialChecked = function (value, columnIndex) {
        var rows = value[columnIndex];
        if (!rows || rows.length == 1) {
            return false; // 只有一行时，列上无部分选中状态
        }
        var checked = rows[0].checked;
        return (rows.some(function (item) {
            return item.checked !== checked; // 只要有不同的值，均认为是部分选中
        }) && !rows.every(function (item) { return item.checked === checked; }) // 全部选中时不认为是部分选中
        );
    };
    /**
     * 切换整列的选择
     * @param checked
     * @param value
     * @param columnIndex
     */
    MatrixCheckbox.prototype.toggleColumnCheckAll = function (checked, value, columnIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var rows, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rows = value[columnIndex];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < rows.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.toggleItem(checked, columnIndex, i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 检查行是否有选中项
     *
     * @param value
     * @param rowIndex
     */
    MatrixCheckbox.prototype.isRowChecked = function (value, rowIndex) {
        return (value &&
            value.some(function (columns) {
                return columns[rowIndex] && columns[rowIndex].checked;
            }));
    };
    /**
     * 检查行是全选还是部分选中
     * @param value
     * @param rowIndex
     */
    MatrixCheckbox.prototype.isRowPartialChecked = function (value, rowIndex) {
        if (!value || value.length == 1) {
            return false; // 只有一列时无部分选中状态
        }
        var checked = value[0][rowIndex].checked;
        return (value.some(function (columns) {
            // 只要有不同的值就可以认为是部分选中
            return checked !== columns[rowIndex].checked;
        }) && !value.every(function (columns) { return columns.checked; }) // 全部选中时不认为是部分选中
        );
    };
    /**
     * 切换行的选中状态
     *
     * @param checked
     * @param value
     * @param rowIndex
     */
    MatrixCheckbox.prototype.toggleRowCheckAll = function (checked, value, rowIndex) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < value.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.toggleItem(checked, i, rowIndex)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MatrixCheckbox.prototype.renderInput = function (forceDisabled) {
        var _this = this;
        if (forceDisabled === void 0) { forceDisabled = false; }
        var _a = this.state, columns = _a.columns, rows = _a.rows;
        var _b = this.props, rowLabel = _b.rowLabel, disabled = _b.disabled, cx = _b.classnames, multiple = _b.multiple, textAlign = _b.textAlign, xCheckAll = _b.xCheckAll, yCheckAll = _b.yCheckAll;
        var value = this.props.value || buildDefaultValue(columns, rows);
        return (React.createElement("div", { className: cx('Table m-b-none', { 'is-mobile': isMobile() }) },
            React.createElement("div", { className: cx('Table-content') },
                React.createElement("table", { className: cx('Table-table') },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, rowLabel),
                            columns.map(function (column, x) { return (React.createElement("th", { key: x, className: 'text-' + (textAlign || multiple ? 'left' : 'center') },
                                multiple && yCheckAll ? (React.createElement(Checkbox, { type: 'checkbox', disabled: forceDisabled || disabled, checked: _this.isColumChecked(value, x), partial: _this.isColumnPartialChecked(value, x), onChange: function (checked) {
                                        return _this.toggleColumnCheckAll(checked, value, x);
                                    } })) : null,
                                column.label)); }))),
                    React.createElement("tbody", null, rows.map(function (row, y) { return (React.createElement("tr", { key: y },
                        React.createElement("td", null,
                            multiple && xCheckAll ? (React.createElement(Checkbox, { type: 'checkbox', disabled: forceDisabled || disabled, checked: _this.isRowChecked(value, y), partial: _this.isRowPartialChecked(value, y), onChange: function (checked) {
                                    return _this.toggleRowCheckAll(checked, value, y);
                                } })) : null,
                            row.label,
                            row.description || row.desc ? (React.createElement("span", { className: "m-l-xs text-muted text-xs" }, row.description || row.desc)) : null),
                        columns.map(function (column, x) { return (React.createElement("td", { key: x, className: 'text-' + (textAlign || multiple ? 'left' : 'center') },
                            React.createElement(Checkbox, { type: multiple ? 'checkbox' : 'radio', disabled: forceDisabled || disabled, checked: !!(value[x] && value[x][y] && value[x][y].checked), onChange: function (checked) {
                                    return _this.toggleItem(checked, x, y);
                                } }))); }))); }))))));
    };
    MatrixCheckbox.prototype.renderStatic = function (displayValue) {
        if (displayValue === void 0) { displayValue = '-'; }
        var _a = this.props, className = _a.className; _a.render; var cx = _a.classnames;
        var error = this.state.error;
        return (React.createElement("div", { key: "input", className: cx('MatrixControl', className || '') }, error ? displayValue : this.renderInput(true)));
    };
    MatrixCheckbox.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.render; var cx = _a.classnames, loadingConfig = _a.loadingConfig;
        var _b = this.state, error = _b.error, loading = _b.loading;
        return (React.createElement("div", { key: "input", className: cx('MatrixControl', className || '') },
            error ? (React.createElement("div", { className: cx('MatrixControl-error Alert Alert--danger') }, String(error))) : (this.renderInput()),
            React.createElement(Spinner, { size: "lg", overlay: true, key: "info", show: loading, loadingConfig: loadingConfig })));
    };
    MatrixCheckbox.defaultProps = {
        columns: [],
        rows: [],
        multiple: true,
        singleSelectMode: 'column' // multiple 为 false 时有效。
    };
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], MatrixCheckbox.prototype, "render", null);
    return MatrixCheckbox;
}(React.Component));
function buildDefaultValue(columns, rows) {
    if (!Array.isArray(columns)) {
        columns = [];
    }
    if (!Array.isArray(rows)) {
        rows = [];
    }
    return columns.map(function (column) {
        return rows.map(function (row) { return (__assign(__assign(__assign({}, row), column), { checked: false })); });
    });
}
function mergeValue(value, columns, rows) {
    return value.map(function (column, x) {
        return column.map(function (item, y) { return (__assign(__assign(__assign({}, columns[x]), rows[y]), item)); });
    });
}
/** @class */ ((function (_super) {
    __extends(MatrixRenderer, _super);
    function MatrixRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatrixRenderer = __decorate([
        FormItem({
            type: 'matrix-checkboxes',
            strictMode: false,
            sizeMutable: false
        })
    ], MatrixRenderer);
    return MatrixRenderer;
})(MatrixCheckbox));

export { MatrixCheckbox as default };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
