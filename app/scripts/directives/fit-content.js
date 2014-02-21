'use strict';

angular.module('chalkupStartApp')
    .directive('scaleToFill', function () {

        function ratio(content, wrapper) {
            return {
                w: content.width() / wrapper.width(),
                h: content.height() / wrapper.height()
            };
        }

        function center(long, short) {
            return parseInt((long - short) / 2, 10);
        }

        function scaleToFill(content, wrapper, centerContent) {
            var r = ratio(content, wrapper);
            var width, height;
            var offset = {top: 0, left: 0};

            if (r.h > r.w) {
                width = wrapper.width();
                height = content.height() / r.w;
                if (centerContent) {
                    offset.top = - center(height, wrapper.height());
                }
            } else {
                height = wrapper.height();
                width = content.width() / r.h;
                if (centerContent) {
                    offset.left = - center(width, wrapper.width());
                }
            }

            if (centerContent) {
                content.css({
                    'position': 'relative',
                    'top': offset.top + 'px',
                    'left': offset.left + 'px'
                });
            }

            content.height(height).width(width);
        }

        return {
            restrict: 'A',
            link: function ($scope, elem) {
                elem.bind('load', function() {
                    scaleToFill(elem, elem.parent(), true);
                });
            }
        };
    });
//
//
//angular.module('chalkupStartApp')
//    .directive('scale-to-fit', function () {
//
//        var scaleToFit = function (args) {
//            var item = args.item,
//                settings = args.settings,
//                ratio = settings.ratio,
//                width = item.width(),
//                height = item.height(),
//                offset = {top: 0, left: 0};
//
//            if (ratio.h > ratio.w) {
//                height = settings.wrapperHeight,
//                    width = parseInt((item.width() * settings.wrapperHeight)/item.height(), 10);
//                if (settings.center) {
//                    offset.left = methods.center(height, width);
//                }
//            } else {
//                height = parseInt((item.height() * settings.wrapperWidth)/item.width(), 10),
//                    width = settings.wrapperWidth;
//                if (settings.center) {
//                    offset.top = methods.center(width, height);
//                }
//            }
//
//            args.wrapper.css({
//                'width' : (settings.squareWidth ? settings.wrapperWidth : width) + 'px',
//                'height' : settings.wrapperHeight + 'px'
//            });
//
//            if (settings.center) {
//                args.wrapper.css('position', 'relative');
//                item.css({
//                    'position' : 'absolute',
//                    'top' : offset.top +'px',
//                    'left' : offset.left + 'px'
//                });
//            }
//            return item.height(height).attr('height', height + 'px')
//                .width(width).attr('width', width + 'px');
//        };
//    });
