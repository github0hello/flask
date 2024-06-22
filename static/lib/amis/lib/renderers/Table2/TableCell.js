/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var amisCore = require('amis-core');
require('../Table/index.js');
var QuickEdit = require('../QuickEdit.js');
var Copyable = require('../Copyable.js');
var PopOver = require('../PopOver.js');
var TableCell = require('../Table/TableCell.js');

/** @class */ ((function (_super) {
    tslib.__extends(CellFieldRenderer, _super);
    function CellFieldRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // title 需要去掉，否则部分组件会将其渲染出来
        _this.propsNeedRemove = ['title'];
        return _this;
    }
    CellFieldRenderer.defaultProps = tslib.__assign(tslib.__assign({}, TableCell.TableCell.defaultProps), { wrapperComponent: 'div' });
    CellFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'cell-field',
            name: 'cell-field'
        }),
        PopOver.HocPopOver(),
        Copyable.HocCopyable(),
        QuickEdit.HocQuickEdit()
    ], CellFieldRenderer);
    return CellFieldRenderer;
})(TableCell.TableCell));
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
