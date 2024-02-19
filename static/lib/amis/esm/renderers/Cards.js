/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __assign, __decorate, __metadata } from 'tslib';
import React from 'react';
import { findDOMNode } from 'react-dom';
import { resolveVariableAndFilter, anyChanged, isPureVariable, createObject, difference, filter, filterClassNameObject, ucFirst, setThemeClassName, buildStyle, CustomStyle, autobind, Renderer, ListStore } from 'amis-core';
import { Icon, Button, Spinner } from 'amis-ui';
import Sortable from 'sortablejs';
import find from 'lodash/find';

var Cards = /** @class */ (function (_super) {
    __extends(Cards, _super);
    function Cards(props) {
        var _this = _super.call(this, props) || this;
        _this.handleAction = _this.handleAction.bind(_this);
        _this.handleCheck = _this.handleCheck.bind(_this);
        _this.handleCheckAll = _this.handleCheckAll.bind(_this);
        _this.handleQuickChange = _this.handleQuickChange.bind(_this);
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleSaveOrder = _this.handleSaveOrder.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.dragTipRef = _this.dragTipRef.bind(_this);
        _this.bodyRef = _this.bodyRef.bind(_this);
        _this.renderToolbar = _this.renderToolbar.bind(_this);
        var store = props.store, selectable = props.selectable, draggable = props.draggable, orderBy = props.orderBy, orderDir = props.orderDir, multiple = props.multiple, hideCheckToggler = props.hideCheckToggler, itemCheckableOn = props.itemCheckableOn, itemDraggableOn = props.itemDraggableOn;
        store.update({
            selectable: selectable,
            draggable: draggable,
            orderBy: orderBy,
            orderDir: orderDir,
            multiple: multiple,
            hideCheckToggler: hideCheckToggler,
            itemCheckableOn: itemCheckableOn,
            itemDraggableOn: itemDraggableOn
        });
        Cards.syncItems(store, _this.props) && _this.syncSelected();
        return _this;
    }
    Cards.syncItems = function (store, props, prevProps) {
        var source = props.source;
        var value = props.value || props.items;
        var items = [];
        var updateItems = false;
        if (Array.isArray(value) &&
            (!prevProps || (prevProps.value || prevProps.items) !== value)) {
            items = value;
            updateItems = true;
        }
        else if (typeof source === 'string') {
            var resolved = resolveVariableAndFilter(source, props.data, '| raw');
            var prev = prevProps
                ? resolveVariableAndFilter(source, prevProps.data, '| raw')
                : null;
            if (prev && prev === resolved) {
                updateItems = false;
            }
            else if (Array.isArray(resolved)) {
                items = resolved;
                updateItems = true;
            }
        }
        updateItems && store.initItems(items);
        Array.isArray(props.selected) &&
            store.updateSelected(props.selected, props.valueField);
        return updateItems;
    };
    Cards.prototype.componentDidUpdate = function (prevProps) {
        var props = this.props;
        var store = props.store;
        if (anyChanged([
            'selectable',
            'draggable',
            'orderBy',
            'orderDir',
            'multiple',
            'hideCheckToggler',
            'itemCheckableOn',
            'itemDraggableOn'
        ], prevProps, props)) {
            store.update({
                selectable: props.selectable,
                draggable: props.draggable,
                orderBy: props.orderBy,
                orderDir: props.orderDir,
                multiple: props.multiple,
                hideCheckToggler: props.hideCheckToggler,
                itemCheckableOn: props.itemCheckableOn,
                itemDraggableOn: props.itemDraggableOn
            });
        }
        if (anyChanged(['source', 'value', 'items'], prevProps, props) ||
            (!props.value &&
                !props.items &&
                (props.data !== prevProps.data ||
                    (typeof props.source === 'string' && isPureVariable(props.source))))) {
            Cards.syncItems(store, props, prevProps) && this.syncSelected();
        }
        else if (prevProps.selected !== props.selected) {
            store.updateSelected(props.selected || [], props.valueField);
        }
    };
    Cards.prototype.bodyRef = function (ref) {
        this.body = ref;
    };
    Cards.prototype.doAction = function (action, data, throwErrors) {
        if (action.actionType) {
            switch (action.actionType) {
                case 'toggleSelectAll':
                    this.handleCheckAll();
                    break;
                case 'selectAll':
                    this.handleSelectAll();
                    break;
                case 'clearAll':
                    this.handleClearAll();
                    break;
                // case 'dragStart':
                //   this.initDragging();
                // case 'dragStop':
            }
        }
    };
    Cards.prototype.handleAction = function (e, action, ctx) {
        var onAction = this.props.onAction;
        // 需要支持特殊事件吗？
        onAction(e, action, ctx);
    };
    Cards.prototype.handleCheck = function (item) {
        item.toggle();
        this.syncSelected();
    };
    Cards.prototype.handleCheckAll = function () {
        var store = this.props.store;
        store.toggleAll();
        this.syncSelected();
    };
    Cards.prototype.handleSelectAll = function () {
        var store = this.props.store;
        store.selectAll();
        this.syncSelected();
    };
    Cards.prototype.handleClearAll = function () {
        var store = this.props.store;
        store.clearAll();
        this.syncSelected();
    };
    Cards.prototype.syncSelected = function () {
        var _a = this.props, store = _a.store, onSelect = _a.onSelect, dispatchEvent = _a.dispatchEvent;
        var selectItems = store.selectedItems.map(function (item) { return item.data; });
        var unSelectItems = store.unSelectedItems.map(function (item) { return item.data; });
        dispatchEvent('selected', createObject(store.data, {
            selectItems: selectItems,
            unSelectItems: unSelectItems
        }));
        onSelect && onSelect(selectItems, unSelectItems);
    };
    Cards.prototype.handleQuickChange = function (item, values, saveImmediately, savePristine, options) {
        item.change(values, savePristine);
        if (!saveImmediately || savePristine) {
            return;
        }
        if (saveImmediately && saveImmediately.api) {
            this.props.onAction(null, {
                actionType: 'ajax',
                api: saveImmediately.api,
                reload: options === null || options === void 0 ? void 0 : options.reload
            }, item.locals);
            return;
        }
        var _a = this.props, onSave = _a.onSave, primaryField = _a.primaryField;
        if (!onSave) {
            return;
        }
        onSave(item.data, difference(item.data, item.pristine, ['id', primaryField]), item.index, undefined, item.pristine, options);
    };
    Cards.prototype.handleSave = function () {
        var _a = this.props, store = _a.store, onSave = _a.onSave, primaryField = _a.primaryField;
        if (!onSave || !store.modifiedItems.length) {
            return;
        }
        var items = store.modifiedItems.map(function (item) { return item.data; });
        var itemIndexes = store.modifiedItems.map(function (item) { return item.index; });
        var diff = store.modifiedItems.map(function (item) {
            return difference(item.data, item.pristine, ['id', primaryField]);
        });
        var unModifiedItems = store.items
            .filter(function (item) { return !item.modified; })
            .map(function (item) { return item.data; });
        onSave(items, diff, itemIndexes, unModifiedItems, store.modifiedItems.map(function (item) { return item.pristine; }));
    };
    Cards.prototype.handleSaveOrder = function () {
        var _a = this.props, store = _a.store, onSaveOrder = _a.onSaveOrder;
        if (!onSaveOrder || !store.movedItems.length) {
            return;
        }
        onSaveOrder(store.movedItems.map(function (item) { return item.data; }), store.items.map(function (item) { return item.data; }));
    };
    Cards.prototype.reset = function () {
        var store = this.props.store;
        store.reset();
    };
    Cards.prototype.bulkUpdate = function (value, items) {
        // const {store} = this.props;
        // const items2 = store.items.filter(item => ~items.indexOf(item.pristine));
        // items2.forEach(item => item.change(value));
        var _a = this.props, store = _a.store, primaryField = _a.primaryField;
        if (primaryField && value.ids) {
            var ids_1 = value.ids.split(',');
            var rows = store.items.filter(function (item) {
                return find(ids_1, function (id) { return id && id == item.data[primaryField]; });
            });
            var newValue_1 = __assign(__assign({}, value), { ids: undefined });
            rows.forEach(function (item) { return item.change(newValue_1); });
        }
        else if (Array.isArray(items)) {
            var rows = store.items.filter(function (item) { return ~items.indexOf(item.pristine); });
            rows.forEach(function (item) { return item.change(value); });
        }
    };
    Cards.prototype.getSelected = function () {
        var store = this.props.store;
        return store.selectedItems.map(function (item) { return item.data; });
    };
    Cards.prototype.dragTipRef = function (ref) {
        if (!this.dragTip && ref) {
            this.initDragging();
        }
        else if (this.dragTip && !ref) {
            this.destroyDragging();
        }
        this.dragTip = ref;
    };
    Cards.prototype.initDragging = function () {
        if (this.sortable)
            return;
        var store = this.props.store;
        var dom = findDOMNode(this);
        var ns = this.props.classPrefix;
        this.sortable = new Sortable(dom.querySelector(".".concat(ns, "Cards-body")), {
            group: 'table',
            animation: 150,
            handle: ".".concat(ns, "Card-dragBtn"),
            ghostClass: "is-dragging",
            onEnd: function (e) {
                // 没有移动
                if (e.newIndex === e.oldIndex) {
                    return;
                }
                var parent = e.to;
                if (e.oldIndex < parent.childNodes.length - 1) {
                    parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
                }
                else {
                    parent.appendChild(e.item);
                }
                store.exchange(e.oldIndex, e.newIndex);
            }
        });
    };
    Cards.prototype.destroyDragging = function () {
        this.sortable && this.sortable.destroy();
        this.sortable = undefined;
    };
    Cards.prototype.renderActions = function (region) {
        var _this = this;
        var _a = this.props, actions = _a.actions, render = _a.render, store = _a.store, cx = _a.classnames;
        var btn;
        actions = Array.isArray(actions) ? actions.concat() : [];
        if (!~this.renderedToolbars.indexOf('check-all') &&
            (btn = this.renderCheckAll())) {
            actions.unshift({
                type: 'button',
                children: btn
            });
        }
        if (region === 'header' &&
            !~this.renderedToolbars.indexOf('drag-toggler') &&
            (btn = this.renderDragToggler())) {
            actions.unshift({
                type: 'button',
                children: btn
            });
        }
        return Array.isArray(actions) && actions.length ? (React.createElement("div", { className: cx('Cards-actions') }, actions.map(function (action, key) {
            return render("action/".concat(key), __assign({ type: 'button' }, action), {
                onAction: _this.handleAction,
                key: key,
                btnDisabled: store.dragging
            });
        }))) : null;
    };
    Cards.prototype.renderHeading = function () {
        var _a = this.props, title = _a.title, store = _a.store, hideQuickSaveBtn = _a.hideQuickSaveBtn, cx = _a.classnames, data = _a.data;
        if (title || (store.modified && !hideQuickSaveBtn) || store.moved) {
            return (React.createElement("div", { className: cx('Cards-heading') }, store.modified && !hideQuickSaveBtn ? (React.createElement("span", null, "\u5F53\u524D\u6709 ".concat(store.modified, " \u6761\u8BB0\u5F55\u4FEE\u6539\u4E86\u5185\u5BB9, \u4F46\u5E76\u6CA1\u6709\u63D0\u4EA4\u3002\u8BF7\u9009\u62E9:"),
                React.createElement("button", { type: "button", className: cx('Button Button--xs Button--success m-l-sm'), onClick: this.handleSave },
                    React.createElement(Icon, { icon: "check", className: "icon m-r-xs" }),
                    "\u63D0\u4EA4"),
                React.createElement("button", { type: "button", className: cx('Button Button--xs Button--danger m-l-sm'), onClick: this.reset },
                    React.createElement(Icon, { icon: "close", className: "icon m-r-xs" }),
                    "\u653E\u5F03"))) : store.moved ? (React.createElement("span", null, "\u5F53\u524D\u6709 ".concat(store.moved, " \u6761\u8BB0\u5F55\u4FEE\u6539\u4E86\u987A\u5E8F, \u4F46\u5E76\u6CA1\u6709\u63D0\u4EA4\u3002\u8BF7\u9009\u62E9:"),
                React.createElement("button", { type: "button", className: cx('Button Button--xs Button--success m-l-sm'), onClick: this.handleSaveOrder },
                    React.createElement(Icon, { icon: "check", className: "icon m-r-xs" }),
                    "\u63D0\u4EA4"),
                React.createElement("button", { type: "button", className: cx('Button Button--xs Button--danger m-l-sm'), onClick: this.reset },
                    React.createElement(Icon, { icon: "close", className: "icon m-r-xs" }),
                    "\u653E\u5F03"))) : title ? (filter(title, data)) : ('')));
        }
        return null;
    };
    Cards.prototype.renderHeader = function () {
        var _a = this.props, header = _a.header, headerClassName = _a.headerClassName; _a.headerToolbar; var headerToolbarRender = _a.headerToolbarRender, showHeader = _a.showHeader, render = _a.render, store = _a.store, cx = _a.classnames, __ = _a.translate;
        if (showHeader === false) {
            return null;
        }
        var child = headerToolbarRender
            ? headerToolbarRender(__assign(__assign({}, this.props), { selectedItems: store.selectedItems.map(function (item) { return item.data; }), items: store.items.map(function (item) { return item.data; }), unSelectedItems: store.unSelectedItems.map(function (item) { return item.data; }) }), this.renderToolbar)
            : null;
        var actions = this.renderActions('header');
        var toolbarNode = actions || child || store.dragging ? (React.createElement("div", { className: cx('Cards-toolbar'), key: "header-toolbar" },
            actions,
            child,
            store.dragging ? (React.createElement("div", { className: cx('Cards-dragTip'), ref: this.dragTipRef }, __('Card.dragTip'))) : null)) : null;
        var headerNode = header ? (React.createElement("div", { className: cx('Cards-header', headerClassName), key: "header" }, render('header', header))) : null;
        return headerNode && toolbarNode
            ? [headerNode, toolbarNode]
            : headerNode || toolbarNode || null;
    };
    Cards.prototype.renderFooter = function () {
        var _a = this.props, footer = _a.footer, footerClassName = _a.footerClassName; _a.footerToolbar; var footerToolbarRender = _a.footerToolbarRender, render = _a.render, showFooter = _a.showFooter, store = _a.store, cx = _a.classnames;
        if (showFooter === false) {
            return null;
        }
        var child = footerToolbarRender
            ? footerToolbarRender(__assign(__assign({}, this.props), { selectedItems: store.selectedItems.map(function (item) { return item.data; }), items: store.items.map(function (item) { return item.data; }), unSelectedItems: store.unSelectedItems.map(function (item) { return item.data; }) }), this.renderToolbar)
            : null;
        var actions = this.renderActions('footer');
        var toolbarNode = actions || child ? (React.createElement("div", { className: cx('Cards-toolbar'), key: "footer-toolbar" },
            actions,
            child)) : null;
        var footerNode = footer ? (React.createElement("div", { className: cx('Cards-footer', footerClassName), key: "footer" }, render('footer', footer))) : null;
        return footerNode && toolbarNode
            ? [toolbarNode, footerNode]
            : footerNode || toolbarNode || null;
    };
    Cards.prototype.renderCheckAll = function () {
        var _a = this.props, store = _a.store, multiple = _a.multiple, selectable = _a.selectable, checkAll = _a.checkAll;
        if (!store.selectable ||
            !multiple ||
            !selectable ||
            store.dragging ||
            !store.items.length ||
            !checkAll) {
            return null;
        }
        return (React.createElement(Button, { key: "checkall", tooltip: "\u5207\u6362\u5168\u9009", onClick: this.handleCheckAll, size: "sm", level: store.allChecked ? 'info' : 'default' }, "\u5168\u9009"));
    };
    Cards.prototype.renderDragToggler = function () {
        var _this = this;
        var _a = this.props, store = _a.store; _a.multiple; _a.selectable; var popOverContainer = _a.popOverContainer, env = _a.env, __ = _a.translate, dragIcon = _a.dragIcon;
        if (!store.draggable || store.items.length < 2) {
            return null;
        }
        return (React.createElement(Button, { iconOnly: true, key: "dragging-toggle", tooltip: __('Card.toggleDrag'), tooltipContainer: popOverContainer || (env === null || env === void 0 ? void 0 : env.getModalContainer), size: "sm", active: store.dragging, onClick: function (e) {
                e.preventDefault();
                store.toggleDragging();
                store.dragging && store.clear();
                store.dragging ? _this.initDragging() : undefined;
            } }, React.isValidElement(dragIcon) ? (dragIcon) : (React.createElement(Icon, { icon: "exchange", className: "icon r90" }))));
    };
    Cards.prototype.renderToolbar = function (toolbar, index) {
        var type = toolbar.type || toolbar;
        if (type === 'drag-toggler') {
            this.renderedToolbars.push(type);
            return this.renderDragToggler();
        }
        else if (type === 'check-all') {
            this.renderedToolbars.push(type);
            return this.renderCheckAll();
        }
        return void 0;
    };
    // editor中重写，请勿更改前两个参数
    Cards.prototype.renderCard = function (index, card, item, itemClassName, style) {
        var _this = this;
        var _a = this.props, render = _a.render, cx = _a.classnames, store = _a.store, multiple = _a.multiple, checkOnItemClick = _a.checkOnItemClick, hideCheckToggler = _a.hideCheckToggler;
        var cardProps = {
            className: cx(filterClassNameObject((card && card.className) || '', item.locals), {
                'is-checked': item.checked,
                'is-modified': item.modified,
                'is-moved': item.moved,
                'is-dragging': store.dragging
            }),
            item: item,
            key: index,
            itemIndex: item.index,
            multiple: multiple,
            selectable: store.selectable,
            checkable: item.checkable,
            draggable: item.draggable,
            selected: item.checked,
            dragging: store.dragging,
            data: item.locals,
            onAction: this.handleAction,
            onCheck: this.handleCheck,
            onQuickChange: store.dragging ? null : this.handleQuickChange
        };
        // card2属性与card有区别
        if ((card === null || card === void 0 ? void 0 : card.type) === 'card2') {
            cardProps = __assign(__assign({}, cardProps), { item: item.locals, onCheck: function () {
                    _this.handleCheck(item);
                } });
        }
        return (React.createElement("div", { key: item.index, className: cx(itemClassName), style: style }, render("card/".concat(index), __assign({ 
            // @ts-ignore
            type: card.type || 'card', hideCheckToggler: hideCheckToggler, checkOnItemClick: checkOnItemClick }, card), cardProps)));
    };
    Cards.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, style = _a.style, store = _a.store, columnsCount = _a.columnsCount, itemClassName = _a.itemClassName, placeholder = _a.placeholder, card = _a.card, data = _a.data, render = _a.render, affixHeader = _a.affixHeader, masonryLayout = _a.masonryLayout, itemsClassName = _a.itemsClassName, cx = _a.classnames, __ = _a.translate, _b = _a.loading, loading = _b === void 0 ? false : _b, loadingConfig = _a.loadingConfig, env = _a.env, id = _a.id, wrapperCustomStyle = _a.wrapperCustomStyle, themeCss = _a.themeCss;
        this.renderedToolbars = []; // 用来记录哪些 toolbar 已经渲染了，已经渲染了就不重复渲染了。
        var itemFinalClassName = columnsCount
            ? "Grid-col--sm".concat(Math.round(12 / columnsCount))
            : itemClassName || '';
        var header = this.renderHeader();
        var heading = this.renderHeading();
        var footer = this.renderFooter();
        var masonryClassName = '';
        if (masonryLayout) {
            masonryClassName =
                'Cards--masonry ' +
                    itemFinalClassName
                        .split(/\s/)
                        .map(function (item) {
                        if (/^Grid-col--(xs|sm|md|lg)(\d+)/.test(item)) {
                            return "Cards--masonry".concat(ucFirst(RegExp.$1)).concat(RegExp.$2);
                        }
                        return item;
                    })
                        .join(' ');
        }
        // 自定义行列间距
        var wrapStyles = {};
        var itemStyles = {};
        if ((style === null || style === void 0 ? void 0 : style.gutterX) >= 0) {
            wrapStyles.marginLeft = wrapStyles.marginRight =
                -((style === null || style === void 0 ? void 0 : style.gutterX) / 2) + 'px';
            itemStyles.paddingLeft = itemStyles.paddingRight =
                (style === null || style === void 0 ? void 0 : style.gutterX) / 2 + 'px';
        }
        if ((style === null || style === void 0 ? void 0 : style.gutterY) >= 0) {
            itemStyles.marginBottom = (style === null || style === void 0 ? void 0 : style.gutterY) + 'px';
        }
        // 修正grid多列计算错误
        if (columnsCount && !masonryLayout) {
            itemStyles.flex = "0 0 ".concat(100 / columnsCount, "%");
            itemStyles.maxWidth = "".concat(100 / columnsCount, "%");
        }
        return (React.createElement("div", { ref: this.bodyRef, className: cx('Cards', className, {
                'Cards--unsaved': !!store.modified || !!store.moved
            }, setThemeClassName('baseControlClassName', id, themeCss), setThemeClassName('wrapperCustomStyle', id, wrapperCustomStyle)), style: buildStyle(style, data) },
            affixHeader ? (React.createElement("div", { className: cx('Cards-fixedTop') },
                header,
                heading)) : (React.createElement(React.Fragment, null,
                header,
                heading)),
            store.items.length ? (React.createElement("div", { className: cx('Cards-body Grid', itemsClassName, masonryClassName), style: wrapStyles }, store.items.map(function (item, index) {
                return _this.renderCard(index, card, item, itemFinalClassName, itemStyles);
            }))) : (React.createElement("div", { className: cx('Cards-placeholder') }, render('placeholder', __(placeholder)))),
            footer,
            React.createElement(Spinner, { loadingConfig: loadingConfig, overlay: true, show: loading }),
            React.createElement(CustomStyle, { config: {
                    wrapperCustomStyle: wrapperCustomStyle,
                    id: id,
                    themeCss: themeCss,
                    classNames: [
                        {
                            key: 'baseControlClassName'
                        }
                    ]
                }, env: env })));
    };
    Cards.propsList = [
        'header',
        'headerToolbarRender',
        'footer',
        'footerToolbarRender',
        'placeholder',
        'source',
        'selectable',
        'headerClassName',
        'footerClassName',
        'hideQuickSaveBtn',
        'hideCheckToggler',
        'itemCheckableOn',
        'itemDraggableOn',
        'masonryLayout',
        'items',
        'valueField'
    ];
    Cards.defaultProps = {
        className: '',
        placeholder: 'placeholder.noData',
        source: '$items',
        selectable: false,
        headerClassName: '',
        footerClassName: '',
        itemClassName: 'Grid-col--sm6 Grid-col--md4 Grid-col--lg3',
        hideCheckToggler: false,
        masonryLayout: false,
        affixHeader: true,
        itemsClassName: '',
        checkAll: true
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Boolean]),
        __metadata("design:returntype", void 0)
    ], Cards.prototype, "doAction", null);
    return Cards;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(CardsRenderer, _super);
    function CardsRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CardsRenderer = __decorate([
        Renderer({
            test: /(^|\/)(?:crud\/body\/grid|cards)$/,
            name: 'cards',
            storeType: ListStore.name,
            weight: -100 // 默认的 grid 不是这样，这个只识别 crud 下面的 grid
        })
    ], CardsRenderer);
    return CardsRenderer;
})(Cards));

export { Cards as default };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
