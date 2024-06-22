/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import React from 'react';
import { Renderer } from 'amis-core';

var OperationField = /** @class */ (function (_super) {
    __extends(OperationField, _super);
    function OperationField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OperationField.prototype.render = function () {
        var _a = this.props, className = _a.className, style = _a.style, buttons = _a.buttons, render = _a.render, cx = _a.classnames;
        return (React.createElement("div", { className: cx('OperationField', className), style: style }, Array.isArray(buttons)
            ? buttons.map(function (button, index) {
                return render("".concat(index), __assign({ type: 'button', size: button.size || 'sm', level: button.level ||
                        (button.icon && !button.label ? 'link' : '') }, button), {
                    key: index
                });
            })
            : null));
    };
    OperationField.propsList = ['buttons', 'label'];
    OperationField.defaultProps = {};
    return OperationField;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(OperationFieldRenderer, _super);
    function OperationFieldRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OperationFieldRenderer = __decorate([
        Renderer({
            type: 'operation'
        })
    ], OperationFieldRenderer);
    return OperationFieldRenderer;
})(OperationField));

export { OperationField };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
