/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var mobxReact = require('mobx-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
function ColGroup(_a) {
    var columns = _a.columns, store = _a.store;
    var domRef = React__default["default"].createRef();
    React__default["default"].useEffect(function () {
        if (domRef.current) {
            store.initTableWidth();
            store.syncTableWidth();
        }
    }, []);
    React__default["default"].useEffect(function () {
        var table = domRef.current.parentElement;
        var observer = new MutationObserver(function () {
            store.syncTableWidth();
        });
        observer.observe(table, {
            attributes: true,
            childList: true,
            subtree: true
        });
        return function () {
            observer.disconnect();
        };
    }, []);
    return (_J$X_("colgroup", { ref: domRef }, columns.map(function (column) {
        var style = {};
        if (store.columnWidthReady && column.width) {
            style.width = column.width;
        }
        else if (column.pristine.width) {
            style.width = column.pristine.width;
        }
        if (store.tableLayout === 'auto' && style.width) {
            style.minWidth = style.width;
        }
        return _J$X_("col", { "data-index": column.index, style: style, key: column.id });
    })));
}
var ColGroup$1 = mobxReact.observer(ColGroup);

exports.ColGroup = ColGroup;
exports["default"] = ColGroup$1;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
