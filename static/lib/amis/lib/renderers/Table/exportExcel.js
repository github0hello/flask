/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var amisCore = require('amis-core');
require('./ColumnToggler.js');
var fileSaver = require('file-saver');
var memoize = require('lodash/memoize');
var mobxStateTree = require('mobx-state-tree');
var moment = require('moment');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var memoize__default = /*#__PURE__*/_interopDefaultLegacy(memoize);
var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

/**
 * 导出 Excel 功能
 */
var loadDb = function () {
    // @ts-ignore
    return Promise.resolve().then(function() {return new Promise(function(fullfill) {require(['amis-ui/lib/components/CityDB'], function(mod) {fullfill(tslib.__importStar(mod))})})});
};
/**
 * 将 url 转成绝对地址
 */
var getAbsoluteUrl = (function () {
    var link;
    return function (url) {
        if (!link)
            link = document.createElement('a');
        link.href = url;
        return link.href;
    };
})();
/**
 * 将 computedStyle 的 rgba 转成 argb hex
 */
var rgba2argb = memoize__default["default"](function (rgba) {
    var color = "".concat(rgba
        .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
        .slice(1)
        .map(function (n, i) {
        return (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
            .toString(16)
            .padStart(2, '0')
            .replace('NaN', '');
    })
        .join(''));
    if (color.length === 6) {
        return 'FF' + color;
    }
    return color;
});
/**
 * 将 classname 转成对应的 excel 样式，只支持字体颜色、粗细、背景色
 */
var getCellStyleByClassName = memoize__default["default"](function (className) {
    if (!className)
        return {};
    var classNameElm = document.getElementsByClassName(className).item(0);
    if (classNameElm) {
        var computedStyle = getComputedStyle(classNameElm);
        var font = {};
        var fill = {};
        if (computedStyle.color && computedStyle.color.indexOf('rgb') !== -1) {
            var color = rgba2argb(computedStyle.color);
            // 似乎不支持完全透明的情况，所以就不设置
            if (!color.startsWith('00')) {
                font['color'] = { argb: color };
            }
        }
        if (computedStyle.fontWeight && parseInt(computedStyle.fontWeight) >= 700) {
            font['bold'] = true;
        }
        if (computedStyle.backgroundColor &&
            computedStyle.backgroundColor.indexOf('rgb') !== -1) {
            var color = rgba2argb(computedStyle.backgroundColor);
            if (!color.startsWith('00')) {
                fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: color }
                };
            }
        }
        return { font: font, fill: fill };
    }
    return {};
});
/**
 * 设置单元格样式
 */
