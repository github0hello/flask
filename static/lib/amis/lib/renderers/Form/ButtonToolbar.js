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
var ButtonToolbar = /** @class */ (function (_super) {
    tslib.__extends(ButtonToolbar, _super);
    function ButtonToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 这个方法editor里要用作hack，所以不能删掉这个方法
     * @returns
     */
    ButtonToolbar.prototype.renderButtons = function () {
        var _a = this.props, render = _a.render; _a.classPrefix; var buttons = _a.buttons;
        return Array.isArray(buttons)
            ? buttons.map(function (button, key) {
                return render("button/".concat(key), button, {
                    key: key
                });
            })
            : null;
    };
    ButtonToolbar.prototype.render = function () {
        var _a = this.props; _a.buttons; var className = _a.className, cx = _a.classnames; _a.render; _a.style;
        return (_J$X_("div", { className: cx('ButtonToolbar', className) }, this.renderButtons()));
    };
    ButtonToolbar.propsList = ['buttons', 'className'];
    return ButtonToolbar;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(ButtonToolbarRenderer, _super);
    function ButtonToolbarRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonToolbarRenderer = tslib.__decorate([
        amisCore.FormItem({
            type: 'button-toolbar',
            strictMode: false
        })
    ], ButtonToolbarRenderer);
    return ButtonToolbarRenderer;
})(ButtonToolbar));

exports["default"] = ButtonToolbar;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
