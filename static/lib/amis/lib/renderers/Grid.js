/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');
var pick = require('lodash/pick');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var ColProps = ['lg', 'md', 'sm', 'xs'];
function fromBsClass(cn) {
    if (typeof cn === 'string' && cn) {
        return cn.replace(/\bcol-(xs|sm|md|lg)-(\d+)\b/g, function (_, bp, size) { return "Grid-col--".concat(bp).concat(size); });
    }
    return cn;
}
function copProps2Class(props) {
    var cns = [];
    var modifiers = ColProps;
    modifiers.forEach(function (modifier) {
        return props &&
            props[modifier] &&
            cns.push("Grid-col--".concat(modifier).concat(amisCore.ucFirst(props[modifier])));
    });
    cns.length || cns.push('Grid-col--md');
    return cns.join(' ');
}
var Grid = /** @class */ (function (_super) {
    tslib.__extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.prototype.renderChild = function (region, node, length, props) {
        if (props === void 0) { props = {}; }
        var _a = this.props, render = _a.render, itemRender = _a.itemRender;
        return itemRender
            ? itemRender(node, length, this.props)
            : render(region, node, props);
    };
    Grid.prototype.renderColumn = function (column, key, length) {
        var _a;
        var colProps = pick__default["default"](column, ColProps);
        colProps = tslib.__assign({}, colProps);
        var _b = this.props, cx = _b.classnames, formMode = _b.formMode, subFormMode = _b.subFormMode, subFormHorizontal = _b.subFormHorizontal, formHorizontal = _b.formHorizontal; _b.translate; var disabled = _b.disabled, data = _b.data;
        var styleVar = amisCore.buildStyle(column.style, data);
        return (_J$X_("div", { key: key, className: cx(copProps2Class(colProps), fromBsClass(column.columnClassName), (_a = {},
                _a["Grid-col--v".concat(amisCore.ucFirst(column.valign))] = column.valign,
                _a)), style: styleVar }, this.renderChild("column/".concat(key), column.body || '', length, {
            disabled: disabled,
            formMode: column.mode || subFormMode || formMode,
            formHorizontal: column.horizontal || subFormHorizontal || formHorizontal
        })));
    };
    Grid.prototype.renderColumns = function (columns) {
        var _this = this;
        return Array.isArray(columns)
            ? columns.map(function (column, key) {
                return _this.renderColumn(column, key, columns.length);
            })
            : null;
    };
    Grid.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, style = _b.style, cx = _b.classnames, gap = _b.gap, vAlign = _b.valign, hAlign = _b.align, _c = _b.loading, loading = _c === void 0 ? false : _c, loadingConfig = _b.loadingConfig, data = _b.data, id = _b.id, wrapperCustomStyle = _b.wrapperCustomStyle, env = _b.env, themeCss = _b.themeCss;
        var styleVar = amisCore.buildStyle(style, data);
        return (_J$X_("div", { className: cx('Grid', (_a = {},
                _a["Grid--".concat(gap)] = gap,
                _a["Grid--v".concat(amisCore.ucFirst(vAlign))] = vAlign,
                _a["Grid--h".concat(amisCore.ucFirst(hAlign))] = hAlign,
                _a), className, amisCore.setThemeClassName('baseControlClassName', id, themeCss), amisCore.setThemeClassName('wrapperCustomStyle', id, wrapperCustomStyle)), style: styleVar },
            this.renderColumns(this.props.columns),
            _J$X_(amisUi.Spinner, { loadingConfig: loadingConfig, overlay: true, show: loading }),
            _J$X_(amisCore.CustomStyle, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env })));
    };
    Grid.propsList = ['columns'];
    Grid.defaultProps = {};
    return Grid;
}(React__default["default"].Component));
var GridRenderer = /** @class */ (function (_super) {
    tslib.__extends(GridRenderer, _super);
    function GridRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'grid'
        })
    ], GridRenderer);
    return GridRenderer;
}(Grid));

exports.ColProps = ColProps;
exports.GridRenderer = GridRenderer;
exports["default"] = Grid;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
