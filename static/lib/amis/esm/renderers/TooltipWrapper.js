/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import React from 'react';
import { setThemeClassName, buildStyle, filter, CustomStyle, Renderer } from 'amis-core';
import { TooltipWrapper as TooltipWrapper$1 } from 'amis-ui';

var TooltipWrapper = /** @class */ (function (_super) {
    __extends(TooltipWrapper, _super);
    function TooltipWrapper(props) {
        return _super.call(this, props) || this;
    }
    TooltipWrapper.prototype.renderBody = function () {
        var _a = this.props, render = _a.render, cx = _a.classnames, body = _a.body, className = _a.className, wrapperComponent = _a.wrapperComponent, inline = _a.inline, style = _a.style, data = _a.data, themeCss = _a.themeCss, wrapperCustomStyle = _a.wrapperCustomStyle, id = _a.id;
        var Comp = wrapperComponent ||
            (inline ? 'span' : 'div');
        return (React.createElement(Comp, { className: cx('TooltipWrapper', className, {
                'TooltipWrapper--inline': inline
            }, setThemeClassName('baseControlClassName', id, themeCss), setThemeClassName('wrapperCustomStyle', id, wrapperCustomStyle)), style: buildStyle(style, data) }, render('body', body)));
    };
    TooltipWrapper.prototype.render = function () {
        var _a = this.props, ns = _a.classPrefix, cx = _a.classnames, tooltipClassName = _a.tooltipClassName, tooltipTheme = _a.tooltipTheme, container = _a.container, placement = _a.placement, rootClose = _a.rootClose, tooltipStyle = _a.tooltipStyle, title = _a.title, content = _a.content, tooltip = _a.tooltip, mouseEnterDelay = _a.mouseEnterDelay, mouseLeaveDelay = _a.mouseLeaveDelay, trigger = _a.trigger, offset = _a.offset, showArrow = _a.showArrow, disabled = _a.disabled, enterable = _a.enterable, data = _a.data, env = _a.env, popOverContainer = _a.popOverContainer, wrapperCustomStyle = _a.wrapperCustomStyle, id = _a.id, themeCss = _a.themeCss;
        var tooltipObj = {
            title: filter(title, data),
            content: filter(content || tooltip, data),
            style: buildStyle(tooltipStyle, data),
            placement: placement,
            trigger: trigger,
            rootClose: rootClose,
            container: container !== undefined
                ? container
                : popOverContainer || (env === null || env === void 0 ? void 0 : env.getModalContainer),
            tooltipTheme: tooltipTheme,
            tooltipClassName: cx(tooltipClassName, setThemeClassName('tooltipControlClassName', id, themeCss)),
            mouseEnterDelay: mouseEnterDelay,
            mouseLeaveDelay: mouseLeaveDelay,
            offset: offset,
            showArrow: showArrow,
            disabled: disabled,
            enterable: enterable,
            filterHtml: env.filterHtml
        };
        return (React.createElement(React.Fragment, null,
            React.createElement(TooltipWrapper$1, { classPrefix: ns, classnames: cx, tooltip: tooltipObj }, this.renderBody()),
            React.createElement(CustomStyle, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        },
                        {
                            key: 'tooltipControlClassName'
                        }
                    ]
                }, env: env })));
    };
    TooltipWrapper.defaultProps = {
        placement: 'top',
        trigger: 'hover',
        rootClose: true,
        mouseEnterDelay: 0,
        mouseLeaveDelay: 200,
        inline: false,
        wrap: false,
        tooltipTheme: 'light'
    };
    return TooltipWrapper;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(TooltipWrapperRenderer, _super);
    function TooltipWrapperRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TooltipWrapperRenderer = __decorate([
        Renderer({
            type: 'tooltip-wrapper'
        })
    ], TooltipWrapperRenderer);
    return TooltipWrapperRenderer;
})(TooltipWrapper));

export { TooltipWrapper as default };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
