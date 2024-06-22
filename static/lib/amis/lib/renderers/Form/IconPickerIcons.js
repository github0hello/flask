/**
 * amis v3.6.4
 * build time: 2024-01-09
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.ICONS = [
    {
        name: 'Font Awesome 4.7',
        prefix: 'fa fa-',
        icons: [
            'slideshare',
            'snapchat',
            'snapchat-ghost',
            'snapchat-square',
            'soundcloud',
            'spotify',
            'stack-exchange',
            'stack-overflow'
        ]
    }
];
function setIconVendor(icons) {
    exports.ICONS = icons;
}

exports.setIconVendor = setIconVendor;
window.amisVersionInfo={version:'3.6.4',buildTime:'2024-01-09'};
