/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __rest, __decorate, __metadata } from 'tslib';
import React from 'react';
import { isVisible, makeHorizontalDeeper, getWidthRate, FormItemWrap, Renderer } from 'amis-core';

/** @class */ ((function (_super) {
    __extends(ControlGroupRenderer, _super);
    function ControlGroupRenderer(props) {
        var _this = _super.call(this, props) || this;
        _this.renderInput = _this.renderInput.bind(_this);
        return _this;
    }
    ControlGroupRenderer.prototype.renderControl = function (control, index, otherProps) {
        var _a = this.props, render = _a.render, disabled = _a.disabled; _a.data; var mode = _a.mode, horizontal = _a.horizontal, formMode = _a.formMode, formHorizontal = _a.formHorizontal, subFormMode = _a.subFormMode, subFormHorizontal = _a.subFormHorizontal;
        if (!control) {
            return null;
        }
        var subSchema = control;
        return render("".concat(index), subSchema, __assign({ disabled: control.disabled || disabled, formMode: subFormMode || mode || formMode, formHorizontal: subFormHorizontal || horizontal || formHorizontal }, otherProps));
    };
    ControlGroupRenderer.prototype.renderVertical = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        var body = props.body, className = props.className; props.style; var cx = props.classnames, mode = props.mode, formMode = props.formMode, data = props.data;
        formMode = mode || formMode;
        if (!Array.isArray(body)) {
            return null;
        }
        return (React.createElement("div", { className: cx("Form-group Form-group--ver Form-group--".concat(formMode), className) }, body.map(function (control, index) {
            var _a;
            if (!isVisible(control, data)) {
                return null;
            }
            return _this.renderControl(control, index, {
                key: "".concat((_a = control.name) !== null && _a !== void 0 ? _a : '', "-").concat(index)
            });
        })));
    };
    ControlGroupRenderer.prototype.renderHorizontal = function (props) {
        var _this = this;
        if (props === void 0) { props = this.props; }
        var body = props.body, className = props.className; props.style; var ns = props.classPrefix, cx = props.classnames, mode = props.mode, horizontal = props.horizontal, formMode = props.formMode, formHorizontal = props.formHorizontal, subFormMode = props.subFormMode, subFormHorizontal = props.subFormHorizontal, data = props.data, gap = props.gap;
        if (!Array.isArray(body)) {
            return null;
        }
        formMode = subFormMode || mode || formMode;
        var horizontalDeeper = subFormHorizontal ||
            horizontal ||
            (formHorizontal
                ? makeHorizontalDeeper(formHorizontal, body.filter(function (item) {
                    return (item === null || item === void 0 ? void 0 : item.mode) !== 'inline' &&
                        isVisible(item, data);
                }).length)
                : undefined);
        return (React.createElement("div", { className: cx("Form-group Form-group--hor Form-group--".concat(formMode), gap ? "Form-group--".concat(gap) : '', className) }, body.map(function (control, index) {
            var _a, _b;
            if (!isVisible(control, data)) {
                return null;
            }
            var controlMode = (control === null || control === void 0 ? void 0 : control.mode) || formMode;
            if (controlMode === 'inline' ||
                // hidden 直接渲染，否则会有个空 Form-groupColumn 层
                ((control === null || control === void 0 ? void 0 : control.type) &&
                    ['formula', 'hidden'].includes(control.type))) {
                return _this.renderControl(control, index, {
                    key: "".concat((_a = control.name) !== null && _a !== void 0 ? _a : '', "-").concat(index),
                    className: cx(control.className, control.columnClassName)
                });
            }
            var columnWidth = control.columnRatio ||
                getWidthRate(control && control.columnClassName, true);
            return (React.createElement("div", { key: index, className: cx("".concat(ns, "Form-groupColumn"), columnWidth ? "".concat(ns, "Form-groupColumn--").concat(columnWidth) : '', control && control.columnClassName) }, _this.renderControl(control, index, {
                key: "".concat((_b = control.name) !== null && _b !== void 0 ? _b : '', "-").concat(index),
                formHorizontal: horizontalDeeper,
                formMode: controlMode
            })));
        })));
    };
    ControlGroupRenderer.prototype.renderInput = function (props) {
        if (props === void 0) { props = this.props; }
        var direction = props.direction;
        return direction === 'vertical'
            ? this.renderVertical(props)
            : this.renderHorizontal(props);
    };
    ControlGroupRenderer.prototype.render = function () {
        var _a = this.props, label = _a.label, rest = __rest(_a, ["label"]);
        if (typeof label !== 'undefined') {
            return (React.createElement(FormItemWrap, __assign({}, rest, { sizeMutable: false, label: label, renderControl: this.renderInput })));
        }
        return this.renderInput();
    };
    ControlGroupRenderer = __decorate([
        Renderer({
            type: 'group'
        }),
        __metadata("design:paramtypes", [Object])
    ], ControlGroupRenderer);
    return ControlGroupRenderer;
})(React.Component));
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
