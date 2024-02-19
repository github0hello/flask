/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { isVisible, filter, autobind, Renderer } from 'amis-core';
import { AnchorNavSection, AnchorNav as AnchorNav$1 } from 'amis-ui';
import find from 'lodash/find';

var AnchorNav = /** @class */ (function (_super) {
    __extends(AnchorNav, _super);
    function AnchorNav(props) {
        var _this = _super.call(this, props) || this;
        // 设置默认激活项
        var links = props.links;
        var active = 0;
        if (typeof props.active !== 'undefined') {
            active = props.active;
        }
        else {
            var section = find(links, function (section) { return section.href === props.active; });
            active =
                section && section.href
                    ? section.href
                    : (links[0] && links[0].href) || 0;
        }
        _this.state = {
            active: active
        };
        return _this;
    }
    AnchorNav.prototype.handleSelect = function (key) {
        this.setState({
            active: key
        });
    };
    AnchorNav.prototype.locateTo = function (index) {
        var links = this.props.links;
        Array.isArray(links) &&
            links[index] &&
            this.setState({
                active: links[index].href || index
            });
    };
    AnchorNav.prototype.render = function () {
        var _this = this;
        var _a = this.props, cx = _a.classnames, ns = _a.classPrefix, className = _a.className, style = _a.style, linkClassName = _a.linkClassName, sectionClassName = _a.sectionClassName, direction = _a.direction, sectionRender = _a.sectionRender, render = _a.render, data = _a.data;
        var links = this.props.links;
        if (!links) {
            return null;
        }
        links = Array.isArray(links) ? links : [links];
        var children = [];
        children = links
            .map(function (section, index) {
            return isVisible(section, data) ? (React.createElement(AnchorNavSection, __assign({}, section, { title: filter(section.title, data), key: index, name: section.href || index }), _this.renderSection
                ? _this.renderSection(section, _this.props, index)
                : sectionRender
                    ? sectionRender(section, _this.props, index)
                    : render("section/".concat(index), section.body || ''))) : null;
        })
            .filter(function (item) { return !!item; });
        return (React.createElement(AnchorNav$1, { classPrefix: ns, classnames: cx, className: className, style: style, linkClassName: linkClassName, sectionClassName: sectionClassName, onSelect: this.handleSelect, active: this.state.active, direction: direction }, children));
    };
    AnchorNav.defaultProps = {
        className: '',
        linkClassName: '',
        sectionClassName: ''
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AnchorNav.prototype, "handleSelect", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], AnchorNav.prototype, "locateTo", null);
    return AnchorNav;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(AnchorNavRenderer, _super);
    function AnchorNavRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnchorNavRenderer = __decorate([
        Renderer({
            type: 'anchor-nav'
        })
    ], AnchorNavRenderer);
    return AnchorNavRenderer;
})(AnchorNav));

export { AnchorNav as default };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
