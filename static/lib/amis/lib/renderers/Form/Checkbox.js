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
var cx = require('classnames');
var amisUi = require('amis-ui');
var StaticHoc = require('./StaticHoc.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var cx__default = /*#__PURE__*/_interopDefaultLegacy(cx);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var CheckboxControl = /** @class */ (function (_super) {
    tslib.__extends(CheckboxControl, _super);
    function CheckboxControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxControl.prototype.doAction = function (action, data, throwErrors) {
        var _a = this.props, resetValue = _a.resetValue, onChange = _a.onChange;
        var actionType = action === null || action === void 0 ? void 0 : action.actionType;
        if (actionType === 'clear') {
            onChange('');
        }
        else if (actionType === 'reset') {
            onChange(resetValue !== null && resetValue !== void 0 ? resetValue : '');
        }
    };
    CheckboxControl.prototype.dispatchChangeEvent = function (eventData) {
        if (eventData === void 0) { eventData = {}; }
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, dispatchEvent, onChange, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, dispatchEvent = _a.dispatchEvent, onChange = _a.onChange;
                        return [4 /*yield*/, dispatchEvent('change', amisCore.resolveEventData(this.props, { value: eventData }))];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        onChange && onChange(eventData);
                        return [2 /*return*/];
                }
            });
        });
    };
    CheckboxControl.prototype.renderStatic = function () {
        var _a = this.props, value = _a.value, trueValue = _a.trueValue, falseValue = _a.falseValue, option = _a.option, render = _a.render, partial = _a.partial, optionType = _a.optionType, checked = _a.checked, labelClassName = _a.labelClassName;
        return (_J$X_(amisUi.Checkbox, { inline: true, value: value || '', trueValue: trueValue, falseValue: falseValue, disabled: true, partial: partial, optionType: optionType, checked: checked, labelClassName: labelClassName }, option ? render('option', option) : null));
    };
    CheckboxControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className; _a.style; var value = _a.value, trueValue = _a.trueValue, falseValue = _a.falseValue, option = _a.option; _a.onChange; var disabled = _a.disabled, render = _a.render, partial = _a.partial, optionType = _a.optionType, checked = _a.checked, labelClassName = _a.labelClassName, ns = _a.classPrefix;
        return (_J$X_("div", { className: cx__default["default"]("".concat(ns, "CheckboxControl"), className) },
            _J$X_(amisUi.Checkbox, { inline: true, value: value || '', trueValue: trueValue, falseValue: falseValue, disabled: disabled, onChange: function (value) { return _this.dispatchChangeEvent(value); }, partial: partial, optionType: optionType, checked: checked, labelClassName: labelClassName }, option ? render('option', option) : null)));
    };
    CheckboxControl.defaultProps = {
        trueValue: true,
        falseValue: false
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", Promise)
    ], CheckboxControl.prototype, "dispatchChangeEvent", null);
    tslib.__decorate([
        StaticHoc.supportStatic(),
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", []),
        tslib.__metadata("design:returntype", void 0)
    ], CheckboxControl.prototype, "render", null);
    return CheckboxControl;
}(React__default["default"].Component));
// @ts-ignore
var CheckboxControlRenderer = /** @class */ (function (_super) {
    tslib.__extends(CheckboxControlRenderer, _super);
    function CheckboxControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxControlRenderer = tslib.__decorate([
        amisUi.withBadge,
        amisCore.FormItem({
            type: 'checkbox',
            sizeMutable: false
        })
    ], CheckboxControlRenderer);
    return CheckboxControlRenderer;
}(CheckboxControl));

exports.CheckboxControlRenderer = CheckboxControlRenderer;
exports["default"] = CheckboxControl;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
