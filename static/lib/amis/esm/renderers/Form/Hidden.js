/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import React from 'react';
import { FormItem } from 'amis-core';

var HiddenControl = /** @class */ (function (_super) {
    __extends(HiddenControl, _super);
    function HiddenControl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HiddenControl.prototype.render = function () {
        return null;
    };
    return HiddenControl;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(HiddenControlRenderer, _super);
    function HiddenControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HiddenControlRenderer = __decorate([
        FormItem({
            type: 'hidden',
            wrap: false,
            sizeMutable: false
        })
    ], HiddenControlRenderer);
    return HiddenControlRenderer;
})(HiddenControl));

export { HiddenControl as default };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
