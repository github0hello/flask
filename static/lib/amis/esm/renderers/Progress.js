/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate, __metadata } from 'tslib';
import React from 'react';
import { createObject, getPropValue, filter, autobind, Renderer } from 'amis-core';
import { Progress } from 'amis-ui';

var ProgressField = /** @class */ (function (_super) {
    __extends(ProgressField, _super);
    function ProgressField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressField.prototype.format = function (value) {
        var _a = this.props, valueTpl = _a.valueTpl, render = _a.render, data = _a.data;
        return render("progress-value", valueTpl || '${value}%', {
            data: createObject(data, { value: value })
        });
    };
    ProgressField.prototype.render = function () {
        var _a = this.props, data = _a.data, mode = _a.mode, className = _a.className, style = _a.style, placeholder = _a.placeholder, progressClassName = _a.progressClassName, map = _a.map, stripe = _a.stripe, animate = _a.animate, showLabel = _a.showLabel, strokeWidth = _a.strokeWidth, gapDegree = _a.gapDegree, gapPosition = _a.gapPosition; _a.classnames; var threshold = _a.threshold, showThresholdText = _a.showThresholdText;
        var value = getPropValue(this.props);
        value = typeof value === 'number' ? value : filter(value, data);
        if (/^\d*\.?\d+$/.test(value)) {
            value = parseFloat(value);
        }
        if (threshold) {
            if (Array.isArray(threshold)) {
                threshold.forEach(function (item) {
                    item.value =
                        typeof item.value === 'string'
                            ? filter(item.value, data)
                            : item.value;
                    item.color && (item.color = filter(item.color, data));
                });
            }
            else {
                threshold.value = filter(threshold.value, data);
                threshold.color && (threshold.color = filter(threshold.color, data));
            }
        }
        return (React.createElement(Progress, { value: value, type: mode, map: map, stripe: stripe, animate: animate, showLabel: showLabel, placeholder: placeholder, format: this.format, strokeWidth: strokeWidth, gapDegree: gapDegree, gapPosition: gapPosition, className: className, style: style, progressClassName: progressClassName, threshold: threshold, showThresholdText: showThresholdText }));
    };
    ProgressField.defaultProps = {
        placeholder: '-',
        progressClassName: '',
        progressBarClassName: '',
        map: ['bg-danger', 'bg-warning', 'bg-info', 'bg-success', 'bg-success'],
        valueTpl: '${value}%',
        showLabel: true,
        stripe: false,
        animate: false
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], ProgressField.prototype, "format", null);
    return ProgressField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(ProgressFieldRenderer, _super);
    function ProgressFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressFieldRenderer = __decorate([
        Renderer({
            type: 'progress'
        })
    ], ProgressFieldRenderer);
    return ProgressFieldRenderer;
})(ProgressField));

export { ProgressField };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
