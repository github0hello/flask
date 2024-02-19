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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
// Grid 布局默认的这个命名方式和其它 CSS 差异太大，所以我们使用更类似其它 CSS 的命名
var justifySelfMap = {
    left: 'start',
    right: 'end',
    center: 'center',
    auto: 'stretch'
};
var alignSelfMap = {
    top: 'start',
    bottom: 'end',
    middle: 'center',
    auto: 'stretch'
};
var Grid2D = /** @class */ (function (_super) {
    tslib.__extends(Grid2D, _super);
    function Grid2D(props) {
        return _super.call(this, props) || this;
    }
    Grid2D.prototype.renderChild = function (region, node) {
        var _a = this.props, render = _a.render, disabled = _a.disabled;
        return render(region, node, { disabled: disabled });
    };
    Grid2D.prototype.renderGrid = function (grid, key, length) {
        var _a = this.props, itemRender = _a.itemRender, data = _a.data;
        if (!amisCore.isVisible(grid, data)) {
            return null;
        }
        var style = {
            gridColumnStart: grid.x,
            gridColumnEnd: grid.x + grid.w,
            gridRowStart: grid.y,
            gridRowEnd: grid.y + grid.h,
            justifySelf: grid.align ? justifySelfMap[grid.align] : 'stretch',
            alignSelf: grid.valign ? alignSelfMap[grid.valign] : 'stretch'
        };
        return (_J$X_("div", { key: key, style: style, className: grid.gridClassName }, itemRender
            ? itemRender(grid, key, length, this.props)
            : this.renderChild("grid2d/".concat(key), grid)));
    };
    Grid2D.prototype.renderGrids = function () {
        var _this = this;
        var grids = this.props.grids;
        return grids.map(function (grid, key) { return _this.renderGrid(grid, key, grids.length); });
    };
    Grid2D.prototype.render = function () {
        var _a = this.props, grids = _a.grids, cols = _a.cols, gap = _a.gap, gapRow = _a.gapRow, width = _a.width, rowHeight = _a.rowHeight, style = _a.style;
        var templateColumns = new Array(cols);
        templateColumns.fill('1fr');
        var maxRow = 0;
        // 计算最大有多少行
        grids.forEach(function (grid, index) {
            var row = grid.y + grid.h - 1;
            if (row > maxRow) {
                maxRow = row;
            }
        });
        var templateRows = new Array(maxRow);
        templateRows.fill(rowHeight);
        // 根据 grid 中的设置自动更新行列高度
        grids.forEach(function (grid) {
            if (grid.width) {
                templateColumns[grid.x - 1] = Number.isInteger(grid.width)
                    ? grid.width + 'px'
                    : grid.width;
            }
            if (grid.height) {
                templateRows[grid.y - 1] = Number.isInteger(grid.height)
                    ? grid.height + 'px'
                    : grid.height;
            }
        });
        var curStyle = tslib.__assign(tslib.__assign({}, style), { display: 'grid', columnGap: gap, rowGap: typeof gapRow === 'undefined' ? gap : gapRow, width: width, gridTemplateColumns: templateColumns.join(' '), gridTemplateRows: templateRows.join(' ') });
        return _J$X_("div", { style: curStyle }, this.renderGrids());
    };
    Grid2D.propsList = ['grids'];
    Grid2D.defaultProps = {
        cols: 12,
        width: 'auto',
        gap: 0,
        rowHeight: '3.125rem'
    };
    return Grid2D;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(Grid2DRenderer, _super);
    function Grid2DRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid2DRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'grid-2d'
        })
    ], Grid2DRenderer);
    return Grid2DRenderer;
})(Grid2D));

exports["default"] = Grid2D;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