var applyCellStyle = function (sheetRow, columIndex, schema, data) {
    var e_1, _a, e_2, _b;
    var cellStyle = {};
    if (schema.className) {
        try {
            for (var _c = tslib.__values(schema.className.split(/\s+/)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var className = _d.value;
                var style = getCellStyleByClassName(className);
                if (style) {
                    cellStyle = tslib.__assign(tslib.__assign({}, cellStyle), style);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    if (schema.classNameExpr) {
        var classNames = amisCore.filter(schema.classNameExpr, data);
        if (classNames) {
            try {
                for (var _e = tslib.__values(classNames.split(/\s+/)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var className = _f.value;
                    var style = getCellStyleByClassName(className);
                    if (style) {
                        cellStyle = tslib.__assign(tslib.__assign({}, cellStyle), style);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    if (cellStyle.font && Object.keys(cellStyle.font).length > 0) {
        sheetRow.getCell(columIndex).font = cellStyle.font;
    }
    if (cellStyle.fill && Object.keys(cellStyle.fill).length > 0) {
        sheetRow.getCell(columIndex).fill = cellStyle.fill;
    }
};
/**
 * 输出总结行
 */
var renderSummary = function (worksheet, data, summarySchema, rowIndex) {
    var e_3, _a, e_4, _b;
    if (summarySchema && summarySchema.length > 0) {
        var firstSchema = summarySchema[0];
        // 总结行支持二维数组，所以统一转成二维数组来方便操作
        var affixRows = summarySchema;
        if (!Array.isArray(firstSchema)) {
            affixRows = [summarySchema];
        }
        try {
            for (var affixRows_1 = tslib.__values(affixRows), affixRows_1_1 = affixRows_1.next(); !affixRows_1_1.done; affixRows_1_1 = affixRows_1.next()) {
                var affix = affixRows_1_1.value;
                rowIndex += 1;
                var sheetRow = worksheet.getRow(rowIndex);
                var columIndex = 0;
                try {
                    for (var affix_1 = (e_4 = void 0, tslib.__values(affix)), affix_1_1 = affix_1.next(); !affix_1_1.done; affix_1_1 = affix_1.next()) {
                        var col = affix_1_1.value;
                        columIndex += 1;
                        // 文档示例中只有这两种，所以主要支持这两种，没法支持太多，因为没法用 react 渲染结果
                        if (col.text) {
                            sheetRow.getCell(columIndex).value = col.text;
                        }
                        if (col.tpl) {
                            sheetRow.getCell(columIndex).value = amisCore.removeHTMLTag(amisCore.decodeEntity(amisCore.filter(col.tpl, data)));
                        }
                        // 处理合并行
                        if (col.colSpan) {
                            worksheet.mergeCells(rowIndex, columIndex, rowIndex, columIndex + col.colSpan - 1);
                            columIndex += col.colSpan - 1;
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (affix_1_1 && !affix_1_1.done && (_b = affix_1.return)) _b.call(affix_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (affixRows_1_1 && !affixRows_1_1.done && (_a = affixRows_1.return)) _a.call(affixRows_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    }
    return rowIndex;
};
function exportExcel(ExcelJS, props, toolbar) {
    var _a, _b, _c, _d;
    return tslib.__awaiter(this, void 0, void 0, function () {
        var store, env, __, data, prefixRow, affixRow, columns, rows, tmpStore, filename, pageField, perPageField, ctx, res, _e, _f, key, workbook, worksheet, exportColumnNames, columns_1, columns_1_1, column, filteredColumns, firstRowLabels, firstRow, remoteMappingCache, rowIndex, rows_1, rows_1_1, row, rowData, sheetRow, columIndex, filteredColumns_1, filteredColumns_1_1, column, name_1, value, type, imageData, imageDimensions, imageWidth, imageHeight, imageMaxSize, imageMatch, imageExt, imageId, linkURL, e_5, href, linkURL, body, text, absoluteURL, map, source, sourceValue, mapKey, res, viewValue, text, viewValue, _g, fromNow, _h, format, _j, valueFormat, ISODate, NormalDate, db, cellValue, e_6_1, e_7_1, buffer, blob;
        var _k, e_8, _l, e_9, _m, e_7, _o, e_6, _p;
        return tslib.__generator(this, function (_q) {
            switch (_q.label) {
                case 0:
                    store = props.store, env = props.env, props.classnames, __ = props.translate, data = props.data, prefixRow = props.prefixRow, affixRow = props.affixRow;
                    columns = store.exportColumns || [];
                    rows = [];
                    filename = 'data';
                    if (!(typeof toolbar === 'object' && toolbar.api)) return [3 /*break*/, 2];
                    pageField = toolbar.pageField || 'page';
                    perPageField = toolbar.perPageField || 'perPage';
                    ctx = amisCore.createObject(data, tslib.__assign(tslib.__assign({}, props.query), (_k = {}, _k[pageField] = data.page || 1, _k[perPageField] = data.perPage || 10, _k)));
                    return [4 /*yield*/, env.fetcher(toolbar.api, ctx, {
                            autoAppend: true,
                            pageField: pageField,
                            perPageField: perPageField
                        })];
                case 1:
                    res = _q.sent();
                    if (!res.data) {
                        env.notify('warning', __('placeholder.noData'));
                        return [2 /*return*/];
                    }
                    /**
                     * 优先找items和rows，找不到就拿第一个值为数组的字段
                     * 和CRUD中的处理逻辑保持一致，避免能渲染和导出的不一致
                     */
                    if (Array.isArray(res.data)) {
                        rows = res.data;
                    }
                    else if (Array.isArray((_a = res.data) === null || _a === void 0 ? void 0 : _a.rows)) {
                        rows = res.data.rows;
                    }
                    else if (Array.isArray((_b = res.data) === null || _b === void 0 ? void 0 : _b.items)) {
                        rows = res.data.items;
                    }
                    else {
                        try {
                            for (_e = tslib.__values(Object.keys(res.data)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                key = _f.value;
                                if (res.data.hasOwnProperty(key) && Array.isArray(res.data[key])) {
                                    rows = res.data[key];
                                    break;
                                }
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_l = _e.return)) _l.call(_e);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                    }
                    // 因为很多方法是 store 里的，所以需要构建 store 来处理
                    tmpStore = amisCore.TableStore.create(mobxStateTree.getSnapshot(store));
                    tmpStore.initRows(rows);
                    rows = tmpStore.rows;
                    return [3 /*break*/, 3];
                case 2:
                    rows = store.rows;
                    _q.label = 3;
                case 3:
                    if (typeof toolbar === 'object' && toolbar.filename) {
                        filename = amisCore.filter(toolbar.filename, data, '| raw');
                    }
                    if (rows.length === 0) {
                        env.notify('warning', __('placeholder.noData'));
                        return [2 /*return*/];
                    }
                    workbook = new ExcelJS.Workbook();
                    worksheet = workbook.addWorksheet('sheet', {
                        properties: { defaultColWidth: 15 }
                    });
                    worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
                    exportColumnNames = toolbar.columns;
                    if (amisCore.isPureVariable(exportColumnNames)) {
                        exportColumnNames = amisCore.resolveVariableAndFilter(exportColumnNames, data, '| raw');
                    }
                    // 自定义导出列配置
                    if (toolbar.exportColumns && Array.isArray(toolbar.exportColumns)) {
                        columns = toolbar.exportColumns;
                        try {
                            // 因为后面列 props 都是从 pristine 里获取，所以这里归一一下
                            for (columns_1 = tslib.__values(columns), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                                column = columns_1_1.value;
                                column.pristine = column;
                            }
                        }
                        catch (e_9_1) { e_9 = { error: e_9_1 }; }
                        finally {
                            try {
                                if (columns_1_1 && !columns_1_1.done && (_m = columns_1.return)) _m.call(columns_1);
                            }
                            finally { if (e_9) throw e_9.error; }
                        }
                    }
                    filteredColumns = exportColumnNames
                        ? columns.filter(function (column) {
                            var filterColumnsNames = exportColumnNames;
                            if (column.name && filterColumnsNames.indexOf(column.name) !== -1) {
                                return true;
                            }
                            return false;
                        })
                        : columns;
                    firstRowLabels = filteredColumns.map(function (column) {
                        return amisCore.filter(column.label, data);
                    });
                    firstRow = worksheet.getRow(1);
                    firstRow.values = firstRowLabels;
                    worksheet.autoFilter = {
                        from: {
                            row: 1,
                            column: 1
                        },
                        to: {
                            row: 1,
                            column: firstRowLabels.length
                        }
                    };
                    remoteMappingCache = {};
                    rowIndex = 1;
                    if (toolbar.rowSlice) {
                        rows = amisCore.arraySlice(rows, toolbar.rowSlice);
                    }
                    // 前置总结行
                    rowIndex = renderSummary(worksheet, data, prefixRow, rowIndex);
                    // children 展开
                    rows = amisCore.flattenTree(rows, function (item) { return item; });
                    _q.label = 4;
                case 4:
                    _q.trys.push([4, 30, 31, 32]);
                    rows_1 = tslib.__values(rows), rows_1_1 = rows_1.next();
                    _q.label = 5;
                case 5:
                    if (!!rows_1_1.done) return [3 /*break*/, 29];
                    row = rows_1_1.value;
                    rowData = amisCore.createObject(data, row.data);
                    rowIndex += 1;
                    sheetRow = worksheet.getRow(rowIndex);
                    columIndex = 0;
                    _q.label = 6;
                case 6:
                    _q.trys.push([6, 26, 27, 28]);
                    filteredColumns_1 = (e_6 = void 0, tslib.__values(filteredColumns)), filteredColumns_1_1 = filteredColumns_1.next();
                    _q.label = 7;
                case 7:
                    if (!!filteredColumns_1_1.done) return [3 /*break*/, 25];
                    column = filteredColumns_1_1.value;
                    columIndex += 1;
                    name_1 = column.name;
                    value = amisCore.getVariable(rowData, name_1);
                    if (typeof value === 'undefined' && !column.pristine.tpl) {
                        return [3 /*break*/, 24];
                    }
                    // 处理合并单元格
                    if (name_1 in row.rowSpans) {
                        if (row.rowSpans[name_1] === 0) {
                            return [3 /*break*/, 24];
                        }
                        else {
                            // start row, start column, end row, end column
                            worksheet.mergeCells(rowIndex, columIndex, rowIndex + row.rowSpans[name_1] - 1, columIndex);
                        }
                    }
                    applyCellStyle(sheetRow, columIndex, column.pristine, rowData);
                    type = column.type || 'plain';
                    if (!((type === 'image' || type === 'static-image') && value)) return [3 /*break*/, 13];
                    _q.label = 8;
                case 8:
                    _q.trys.push([8, 11, , 12]);
                    return [4 /*yield*/, amisCore.toDataURL(value)];
                case 9:
                    imageData = _q.sent();
                    return [4 /*yield*/, amisCore.getImageDimensions(imageData)];
                case 10:
                    imageDimensions = _q.sent();
                    imageWidth = imageDimensions.width;
                    imageHeight = imageDimensions.height;
                    imageMaxSize = 100;
                    if (imageWidth > imageHeight) {
                        if (imageWidth > imageMaxSize) {
                            imageHeight = (imageMaxSize * imageHeight) / imageWidth;
                            imageWidth = imageMaxSize;
                        }
                    }
                    else {
                        if (imageHeight > imageMaxSize) {
                            imageWidth = (imageMaxSize * imageWidth) / imageHeight;
                            imageHeight = imageMaxSize;
                        }
                    }
                    imageMatch = imageData.match(/data:image\/(.*);/);
                    imageExt = 'png';
                    if (imageMatch) {
                        imageExt = imageMatch[1];
                    }
                    // 目前 excel 只支持这些格式，所以其它格式直接输出 url
                    if (imageExt != 'png' && imageExt != 'jpeg' && imageExt != 'gif') {
                        sheetRow.getCell(columIndex).value = value;
                        return [3 /*break*/, 24];
                    }
                    imageId = workbook.addImage({
                        base64: imageData,
                        extension: imageExt
                    });
                    linkURL = getAbsoluteUrl(value);
                    worksheet.addImage(imageId, {
                        // 这里坐标位置是从 0 开始的，所以要减一
                        tl: { col: columIndex - 1, row: rowIndex - 1 },
                        ext: {
                            width: imageWidth,
                            height: imageHeight
                        },
                        hyperlinks: {
                            tooltip: linkURL
                        }
                    });
                    return [3 /*break*/, 12];
                case 11:
                    e_5 = _q.sent();
                    console.warn(e_5);
                    return [3 /*break*/, 12];
                case 12: return [3 /*break*/, 23];
                case 13:
                    if (!(type == 'link' || type === 'static-link')) return [3 /*break*/, 14];
                    href = column.pristine.href;
                    linkURL = (typeof href === 'string' && href
                        ? amisCore.filter(href, rowData, '| raw')
                        : undefined) || value;
                    body = column.pristine.body;
                    text = typeof body === 'string' && body
                        ? amisCore.filter(body, rowData, '| raw')
                        : undefined;
                    absoluteURL = getAbsoluteUrl(linkURL);
                    sheetRow.getCell(columIndex).value = {
                        text: text || absoluteURL,
                        hyperlink: absoluteURL
                    };
                    return [3 /*break*/, 23];
                case 14:
                    if (!(type === 'mapping' || type === 'static-mapping')) return [3 /*break*/, 19];
                    map = column.pristine.map;
                    source = column.pristine.source;
                    if (!source) return [3 /*break*/, 18];
                    sourceValue = source;
                    if (!amisCore.isPureVariable(source)) return [3 /*break*/, 15];
                    map = amisCore.resolveVariableAndFilter(source, rowData, '| raw');
                    return [3 /*break*/, 18];
                case 15:
                    if (!amisCore.isEffectiveApi(source, data)) return [3 /*break*/, 18];
                    mapKey = JSON.stringify(source);
                    if (!(mapKey in remoteMappingCache)) return [3 /*break*/, 16];
                    map = remoteMappingCache[mapKey];
                    return [3 /*break*/, 18];
                case 16: return [4 /*yield*/, env.fetcher(sourceValue, rowData)];
                case 17:
                    res = _q.sent();
                    if (res.data) {
                        remoteMappingCache[mapKey] = res.data;
                        map = res.data;
                    }
                    _q.label = 18;
                case 18:
                    if (typeof value !== 'undefined' && map && ((_c = map[value]) !== null && _c !== void 0 ? _c : map['*'])) {
                        viewValue = (_d = map[value]) !== null && _d !== void 0 ? _d : (value === true && map['1']
                            ? map['1']
                            : value === false && map['0']
                                ? map['0']
                                : map['*']);
                        text = amisCore.removeHTMLTag(viewValue);
                        /** map可能会使用比较复杂的html结构，富文本也无法完全支持，直接把里面的变量解析出来即可 */
                        if (amisCore.isPureVariable(text)) {
                            text = amisCore.resolveVariableAndFilter(text, rowData, '| raw');
                        }
                        else {
                            text = amisCore.filter(text, rowData);
                        }
                        sheetRow.getCell(columIndex).value = text;
                    }
                    else {
                        sheetRow.getCell(columIndex).value = amisCore.removeHTMLTag(value);
                    }
                    return [3 /*break*/, 23];
                case 19:
                    if (!(type === 'date' || type === 'static-date')) return [3 /*break*/, 20];
                    viewValue = void 0;
                    _g = column.pristine, fromNow = _g.fromNow, _h = _g.format, format = _h === void 0 ? 'YYYY-MM-DD' : _h, _j = _g.valueFormat, valueFormat = _j === void 0 ? 'X' : _j;
                    if (value) {
                        ISODate = moment__default["default"](value, moment__default["default"].ISO_8601);
                        NormalDate = moment__default["default"](value, valueFormat);
                        viewValue = ISODate.isValid()
                            ? ISODate.format(format)
                            : NormalDate.isValid()
                                ? NormalDate.format(format)
                                : false;
                    }
                    if (fromNow) {
                        viewValue = moment__default["default"](value).fromNow();
                    }
                    if (viewValue) {
                        sheetRow.getCell(columIndex).value = viewValue;
                    }
                    return [3 /*break*/, 23];
                case 20:
                    if (!(type === 'input-city')) return [3 /*break*/, 22];
                    return [4 /*yield*/, loadDb()];
                case 21:
                    db = _q.sent();
                    if (db.default && value && value in db.default) {
                        sheetRow.getCell(columIndex).value = db.default[value];
                    }
                    return [3 /*break*/, 23];
                case 22:
                    if (column.pristine.tpl) {
                        sheetRow.getCell(columIndex).value = amisCore.removeHTMLTag(amisCore.decodeEntity(amisCore.filter(column.pristine.tpl, rowData)));
                    }
                    else {
                        sheetRow.getCell(columIndex).value = value;
                    }
                    _q.label = 23;
                case 23:
                    cellValue = sheetRow.getCell(columIndex).value;
                    if (Number.isInteger(cellValue)) {
                        sheetRow.getCell(columIndex).numFmt = '0';
                    }
                    _q.label = 24;
                case 24:
                    filteredColumns_1_1 = filteredColumns_1.next();
                    return [3 /*break*/, 7];
                case 25: return [3 /*break*/, 28];
                case 26:
                    e_6_1 = _q.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 28];
                case 27:
                    try {
                        if (filteredColumns_1_1 && !filteredColumns_1_1.done && (_p = filteredColumns_1.return)) _p.call(filteredColumns_1);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7 /*endfinally*/];
                case 28:
                    rows_1_1 = rows_1.next();
                    return [3 /*break*/, 5];
                case 29: return [3 /*break*/, 32];
                case 30:
                    e_7_1 = _q.sent();
                    e_7 = { error: e_7_1 };
                    return [3 /*break*/, 32];
                case 31:
                    try {
                        if (rows_1_1 && !rows_1_1.done && (_o = rows_1.return)) _o.call(rows_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                    return [7 /*endfinally*/];
                case 32:
                    // 后置总结行
                    renderSummary(worksheet, data, affixRow, rowIndex);
                    return [4 /*yield*/, workbook.xlsx.writeBuffer()];
                case 33:
                    buffer = _q.sent();
                    if (buffer) {
                        blob = new Blob([buffer], {
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        });
                        fileSaver.saveAs(blob, filename + '.xlsx');
                    }
                    return [2 /*return*/];
            }
        });
    });
}

exports.exportExcel = exportExcel;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
