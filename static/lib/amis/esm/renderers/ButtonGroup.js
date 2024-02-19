/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import ButtonGroupControl from './Form/ButtonGroupSelect.js';
export { default } from './Form/ButtonGroupSelect.js';
import { Renderer } from 'amis-core';

/** @class */ ((function (_super) {
    __extends(ButtonGroupRenderer, _super);
    function ButtonGroupRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonGroupRenderer = __decorate([
        Renderer({
            type: 'button-group'
        })
    ], ButtonGroupRenderer);
    return ButtonGroupRenderer;
})(ButtonGroupControl));
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
