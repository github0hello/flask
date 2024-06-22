/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

'use strict';

var tslib = require('tslib');
var React = require('react');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
/** @class */ ((function (_super) {
    tslib.__extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    List.prototype.handleClick = function (item) {
        var _this = this;
        return function (e) {
            var action;
            if (item.link) {
                action = amisCore.validations.isUrl({}, item.link)
                    ? {
                        type: 'button',
                        actionType: 'url',
                        url: item.link,
                        blank: item.blank
                    }
                    : {
                        type: 'button',
                        actionType: 'link',
                        link: item.link
                    };
            }
            else {
                action = item.clickAction;
            }
            amisCore.handleAction(e, action, _this.props);
        };
    };
    List.prototype.render = function () {
        var _this = this;
        var _a = this.props, itemClassName = _a.itemClassName; _a.style; var contentClassName = _a.contentClassName, source = _a.source, data = _a.data, options = _a.options, classnames = _a.classnames;
        var value = amisCore.getPropValue(this.props);
        var list = [];
        if (typeof source === 'string' && amisCore.isPureVariable(source)) {
            list = amisCore.resolveVariableAndFilter(source, data, '| raw') || undefined;
        }
        else if (Array.isArray(value)) {
            list = value;
        }
        else if (Array.isArray(options)) {
            list = options;
        }
        if (list && !Array.isArray(list)) {
            list = [list];
        }
        if (!(list === null || list === void 0 ? void 0 : list.length)) {
            return null;
        }
        return (_J$X_(amisUi.GridNav, tslib.__assign({}, this.props), list.map(function (item, index) { return (_J$X_(amisUi.GridNavItem, { key: index, onClick: item.clickAction || item.link ? _this.handleClick(item) : undefined, className: itemClassName, contentClassName: contentClassName, text: item.text, icon: item.icon, classnames: classnames, badge: item.badge
                ? {
                    badge: item.badge,
                    data: data,
                    classnames: classnames
                }
                : undefined })); })));
    };
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], List.prototype, "handleClick", null);
    List = tslib.__decorate([
        amisCore.Renderer({
            type: 'grid-nav'
        })
    ], List);
    return List;
})(React__default["default"].Component));
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
