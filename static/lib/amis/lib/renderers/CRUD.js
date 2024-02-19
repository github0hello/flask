/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var isEqual = require('lodash/isEqual');
var pickBy = require('lodash/pickBy');
var omitBy = require('lodash/omitBy');
var amisCore = require('amis-core');
var amisUi = require('amis-ui');
var pick = require('lodash/pick');
var ReactDOM = require('react-dom');
var omit = require('lodash/omit');
var find = require('lodash/find');
var findIndex = require('lodash/findIndex');
var mobxStateTree = require('mobx-state-tree');
var isPlainObject = require('lodash/isPlainObject');
var memoize = require('lodash/memoize');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var isEqual__default = /*#__PURE__*/_interopDefaultLegacy(isEqual);
var pickBy__default = /*#__PURE__*/_interopDefaultLegacy(pickBy);
var omitBy__default = /*#__PURE__*/_interopDefaultLegacy(omitBy);
var pick__default = /*#__PURE__*/_interopDefaultLegacy(pick);
var omit__default = /*#__PURE__*/_interopDefaultLegacy(omit);
var find__default = /*#__PURE__*/_interopDefaultLegacy(find);
var findIndex__default = /*#__PURE__*/_interopDefaultLegacy(findIndex);
var isPlainObject__default = /*#__PURE__*/_interopDefaultLegacy(isPlainObject);
var memoize__default = /*#__PURE__*/_interopDefaultLegacy(memoize);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var INNER_EVENTS = [
    'selectedChange',
    'columnSort',
    'columnFilter',
    'columnSearch',
    'columnToggled',
    'orderChange',
    'rowClick',
    'rowDbClick',
    'rowMouseEnter',
    'rowMouseLeave',
    'selected'
];
var CRUD = /** @class */ (function (_super) {
    tslib.__extends(CRUD, _super);
    function CRUD(props) {
        var _this = _super.call(this, props) || this;
        _this.filterOnEvent = memoize__default["default"](function (onEvent) {
            return omitBy__default["default"](onEvent, function (event, key) { return !INNER_EVENTS.includes(key); });
        });
        _this.controlRef = _this.controlRef.bind(_this);
        _this.handleFilterReset = _this.handleFilterReset.bind(_this);
        _this.handleFilterSubmit = _this.handleFilterSubmit.bind(_this);
        _this.handleFilterInit = _this.handleFilterInit.bind(_this);
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleBulkAction = _this.handleBulkAction.bind(_this);
        _this.handleChangePage = _this.handleChangePage.bind(_this);
        _this.handleBulkGo = _this.handleBulkGo.bind(_this);
        _this.handleDialogConfirm = _this.handleDialogConfirm.bind(_this);
        _this.handleDialogClose = _this.handleDialogClose.bind(_this);
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleSaveOrder = _this.handleSaveOrder.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.handleChildPopOverOpen = _this.handleChildPopOverOpen.bind(_this);
        _this.handleChildPopOverClose = _this.handleChildPopOverClose.bind(_this);
        _this.search = _this.search.bind(_this);
        _this.silentSearch = _this.silentSearch.bind(_this);
        _this.handleQuery = _this.handleQuery.bind(_this);
        _this.renderHeaderToolbar = _this.renderHeaderToolbar.bind(_this);
        _this.renderFooterToolbar = _this.renderFooterToolbar.bind(_this);
        _this.clearSelection = _this.clearSelection.bind(_this);
        var location = props.location, store = props.store, pageField = props.pageField, perPageField = props.perPageField, syncLocation = props.syncLocation; props.loadDataOnce; var parsePrimitiveQuery = props.parsePrimitiveQuery;
        _this.mounted = true;
        if (syncLocation && location && (location.query || location.search)) {
            store.updateQuery(amisCore.parseQuery(location, { parsePrimitive: parsePrimitiveQuery }), undefined, pageField, perPageField);
        }
        else if (syncLocation && !location && window.location.search) {
            store.updateQuery(amisCore.parseQuery(window.location, { parsePrimitive: parsePrimitiveQuery }), undefined, pageField, perPageField);
        }
        _this.props.store.setFilterTogglable(!!_this.props.filterTogglable, _this.props.filterDefaultVisible);
        // 如果有 api，data 里面先写个 空数组，面得继承外层的 items
        // 比如 crud 打开一个弹框，里面也是个 crud，默认一开始其实显示
        // 的是外层 crud 的数据，等接口回来后就会变成新的。
        // 加上这个就是为了解决这种情况
        if (_this.props.api) {
            _this.props.store.updateData({
                items: []
            });
        }
        // 如果picker用visibleOn来控制显隐，显隐切换时，constructor => handleSelect => componentDidMount的执行顺序
        // 因此需要将componentDidMount中的设置选中项提前到constructor，否则handleSelect里拿不到的选中项
        var val;
        if (_this.props.pickerMode && (val = amisCore.getPropValue(_this.props))) {
            store.setSelectedItems(val);
        }
        return _this;
    }
    CRUD.prototype.componentDidMount = function () {
        var _a = this.props, store = _a.store, autoGenerateFilter = _a.autoGenerateFilter, perPageField = _a.perPageField; _a.columns;
        if (this.props.perPage && !store.query[perPageField || 'perPage']) {
            store.changePage(store.page, this.props.perPage);
        }
        // 没有 filter 或者 没有展示 filter 时应该默认初始化一次，
        // 否则就应该等待 filter 里面的表单初始化的时候才初始化
        // 另外autoGenerateFilter时，table 里面会单独处理这块逻辑
        // 所以这里应该忽略 autoGenerateFilter 情况
        if ((!this.props.filter && !autoGenerateFilter) ||
            (store.filterTogggable && !store.filterVisible)) {
            this.handleFilterInit({});
        }
        this.parentContainer = this.getClosestParentContainer();
    };
    CRUD.prototype.componentDidUpdate = function (prevProps) {
        var _a;
        var props = this.props;
        var store = prevProps.store;
        if (amisCore.anyChanged(['toolbar', 'headerToolbar', 'footerToolbar', 'bulkActions'], prevProps, props)) {
            // 来点参数变化。
            this.renderHeaderToolbar = this.renderHeaderToolbar.bind(this);
            this.renderFooterToolbar = this.renderFooterToolbar.bind(this);
        }
        var val;
        if (this.props.pickerMode &&
            !isEqual__default["default"]((val = amisCore.getPropValue(this.props)), amisCore.getPropValue(prevProps)) &&
            !isEqual__default["default"](val, store.selectedItems.concat())) {
            /**
             * 更新链：Table -> CRUD -> Picker -> Form
             * 对于Picker模式来说，执行到这里的时候store.selectedItems已经更新过了，所以需要额外判断一下
             */
            store.setSelectedItems(val);
        }
        if (!!this.props.filterTogglable !== !!prevProps.filterTogglable) {
            store.setFilterTogglable(!!props.filterTogglable, props.filterDefaultVisible);
        }
        var dataInvalid = false;
        if (prevProps.syncLocation &&
            prevProps.location &&
            prevProps.location.search !== props.location.search) {
            // 同步地址栏，那么直接检测 query 是否变了，变了就重新拉数据
            store.updateQuery(amisCore.parseQuery(props.location, { parsePrimitive: props.parsePrimitiveQuery }), undefined, props.pageField, props.perPageField);
            dataInvalid = !!(props.api && amisCore.isObjectShallowModified(store.query, this.lastQuery, false));
        }
        if (dataInvalid) ;
        else if (prevProps.api &&
            props.api &&
            amisCore.isApiOutdated(prevProps.api, props.api, store.fetchCtxOf(prevProps.data, {
                pageField: prevProps.pageField,
                perPageField: prevProps.perPageField
            }), store.fetchCtxOf(props.data, {
                pageField: props.pageField,
                perPageField: props.perPageField
            }))) {
            dataInvalid = true;
        }
        else if (!props.api && amisCore.isPureVariable(props.source)) {
            var next = amisCore.resolveVariableAndFilter(props.source, props.data, '| raw');
            if (!this.lastData || this.lastData !== next) {
                store.initFromScope(props.data, props.source, {
                    columns: (_a = store.columns) !== null && _a !== void 0 ? _a : props.columns
                });
                this.lastData = next;
            }
        }
        if (dataInvalid) {
            this.search();
        }
    };
    CRUD.prototype.componentWillUnmount = function () {
        var _a, _b;
        this.mounted = false;
        clearTimeout(this.timer);
        (_b = (_a = this.filterOnEvent.cache).clear) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    /** 查找CRUD最近层级的父窗口 */
    CRUD.prototype.getClosestParentContainer = function () {
        var dom = ReactDOM.findDOMNode(this);
        var overlay = dom === null || dom === void 0 ? void 0 : dom.closest('[role=dialog]');
        return overlay;
    };
    CRUD.prototype.controlRef = function (control) {
        // 因为 control 有可能被 n 层 hoc 包裹。
        while (control && control.getWrappedInstance) {
            control = control.getWrappedInstance();
        }
        this.control = control;
    };
    CRUD.prototype.handleAction = function (e, action, ctx, throwErrors, delegate) {
        var _this = this;
        if (throwErrors === void 0) { throwErrors = false; }
        var _a = this.props, onAction = _a.onAction, store = _a.store, messages = _a.messages, pickerMode = _a.pickerMode, env = _a.env; _a.pageField; var stopAutoRefreshWhenModalIsOpen = _a.stopAutoRefreshWhenModalIsOpen;
        if (action.actionType === 'dialog') {
            store.setCurrentAction(action);
            var idx = ctx.index;
            var length_1 = store.items.length;
            stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
            store.openDialog(ctx, {
                hasNext: idx < length_1 - 1,
                nextIndex: idx + 1,
                hasPrev: idx > 0,
                prevIndex: idx - 1,
                index: idx
            }, action.callback, delegate || this.context);
        }
        else if (action.actionType === 'ajax') {
            store.setCurrentAction(action);
            var data = ctx;
            // 由于 ajax 一段时间后再弹出，肯定被浏览器给阻止掉的，所以提前弹。
            var redirect = action.redirect && amisCore.filter(action.redirect, data);
            redirect && action.blank && env.jumpTo(redirect, action, data);
            return store
                .saveRemote(action.api, data, {
                successMessage: (action.messages && action.messages.success) ||
                    (messages && messages.saveSuccess),
                errorMessage: (action.messages && action.messages.failed) ||
                    (messages && messages.saveFailed)
            })
                .then(function (payload) { return tslib.__awaiter(_this, void 0, void 0, function () {
                var data, redirect;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = amisCore.createObject(ctx, payload);
                            if (!(action.feedback && amisCore.isVisible(action.feedback, data))) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.openFeedback(action.feedback, data)];
                        case 1:
                            _a.sent();
                            stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
                            _a.label = 2;
                        case 2:
                            redirect = action.redirect && amisCore.filter(action.redirect, data);
                            redirect && !action.blank && env.jumpTo(redirect, action, data);
                            action.reload
                                ? this.reloadTarget(amisCore.filterTarget(action.reload, data), data)
                                : redirect
                                    ? null
                                    : this.search(undefined, undefined, true, true);
                            action.close && this.closeTarget(action.close);
                            return [2 /*return*/];
                    }
                });
            }); })
                .catch(function (e) {
                if (throwErrors || action.countDown) {
                    throw e;
                }
            });
        }
        else if (action.actionType === 'reload' && !action.target) {
            this.reload();
        }
        else if (pickerMode &&
            (action.actionType === 'confirm' || action.actionType === 'submit')) {
            store.setCurrentAction(action);
            return Promise.resolve({
                items: store.selectedItems.concat()
            });
        }
        else if (action.onClick) {
            store.setCurrentAction(action);
            var onClick = action.onClick;
            if (typeof onClick === 'string') {
                onClick = amisCore.str2function(onClick, 'event', 'props', 'data');
            }
            onClick && onClick(e, this.props, ctx);
        }
        else {
            onAction(e, action, ctx, throwErrors, delegate || this.context);
        }
    };
    CRUD.prototype.handleBulkAction = function (selectedItems, unSelectedItems, e, action) {
        var _this = this;
        var _a;
        var _b = this.props, store = _b.store, primaryField = _b.primaryField, onAction = _b.onAction, messages = _b.messages, pageField = _b.pageField, stopAutoRefreshWhenModalIsOpen = _b.stopAutoRefreshWhenModalIsOpen, env = _b.env;
        if (!selectedItems.length && action.requireSelected !== false) {
            return;
        }
        var ids = selectedItems
            .map(function (item) {
            return item.hasOwnProperty(primaryField) ? item[primaryField] : null;
        })
            .filter(function (item) { return item; })
            .join(',');
        var ctx = amisCore.createObject(store.mergedData, tslib.__assign(tslib.__assign({}, selectedItems[0]), { currentPageData: (((_a = store.mergedData) === null || _a === void 0 ? void 0 : _a.items) || []).concat(), rows: selectedItems, items: selectedItems, selectedItems: selectedItems, unSelectedItems: unSelectedItems, ids: ids }));
        var fn = function () {
            if (action.actionType === 'dialog') {
                return _this.handleAction(e, tslib.__assign(tslib.__assign({}, action), { __from: 'bulkAction' }), ctx);
            }
            else if (action.actionType === 'ajax') {
                amisCore.isEffectiveApi(action.api, ctx) &&
                    store
                        .saveRemote(action.api, ctx, {
                        successMessage: (action.messages && action.messages.success) ||
                            (messages && messages.saveSuccess),
                        errorMessage: (action.messages && action.messages.failed) ||
                            (messages && messages.saveFailed)
                    })
                        .then(function (payload) { return tslib.__awaiter(_this, void 0, void 0, function () {
                        var data, redirect;
                        var _a;
                        return tslib.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    data = amisCore.createObject(ctx, payload);
                                    if (!(action.feedback && amisCore.isVisible(action.feedback, data))) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.openFeedback(action.feedback, data)];
                                case 1:
                                    _b.sent();
                                    stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
                                    _b.label = 2;
                                case 2:
                                    action.reload
                                        ? this.reloadTarget(amisCore.filterTarget(action.reload, data), data)
                                        : this.search((_a = {}, _a[pageField || 'page'] = 1, _a), undefined, true, true);
                                    action.close && this.closeTarget(action.close);
                                    redirect = action.redirect && amisCore.filter(action.redirect, data);
                                    redirect && env.jumpTo(redirect, action, data);
                                    return [2 /*return*/];
                            }
                        });
                    }); })
                        .catch(function () { return null; });
            }
            else if (onAction) {
                onAction(e, action, ctx, false, _this.context);
            }
        };
        // Action如果配了事件动作也会处理二次确认，这里需要处理一下忽略
        var confirmText = '';
        if (!action.ignoreConfirm &&
            action.confirmText &&
            env.confirm &&
            (confirmText = amisCore.filter(action.confirmText, ctx))) {
            env
                .confirm(confirmText, amisCore.filter(action.confirmTitle, ctx) || undefined)
                .then(function (confirmed) { return confirmed && fn(); });
        }
        else {
            fn();
        }
    };
    CRUD.prototype.handleItemAction = function (action, ctx) {
        this.doAction(action, ctx);
    };
    CRUD.prototype.handleFilterInit = function (values) {
        var _a = this.props, defaultParams = _a.defaultParams; _a.data; var store = _a.store, orderBy = _a.orderBy, orderDir = _a.orderDir;
        var params = tslib.__assign({}, defaultParams);
        if (orderBy) {
            params['orderBy'] = orderBy;
            params['orderDir'] = orderDir || 'asc';
        }
        this.handleFilterSubmit(tslib.__assign(tslib.__assign(tslib.__assign({}, params), values), store.query), false, true, this.props.initFetch !== false, true);
        store.setPristineQuery();
        var _b = this.props, pickerMode = _b.pickerMode, options = _b.options;
        pickerMode &&
            store.updateData({
                items: options || []
            });
    };
    CRUD.prototype.handleFilterReset = function (values, action) {
        var _a = this.props, store = _a.store, syncLocation = _a.syncLocation, env = _a.env, pageField = _a.pageField, perPageField = _a.perPageField;
        store.updateQuery(store.pristineQuery, syncLocation && env && env.updateLocation
            ? function (location) { return env.updateLocation(location); }
            : undefined, pageField, perPageField, true);
        this.lastQuery = store.query;
        // 对于带 submit 的 reset(包括 actionType 为 reset-and-submit clear-and-submit 和 form 的 resetAfterSubmit 属性)
        // 不执行 search，否则会多次触发接口请求
        if ((action === null || action === void 0 ? void 0 : action.actionType) &&
            ['reset-and-submit', 'clear-and-submit', 'submit'].includes(action.actionType)) {
            return;
        }
        this.search();
    };
    CRUD.prototype.handleFilterSubmit = function (values, jumpToFirstPage, replaceLocation, search, isInit) {
        var _a;
        var _b, _c;
        if (jumpToFirstPage === void 0) { jumpToFirstPage = true; }
        if (replaceLocation === void 0) { replaceLocation = false; }
        if (search === void 0) { search = true; }
        if (isInit === void 0) { isInit = false; }
        var _d = this.props, store = _d.store, syncLocation = _d.syncLocation, env = _d.env, pageField = _d.pageField, perPageField = _d.perPageField, loadDataOnceFetchOnFilter = _d.loadDataOnceFetchOnFilter, parsePrimitiveQuery = _d.parsePrimitiveQuery;
        /** 找出clearValueOnHidden的字段, 保证updateQuery时不会使用上次的保留值 */
        values = tslib.__assign(tslib.__assign({}, values), pickBy__default["default"]((_c = (_b = values === null || values === void 0 ? void 0 : values.__super) === null || _b === void 0 ? void 0 : _b.diff) !== null && _c !== void 0 ? _c : {}, function (value) { return value === undefined; }));
        values = syncLocation
            ? amisCore.qsparse(amisCore.qsstringify(values, undefined, true))
            : values;
        /** 把布尔值反解出来 */
        if (parsePrimitiveQuery) {
            values = amisCore.parsePrimitiveQueryString(values);
        }
        store.updateQuery(tslib.__assign(tslib.__assign({}, values), (_a = {}, _a[pageField || 'page'] = jumpToFirstPage ? 1 : store.page, _a)), syncLocation && env && env.updateLocation
            ? function (location) { return env.updateLocation(location, replaceLocation); }
            : undefined, pageField, perPageField);
        this.lastQuery = store.query;
        search &&
            this.search(undefined, undefined, undefined, loadDataOnceFetchOnFilter !== false, isInit);
    };
    CRUD.prototype.handleBulkGo = function (selectedItems, unSelectedItems, e) {
        var _this = this;
        var action = this.props.store.selectedAction;
        var env = this.props.env;
        var confirmText = '';
        if (action.confirmText &&
            (confirmText = amisCore.filter(action.confirmText, this.props.store.mergedData))) {
            return env
                .confirm(confirmText)
                .then(function (confirmed) {
                return confirmed &&
                    _this.handleBulkAction(selectedItems, unSelectedItems, e, action);
            });
        }
        return this.handleBulkAction(selectedItems, unSelectedItems, e, action);
    };
    CRUD.prototype.handleDialogConfirm = function (values, action, ctx, components) {
        var _a;
        var _b, _c, _d;
        var _e = this.props, store = _e.store, pageField = _e.pageField, stopAutoRefreshWhenModalIsOpen = _e.stopAutoRefreshWhenModalIsOpen, interval = _e.interval, silentPolling = _e.silentPolling, env = _e.env;
        store.closeDialog(true);
        var dialogAction = store.action;
        if (stopAutoRefreshWhenModalIsOpen && interval) {
            this.timer = setTimeout(silentPolling ? this.silentSearch : this.search, Math.max(interval, 1000));
        }
        if (action.actionType === 'next' &&
            typeof ctx.nextIndex === 'number' &&
            store.data.items[ctx.nextIndex]) {
            return this.handleAction(undefined, tslib.__assign({}, dialogAction), amisCore.createObject(amisCore.createObject(store.data, {
                index: ctx.nextIndex
            }), store.data.items[ctx.nextIndex]));
        }
        else if (action.actionType === 'prev' &&
            typeof ctx.prevIndex === 'number' &&
            store.data.items[ctx.prevIndex]) {
            return this.handleAction(undefined, tslib.__assign({}, dialogAction), amisCore.createObject(amisCore.createObject(store.data, {
                index: ctx.prevIndex
            }), store.data.items[ctx.prevIndex]));
        }
        else if (values.length) {
            var value = values[0];
            ctx = amisCore.createObject(ctx, value);
            var component = components[0];
            // 提交来自 form
            if (component && component.props.type === 'form') {
                // 数据保存了，说明列表数据已经无效了，重新刷新。
                if (value && value.__saved) {
                    var reload_1 = (_b = action.reload) !== null && _b !== void 0 ? _b : dialogAction.reload;
                    // 配置了 reload 则跳过自动更新。
                    reload_1 ||
                        this.search(dialogAction.__from ? (_a = {}, _a[pageField || 'page'] = 1, _a) : undefined, undefined, true, true);
                }
                else if (value &&
                    ((value.hasOwnProperty('items') && value.items) ||
                        value.hasOwnProperty('ids')) &&
                    this.control.bulkUpdate) {
                    this.control.bulkUpdate(value, value.items);
                }
            }
        }
        var reload = (_c = action.reload) !== null && _c !== void 0 ? _c : dialogAction.reload;
        if (reload) {
            this.reloadTarget(amisCore.filterTarget(reload, ctx), ctx);
        }
        var redirect = (_d = action.redirect) !== null && _d !== void 0 ? _d : dialogAction.redirect;
        redirect = redirect && amisCore.filter(redirect, ctx);
        redirect && env.jumpTo(redirect, dialogAction, ctx);
    };
    CRUD.prototype.handleDialogClose = function (confirmed) {
        if (confirmed === void 0) { confirmed = false; }
        var _a = this.props, store = _a.store, stopAutoRefreshWhenModalIsOpen = _a.stopAutoRefreshWhenModalIsOpen, silentPolling = _a.silentPolling, interval = _a.interval;
        store.closeDialog(confirmed);
        if (stopAutoRefreshWhenModalIsOpen && interval) {
            this.timer = setTimeout(silentPolling ? this.silentSearch : this.search, Math.max(interval, 1000));
        }
    };
    CRUD.prototype.openFeedback = function (dialog, ctx) {
        var _this = this;
        return new Promise(function (resolve) {
            var store = _this.props.store;
            store.setCurrentAction({
                type: 'button',
                actionType: 'dialog',
                dialog: dialog
            });
            store.openDialog(ctx, undefined, function (confirmed) {
                resolve(confirmed);
            }, _this.context);
        });
    };
    CRUD.prototype.search = function (values, silent, clearSelection, forceReload, isInit) {
        var _this = this;
        var _a, _b, _c;
        if (forceReload === void 0) { forceReload = false; }
        if (isInit === void 0) { isInit = false; }
        var _d = this.props, store = _d.store, api = _d.api, messages = _d.messages, pageField = _d.pageField, perPageField = _d.perPageField, interval = _d.interval, stopAutoRefreshWhen = _d.stopAutoRefreshWhen, stopAutoRefreshWhenModalIsOpen = _d.stopAutoRefreshWhenModalIsOpen, silentPolling = _d.silentPolling, syncLocation = _d.syncLocation, syncResponse2Query = _d.syncResponse2Query, keepItemSelectionOnPageChange = _d.keepItemSelectionOnPageChange, pickerMode = _d.pickerMode, env = _d.env, loadDataOnce = _d.loadDataOnce, source = _d.source, columns = _d.columns, dispatchEvent = _d.dispatchEvent;
        // reload 需要清空用户选择。
        if (keepItemSelectionOnPageChange && clearSelection && !pickerMode) {
            store.setSelectedItems([]);
            store.setUnSelectedItems([]);
        }
        var loadDataMode = '';
        if (values && typeof values.loadDataMode === 'string') {
            loadDataMode = 'load-more';
            delete values.loadDataMode;
        }
        clearTimeout(this.timer);
        values &&
            store.updateQuery(values, !loadDataMode && syncLocation && env && env.updateLocation
                ? env.updateLocation
                : undefined, pageField, perPageField);
        this.lastQuery = store.query;
        var data = amisCore.createObject(store.data, store.query);
        var matchFunc = ((_a = this.props) === null || _a === void 0 ? void 0 : _a.matchFunc) && typeof this.props.matchFunc === 'string'
            ? amisCore.str2function(this.props.matchFunc, 'items', 'itemsRaw', 'options')
            : undefined;
        amisCore.isEffectiveApi(api, data)
            ? store
                .fetchInitData(api, data, {
                successMessage: messages && messages.fetchSuccess,
                errorMessage: messages && messages.fetchFailed,
                autoAppend: true,
                forceReload: forceReload,
                loadDataOnce: loadDataOnce,
                source: source,
                silent: silent,
                pageField: pageField,
                perPageField: perPageField,
                loadDataMode: loadDataMode,
                syncResponse2Query: syncResponse2Query,
                columns: (_b = store.columns) !== null && _b !== void 0 ? _b : columns,
                matchFunc: matchFunc
            })
                .then(function (value) { return tslib.__awaiter(_this, void 0, void 0, function () {
                var page, lastPage, data, msg, error, rendererEvent;
                var _a;
                return tslib.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!mobxStateTree.isAlive(store)) {
                                return [2 /*return*/, value];
                            }
                            page = store.page, lastPage = store.lastPage, data = store.data, msg = store.msg, error = store.error;
                            if (!isInit) return [3 /*break*/, 2];
                            return [4 /*yield*/, (dispatchEvent === null || dispatchEvent === void 0 ? void 0 : dispatchEvent('fetchInited', amisCore.createObject(this.props.data, {
                                    responseData: (value === null || value === void 0 ? void 0 : value.ok) ? data !== null && data !== void 0 ? data : {} : value,
                                    responseStatus: (value === null || value === void 0 ? void 0 : value.status) === undefined
                                        ? error
                                            ? 1
                                            : 0
                                        : value === null || value === void 0 ? void 0 : value.status,
                                    responseMsg: msg
                                })))];
                        case 1:
                            rendererEvent = _b.sent();
                            if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                                return [2 /*return*/];
                            }
                            _b.label = 2;
                        case 2:
                            // 空列表 且 页数已经非法超出，则跳转到最后的合法页数
                            if (!store.data.items.length &&
                                !interval &&
                                page > 1 &&
                                lastPage < page) {
                                this.search(tslib.__assign(tslib.__assign({}, store.query), (_a = {}, _a[pageField || 'page'] = lastPage, _a)), false, undefined);
                            }
                            (value === null || value === void 0 ? void 0 : value.ok) && // 接口正常返回才继续轮训
                                interval &&
                                this.mounted &&
                                (!stopAutoRefreshWhen ||
                                    !((stopAutoRefreshWhenModalIsOpen && store.hasModalOpened) ||
                                        amisCore.evalExpression(stopAutoRefreshWhen, amisCore.createObject(store.data, store.query)))) &&
                                (this.timer = setTimeout(silentPolling
                                    ? this.silentSearch.bind(this, undefined, undefined, true)
                                    : this.search.bind(this, undefined, undefined, undefined, true), Math.max(interval, 1000)));
                            return [2 /*return*/, value];
                    }
                });
            }); })
            : source &&
                store.initFromScope(data, source, {
                    columns: (_c = store.columns) !== null && _c !== void 0 ? _c : columns,
                    matchFunc: matchFunc
                });
    };
    CRUD.prototype.silentSearch = function (values, clearSelection, forceReload) {
        if (forceReload === void 0) { forceReload = false; }
        return this.search(values, true, clearSelection, forceReload);
    };
    CRUD.prototype.handleChangePage = function (page, perPage, dir) {
        var _a;
        var _b = this.props, store = _b.store, syncLocation = _b.syncLocation, env = _b.env, pageField = _b.pageField, perPageField = _b.perPageField, pageDirectionField = _b.pageDirectionField, autoJumpToTopOnPagerChange = _b.autoJumpToTopOnPagerChange;
        var query = (_a = {},
            _a[pageField || 'page'] = page,
            _a);
        if (dir) {
            query[pageDirectionField || 'pageDir'] = dir;
        }
        if (perPage) {
            query[perPageField || 'perPage'] = perPage;
        }
        store.updateQuery(query, syncLocation && (env === null || env === void 0 ? void 0 : env.updateLocation) ? env.updateLocation : undefined, pageField, perPageField);
        this.search(undefined, undefined, undefined);
        if (autoJumpToTopOnPagerChange && this.control) {
            ReactDOM.findDOMNode(this.control).scrollIntoView();
            var scrolledY = window.scrollY;
            scrolledY && window.scroll(0, scrolledY);
        }
    };
    CRUD.prototype.handleSave = function (rows, diff, indexes, unModifiedItems, rowsOrigin, options) {
        var _this = this;
        var _a = this.props, store = _a.store, quickSaveApi = _a.quickSaveApi, quickSaveItemApi = _a.quickSaveItemApi, primaryField = _a.primaryField, env = _a.env, messages = _a.messages, reload = _a.reload;
        if (Array.isArray(rows)) {
            if (!amisCore.isEffectiveApi(quickSaveApi)) {
                env && env.alert('CRUD quickSaveApi is required');
                return;
            }
            var data_1 = amisCore.createObject(store.data, {
                rows: rows,
                rowsDiff: diff,
                indexes: indexes,
                rowsOrigin: rowsOrigin
            });
            if (rows.length && rows[0].hasOwnProperty(primaryField || 'id')) {
                data_1.ids = rows
                    .map(function (item) { return item[primaryField || 'id']; })
                    .join(',');
            }
            if (unModifiedItems) {
                data_1.unModifiedItems = unModifiedItems;
            }
            store
                .saveRemote(quickSaveApi, data_1, {
                successMessage: messages && messages.saveFailed,
                errorMessage: messages && messages.saveSuccess
            })
                .then(function () {
                var _a;
                var finalReload = (_a = options === null || options === void 0 ? void 0 : options.reload) !== null && _a !== void 0 ? _a : reload;
                finalReload
                    ? _this.reloadTarget(amisCore.filterTarget(finalReload, data_1), data_1)
                    : _this.search(undefined, undefined, true, true);
            })
                .catch(function () { });
        }
        else {
            if (!amisCore.isEffectiveApi(quickSaveItemApi)) {
                env && env.alert('CRUD quickSaveItemApi is required!');
                return;
            }
            var data_2 = amisCore.createObject(store.data, {
                item: rows,
                modified: diff,
                origin: rowsOrigin
            });
            var sendData = amisCore.createObject(data_2, rows);
            store
                .saveRemote(quickSaveItemApi, sendData)
                .then(function () {
                var _a;
                var finalReload = (_a = options === null || options === void 0 ? void 0 : options.reload) !== null && _a !== void 0 ? _a : reload;
                finalReload
                    ? _this.reloadTarget(amisCore.filterTarget(finalReload, data_2), data_2)
                    : _this.search(undefined, undefined, true, true);
            })
                .catch(function () {
                (options === null || options === void 0 ? void 0 : options.resetOnFailed) && _this.control.reset();
            });
        }
    };
    CRUD.prototype.handleSaveOrder = function (moved, rows) {
        var _this = this;
        var _a = this.props, store = _a.store, saveOrderApi = _a.saveOrderApi, orderField = _a.orderField, primaryField = _a.primaryField, env = _a.env, reload = _a.reload;
        if (!saveOrderApi) {
            env && env.alert('CRUD saveOrderApi is required!');
            return;
        }
        var model = amisCore.createObject(store.data);
        var insertAfter;
        var insertBefore;
        var holding = [];
        var hasIdField = primaryField &&
            rows[0] &&
            rows[0].hasOwnProperty(primaryField);
        hasIdField || (model.idMap = {});
        model.insertAfter = {};
        rows.forEach(function (item) {
            if (~moved.indexOf(item)) {
                if (insertAfter) {
                    var insertAfterId = hasIdField
                        ? insertAfter[primaryField]
                        : rows.indexOf(insertAfter);
                    model.insertAfter[insertAfterId] =
                        model.insertAfter[insertAfterId] || [];
                    hasIdField || (model.idMap[insertAfterId] = insertAfter);
                    model.insertAfter[insertAfterId].push(hasIdField ? item[primaryField] : item);
                }
                else {
                    holding.push(item);
                }
            }
            else {
                insertAfter = item;
                insertBefore = insertBefore || item;
            }
        });
        if (insertBefore && holding.length) {
            var insertBeforeId = hasIdField
                ? insertBefore[primaryField]
                : rows.indexOf(insertBefore);
            hasIdField || (model.idMap[insertBeforeId] = insertBefore);
            model.insertBefore = {};
            model.insertBefore[insertBeforeId] = holding.map(function (item) {
                return hasIdField ? item[primaryField] : item;
            });
        }
        else if (holding.length) {
            var first = holding[0];
            var firstId = hasIdField
                ? first[primaryField]
                : rows.indexOf(first);
            hasIdField || (model.idMap[firstId] = first);
            model.insertAfter[firstId] = holding
                .slice(1)
                .map(function (item) { return (hasIdField ? item[primaryField] : item); });
        }
        if (orderField) {
            var start_1 = (store.page - 1) * store.perPage || 0;
            rows = amisCore.mapTree(rows, function (item, key, level) {
                var _a;
                return amisCore.extendObject(item, (_a = {},
                    _a[orderField] = (level === 1 ? start_1 : 0) + key + 1,
                    _a));
            });
        }
        model.rows = rows.concat();
        if (hasIdField) {
            var joinIdFields_1 = function (items) {
                return items
                    .map(function (item) {
                    return "".concat(item[primaryField]).concat(Array.isArray(item.children) && item.children.length
                        ? "[".concat(joinIdFields_1(item.children), "]")
                        : '');
                })
                    .join(',');
            };
            model.ids = joinIdFields_1(rows);
            orderField &&
                (model.order = amisCore.mapTree(rows, function (item) {
                    return pick__default["default"](item, [primaryField, orderField, 'children']);
                }));
        }
        amisCore.isEffectiveApi(saveOrderApi, model) &&
            store
                .saveRemote(saveOrderApi, model)
                .then(function () {
                reload && _this.reloadTarget(amisCore.filterTarget(reload, model), model);
                _this.search(undefined, undefined, true, true);
            })
                .catch(function () { });
    };
    CRUD.prototype.handleSelect = function (items, unSelectedItems) {
        var _a = this.props, store = _a.store, keepItemSelectionOnPageChange = _a.keepItemSelectionOnPageChange, primaryField = _a.primaryField, multiple = _a.multiple, pickerMode = _a.pickerMode, strictMode = _a.strictMode, onSelect = _a.onSelect;
        var newItems = items;
        var newUnSelectedItems = unSelectedItems;
        if (keepItemSelectionOnPageChange && store.selectedItems.length) {
            var oldItems_1 = store.selectedItems.concat();
            var oldUnselectedItems_1 = store.unSelectedItems.concat();
            var isSameValue_1 = function (a, item) {
                var oldValue = a[primaryField || 'id'];
                var itemValue = item[primaryField || 'id'];
                var isSame = strictMode
                    ? oldValue === itemValue
                    : oldValue == itemValue;
                return a === item || (oldValue && isSame);
            };
            items.forEach(function (item) {
                var idx = findIndex__default["default"](oldItems_1, function (a) { return isSameValue_1(a, item); });
                if (~idx) {
                    oldItems_1[idx] = item;
                }
                else {
                    oldItems_1.push(item);
                }
                var idx2 = findIndex__default["default"](oldUnselectedItems_1, function (a) { return isSameValue_1(a, item); });
                if (~idx2) {
                    oldUnselectedItems_1.splice(idx2, 1);
                }
            });
            unSelectedItems.forEach(function (item) {
                var idx = findIndex__default["default"](oldUnselectedItems_1, function (a) { return isSameValue_1(a, item); });
                var idx2 = findIndex__default["default"](oldItems_1, function (a) { return isSameValue_1(a, item); });
                if (~idx) {
                    oldUnselectedItems_1[idx] = item;
                }
                else {
                    oldUnselectedItems_1.push(item);
                }
                !~idx && ~idx2 && oldItems_1.splice(idx2, 1);
            });
            newItems = oldItems_1;
            newUnSelectedItems = oldUnselectedItems_1;
            // const thisBatch = items.concat(unSelectedItems);
            // let notInThisBatch = (item: any) =>
            //   !find(
            //     thisBatch,
            //     a => a[primaryField || 'id'] == item[primaryField || 'id']
            //   );
            // newItems = store.selectedItems.filter(notInThisBatch);
            // newUnSelectedItems = store.unSelectedItems.filter(notInThisBatch);
            // newItems.push(...items);
            // newUnSelectedItems.push(...unSelectedItems);
        }
        if (pickerMode && multiple === false && newItems.length > 1) {
            newUnSelectedItems.push.apply(newUnSelectedItems, newItems.splice(0, newItems.length - 1));
        }
        // 用 updateSelectData 导致 CRUD 无限刷新
        // store.updateSelectData(newItems, newUnSelectedItems);
        store.setSelectedItems(newItems);
        store.setUnSelectedItems(newUnSelectedItems);
        onSelect && onSelect(newItems, newUnSelectedItems);
    };
    CRUD.prototype.handleChildPopOverOpen = function (popOver) {
        if (this.props.interval &&
            popOver &&
            ~['dialog', 'drawer'].indexOf(popOver.mode)) {
            this.props.stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
            this.props.store.setInnerModalOpened(true);
        }
    };
    CRUD.prototype.handleChildPopOverClose = function (popOver) {
        var _a = this.props, stopAutoRefreshWhenModalIsOpen = _a.stopAutoRefreshWhenModalIsOpen, silentPolling = _a.silentPolling, interval = _a.interval;
        if (popOver && ~['dialog', 'drawer'].indexOf(popOver.mode)) {
            this.props.store.setInnerModalOpened(false);
            if (stopAutoRefreshWhenModalIsOpen && interval) {
                this.timer = setTimeout(silentPolling ? this.silentSearch : this.search, Math.max(interval, 1000));
            }
        }
    };
    CRUD.prototype.handleQuery = function (values, forceReload, replace, resetPage) {
        var _a;
        var _b = this.props, store = _b.store, syncLocation = _b.syncLocation, env = _b.env, pageField = _b.pageField, perPageField = _b.perPageField, loadDataOnceFetchOnFilter = _b.loadDataOnceFetchOnFilter;
        store.updateQuery(resetPage
            ? tslib.__assign((_a = {}, _a[pageField || 'page'] = 1, _a), values) : values, syncLocation && env && env.updateLocation
            ? env.updateLocation
            : undefined, pageField, perPageField, replace);
        this.search(undefined, undefined, replace, forceReload !== null && forceReload !== void 0 ? forceReload : loadDataOnceFetchOnFilter === true);
    };
    CRUD.prototype.reload = function (subpath, query, replace, resetPage) {
        if (query) {
            return this.receive(query, undefined, replace, resetPage);
        }
        else {
            this.search(undefined, undefined, true, true);
        }
    };
    CRUD.prototype.receive = function (values, subPath, replace, resetPage) {
        this.handleQuery(values, true, replace, resetPage);
    };
    CRUD.prototype.reloadTarget = function (target, data) {
        // implement this.
    };
    CRUD.prototype.closeTarget = function (target) {
        // implement this.
    };
    CRUD.prototype.doAction = function (action, data, throwErrors) {
        if (throwErrors === void 0) { throwErrors = false; }
        return this.handleAction(undefined, action, data, throwErrors);
    };
    CRUD.prototype.unSelectItem = function (item, index) {
        var store = this.props.store;
        var selected = store.selectedItems.concat();
        var unSelected = store.unSelectedItems.concat();
        var idx = selected.indexOf(item);
        ~idx && unSelected.push.apply(unSelected, selected.splice(idx, 1));
        store.setSelectedItems(selected);
        store.setUnSelectedItems(unSelected);
    };
    CRUD.prototype.clearSelection = function () {
        var store = this.props.store;
        var selected = store.selectedItems.concat();
        var unSelected = store.unSelectedItems.concat();
        store.setSelectedItems([]);
        store.setUnSelectedItems(unSelected.concat(selected));
    };
    CRUD.prototype.hasBulkActionsToolbar = function () {
        var _a = this.props, headerToolbar = _a.headerToolbar, footerToolbar = _a.footerToolbar;
        var isBulkActions = function (item) {
            return ~['bulkActions', 'bulk-actions'].indexOf(item.type || item);
        };
        return ((Array.isArray(headerToolbar) && find__default["default"](headerToolbar, isBulkActions)) ||
            (Array.isArray(footerToolbar) && find__default["default"](footerToolbar, isBulkActions)));
    };
    CRUD.prototype.hasBulkActions = function () {
        var _a = this.props, bulkActions = _a.bulkActions; _a.itemActions; var store = _a.store;
        if (!bulkActions || !bulkActions.length) {
            return false;
        }
        var bulkBtns = [];
        var ctx = store.mergedData;
        if (bulkActions && bulkActions.length) {
            bulkBtns = bulkActions
                .map(function (item) { return (tslib.__assign(tslib.__assign({}, item), amisCore.getExprProperties(item, ctx))); })
                .filter(function (item) { return !item.hidden && item.visible !== false; });
        }
        return bulkBtns.length;
    };
    CRUD.prototype.renderBulkActions = function (childProps) {
        var _this = this;
        var _a;
        var _b = this.props, bulkActions = _b.bulkActions, itemActions = _b.itemActions, store = _b.store, render = _b.render, cx = _b.classnames, primaryField = _b.primaryField;
        if (!bulkActions || !bulkActions.length) {
            return null;
        }
        var selectedItems = store.selectedItems;
        var unSelectedItems = store.unSelectedItems;
        var bulkBtns = [];
        var itemBtns = [];
        var ctx = amisCore.createObject(store.mergedData, {
            currentPageData: (((_a = store.mergedData) === null || _a === void 0 ? void 0 : _a.items) || []).concat(),
            rows: selectedItems.concat(),
            items: selectedItems.concat(),
            selectedItems: selectedItems.concat(),
            unSelectedItems: unSelectedItems.concat(),
            ids: selectedItems
                .map(function (item) {
                return item.hasOwnProperty(primaryField)
                    ? item[primaryField]
                    : null;
            })
                .filter(function (item) { return item; })
                .join(',')
        });
        // const ctx = createObject(store.data, {
        //     ...store.query,
        //     items: childProps.items,
        //     selectedItems: childProps.selectedItems,
        //     unSelectedItems: childProps.unSelectedItems
        // });
        if (bulkActions &&
            bulkActions.length &&
            (!itemActions || !itemActions.length || selectedItems.length > 1)) {
            bulkBtns = bulkActions
                .map(function (item) { return (tslib.__assign(tslib.__assign({}, item), amisCore.getExprProperties(item, ctx))); })
                .filter(function (item) { return !item.hidden && item.visible !== false; });
        }
        var itemData = amisCore.createObject(store.data, selectedItems.length ? selectedItems[0] : {});
        if (itemActions && selectedItems.length <= 1) {
            itemBtns = itemActions
                .map(function (item) { return (tslib.__assign(tslib.__assign({}, item), amisCore.getExprProperties(item, itemData))); })
                .filter(function (item) { return !item.hidden && item.visible !== false; });
        }
        return bulkBtns.length || itemBtns.length ? (_J$X_("div", { className: cx('Crud-actions') },
            bulkBtns.map(function (btn, index) {
                return render("bulk-action/".concat(index), tslib.__assign(tslib.__assign({}, omit__default["default"](btn, ['visibleOn', 'hiddenOn', 'disabledOn'])), { type: btn.type || 'button', ignoreConfirm: true }), {
                    key: "bulk-".concat(index),
                    data: ctx,
                    disabled: btn.disabled ||
                        (btn.requireSelected !== false ? !selectedItems.length : false),
                    onAction: _this.handleBulkAction.bind(_this, selectedItems.concat(), unSelectedItems.concat())
                });
            }),
            itemBtns.map(function (btn, index) {
                return render("bulk-action/".concat(index), tslib.__assign(tslib.__assign({}, omit__default["default"](btn, ['visibleOn', 'hiddenOn', 'disabledOn'])), { type: 'button' }), {
                    key: "item-".concat(index),
                    data: itemData,
                    disabled: btn.disabled || selectedItems.length !== 1,
                    onAction: _this.handleItemAction.bind(_this, btn, itemData)
                });
            }))) : null;
    };
    CRUD.prototype.renderPagination = function (toolbar) {
        var _a = this.props, store = _a.store, render = _a.render, cx = _a.classnames, alwaysShowPagination = _a.alwaysShowPagination, perPageAvailable = _a.perPageAvailable;
        var page = store.page, lastPage = store.lastPage;
        if (store.mode !== 'simple' &&
            store.lastPage < 2 &&
            !alwaysShowPagination) {
            return null;
        }
        var extraProps = {};
        // 下发 perPageAvailable
        if (Array.isArray(perPageAvailable)) {
            extraProps.perPageAvailable = perPageAvailable;
        }
        /** 优先级：showPageInput显性配置 > (lastPage > 9) */
        if (typeof toolbar !== 'string') {
            Object.assign(extraProps, toolbar);
            var showPageInput = toolbar.showPageInput;
            extraProps.showPageInput =
                showPageInput === true || (lastPage > 9 && showPageInput == null);
            extraProps.total = amisCore.resolveVariableAndFilter(toolbar.total, store.data);
        }
        else {
            extraProps.showPageInput = lastPage > 9;
        }
        return (_J$X_("div", { className: cx('Crud-pager') }, render('pagination', {
            type: 'pagination'
        }, tslib.__assign(tslib.__assign({}, extraProps), { activePage: page, lastPage: lastPage, hasNext: store.hasNext, mode: store.mode, perPage: store.perPage, popOverContainer: this.parentContainer, onPageChange: this.handleChangePage }))));
    };
    CRUD.prototype.renderStatistics = function () {
        var _a = this.props, store = _a.store, cx = _a.classnames, __ = _a.translate, alwaysShowPagination = _a.alwaysShowPagination;
        if (store.lastPage <= 1 && !alwaysShowPagination) {
            return null;
        }
        return (_J$X_("div", { className: cx('Crud-statistics') }, __('CRUD.stat', {
            page: store.page,
            lastPage: store.lastPage,
            total: store.total
        })));
    };
    CRUD.prototype.renderSwitchPerPage = function (childProps) {
        var _this = this;
        var _a = this.props, mobileUI = _a.mobileUI, store = _a.store, perPageAvailable = _a.perPageAvailable, cx = _a.classnames, ns = _a.classPrefix, __ = _a.translate;
        var items = childProps.items;
        if (!items.length) {
            return null;
        }
        var perPages = mobileUI
            ? (perPageAvailable || [5, 10, 20, 50, 100]).map(function (item) { return ({
                label: item + ' 条/页',
                value: item + ''
            }); })
            : (perPageAvailable || [5, 10, 20, 50, 100]).map(function (item) { return ({
                label: item,
                value: item + ''
            }); });
        return (_J$X_("div", { className: cx('Crud-pageSwitch') },
            !mobileUI ? _J$X_("span", null, __('CRUD.perPage')) : null,
            _J$X_(amisUi.Select, { classPrefix: ns, searchable: false, placeholder: __('Select.placeholder'), options: perPages, value: store.perPage + '', onChange: function (value) { return _this.handleChangePage(1, value.value); }, clearable: false, popOverContainer: this.parentContainer })));
    };
    CRUD.prototype.renderLoadMore = function () {
        var _this = this;
        var _a = this.props, store = _a.store, ns = _a.classPrefix, cx = _a.classnames, __ = _a.translate;
        var page = store.page, lastPage = store.lastPage;
        return (_J$X_("div", { className: cx('Crud-loadMore') },
            _J$X_(amisUi.Button, { disabled: page >= lastPage, disabledTip: __('CRUD.loadMoreDisableTip'), classPrefix: ns, onClick: function () {
                    return _this.search({ page: page + 1, loadDataMode: 'load-more' });
                }, size: "sm" }, __('CRUD.loadMore'))));
    };
    CRUD.prototype.renderFilterToggler = function () {
        var _a, _b, _c;
        var _d = this.props, store = _d.store, cx = _d.classnames, __ = _d.translate, filterTogglable = _d.filterTogglable;
        if (!store.filterTogggable) {
            return null;
        }
        var custom = isPlainObject__default["default"](filterTogglable)
            ? tslib.__assign({}, filterTogglable) : {};
        if (store.filterVisible) {
            custom.icon = (_a = custom.activeIcon) !== null && _a !== void 0 ? _a : custom.icon;
            custom.label = (_b = custom.activeLabel) !== null && _b !== void 0 ? _b : custom.label;
        }
        return (_J$X_("button", { onClick: function () { return store.setFilterVisible(!store.filterVisible); }, className: cx('Button Button--size-default Button--default', {
                'is-active': store.filterVisible
            }) },
            custom.icon ? (_J$X_(amisUi.Icon, { icon: custom.icon, className: "icon m-r-xs" })) : (custom === null || custom === void 0 ? void 0 : custom.icon) !== false ? (_J$X_(amisUi.Icon, { icon: "filter", className: "icon m-r-xs" })) : null, (_c = custom === null || custom === void 0 ? void 0 : custom.label) !== null && _c !== void 0 ? _c : __('CRUD.filter')));
    };
    CRUD.prototype.renderExportCSV = function (toolbar) {
        var _a = this.props, store = _a.store, ns = _a.classPrefix, __ = _a.translate, loadDataOnce = _a.loadDataOnce;
        var api = toolbar.api;
        var filename = toolbar.filename;
        return (_J$X_(amisUi.Button, { classPrefix: ns, onClick: function () {
                return store.exportAsCSV({
                    loadDataOnce: loadDataOnce,
                    api: api,
                    filename: filename,
                    data: store.filterData /* 因为filter区域可能设置了过滤字段值，所以query信息也要写入数据域 */
                });
            } }, toolbar.label || __('CRUD.exportCSV')));
    };
    CRUD.prototype.renderToolbar = function (toolbar, index, childProps, toolbarRenderer) {
        var _this = this;
        if (index === void 0) { index = 0; }
        if (childProps === void 0) { childProps = {}; }
        if (!toolbar) {
            return null;
        }
        var _a = this.props, render = _a.render, store = _a.store, mobileUI = _a.mobileUI, __ = _a.translate;
        var type = toolbar.type || toolbar;
        if (type === 'bulkActions' || type === 'bulk-actions') {
            return this.renderBulkActions(childProps);
        }
        else if (type === 'pagination') {
            return this.renderPagination(toolbar);
        }
        else if (type === 'statistics') {
            return this.renderStatistics();
        }
        else if (type === 'switch-per-page') {
            return this.renderSwitchPerPage(childProps);
        }
        else if (type === 'load-more') {
            return this.renderLoadMore();
        }
        else if (type === 'filter-toggler') {
            return this.renderFilterToggler();
        }
        else if (type === 'export-csv') {
            return this.renderExportCSV(toolbar);
        }
        else if (type === 'reload') {
            var reloadButton = {
                label: '',
                icon: 'fa fa-sync',
                tooltip: __('reload'),
                tooltipPlacement: 'top',
                type: 'button'
            };
            if (typeof toolbar === 'object') {
                reloadButton = tslib.__assign(tslib.__assign({}, reloadButton), omit__default["default"](toolbar, ['type', 'align']));
            }
            return render("toolbar/".concat(index), reloadButton, {
                onAction: function () {
                    _this.reload();
                }
            });
        }
        else if (Array.isArray(toolbar)) {
            var children = toolbar
                .filter(function (toolbar) { return amisCore.isVisible(toolbar, store.filterData); })
                .map(function (toolbar, index) { return ({
                dom: _this.renderToolbar(toolbar, index, childProps, toolbarRenderer),
                toolbar: toolbar
            }); })
                .filter(function (item) { return item.dom; });
            var len = children.length;
            var cx_1 = this.props.classnames;
            if (len) {
                return (_J$X_("div", { className: cx_1('Crud-toolbar'), key: index }, children.map(function (_a, index) {
                    var toolbar = _a.toolbar, child = _a.dom;
                    var type = toolbar.type || toolbar;
                    var align = toolbar.align || (type === 'pagination' ? 'right' : 'left');
                    return (_J$X_("div", { key: toolbar.id || index, className: cx_1('Crud-toolbar-item', align ? "Crud-toolbar-item--".concat(align) : '', {
                            'is-mobile': mobileUI
                        }
                        // toolbar.className
                        ) }, child));
                })));
            }
            return null;
        }
        var result = toolbarRenderer
            ? toolbarRenderer(toolbar, index)
            : undefined;
        if (result !== void 0) {
            return result;
        }
        var $$editable = childProps.$$editable;
        return render("toolbar/".concat(index), toolbar, {
            data: store.toolbarData,
            page: store.page,
            lastPage: store.lastPage,
            perPage: store.perPage,
            total: store.total,
            onQuery: this.handleQuery,
            onAction: this.handleAction,
            onChangePage: this.handleChangePage,
            onBulkAction: this.handleBulkAction,
            $$editable: $$editable
        });
    };
    CRUD.prototype.renderHeaderToolbar = function (childProps, toolbarRenderer) {
        var _a = this.props, toolbar = _a.toolbar, toolbarInline = _a.toolbarInline, headerToolbar = _a.headerToolbar;
        if (toolbar) {
            if (Array.isArray(headerToolbar)) {
                headerToolbar = toolbarInline
                    ? headerToolbar.concat(toolbar)
                    : [headerToolbar, toolbar];
            }
            else if (headerToolbar) {
                headerToolbar = [headerToolbar, toolbar];
            }
            else {
                headerToolbar = toolbar;
            }
        }
        return this.renderToolbar(headerToolbar || [], 0, childProps, toolbarRenderer);
    };
    CRUD.prototype.renderFooterToolbar = function (childProps, toolbarRenderer) {
        var _a = this.props, toolbar = _a.toolbar, toolbarInline = _a.toolbarInline, footerToolbar = _a.footerToolbar;
        if (toolbar) {
            if (Array.isArray(footerToolbar)) {
                footerToolbar = toolbarInline
                    ? footerToolbar.concat(toolbar)
                    : [footerToolbar, toolbar];
            }
            else if (footerToolbar) {
                footerToolbar = [footerToolbar, toolbar];
            }
            else {
                footerToolbar = toolbar;
            }
        }
        return this.renderToolbar(footerToolbar, 0, childProps, toolbarRenderer);
    };
    CRUD.prototype.renderTag = function (item, index) {
        var _a = this.props, cx = _a.classnames, labelField = _a.labelField, labelTpl = _a.labelTpl, primaryField = _a.primaryField, valueField = _a.valueField; _a.translate; var env = _a.env;
        return (_J$X_("div", { key: index, className: cx("Crud-value") },
            _J$X_("span", { className: cx('Crud-valueIcon'), onClick: this.unSelectItem.bind(this, item, index) }, "\u00D7"),
            _J$X_("span", { className: cx('Crud-valueLabel') }, labelTpl ? (_J$X_(amisUi.Html, { html: amisCore.filter(labelTpl, item), filterHtml: env.filterHtml })) : (amisCore.getVariable(item, labelField || 'label') ||
                amisCore.getVariable(item, valueField || primaryField || 'id')))));
    };
    CRUD.prototype.renderSelection = function () {
        var _this = this;
        var _a = this.props, store = _a.store, ns = _a.classPrefix, cx = _a.classnames; _a.labelField; _a.labelTpl; _a.primaryField; _a.valueField; var __ = _a.translate; _a.env; var popOverContainer = _a.popOverContainer, multiple = _a.multiple, maxTagCount = _a.maxTagCount, overflowTagPopover = _a.overflowTagPopover;
        if (!store.selectedItems.length) {
            return null;
        }
        var totalCount = store.selectedItems.length;
        var tags = store.selectedItems;
        var enableOverflow = multiple !== false &&
            amisCore.isIntegerInRange(maxTagCount, {
                start: 0,
                end: totalCount,
                left: 'inclusive',
                right: 'exclusive'
            });
        if (enableOverflow) {
            tags = tslib.__spreadArray(tslib.__spreadArray([], tslib.__read(store.selectedItems.slice(0, maxTagCount)), false), [
                { label: "+ ".concat(totalCount - maxTagCount, " ..."), value: '__overflow_tag__' }
            ], false);
        }
        return (_J$X_("div", { className: cx('Crud-selection') },
            _J$X_("div", { className: cx('Crud-selectionLabel') }, __('CRUD.selected', { total: store.selectedItems.length })),
            tags.map(function (item, index) {
                if (enableOverflow && index === maxTagCount) {
                    return (_J$X_(amisUi.TooltipWrapper, { key: index, container: popOverContainer, tooltip: tslib.__assign(tslib.__assign({ placement: 'top', trigger: 'hover', showArrow: false, offset: [0, -10], tooltipClassName: cx('Crud-selection-overflow', overflowTagPopover === null || overflowTagPopover === void 0 ? void 0 : overflowTagPopover.tooltipClassName), title: __('已选项') }, omit__default["default"](overflowTagPopover, [
                            'children',
                            'content',
                            'tooltipClassName'
                        ])), { children: function () {
                                return (_J$X_("div", { className: cx("".concat(ns, "Crud-selection-overflow-wrapper")) }, store.selectedItems
                                    .slice(maxTagCount, totalCount)
                                    .map(function (overflowItem, rawIndex) {
                                    var key = rawIndex + maxTagCount;
                                    return _this.renderTag(overflowItem, key);
                                })));
                            } }) },
                        _J$X_("div", { key: index, className: cx("Crud-value") },
                            _J$X_("span", { className: cx('Crud-valueLabel') }, item.label))));
                }
                return _this.renderTag(item, index);
            }),
            _J$X_("a", { onClick: this.clearSelection, className: cx('Crud-selectionClear') }, __('clear'))));
    };
    CRUD.prototype.render = function () {
        var _a;
        var _b = this.props, className = _b.className, style = _b.style, bodyClassName = _b.bodyClassName, filter = _b.filter, render = _b.render, store = _b.store, mode = _b.mode; _b.syncLocation; _b.children; var bulkActions = _b.bulkActions, pickerMode = _b.pickerMode, multiple = _b.multiple, strictMode = _b.strictMode, valueField = _b.valueField, primaryField = _b.primaryField; _b.value; var hideQuickSaveBtn = _b.hideQuickSaveBtn, itemActions = _b.itemActions, cx = _b.classnames, keepItemSelectionOnPageChange = _b.keepItemSelectionOnPageChange, maxKeepItemSelectionLength = _b.maxKeepItemSelectionLength; _b.onAction; var popOverContainer = _b.popOverContainer, __ = _b.translate; _b.onQuery; var autoGenerateFilter = _b.autoGenerateFilter; _b.onSelect; var autoFillHeight = _b.autoFillHeight, onEvent = _b.onEvent; _b.onSave; _b.onSaveOrder; _b.onPopOverOpened; _b.onPopOverClosed; _b.onSearchableFromReset; _b.onSearchableFromSubmit; _b.onSearchableFromInit; _b.headerToolbarRender; _b.footerToolbarRender; var rest = tslib.__rest(_b, ["className", "style", "bodyClassName", "filter", "render", "store", "mode", "syncLocation", "children", "bulkActions", "pickerMode", "multiple", "strictMode", "valueField", "primaryField", "value", "hideQuickSaveBtn", "itemActions", "classnames", "keepItemSelectionOnPageChange", "maxKeepItemSelectionLength", "onAction", "popOverContainer", "translate", "onQuery", "autoGenerateFilter", "onSelect", "autoFillHeight", "onEvent", "onSave", "onSaveOrder", "onPopOverOpened", "onPopOverClosed", "onSearchableFromReset", "onSearchableFromSubmit", "onSearchableFromInit", "headerToolbarRender", "footerToolbarRender"]);
        return (_J$X_("div", { className: cx('Crud', className, {
                'is-loading': store.loading,
                'is-mobile': amisCore.isMobile()
            }), style: style },
            filter && (!store.filterTogggable || store.filterVisible)
                ? render('filter', tslib.__assign(tslib.__assign({ title: __('CRUD.filter'), mode: 'inline', submitText: __('search') }, filter), { type: 'form', api: null }), {
                    key: 'filter',
                    panelClassName: cx('Crud-filter', filter.panelClassName || 'Panel--default'),
                    data: store.filterData,
                    onReset: this.handleFilterReset,
                    onSubmit: this.handleFilterSubmit,
                    onInit: this.handleFilterInit,
                    formStore: undefined,
                    canAccessSuperData: false
                })
                : null,
            keepItemSelectionOnPageChange && multiple !== false
                ? this.renderSelection()
                : null,
            render('body', tslib.__assign(tslib.__assign({}, rest), { 
                // 通用事件 例如cus-event 如果直接透传给table 则会被触发2次
                // 因此只将下层组件table、cards中自定义事件透传下去 否则通过crud配置了也不会执行
                onEvent: this.filterOnEvent(onEvent), columns: (_a = store.columns) !== null && _a !== void 0 ? _a : rest.columns, type: mode || 'table' }), {
                key: 'body',
                className: cx('Crud-body', bodyClassName),
                ref: this.controlRef,
                autoGenerateFilter: !filter && autoGenerateFilter,
                autoFillHeight: autoFillHeight,
                selectable: !!((this.hasBulkActionsToolbar() && this.hasBulkActions()) ||
                    pickerMode),
                itemActions: itemActions,
                multiple: multiple === void 0
                    ? bulkActions && bulkActions.length > 0
                        ? true
                        : false
                    : multiple,
                selected: pickerMode || keepItemSelectionOnPageChange
                    ? store.selectedItemsAsArray
                    : undefined,
                strictMode: strictMode,
                keepItemSelectionOnPageChange: keepItemSelectionOnPageChange,
                maxKeepItemSelectionLength: maxKeepItemSelectionLength,
                valueField: valueField || primaryField,
                primaryField: primaryField,
                hideQuickSaveBtn: hideQuickSaveBtn,
                items: store.data.items,
                query: store.query,
                orderBy: store.query.orderBy,
                orderDir: store.query.orderDir,
                popOverContainer: popOverContainer,
                onAction: this.handleAction,
                onSave: this.handleSave,
                onSaveOrder: this.handleSaveOrder,
                onQuery: this.handleQuery,
                onSelect: this.handleSelect,
                onPopOverOpened: this.handleChildPopOverOpen,
                onPopOverClosed: this.handleChildPopOverClose,
                onSearchableFromReset: this.handleFilterReset,
                onSearchableFromSubmit: this.handleFilterSubmit,
                onSearchableFromInit: this.handleFilterInit,
                headerToolbarRender: this.renderHeaderToolbar,
                footerToolbarRender: this.renderFooterToolbar,
                data: store.mergedData,
                loading: store.loading
            }),
            render('dialog', tslib.__assign(tslib.__assign({}, (store.action &&
                store.action.dialog)), { type: 'dialog' }), {
                key: 'dialog',
                data: store.dialogData,
                onConfirm: this.handleDialogConfirm,
                onClose: this.handleDialogClose,
                show: store.dialogOpen
            })));
    };
    CRUD.propsList = [
        'bulkActions',
        'itemActions',
        'mode',
        'orderField',
        'syncLocation',
        'toolbar',
        'toolbarInline',
        'messages',
        'value',
        'options',
        'multiple',
        'valueField',
        'defaultParams',
        'bodyClassName',
        'perPageAvailable',
        'pageField',
        'perPageField',
        'pageDirectionField',
        'hideQuickSaveBtn',
        'autoJumpToTopOnPagerChange',
        'interval',
        'silentPolling',
        'stopAutoRefreshWhen',
        'stopAutoRefreshWhenModalIsOpen',
        'api',
        'affixHeader',
        'columnsTogglable',
        'placeholder',
        'tableClassName',
        'headerClassName',
        'footerClassName',
        // 'toolbarClassName',
        'headerToolbar',
        'footerToolbar',
        'filterTogglable',
        'filterDefaultVisible',
        'autoGenerateFilter',
        'syncResponse2Query',
        'keepItemSelectionOnPageChange',
        'labelTpl',
        'labelField',
        'loadDataOnce',
        'loadDataOnceFetchOnFilter',
        'source',
        'header',
        'columns',
        'size',
        'onChange',
        'onInit',
        'onSaved',
        'onSave',
        'onQuery',
        'formStore',
        'autoFillHeight',
        'maxTagCount',
        'overflowTagPopover',
        'parsePrimitiveQuery',
        'matchFunc'
    ];
    CRUD.defaultProps = {
        toolbarInline: true,
        headerToolbar: ['bulkActions'],
        footerToolbar: ['statistics', 'pagination'],
        primaryField: 'id',
        syncLocation: true,
        pageField: 'page',
        perPageField: 'perPage',
        pageDirectionField: 'pageDir',
        hideQuickSaveBtn: false,
        autoJumpToTopOnPagerChange: true,
        silentPolling: false,
        filterTogglable: false,
        filterDefaultVisible: true,
        loadDataOnce: false,
        autoFillHeight: false,
        parsePrimitiveQuery: true
    };
    return CRUD;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(CRUDRenderer, _super);
    function CRUDRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    CRUDRenderer.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        var scoped = this.context;
        scoped.unRegisterComponent(this);
    };
    CRUDRenderer.prototype.reload = function (subpath, query, ctx, silent, replace, args) {
        var _a;
        var scoped = this.context;
        if (subpath) {
            return scoped.reload(query ? "".concat(subpath, "?").concat(amisCore.qsstringify(query)) : subpath, ctx);
        }
        return _super.prototype.reload.call(this, subpath, query, replace, (_a = args === null || args === void 0 ? void 0 : args.resetPage) !== null && _a !== void 0 ? _a : true);
    };
    CRUDRenderer.prototype.receive = function (values, subPath, replace, resetPage) {
        var scoped = this.context;
        if (subPath) {
            return scoped.send(subPath, values);
        }
        return _super.prototype.receive.call(this, values, undefined, replace, resetPage);
    };
    CRUDRenderer.prototype.reloadTarget = function (target, data) {
        var scoped = this.context;
        scoped.reload(target, data);
    };
    CRUDRenderer.prototype.closeTarget = function (target) {
        var scoped = this.context;
        scoped.close(target);
    };
    CRUDRenderer.prototype.setData = function (values, replace, index, condition) {
        var _a;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var store, len, items_1, indexs, items, i, item, isUpdate, total;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        store = this.props.store;
                        len = store.data.items.length;
                        if (!(index !== undefined)) return [3 /*break*/, 1];
                        items_1 = tslib.__spreadArray([], tslib.__read(store.data.items), false);
                        indexs = String(index).split(',');
                        indexs.forEach(function (i) {
                            var intIndex = Number(i);
                            items_1.splice(intIndex, 1, values);
                        });
                        // 更新指定行记录，只需要提供行记录即可
                        return [2 /*return*/, store.updateData(tslib.__assign(tslib.__assign({}, values), { items: items_1 }), undefined, replace)];
                    case 1:
                        if (!(condition !== undefined)) return [3 /*break*/, 6];
                        items = tslib.__spreadArray([], tslib.__read(store.data.items), false);
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < len)) return [3 /*break*/, 5];
                        item = items[i];
                        return [4 /*yield*/, amisCore.evalExpressionWithConditionBuilder(condition, item)];
                    case 3:
                        isUpdate = _b.sent();
                        if (isUpdate) {
                            items.splice(i, 1, values);
                        }
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: 
                    // 更新指定行记录，只需要提供行记录即可
                    return [2 /*return*/, store.updateData(tslib.__assign(tslib.__assign({}, values), { items: items }), undefined, replace)];
                    case 6:
                        total = (values === null || values === void 0 ? void 0 : values.total) || (values === null || values === void 0 ? void 0 : values.count);
                        if (total !== undefined) {
                            store.updateTotal(parseInt(total, 10));
                        }
                        return [2 /*return*/, store.updateData(tslib.__assign(tslib.__assign({}, values), { items: (_a = values.rows) !== null && _a !== void 0 ? _a : values.items }), // 做个兼容
                            undefined, replace)];
                }
            });
        });
    };
    CRUDRenderer.prototype.getData = function () {
        var _a = this.props, store = _a.store, data = _a.data;
        return store.getData(data);
    };
    CRUDRenderer.contextType = amisCore.ScopedContext;
    CRUDRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'crud',
            storeType: amisCore.CRUDStore.name,
            isolateScope: true
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], CRUDRenderer);
    return CRUDRenderer;
})(CRUD));

exports["default"] = CRUD;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
