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
var Collapse = require('../Collapse.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var FieldSetControl = /** @class */ (function (_super) {
    tslib.__extends(FieldSetControl, _super);
    function FieldSetControl(props) {
        var _this = _super.call(this, props) || this;
        _this.renderBody = _this.renderBody.bind(_this);
        return _this;
    }
    FieldSetControl.prototype.renderBody = function () {
        var _a = this.props, body = _a.body; _a.collapsable; var horizontal = _a.horizontal, render = _a.render, mode = _a.mode, formMode = _a.formMode, cx = _a.classnames, store = _a.store, formClassName = _a.formClassName, disabled = _a.disabled, formHorizontal = _a.formHorizontal, subFormMode = _a.subFormMode, subFormHorizontal = _a.subFormHorizontal;
        var props = {
            store: store,
            data: store === null || store === void 0 ? void 0 : store.data,
            render: render,
            disabled: disabled,
            formMode: subFormMode || formMode,
            formHorizontal: subFormHorizontal || formHorizontal
        };
        mode && (props.mode = mode);
        horizontal && (props.horizontal = horizontal);
        return (_J$X_("div", { className: cx("Form--".concat(props.mode || formMode || 'normal'), formClassName) }, body ? render('body', body, props) : null));
    };
    FieldSetControl.prototype.render = function () {
        var _a = this.props; _a.controls; var className = _a.className; _a.mode; var body = _a.body, rest = tslib.__rest(_a, ["controls", "className", "mode", "body"]);
        return (_J$X_(Collapse["default"], tslib.__assign({}, rest, { body: body, className: className, children: this.renderBody, wrapperComponent: "fieldset", headingComponent: rest.titlePosition === 'bottom' ? 'div' : 'legend' })));
    };
    FieldSetControl.defaultProps = {
        titlePosition: 'top',
        headingClassName: '',
        collapsable: false
    };
    FieldSetControl.propsList = [
        'collapsable',
        'collapsed',
        'collapseTitle',
        'titlePosition',
        'collapseTitle'
    ];
    return FieldSetControl;
}(React__default["default"].Component));
var FieldSetRenderer = /** @class */ (function (_super) {
    tslib.__extends(FieldSetRenderer, _super);
    function FieldSetRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldSetRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'fieldset',
            weight: -100,
            name: 'fieldset'
        })
    ], FieldSetRenderer);
    return FieldSetRenderer;
}(FieldSetControl));

exports.FieldSetRenderer = FieldSetRenderer;
exports["default"] = FieldSetControl;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
