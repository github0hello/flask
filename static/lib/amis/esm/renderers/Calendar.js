/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import { Renderer } from 'amis-core';
import { DateControlRenderer } from './Form/InputDate.js';

/** @class */ ((function (_super) {
    __extends(CalendarRenderer, _super);
    function CalendarRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRenderer.defaultProps = __assign(__assign({}, DateControlRenderer.defaultProps), { embed: true });
    CalendarRenderer = __decorate([
        Renderer({
            type: 'calendar'
        })
    ], CalendarRenderer);
    return CalendarRenderer;
})(DateControlRenderer));
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
