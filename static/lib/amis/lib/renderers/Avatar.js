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
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var AvatarField = /** @class */ (function (_super) {
    tslib.__extends(AvatarField, _super);
    function AvatarField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AvatarField.prototype.render = function () {
        var _a = this.props, _b = _a.style, style = _b === void 0 ? {} : _b, className = _a.className, cx = _a.classnames, src = _a.src, _c = _a.icon, icon = _c === void 0 ? 'fa fa-user' : _c, fit = _a.fit, shape = _a.shape, size = _a.size, text = _a.text, gap = _a.gap, alt = _a.alt, draggable = _a.draggable, crossOrigin = _a.crossOrigin, onError = _a.onError, data = _a.data;
        var errHandler = function () { return false; };
        if (typeof onError === 'string') {
            try {
                errHandler = new Function('event', onError);
            }
            catch (e) {
                console.warn(onError, e);
            }
        }
        if (amisCore.isPureVariable(src)) {
            src = amisCore.resolveVariableAndFilter(src, data, '| raw');
        }
        if (amisCore.isPureVariable(text)) {
            text = amisCore.resolveVariableAndFilter(text, data);
        }
        if (amisCore.isPureVariable(icon)) {
            icon = amisCore.resolveVariableAndFilter(icon, data);
        }
        return (_J$X_(amisUi.Avatar, { style: style, className: className, classnames: cx, src: src, icon: icon, fit: fit, shape: shape, size: size, text: text, gap: gap, alt: alt, draggable: draggable, crossOrigin: crossOrigin, onError: errHandler }));
    };
    return AvatarField;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(AvatarFieldRenderer, _super);
    function AvatarFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AvatarFieldRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'avatar'
        }),
        amisUi.withBadge
    ], AvatarFieldRenderer);
    return AvatarFieldRenderer;
})(AvatarField));

exports.AvatarField = AvatarField;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
