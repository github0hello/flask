/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __awaiter, __generator, __decorate } from 'tslib';
import React from 'react';
import { isVisible, createObject, Renderer } from 'amis-core';
import { Checkbox } from 'amis-ui';
import ColumnToggler from '../Table/ColumnToggler.js';

/** @class */ ((function (_super) {
    __extends(ColumnTogglerRenderer, _super);
    function ColumnTogglerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnTogglerRenderer.prototype.render = function () {
        var _this = this;
        var _a = this.props; _a.className; _a.store; var render = _a.render, ns = _a.classPrefix, cx = _a.classnames, tooltip = _a.tooltip, align = _a.align, cols = _a.cols, toggleAllColumns = _a.toggleAllColumns, toggleToggle = _a.toggleToggle, data = _a.data, size = _a.size, popOverContainer = _a.popOverContainer, rest = __rest(_a, ["className", "store", "render", "classPrefix", "classnames", "tooltip", "align", "cols", "toggleAllColumns", "toggleToggle", "data", "size", "popOverContainer"]);
        var __ = rest.translate;
        var env = rest.env;
        if (!cols) {
            return null;
        }
        var toggableColumns = cols.filter(function (item) {
            return isVisible(item.pristine || item, data) && item.toggable !== false;
        });
        var activeToggaleColumns = toggableColumns.filter(function (item) { return item.toggled !== false; });
        return (React.createElement(ColumnToggler, __assign({}, rest, { render: render, tooltip: tooltip || __('Table.columnsVisibility'), tooltipContainer: popOverContainer || env.getModalContainer, isActived: cols.findIndex(function (column) { return !column.toggled; }) !== -1, align: align !== null && align !== void 0 ? align : 'right', size: size || 'sm', classnames: cx, classPrefix: ns, key: "columns-toggable", columns: cols, activeToggaleColumns: activeToggaleColumns, data: data }),
            (toggableColumns === null || toggableColumns === void 0 ? void 0 : toggableColumns.length) ? (React.createElement("li", { className: cx('ColumnToggler-menuItem'), key: 'selectAll', onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, data, dispatchEvent, allToggled, rendererEvent;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this.props, data = _a.data, dispatchEvent = _a.dispatchEvent;
                                allToggled = !((activeToggaleColumns === null || activeToggaleColumns === void 0 ? void 0 : activeToggaleColumns.length) === (toggableColumns === null || toggableColumns === void 0 ? void 0 : toggableColumns.length));
                                return [4 /*yield*/, dispatchEvent('columnToggled', createObject(data, {
                                        columns: allToggled
                                            ? toggableColumns === null || toggableColumns === void 0 ? void 0 : toggableColumns.map(function (column) { return column; })
                                            : []
                                    }))];
                            case 1:
                                rendererEvent = _b.sent();
                                if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                                    return [2 /*return*/];
                                }
                                toggleAllColumns && toggleAllColumns(allToggled);
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Checkbox, { size: "sm", classPrefix: ns, key: "checkall", checked: !!(activeToggaleColumns === null || activeToggaleColumns === void 0 ? void 0 : activeToggaleColumns.length), partial: !!((activeToggaleColumns === null || activeToggaleColumns === void 0 ? void 0 : activeToggaleColumns.length) &&
                        (activeToggaleColumns === null || activeToggaleColumns === void 0 ? void 0 : activeToggaleColumns.length) !== (toggableColumns === null || toggableColumns === void 0 ? void 0 : toggableColumns.length)) }, __('Checkboxes.selectAll')))) : null, toggableColumns === null || toggableColumns === void 0 ? void 0 :
            toggableColumns.map(function (column, index) { return (React.createElement("li", { className: cx('ColumnToggler-menuItem'), key: 'item' + (column.index || index), onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a, data, dispatchEvent, columns, rendererEvent;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this.props, data = _a.data, dispatchEvent = _a.dispatchEvent;
                                columns = activeToggaleColumns.map(function (item) { return item; });
                                if (column.toggled !== false) {
                                    columns.push(column);
                                }
                                else {
                                    columns = columns.filter(function (c) { return c.name !== column.name; });
                                }
                                return [4 /*yield*/, dispatchEvent('columnToggled', createObject(data, {
                                        columns: columns
                                    }))];
                            case 1:
                                rendererEvent = _b.sent();
                                if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                                    return [2 /*return*/];
                                }
                                toggleToggle && toggleToggle(!(column.toggled !== false), index);
                                return [2 /*return*/];
                        }
                    });
                }); } },
                React.createElement(Checkbox, { size: "sm", classPrefix: ns, checked: column.toggled !== false }, column.title ? render('tpl', column.title) : null))); })));
    };
    ColumnTogglerRenderer = __decorate([
        Renderer({
            type: 'column-toggler',
            name: 'column-toggler'
        })
    ], ColumnTogglerRenderer);
    return ColumnTogglerRenderer;
})(React.Component));
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
