/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var React = require('react');
var amisUi = require('amis-ui');
var amisCore = require('amis-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var __react_jsx__ = require('react');
var _J$X_ = (__react_jsx__["default"] || __react_jsx__).createElement;
(__react_jsx__["default"] || __react_jsx__).Fragment;
var App = /** @class */ (function (_super) {
    tslib.__extends(App, _super);
    function App(props) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, props) || this;
        var store = props.store;
        store.syncProps(props, undefined, ['pages']);
        store.updateActivePage(Object.assign({}, (_a = props.env) !== null && _a !== void 0 ? _a : {}, {
            showFullBreadcrumbPath: (_b = props.showFullBreadcrumbPath) !== null && _b !== void 0 ? _b : false,
            showBreadcrumbHomePath: (_c = props.showBreadcrumbHomePath) !== null && _c !== void 0 ? _c : true
        }));
        if (props.env.watchRouteChange) {
            _this.unWatchRouteChange = props.env.watchRouteChange(function () {
                var _a, _b, _c;
                return store.updateActivePage(Object.assign({}, (_a = props.env) !== null && _a !== void 0 ? _a : {}, {
                    showFullBreadcrumbPath: (_b = props.showFullBreadcrumbPath) !== null && _b !== void 0 ? _b : false,
                    showBreadcrumbHomePath: (_c = props.showBreadcrumbHomePath) !== null && _c !== void 0 ? _c : true
                }));
            });
        }
        return _this;
    }
    App.prototype.componentDidMount = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, data, dispatchEvent, rendererEvent;
            return tslib.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, data = _a.data, dispatchEvent = _a.dispatchEvent;
                        return [4 /*yield*/, dispatchEvent('init', data, this)];
                    case 1:
                        rendererEvent = _b.sent();
                        if (rendererEvent === null || rendererEvent === void 0 ? void 0 : rendererEvent.prevented) {
                            return [2 /*return*/];
                        }
                        this.reload();
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.componentDidUpdate = function (prevProps) {
        var _a, _b, _c;
        return tslib.__awaiter(this, void 0, void 0, function () {
            var props, store;
            return tslib.__generator(this, function (_d) {
                props = this.props;
                store = props.store;
                store.syncProps(props, prevProps, ['pages']);
                if (amisCore.isApiOutdated(prevProps.api, props.api, prevProps.data, props.data)) {
                    this.reload();
                }
                else if (props.location && props.location !== prevProps.location) {
                    store.updateActivePage(Object.assign({}, (_a = props.env) !== null && _a !== void 0 ? _a : {}, {
                        showFullBreadcrumbPath: (_b = props.showFullBreadcrumbPath) !== null && _b !== void 0 ? _b : false,
                        showBreadcrumbHomePath: (_c = props.showBreadcrumbHomePath) !== null && _c !== void 0 ? _c : true
                    }));
                }
                return [2 /*return*/];
            });
        });
    };
    App.prototype.componentWillUnmount = function () {
        var _a;
        (_a = this.unWatchRouteChange) === null || _a === void 0 ? void 0 : _a.call(this);
    };
    App.prototype.reload = function (subpath, query, ctx, silent, replace) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var _a, api, store, env, _b, showFullBreadcrumbPath, _c, showBreadcrumbHomePath, json;
            return tslib.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (query) {
                            return [2 /*return*/, this.receive(query, undefined, replace)];
                        }
                        _a = this.props, api = _a.api, store = _a.store, env = _a.env, _b = _a.showFullBreadcrumbPath, showFullBreadcrumbPath = _b === void 0 ? false : _b, _c = _a.showBreadcrumbHomePath, showBreadcrumbHomePath = _c === void 0 ? true : _c;
                        if (!amisCore.isEffectiveApi(api, store.data)) return [3 /*break*/, 2];
                        return [4 /*yield*/, store.fetchInitData(api, store.data, {})];
                    case 1:
                        json = _d.sent();
                        if (env.replaceText) {
                            json.data = amisCore.replaceText(json.data, env.replaceText, env.replaceTextIgnoreKeys);
                        }
                        if (json === null || json === void 0 ? void 0 : json.data.pages) {
                            store.setPages(json.data.pages);
                            store.updateActivePage(Object.assign({}, env !== null && env !== void 0 ? env : {}, {
                                showFullBreadcrumbPath: showFullBreadcrumbPath,
                                showBreadcrumbHomePath: showBreadcrumbHomePath
                            }));
                        }
                        _d.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.receive = function (values, subPath, replace) {
        var store = this.props.store;
        store.updateData(values, undefined, replace);
        this.reload();
    };
    App.prototype.handleNavClick = function (e) {
        e.preventDefault();
        var env = this.props.env;
        var link = e.currentTarget.getAttribute('href');
        env.jumpTo(link, undefined, this.props.data);
    };
    App.prototype.renderHeader = function () {
        var _a = this.props, cx = _a.classnames, brandName = _a.brandName, header = _a.header, render = _a.render, store = _a.store, logo = _a.logo, env = _a.env;
        if (!header && !logo && !brandName) {
            return null;
        }
        return (_J$X_(React__default["default"].Fragment, null,
            _J$X_("div", { className: cx('Layout-brandBar') },
                _J$X_("div", { onClick: store.toggleOffScreen, className: cx('Layout-offScreenBtn') },
                    _J$X_("i", { className: "bui-icon iconfont icon-collapse" })),
                _J$X_("div", { className: cx('Layout-brand') },
                    logo && ~logo.indexOf('<svg') ? (_J$X_(amisUi.Html, { className: cx('AppLogo-html'), html: logo, filterHtml: env.filterHtml })) : logo ? (_J$X_("img", { className: cx('AppLogo'), src: logo })) : (_J$X_("span", { className: "visible-folded " }, brandName === null || brandName === void 0 ? void 0 : brandName.substring(0, 1))),
                    _J$X_("span", { className: "hidden-folded m-l-sm" }, brandName))),
            _J$X_("div", { className: cx('Layout-headerBar') },
                _J$X_("a", { onClick: store.toggleFolded, type: "button", className: cx('AppFoldBtn') },
                    _J$X_("i", { className: "fa fa-".concat(store.folded ? 'indent' : 'dedent', " fa-fw") })),
                header ? render('header', header) : null)));
    };
    App.prototype.renderAside = function () {
        var _this = this;
        var _a = this.props, store = _a.store, env = _a.env, asideBefore = _a.asideBefore, asideAfter = _a.asideAfter, render = _a.render, data = _a.data;
        return (_J$X_(React__default["default"].Fragment, null,
            asideBefore ? render('aside-before', asideBefore) : null,
            _J$X_(amisUi.AsideNav, { navigations: store.navigations, renderLink: function (_a, key) {
                    var link = _a.link; _a.active; var toggleExpand = _a.toggleExpand, cx = _a.classnames, depth = _a.depth, subHeader = _a.subHeader;
                    var children = [];
                    if (link.visible === false) {
                        return null;
                    }
                    if (!subHeader &&
                        link.children &&
                        link.children.some(function (item) { return item === null || item === void 0 ? void 0 : item.visible; })) {
                        children.push(_J$X_("span", { key: "expand-toggle", className: cx('AsideNav-itemArrow'), onClick: function (e) { return toggleExpand(link, e); } }));
                    }
                    var badge = typeof link.badge === 'string'
                        ? amisCore.filter(link.badge, data)
                        : link.badge;
                    badge != null &&
                        children.push(_J$X_("b", { key: "badge", className: cx("AsideNav-itemBadge", link.badgeClassName || 'bg-info') }, badge));
                    if (!subHeader && link.icon) {
                        children.push(_J$X_(amisUi.Icon, { key: "icon", cx: cx, icon: link.icon, className: "AsideNav-itemIcon" }));
                    }
                    else if (store.folded && depth === 1 && !subHeader) {
                        children.push(_J$X_("i", { key: "icon", className: cx("AsideNav-itemIcon", link.children ? 'fa fa-folder' : 'fa fa-info') }));
                    }
                    children.push(_J$X_("span", { className: cx('AsideNav-itemLabel'), key: "label" }, typeof link.label === 'string'
                        ? amisCore.filter(link.label, data)
                        : link.label));
                    return link.path ? (/^https?\:/.test(link.path) ? (_J$X_("a", { target: "_blank", key: "link", href: link.path, rel: "noopener" }, children)) : (_J$X_("a", { key: "link", onClick: _this.handleNavClick, href: link.path || (link.children && link.children[0].path) }, children))) : (_J$X_("a", { key: "link", onClick: link.children ? function () { return toggleExpand(link); } : undefined }, children));
                }, isActive: function (link) { return !!env.isCurrentUrl(link === null || link === void 0 ? void 0 : link.path, link); } }),
            asideAfter ? render('aside-before', asideAfter) : null));
    };
    App.prototype.renderFooter = function () {
        var _a = this.props, render = _a.render, footer = _a.footer;
        return footer ? render('footer', footer) : null;
    };
    App.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, cx = _b.classnames, store = _b.store, render = _b.render, _c = _b.showBreadcrumb, showBreadcrumb = _c === void 0 ? true : _c, loadingConfig = _b.loadingConfig;
        return (_J$X_(amisUi.Layout, { header: this.renderHeader(), aside: this.renderAside(), footer: this.renderFooter(), folded: store.folded, offScreen: store.offScreen, contentClassName: cx('AppContent') },
            store.activePage && store.schema ? (_J$X_(React__default["default"].Fragment, null,
                showBreadcrumb && store.bcn.length ? (_J$X_("ul", { className: cx('AppBcn') }, store.bcn.map(function (item, index) {
                    return (_J$X_("li", { key: index, className: cx('AppBcn-item') }, item.path ? (_J$X_("a", { href: item.path, onClick: _this.handleNavClick }, item.label)) : index !== store.bcn.length - 1 ? (_J$X_("a", null, item.label)) : (item.label)));
                }))) : null,
                _J$X_("div", { className: cx('AppBody') }, render('page', store.schema, {
                    key: "".concat((_a = store.activePage) === null || _a === void 0 ? void 0 : _a.id, "-").concat(store.schemaKey),
                    data: store.pageData
                })))) : store.pages && !store.activePage ? (_J$X_(amisUi.NotFound, null,
                _J$X_("div", { className: "text-center" }, "\u9875\u9762\u4E0D\u5B58\u5728"))) : null,
            _J$X_(amisUi.Spinner, { loadingConfig: loadingConfig, overlay: true, show: store.loading || !store.pages, size: "lg" })));
    };
    App.propsList = [
        'brandName',
        'logo',
        'header',
        'asideBefore',
        'asideAfter',
        'pages',
        'footer'
    ];
    App.defaultProps = {};
    tslib.__decorate([
        amisCore.autobind,
        tslib.__metadata("design:type", Function),
        tslib.__metadata("design:paramtypes", [Object]),
        tslib.__metadata("design:returntype", void 0)
    ], App.prototype, "handleNavClick", null);
    return App;
}(React__default["default"].Component));
/** @class */ ((function (_super) {
    tslib.__extends(AppRenderer, _super);
    function AppRenderer(props, context) {
        var _this = _super.call(this, props) || this;
        var scoped = context;
        scoped.registerComponent(_this);
        return _this;
    }
    AppRenderer.prototype.componentWillUnmount = function () {
        var scoped = this.context;
        scoped.unRegisterComponent(this);
        _super.prototype.componentWillUnmount.call(this);
    };
    AppRenderer.prototype.setData = function (values, replace) {
        return this.props.store.updateData(values, undefined, replace);
    };
    AppRenderer.prototype.getData = function () {
        var store = this.props.store;
        return store.data;
    };
    AppRenderer.contextType = amisCore.ScopedContext;
    AppRenderer = tslib.__decorate([
        amisCore.Renderer({
            type: 'app',
            storeType: amisCore.AppStore.name
        }),
        tslib.__metadata("design:paramtypes", [Object, Object])
    ], AppRenderer);
    return AppRenderer;
})(App));

exports["default"] = App;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
