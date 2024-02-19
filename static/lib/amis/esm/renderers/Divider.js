/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate } from 'tslib';
import React from 'react';
import { isPureVariable, resolveVariableAndFilter, setThemeClassName, CustomStyle, Renderer } from 'amis-core';

var Divider = /** @class */ (function (_super) {
    __extends(Divider, _super);
    function Divider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Divider.prototype.render = function () {
        var _a = this.props, render = _a.render, cx = _a.classnames, className = _a.className, _b = _a.style, style = _b === void 0 ? {} : _b, lineStyle = _a.lineStyle, direction = _a.direction, color = _a.color, rotate = _a.rotate, title = _a.title, titleClassName = _a.titleClassName, titlePosition = _a.titlePosition, id = _a.id, themeCss = _a.themeCss, env = _a.env, data = _a.data;
        var borderColor = {};
        if (color) {
            // 处理渐变色的情况
            if (~(color === null || color === void 0 ? void 0 : color.indexOf('linear-gradient'))) {
                borderColor.borderImage = color + ' 10';
            }
            else {
                borderColor.borderColor = color;
            }
        }
        var transform = (style === null || style === void 0 ? void 0 : style.transform) || '';
        if (rotate) {
            transform += " rotate(".concat(rotate, "deg)");
        }
        if (isPureVariable(title)) {
            title = resolveVariableAndFilter(title, data);
        }
        var classNames = cx('Divider', lineStyle ? "Divider--".concat(lineStyle) : '', direction === 'vertical' ? 'Divider--vertical' : 'Divider--horizontal', title && direction !== 'vertical' ? 'Divider--with-text' : '', title && direction !== 'vertical' && titlePosition
            ? "Divider--with-text-".concat(titlePosition)
            : '', title && direction !== 'vertical'
            ? setThemeClassName('titleWrapperControlClassName', id, themeCss)
            : '', className);
        return (React.createElement("div", { className: classNames, style: __assign(__assign(__assign({}, style), borderColor), { transform: transform }) },
            title && direction !== 'vertical' ? (React.createElement("span", { className: cx("Divider-text Divider-text-".concat(titlePosition, " ").concat(titleClassName), setThemeClassName('titleControlClassName', id, themeCss)) }, render('title', title))) : null,
            React.createElement(CustomStyle, { config: {
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'titleWrapperControlClassName',
                            weights: {
                                default: {
                                    suf: '::before',
                                    important: true
                                }
                            }
                        },
                        {
                            key: 'titleWrapperControlClassName',
                            weights: {
                                default: {
                                    suf: '::after',
                                    important: true
                                }
                            }
                        },
                        {
                            key: 'titleControlClassName',
                            weights: {
                                default: {
                                    important: true
                                }
                            }
                        }
                    ],
                    id: id
                }, env: env })));
    };
    Divider.defaultProps = {
        className: '',
        lineStyle: 'solid',
        titleClassName: '',
        titlePosition: 'center'
    };
    return Divider;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(DividerRenderer, _super);
    function DividerRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DividerRenderer = __decorate([
        Renderer({
            type: 'divider'
        })
    ], DividerRenderer);
    return DividerRenderer;
})(Divider));

export { Divider as default };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
