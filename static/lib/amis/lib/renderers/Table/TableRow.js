/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var mobxReact = require('mobx-react');
var React = require('react');
var amisCore = require('amis-core');
var Action = require('../Action.js');
var reactIntersectionObserver = require('react-intersection-observer');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var TableRow = /** @class */ (function (_super) {
    tslib.__extends(TableRow, _super);
    function TableRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableRow.prototype.handleMouseEnter = function (e) {
        var _a = this.props, item = _a.item, itemIndex = _a.itemIndex, onRowMouseEnter = _a.onRowMouseEnter;
        onRowMouseEnter === null || onRowMouseEnter === void 0 ? void 0 : onRowMouseEnter(item === null || item === void 0 ? void 0 : item.data, itemIndex);
    };
    TableRow.prototype.handleMouseLeave = function (e) {
        var _a = this.props, item = _a.item, itemIndex = _a.itemIndex, onRowMouseLeave = _a.onRowMouseLeave;
        onRowMouseLeave === null || onRowMouseLeave === void 0 ? void 0 : onRowMouseLeave(item === null || item === void 0 ? void 0 : item.data, itemIndex);
    };
    // 定义点击一行的行为，通过 itemAction配置
    TableRow.prototype.handleItemClick = function (e) {
        var _a;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var shiftKey, _b, itemAction, onAction, item, itemIndex, onCheck, onRowClick, checkOnItemClick, rendererEvent;
            return tslib.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (amisCore.isClickOnInput(e)) {
                            return [2 /*return*/];
                        }
                        shiftKey = (_a = e.nativeEvent) === null || _a === void 0 ? void 0 : _a.shiftKey;
                        e.preventDefault();
                        e.stopPropagation();
                        _b = this.props, itemAction = _b.itemAction, onAction = _b.onAction, item = _b.item, itemIndex = _b.itemIndex, onCheck = _b.onCheck, onRowClick = _b.onRowClick, checkOnItemClick = _b.checkOnItemClick;
                        return [4 /*yield*/, (onRowClick === null || onRowClick === void 0 ? void 0 : onRowClick(item === null || item === void 0 ? void 0 : item.data, itemIndex))];
                    case 1:
                        rendererEvent = _c.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        if (itemAction) {
                            onAction && onAction(e, itemAction, item === null || item === void 0 ? void 0 : item.locals);
                            // item.toggle();
                        }
                        else {
                            if (item.checkable && item.isCheckAvaiableOnClick && checkOnItemClick) {
                                onCheck === null || onCheck === void 0 ? void 0 : onCheck(item, !item.checked, shiftKey);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TableRow.prototype.handleDbClick = function (e) {
        var _a = this.props, item = _a.item, itemIndex = _a.itemIndex, onRowDbClick = _a.onRowDbClick;
        onRowDbClick === null || onRowDbClick === void 0 ? void 0 : onRowDbClick(item === null || item === void 0 ? void 0 : item.data, itemIndex);
    };
    TableRow.prototype.handleAction = function (e, action, ctx) {
        var _a = this.props, onAction = _a.onAction, item = _a.item;
        onAction && onAction(e, action, ctx || item.locals);
    };
    TableRow.prototype.handleQuickChange = function (values, saveImmediately, savePristine, options) {
        var _a = this.props, onQuickChange = _a.onQuickChange, item = _a.item;
        onQuickChange &&
            onQuickChange(item, values, saveImmediately, savePristine, options);
    };
    TableRow.prototype.handleChange = function (value, name, submit, changePristine) {
        var _a;
        if (!name || typeof name !== 'string') {
            return;
        }
        var _b = this.props, item = _b.item, onQuickChange = _b.onQuickChange;
        onQuickChange === null || onQuickChange === void 0 ? void 0 : onQuickChange(item, (_a = {},
            _a[name] = value,
            _a), submit, changePristine);
    };
    TableRow.prototype.render = function () {
        var _a, _b;
        var _this = this;
        var _c = this.props, itemClassName = _c.itemClassName, itemIndex = _c.itemIndex, item = _c.item, columns = _c.columns, renderCell = _c.renderCell; _c.children; var footableMode = _c.footableMode, ignoreFootableContent = _c.ignoreFootableContent, footableColSpan = _c.footableColSpan, regionPrefix = _c.regionPrefix, checkOnItemClick = _c.checkOnItemClick; _c.classPrefix; var render = _c.render, cx = _c.classnames, parent = _c.parent, itemAction = _c.itemAction, onEvent = _c.onEvent, expanded = _c.expanded; _c.parentExpanded; var id = _c.id, newIndex = _c.newIndex, isHover = _c.isHover, checked = _c.checked, modified = _c.modified, moved = _c.moved, depth = _c.depth, expandable = _c.expandable, appeard = _c.appeard; _c.checkdisable; var trRef = _c.trRef; _c.isNested; var rest = tslib.__rest(_c, ["itemClassName", "itemIndex", "item", "columns", "renderCell", "children", "footableMode", "ignoreFootableContent", "footableColSpan", "regionPrefix", "checkOnItemClick", "classPrefix", "render", "classnames", "parent", "itemAction", "onEvent", "expanded", "parentExpanded", "id", "newIndex", "isHover", "checked", "modified", "moved", "depth", "expandable", "appeard", "checkdisable", "trRef", "isNested"]);
        if (footableMode) {
            if (!expanded) {
                return null;
            }
            return (_J$X_("tr", { ref: trRef, "data-id": id, "data-index": newIndex, onClick: checkOnItemClick || itemAction || (onEvent === null || onEvent === void 0 ? void 0 : onEvent.rowClick)
                    ? this.handleItemClick
                    : undefined, onDoubleClick: this.handleDbClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, className: cx('Table-table-tr', itemClassName, (_a = {
                        'is-hovered': isHover,
                        'is-checked': checked,
                        'is-modified': modified,
                        'is-moved': moved
                    },
                    _a["Table-tr--hasItemAction"] = itemAction,
                    _a["Table-tr--odd"] = itemIndex % 2 === 0,
                    _a["Table-tr--even"] = itemIndex % 2 === 1,
                    _a)) },
                _J$X_("td", { className: cx("Table-foot"), colSpan: footableColSpan },
                    _J$X_("table", { className: cx("Table-footTable") },
                        _J$X_("tbody", null, ignoreFootableContent
                            ? columns.map(function (column) { return (_J$X_("tr", { key: column.index },
                                column.label !== false ? _J$X_("th", null) : null,
                                _J$X_("td", null))); })
                            : columns.map(function (column) { return (_J$X_("tr", { key: column.index },
                                column.label !== false ? (_J$X_("th", null, render("".concat(regionPrefix).concat(itemIndex, "/").concat(column.index, "/tpl"), column.label))) : null,
                                appeard ? (renderCell("".concat(regionPrefix).concat(itemIndex, "/").concat(column.index), column, item, tslib.__assign(tslib.__assign({}, rest), { width: null, rowIndex: itemIndex, colIndex: column.index, key: column.index, onAction: _this.handleAction, onQuickChange: _this.handleQuickChange, onChange: _this.handleChange }))) : (_J$X_("td", { key: column.index },
                                    _J$X_("div", { className: cx('Table-emptyBlock') }, "\u00A0"))))); }))))));
        }
        if (parent && !parent.expanded) {
            return null;
        }
        return (_J$X_("tr", { ref: trRef, onClick: checkOnItemClick || itemAction || (onEvent === null || onEvent === void 0 ? void 0 : onEvent.rowClick)
                ? this.handleItemClick
                : undefined, onDoubleClick: this.handleDbClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, "data-index": depth === 1 ? newIndex : undefined, "data-id": id, className: cx('Table-table-tr', itemClassName, (_b = {
                    'is-hovered': isHover,
                    'is-checked': checked,
                    'is-modified': modified,
                    'is-moved': moved,
                    'is-expanded': expanded && expandable,
                    'is-expandable': expandable
                },
                _b["Table-tr--hasItemAction"] = itemAction,
                _b["Table-tr--odd"] = itemIndex % 2 === 0,
                _b["Table-tr--even"] = itemIndex % 2 === 1,
                _b), "Table-tr--".concat(depth, "th")) }, columns.map(function (column) {
            return appeard ? (renderCell("".concat(itemIndex, "/").concat(column.index), column, item, tslib.__assign(tslib.__assign({}, rest), { rowIndex: itemIndex, colIndex: column.index, key: column.id, onAction: _this.handleAction, onQuickChange: _this.handleQuickChange, onChange: _this.handleChange }))) : column.name && item.rowSpans[column.name] === 0 ? null : (_J$X_("td", { key: column.id },
                _J$X_("div", { className: cx('Table-emptyBlock') }, "\u00A0")));
        })));
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleMouseEnter", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleMouseLeave", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], TableRow.prototype, "handleItemClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleDbClick", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Action.Action, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleAction", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, Boolean, Boolean, Object]),
        tslib.__metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleQuickChange", null);
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object, String, Boolean, Boolean]),
        tslib.__metadata("design:returntype", void 0)
    ], TableRow.prototype, "handleChange", null);
    return TableRow;
}(React__default["default"].PureComponent));
// 换成 mobx-react-lite 模式
var TableRow$1 = mobxReact.observer(function (props) {
    var item = props.item;
    var parent = props.parent;
    var store = props.store;
    var columns = props.columns;
    var canAccessSuperData = store.canAccessSuperData ||
        columns.some(function (item) { return item.pristine.canAccessSuperData; });
    var _a = reactIntersectionObserver.useInView({
        threshold: 0,
        onChange: item.markAppeared,
        skip: !item.lazyRender
    }), ref = _a.ref, inView = _a.inView;
    return (_J$X_(TableRow, tslib.__assign({}, props, { trRef: ref, expanded: item.expanded, parentExpanded: parent === null || parent === void 0 ? void 0 : parent.expanded, id: item.id, newIndex: item.newIndex, isHover: item.isHover, partial: item.partial, checked: item.checked, modified: item.modified, moved: item.moved, depth: item.depth, expandable: item.expandable, checkdisable: item.checkdisable, loading: item.loading, error: item.error, 
        // data 在 TableRow 里面没有使用，这里写上是为了当列数据变化的时候 TableRow 重新渲染，
        // 不是 item.locals 的原因是 item.locals 会变化多次，比如父级上下文变化也会进来，但是 item.data 只会变化一次。
        data: canAccessSuperData ? item.locals : item.data, appeard: item.lazyRender ? item.appeared || inView : true, isNested: store.isNested })));
});

exports.TableRow = TableRow;
exports["default"] = TableRow$1;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
