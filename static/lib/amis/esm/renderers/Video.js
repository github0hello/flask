/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate } from 'tslib';
import React from 'react';
import { Player, ControlBar, PlaybackRateMenuButton, BigPlayButton, Shortcut } from 'video-react';
import { resolveVariable, padArr, filter, getPropValue, Renderer } from 'amis-core';

/**
 * @file video
 * @author fex
 */
var str2seconds = function (str) {
    return str.indexOf(':')
        ? str
            .split(':')
            .reverse()
            .reduce(function (seconds, value, index) {
            return seconds + (parseInt(value, 10) || 0) * Math.pow(60, index);
        }, 0)
        : parseInt(str, 10);
};
// let currentPlaying: any = null;
var FlvSource = /** @class */ (function (_super) {
    __extends(FlvSource, _super);
    function FlvSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loaded = false;
        return _this;
    }
    FlvSource.prototype.componentDidMount = function () {
        var _a = this.props, src = _a.src, video = _a.video, config = _a.config, manager = _a.manager, isLive = _a.isLive, autoPlay = _a.autoPlay, actions = _a.actions, setError = _a.setError;
        this.initFlv({
            video: video,
            manager: manager,
            src: src,
            isLive: isLive,
            config: config,
            actions: actions,
            setError: setError,
            autoPlay: autoPlay
        });
    };
    FlvSource.prototype.componentDidUpdate = function (prevProps) {
        var _a, _b;
        var props = this.props;
        var autoPlay = props.autoPlay, actions = props.actions, src = props.src, setError = props.setError, isLive = props.isLive, config = props.config, video = props.video, manager = props.manager;
        if (src !== prevProps.src) {
            setError('');
            (_a = this.mpegtsPlayer) === null || _a === void 0 ? void 0 : _a.destroy();
            (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
            this.loaded = false;
            this.initFlv({
                video: video,
                manager: manager,
                src: src,
                isLive: isLive,
                config: config,
                actions: actions,
                setError: setError,
                autoPlay: autoPlay
            });
        }
    };
    FlvSource.prototype.componentWillUnmount = function () {
        var _a, _b;
        if (this.mpegtsPlayer) {
            this.mpegtsPlayer.destroy();
            (_b = (_a = this.props).setError) === null || _b === void 0 ? void 0 : _b.call(_a, '');
        }
    };
    FlvSource.prototype.initFlv = function (_a) {
        var _this = this;
        var video = _a.video, manager = _a.manager, src = _a.src, isLive = _a.isLive, config = _a.config, actions = _a.actions, setError = _a.setError, autoPlay = _a.autoPlay;
        import('mpegts.js').then(function (mpegts) {
            video = video || (manager.video && manager.video.video);
            var mpegtsPlayer = mpegts.createPlayer({
                type: 'flv',
                url: src,
                isLive: isLive
            }, config);
            mpegtsPlayer.attachMediaElement(video);
            _this.mpegtsPlayer = mpegtsPlayer;
            _this.unsubscribe = manager.subscribeToOperationStateChange(function (operation) {
                var type = operation.operation.action;
                if (type === 'play') {
                    clearTimeout(_this.timer);
                    if (!_this.loaded) {
                        _this.loaded = true;
                        mpegtsPlayer.load();
                    }
                    mpegtsPlayer.play();
                }
                else if (type === 'pause') {
                    mpegtsPlayer.pause();
                    if (isLive) {
                        _this.timer = setTimeout(function () {
                            actions.seek(0);
                            mpegtsPlayer.unload();
                            _this.loaded = false;
                        }, 30000);
                    }
                }
            });
            mpegtsPlayer.on(mpegts.Events.RECOVERED_EARLY_EOF, function () {
                setError('直播已经结束');
            });
            mpegtsPlayer.on(mpegts.Events.ERROR, function () {
                setError('视频加载失败');
                mpegtsPlayer.unload();
            });
            if (autoPlay) {
                setTimeout(function () { return actions.play(); }, 200);
            }
        });
    };
    FlvSource.prototype.render = function () {
        return (React.createElement("source", { src: this.props.src, type: this.props.type || 'video/x-flv' }));
    };
    return FlvSource;
}(React.Component));
var HlsSource = /** @class */ (function (_super) {
    __extends(HlsSource, _super);
    function HlsSource() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loaded = false;
        return _this;
    }
    HlsSource.prototype.componentDidMount = function () {
        var _a = this.props, src = _a.src, video = _a.video; _a.config; var manager = _a.manager; _a.isLive; var autoPlay = _a.autoPlay, actions = _a.actions;
        this.initHls({
            video: video,
            manager: manager,
            src: src,
            autoPlay: autoPlay,
            actions: actions
        });
    };
    HlsSource.prototype.componentWillUnmount = function () {
        if (this.hls) {
            this.hls.stopLoad();
            this.hls.detachMedia();
        }
    };
    HlsSource.prototype.componentDidUpdate = function (prevProps) {
        var _a, _b, _c;
        var props = this.props;
        var autoPlay = props.autoPlay, actions = props.actions, src = props.src; props.isLive; props.config; var video = props.video, manager = props.manager;
        if (src !== prevProps.src) {
            (_a = this.hls) === null || _a === void 0 ? void 0 : _a.stopLoad();
            (_b = this.hls) === null || _b === void 0 ? void 0 : _b.detachMedia();
            (_c = this.unsubscribe) === null || _c === void 0 ? void 0 : _c.call(this);
            this.loaded = false;
            this.initHls({
                video: video,
                manager: manager,
                src: src,
                autoPlay: autoPlay,
                actions: actions
            });
        }
    };
    HlsSource.prototype.initHls = function (_a) {
        var _this = this;
        var video = _a.video, manager = _a.manager, src = _a.src, autoPlay = _a.autoPlay, actions = _a.actions;
        // @ts-ignore
        import('hls.js').then(function (_a) {
            var Hls = _a.default;
            // load hls video source base on hls.js
            if (Hls.isSupported()) {
                video = video || (manager.video && manager.video.video);
                var hls_1 = (_this.hls = new Hls({
                    autoStartLoad: false
                }));
                hls_1.attachMedia(video);
                hls_1.loadSource(src);
                _this.unsubscribe = manager.subscribeToOperationStateChange(function (operation) {
                    var type = operation.operation.action;
                    if (type === 'play') {
                        if (!_this.loaded) {
                            _this.loaded = true;
                            hls_1.startLoad();
                        }
                        video.play();
                    }
                    else if (type === 'pause') {
                        video.pause();
                        hls_1.stopLoad();
                        _this.loaded = false;
                    }
                });
                autoPlay && setTimeout(actions.play, 200);
            }
        });
    };
    HlsSource.prototype.render = function () {
        return (React.createElement("source", { src: this.props.src, type: this.props.type || 'application/x-mpegURL' }));
    };
    return HlsSource;
}(React.Component));
var Video = /** @class */ (function (_super) {
    __extends(Video, _super);
    function Video(props) {
        var _this = _super.call(this, props) || this;
        _this.manualJump = false;
        _this.state = {
            posterInfo: null,
            videoState: {}
        };
        _this.frameRef = _this.frameRef.bind(_this);
        _this.cursorRef = _this.cursorRef.bind(_this);
        _this.playerRef = _this.playerRef.bind(_this);
        _this.onImageLoaded = _this.onImageLoaded.bind(_this);
        _this.onClick = _this.onClick.bind(_this);
        _this.setError = _this.setError.bind(_this);
        return _this;
    }
    Video.prototype.onImageLoaded = function (e) {
        var _this = this;
        var image = new Image();
        image.onload = function () {
            _this.setState({
                posterInfo: {
                    width: image.width,
                    height: image.height
                }
            });
            image = image.onload = null;
        };
        image.src = e.target.getAttribute('src');
    };
    Video.prototype.frameRef = function (dom) {
        this.frameDom = dom;
    };
    Video.prototype.cursorRef = function (dom) {
        this.cursorDom = dom;
    };
    Video.prototype.playerRef = function (player) {
        var _this = this;
        this.player = player;
        if (!player) {
            return;
        }
        player.subscribeToStateChange(function (state) {
            _this.setState({
                videoState: state
            });
            // if (!state.paused) {
            //   if (
            //     currentPlaying &&
            //     currentPlaying.video &&
            //     currentPlaying !== player
            //   ) {
            //     currentPlaying.pause();
            //   }
            //   currentPlaying = player;
            // }
            if (!_this.frameDom || !_this.times) {
                return;
            }
            var jumpBufferDuration = _this.props.jumpBufferDuration || 0;
            var index = 0;
            var times = _this.times;
            var len = times.length;
            var stopOnNextFrame = _this.props.stopOnNextFrame;
            while (index < len - 1) {
                if (times[index + 1] &&
                    state.currentTime < times[index + 1] - jumpBufferDuration) {
                    break;
                }
                index++;
            }
            if (_this.currentIndex !== index) {
                _this.moveCursorToIndex(index);
                stopOnNextFrame && !_this.manualJump && player.pause();
                if (_this.manualJump) {
                    _this.manualJump = false;
                }
            }
        });
    };
    Video.prototype.moveCursorToIndex = function (index) {
        var ns = this.props.classPrefix;
        if (!this.frameDom || !this.cursorDom) {
            return;
        }
        var items = this.frameDom.querySelectorAll(".".concat(ns, "Video-frame"));
        if (items && items.length && items[index]) {
            this.currentIndex = index;
            var item = items[index];
            var frameRect = this.frameDom.getBoundingClientRect();
            var rect = item.getBoundingClientRect();
            this.cursorDom.setAttribute('style', "width: ".concat(rect.width - 4, "px; height: ").concat(rect.height - 4, "px; left: ").concat(rect.left + 2 - frameRect.left, "px; top: ").concat(rect.top + 2 - frameRect.top, "px;"));
        }
    };
    Video.prototype.jumpToIndex = function (index) {
        if (!this.times || !this.player || !this.props.jumpFrame) {
            return;
        }
        var jumpBufferDuration = this.props.jumpBufferDuration || 0;
        var times = this.times;
        var player = this.player;
        this.manualJump = true;
        player.seek(times[index] - jumpBufferDuration);
        player.play();
    };
    Video.prototype.onClick = function (e) {
        // 避免把所在 form 给提交了。
        e.preventDefault();
    };
    Video.prototype.setError = function (error) {
        var player = this.player;
        this.setState({
            error: error
        });
        player === null || player === void 0 ? void 0 : player.pause();
    };
    Video.prototype.renderFrames = function () {
        var _this = this;
        var _a = this.props, frames = _a.frames, framesClassName = _a.framesClassName, columnsCount = _a.columnsCount, data = _a.data, jumpFrame = _a.jumpFrame; _a.classPrefix; var cx = _a.classnames;
        if (typeof frames === 'string' && frames[0] === '$') {
            frames = resolveVariable(frames, data);
        }
        if (!frames) {
            return null;
        }
        var items = [];
        var times = (this.times = []);
        Object.keys(frames).forEach(function (time) {
            times.push(str2seconds(time));
            items.push({
                time: time,
                src: frames[time]
            });
        });
        if (!items.length) {
            return null;
        }
        return (React.createElement("div", { className: cx("pos-rlt Video-frameList", framesClassName), ref: this.frameRef },
            padArr(items, columnsCount).map(function (items, i) {
                var restCount = columnsCount - items.length;
                var blankArray = [];
                while (restCount--) {
                    blankArray.push('');
                }
                return (React.createElement("div", { className: "pull-in-xs", key: i },
                    React.createElement("div", { className: cx("Hbox Video-frameItem") },
                        items.map(function (item, key) { return (React.createElement("div", { className: cx("Hbox-col Wrapper--xs Video-frame"), key: key, onClick: function () {
                                return _this.jumpToIndex(i * columnsCount + key);
                            } },
                            item.src ? (React.createElement("img", { className: "w-full", alt: "poster", src: item.src })) : null,
                            React.createElement("div", { className: cx("Video-frameLabel") }, item.time))); }),
                        /* 补充空白 */ restCount
                            ? blankArray.map(function (_, index) { return (React.createElement("div", { className: cx("Hbox-col Wrapper--xs"), key: "blank_".concat(index) })); })
                            : null)));
            }),
            jumpFrame ? (React.createElement("span", { ref: this.cursorRef, className: cx('Video-cursor') })) : null));
    };
    Video.prototype.renderPlayer = function () {
        var _a = this.props, poster = _a.poster, autoPlay = _a.autoPlay, muted = _a.muted; _a.name; var data = _a.data, loop = _a.loop, isLive = _a.isLive, minVideoDuration = _a.minVideoDuration, videoType = _a.videoType, playerClassName = _a.playerClassName, ns = _a.classPrefix, aspectRatio = _a.aspectRatio, rates = _a.rates, cx = _a.classnames;
        var source = filter(this.props.src, data, '| raw') || getPropValue(this.props);
        var videoState = this.state.videoState;
        var highlight = videoState.duration &&
            minVideoDuration &&
            videoState.duration < minVideoDuration;
        var src = filter(source, data, '| raw');
        var sourceNode;
        var error = this.state.error;
        if ((src && /\.flv(?:$|\?)/.test(src) && isLive) ||
            videoType === 'video/x-flv') {
            sourceNode = (React.createElement(FlvSource, { autoPlay: autoPlay, order: 999.0, isLive: isLive, src: src, setError: this.setError }));
        }
        else if ((src && /\.m3u8(?:$|\?)/.test(src)) ||
            videoType === 'application/x-mpegURL') {
            sourceNode = React.createElement(HlsSource, { autoPlay: autoPlay, order: 999.0, src: src });
        }
        else {
            sourceNode = React.createElement("source", { src: src });
        }
        return (React.createElement("div", { className: cx('Video-player', playerClassName) },
            React.createElement(Player, { ref: this.playerRef, poster: filter(poster, data, '| raw'), src: src, autoPlay: autoPlay, muted: muted, aspectRatio: aspectRatio, loop: loop },
                rates && rates.length ? (React.createElement(ControlBar, null,
                    React.createElement(PlaybackRateMenuButton, { rates: rates, order: 7.1 }))) : null,
                React.createElement(BigPlayButton, { position: "center" }),
                sourceNode,
                React.createElement(Shortcut, { disabled: true })),
            error ? React.createElement("div", { className: cx('Video-error') }, error) : null,
            highlight ? (React.createElement("p", { className: "m-t-xs ".concat(ns, "Text--danger") },
                "\u89C6\u9891\u65F6\u957F\u5C0F\u4E8E ",
                minVideoDuration,
                " \u79D2")) : null));
    };
    Video.prototype.renderPosterAndPlayer = function () {
        var _a = this.props, poster = _a.poster, data = _a.data; _a.locals; var minPosterDimension = _a.minPosterDimension, cx = _a.classnames;
        var posterInfo = this.state.posterInfo || {};
        var dimensionClassName = '';
        if (posterInfo &&
            minPosterDimension &&
            (minPosterDimension.width || minPosterDimension.height) &&
            (minPosterDimension.width > posterInfo.width ||
                minPosterDimension.height > posterInfo.height)) {
            dimensionClassName = "Text--danger";
        }
        return (React.createElement("div", { className: "pull-in-xs" },
            React.createElement("div", { className: cx('Hbox') },
                React.createElement("div", { className: cx('Hbox-col') },
                    React.createElement("div", { className: cx('Wrapper Wrapper--xs') },
                        React.createElement("img", { onLoad: this.onImageLoaded, className: "w-full", alt: "poster", src: filter(poster, data, '| raw') }),
                        React.createElement("p", { className: "m-t-xs" },
                            "\u5C01\u9762",
                            ' ',
                            React.createElement("span", { className: dimensionClassName },
                                posterInfo.width || '-',
                                " x ",
                                posterInfo.height || '-'),
                            dimensionClassName ? (React.createElement("span", null,
                                ' ',
                                "\u5C01\u9762\u5C3A\u5BF8\u5C0F\u4E8E",
                                ' ',
                                React.createElement("span", { className: cx('Text--danger') },
                                    minPosterDimension.width || '-',
                                    " x",
                                    ' ',
                                    minPosterDimension.height || '-'))) : null))),
                React.createElement("div", { className: cx('Hbox-col') },
                    React.createElement("div", { className: cx('Wrapper Wrapper--xs') }, this.renderPlayer())))));
    };
    Video.prototype.render = function () {
        var _a = this.props, splitPoster = _a.splitPoster, className = _a.className, style = _a.style; _a.classPrefix; var cx = _a.classnames;
        return (React.createElement("div", { className: cx("Video", className), onClick: this.onClick, style: style },
            this.renderFrames(),
            splitPoster ? this.renderPosterAndPlayer() : this.renderPlayer()));
    };
    Video.defaultProps = {
        columnsCount: 8,
        isLive: false,
        jumpFrame: true,
        aspectRatio: 'auto'
    };
    return Video;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(VideoRenderer, _super);
    function VideoRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VideoRenderer = __decorate([
        Renderer({
            type: 'video'
        })
    ], VideoRenderer);
    return VideoRenderer;
})(Video));

export { FlvSource, HlsSource, Video as default };
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
