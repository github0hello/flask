/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { filter, setThemeClassName, CustomStyle, autobind, Renderer } from 'amis-core';
import { Icon as Icon$1, withBadge } from 'amis-ui';

var Icon = /** @class */ (function (_super) {
    __extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icon.prototype.handleClick = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Icon.prototype.handleMouseEnter = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Icon.prototype.handleMouseLeave = function (e) {
        var _a = this.props, dispatchEvent = _a.dispatchEvent, data = _a.data;
        dispatchEvent(e, data);
    };
    Icon.prototype.render = function () {
        var _a = this.props, cx = _a.classnames, className = _a.className, data = _a.data, id = _a.id, themeCss = _a.themeCss, env = _a.env, wrapperCustomStyle = _a.wrapperCustomStyle;
        var icon = this.props.icon;
        if (typeof icon === 'string') {
            icon = filter(this.props.icon, data);
        }
        return (React.createElement(React.Fragment, null,
            React.createElement(Icon$1, __assign({}, this.props, { icon: icon, onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, className: cx(className, setThemeClassName('className', id, themeCss), setThemeClassName('wrapperCustomStyle', id, wrapperCustomStyle)) })),
            React.createElement(CustomStyle, { config: {
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'className'
                        }
                    ],
                    id: id
                }, env: env })));
    };
    Icon.defaultProps = {
        icon: '',
        vendor: 'fa'
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Icon.prototype, "handleClick", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Icon.prototype, "handleMouseEnter", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Icon.prototype, "handleMouseLeave", null);
    return Icon;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(IconRenderer, _super);
    function IconRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IconRenderer = __decorate([
        Renderer({
            type: 'icon'
        })
        // @ts-ignore 类型没搞定
        ,
        withBadge
    ], IconRenderer);
    return IconRenderer;
})(Icon));

export { Icon };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
