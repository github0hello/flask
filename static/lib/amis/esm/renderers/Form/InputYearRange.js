/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __rest, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { filterDate, parseDuration, FormItem } from 'amis-core';
import cx from 'classnames';
import DateRangeControl from './InputDateRange.js';
import { DateRangePicker } from 'amis-ui';
import { supportStatic } from './StaticHoc.js';

var YearRangeControl = /** @class */ (function (_super) {
    __extends(YearRangeControl, _super);
    function YearRangeControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YearRangeControl.prototype.render = function () {
        var _a = this.props, className = _a.className; _a.style; var ns = _a.classPrefix, minDate = _a.minDate, maxDate = _a.maxDate, minDuration = _a.minDuration, maxDuration = _a.maxDuration, data = _a.data, format = _a.format, mobileUI = _a.mobileUI, valueFormat = _a.valueFormat, inputFormat = _a.inputFormat, displayFormat = _a.displayFormat, env = _a.env, rest = __rest(_a, ["className", "style", "classPrefix", "minDate", "maxDate", "minDuration", "maxDuration", "data", "format", "mobileUI", "valueFormat", "inputFormat", "displayFormat", "env"]);
        return (React.createElement("div", { className: cx("".concat(ns, "DateRangeControl"), className) },
            React.createElement(DateRangePicker, __assign({ viewMode: "years", mobileUI: mobileUI, valueFormat: valueFormat || format, displayFormat: displayFormat || inputFormat, classPrefix: ns, popOverContainer: mobileUI
                    ? env === null || env === void 0 ? void 0 : env.getModalContainer
                    : rest.popOverContainer || env.getModalContainer, data: data }, rest, { minDate: minDate
                    ? filterDate(minDate, data, valueFormat || format)
                    : undefined, maxDate: maxDate
                    ? filterDate(maxDate, data, valueFormat || format)
                    : undefined, minDuration: minDuration ? parseDuration(minDuration) : undefined, maxDuration: maxDuration ? parseDuration(maxDuration) : undefined, onChange: this.handleChange, onFocus: this.dispatchEvent, onBlur: this.dispatchEvent }))));
    };
    __decorate([
        supportStatic(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], YearRangeControl.prototype, "render", null);
    return YearRangeControl;
}(DateRangeControl));
/** @class */ ((function (_super) {
    __extends(YearRangeControlRenderer, _super);
    function YearRangeControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YearRangeControlRenderer.defaultProps = {
        format: 'X',
        inputFormat: 'YYYY',
        joinValues: true,
        delimiter: ',',
        /** shortcuts的兼容配置 */
        ranges: 'thisyear,prevyear',
        shortcuts: 'thisyear,prevyear',
        animation: true
    };
    YearRangeControlRenderer = __decorate([
        FormItem({
            type: 'input-year-range'
        })
    ], YearRangeControlRenderer);
    return YearRangeControlRenderer;
})(YearRangeControl));

export { YearRangeControl as default };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
