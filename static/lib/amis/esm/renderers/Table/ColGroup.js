/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import React from 'react';
import { observer } from 'mobx-react';

function ColGroup(_a) {
    var columns = _a.columns, store = _a.store;
    var domRef = React.createRef();
    React.useEffect(function () {
        if (domRef.current) {
            store.initTableWidth();
            store.syncTableWidth();
        }
    }, []);
    React.useEffect(function () {
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
    return (React.createElement("colgroup", { ref: domRef }, columns.map(function (column) {
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
        return React.createElement("col", { "data-index": column.index, style: style, key: column.id });
    })));
}
var ColGroup$1 = observer(ColGroup);

export { ColGroup, ColGroup$1 as default };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
