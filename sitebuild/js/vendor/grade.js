(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Grade = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var prefixes = ['webkit', 'moz', 'ms', 'o'];

var Grade = function () {
    function Grade(container) {
        _classCallCheck(this, Grade);

        this.container = container;
        this.image = new Image();
        //this.image.src = this.container.css("background-image").replace(/(url\(|\)|'|")/gi, '');
        this.image = this.container.querySelector('img');
        //console.log(this.img)

        //this.image = this.container.css("background-image").replace(/(url\(|\)|'|")/gi, '');
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.imageDimensions = {
            width: 0,
            height: 0
        };
        this.imageData = [];
        this.readImage();
    }

    _createClass(Grade, [{
        key: 'readImage',
        value: function readImage() {
            this.imageDimensions.width = this.image.width;
            this.imageDimensions.height = this.image.height;
            this.render();
        }
    }, {
        key: 'getImageData',
        value: function getImageData() {
            this.imageData = Array.from(this.ctx.getImageData(0, 0, this.imageDimensions.width, this.imageDimensions.height).data);
        }
    }, {
        key: 'getChunkedImageData',
        value: function getChunkedImageData() {
            var perChunk = 4;

            return this.imageData.reduce(function (ar, it, i) {
                var ix = Math.floor(i / perChunk);
                if (!ar[ix]) {
                    ar[ix] = [];
                }
                ar[ix].push(it);
                return ar;
            }, []);
        }
    }, {
        key: 'getRGBAGradientValues',
        value: function getRGBAGradientValues(top) {
            return top.map(function (color, index) {
                return 'rgb(' + color.rgba.slice(0, 3).join(',') + ')';
            }).join(',');
        }
    }, {
        key: 'getCSSGradientProperty',
        value: function getCSSGradientProperty(top) {
            var val = this.getRGBAGradientValues(top);
            return prefixes.map(function (prefix) {
                return 'background-image: -' + prefix + '-linear-gradient(\n                        to bottom right,\n                        ' + val + '\n                    )';
            }).concat(['background-image: linear-gradient(\n                    to bottom right,\n                    ' + val + '\n                )']).join(';');
        }
    }, {
        key: 'getTopValues',
        value: function getTopValues(uniq) {
            return [].concat(_toConsumableArray(Object.keys(uniq).map(function (key) {
                var rgbaKey = key;
                var components = key.split('|'),
                    brightness = (components[0] * 299 + components[1] * 587 + components[2] * 114) / 1000;
                return {
                    rgba: rgbaKey.split('|'),
                    occurs: uniq[key]
                };
            }).sort(function (a, b) {
                return a.brightness - b.brightness;
            }).reverse().slice(0, 2)));
        }
    }, {
        key: 'getUniqValues',
        value: function getUniqValues(chunked) {
            return chunked.reduce(function (accum, current) {
                var key = current.join('|');
                if (!accum[key]) {
                    accum[key] = 1;
                    return accum;
                }
                accum[key] = ++accum[key];
                return accum;
            }, {});
        }
    }, {
        key: 'renderGradient',
        value: function renderGradient() {
            var chunked = this.getChunkedImageData();
            var gradientProperty = this.getCSSGradientProperty(this.getTopValues(this.getUniqValues(chunked)));
            var style = (this.container.getAttribute('style') || '') + ' ' + gradientProperty;
            this.container.setAttribute('style', style);
        }
    }, {
        key: 'render',
        value: function render() {
            this.canvas.width = this.imageDimensions.width;
            this.canvas.height = this.imageDimensions.height;
            this.ctx.drawImage(this.image, 0, 0);
            this.getImageData();
            this.renderGradient();
        }
    }]);

    return Grade;
}();

module.exports = function (containers) {
    NodeList.prototype.isPrototypeOf(containers) ? Array.from(containers).forEach(function (container) {
        return new Grade(container);
    }) : new Grade(containers);
};

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2ZW5kb3IvZ3JhZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuR3JhZGUgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgcHJlZml4ZXMgPSBbJ3dlYmtpdCcsICdtb3onLCAnbXMnLCAnbyddO1xuXG52YXIgR3JhZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR3JhZGUoY29udGFpbmVyKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBHcmFkZSk7XG5cbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgLy90aGlzLmltYWdlLnNyYyA9IHRoaXMuY29udGFpbmVyLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIikucmVwbGFjZSgvKHVybFxcKHxcXCl8J3xcIikvZ2ksICcnKTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuaW1nKVxuXG4gICAgICAgIC8vdGhpcy5pbWFnZSA9IHRoaXMuY29udGFpbmVyLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIikucmVwbGFjZSgvKHVybFxcKHxcXCl8J3xcIikvZ2ksICcnKTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLmltYWdlRGltZW5zaW9ucyA9IHtcbiAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAwXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2VEYXRhID0gW107XG4gICAgICAgIHRoaXMucmVhZEltYWdlKCk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEdyYWRlLCBbe1xuICAgICAgICBrZXk6ICdyZWFkSW1hZ2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVhZEltYWdlKCkge1xuICAgICAgICAgICAgdGhpcy5pbWFnZURpbWVuc2lvbnMud2lkdGggPSB0aGlzLmltYWdlLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5pbWFnZURpbWVuc2lvbnMuaGVpZ2h0ID0gdGhpcy5pbWFnZS5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRJbWFnZURhdGEnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0SW1hZ2VEYXRhKCkge1xuICAgICAgICAgICAgdGhpcy5pbWFnZURhdGEgPSBBcnJheS5mcm9tKHRoaXMuY3R4LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLmltYWdlRGltZW5zaW9ucy53aWR0aCwgdGhpcy5pbWFnZURpbWVuc2lvbnMuaGVpZ2h0KS5kYXRhKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0Q2h1bmtlZEltYWdlRGF0YScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDaHVua2VkSW1hZ2VEYXRhKCkge1xuICAgICAgICAgICAgdmFyIHBlckNodW5rID0gNDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2VEYXRhLnJlZHVjZShmdW5jdGlvbiAoYXIsIGl0LCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl4ID0gTWF0aC5mbG9vcihpIC8gcGVyQ2h1bmspO1xuICAgICAgICAgICAgICAgIGlmICghYXJbaXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyW2l4XSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcltpeF0ucHVzaChpdCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyO1xuICAgICAgICAgICAgfSwgW10pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRSR0JBR3JhZGllbnRWYWx1ZXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0UkdCQUdyYWRpZW50VmFsdWVzKHRvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRvcC5tYXAoZnVuY3Rpb24gKGNvbG9yLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAncmdiKCcgKyBjb2xvci5yZ2JhLnNsaWNlKDAsIDMpLmpvaW4oJywnKSArICcpJztcbiAgICAgICAgICAgIH0pLmpvaW4oJywnKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0Q1NTR3JhZGllbnRQcm9wZXJ0eScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRDU1NHcmFkaWVudFByb3BlcnR5KHRvcCkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IHRoaXMuZ2V0UkdCQUdyYWRpZW50VmFsdWVzKHRvcCk7XG4gICAgICAgICAgICByZXR1cm4gcHJlZml4ZXMubWFwKGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2JhY2tncm91bmQtaW1hZ2U6IC0nICsgcHJlZml4ICsgJy1saW5lYXItZ3JhZGllbnQoXFxuICAgICAgICAgICAgICAgICAgICAgICAgdG8gYm90dG9tIHJpZ2h0LFxcbiAgICAgICAgICAgICAgICAgICAgICAgICcgKyB2YWwgKyAnXFxuICAgICAgICAgICAgICAgICAgICApJztcbiAgICAgICAgICAgIH0pLmNvbmNhdChbJ2JhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChcXG4gICAgICAgICAgICAgICAgICAgIHRvIGJvdHRvbSByaWdodCxcXG4gICAgICAgICAgICAgICAgICAgICcgKyB2YWwgKyAnXFxuICAgICAgICAgICAgICAgICknXSkuam9pbignOycpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRUb3BWYWx1ZXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VG9wVmFsdWVzKHVuaXEpIHtcbiAgICAgICAgICAgIHJldHVybiBbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KE9iamVjdC5rZXlzKHVuaXEpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJnYmFLZXkgPSBrZXk7XG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudHMgPSBrZXkuc3BsaXQoJ3wnKSxcbiAgICAgICAgICAgICAgICAgICAgYnJpZ2h0bmVzcyA9IChjb21wb25lbnRzWzBdICogMjk5ICsgY29tcG9uZW50c1sxXSAqIDU4NyArIGNvbXBvbmVudHNbMl0gKiAxMTQpIC8gMTAwMDtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByZ2JhOiByZ2JhS2V5LnNwbGl0KCd8JyksXG4gICAgICAgICAgICAgICAgICAgIG9jY3VyczogdW5pcVtrZXldXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5icmlnaHRuZXNzIC0gYi5icmlnaHRuZXNzO1xuICAgICAgICAgICAgfSkucmV2ZXJzZSgpLnNsaWNlKDAsIDIpKSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldFVuaXFWYWx1ZXMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0VW5pcVZhbHVlcyhjaHVua2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gY2h1bmtlZC5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtLCBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGN1cnJlbnQuam9pbignfCcpO1xuICAgICAgICAgICAgICAgIGlmICghYWNjdW1ba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBhY2N1bVtrZXldID0gMTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFjY3VtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhY2N1bVtrZXldID0gKythY2N1bVtrZXldO1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bTtcbiAgICAgICAgICAgIH0sIHt9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyR3JhZGllbnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyR3JhZGllbnQoKSB7XG4gICAgICAgICAgICB2YXIgY2h1bmtlZCA9IHRoaXMuZ2V0Q2h1bmtlZEltYWdlRGF0YSgpO1xuICAgICAgICAgICAgdmFyIGdyYWRpZW50UHJvcGVydHkgPSB0aGlzLmdldENTU0dyYWRpZW50UHJvcGVydHkodGhpcy5nZXRUb3BWYWx1ZXModGhpcy5nZXRVbmlxVmFsdWVzKGNodW5rZWQpKSk7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSAodGhpcy5jb250YWluZXIuZ2V0QXR0cmlidXRlKCdzdHlsZScpIHx8ICcnKSArICcgJyArIGdyYWRpZW50UHJvcGVydHk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB0aGlzLmltYWdlRGltZW5zaW9ucy53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaW1hZ2VEaW1lbnNpb25zLmhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCAwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0SW1hZ2VEYXRhKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlckdyYWRpZW50KCk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gR3JhZGU7XG59KCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNvbnRhaW5lcnMpIHtcbiAgICBOb2RlTGlzdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihjb250YWluZXJzKSA/IEFycmF5LmZyb20oY29udGFpbmVycykuZm9yRWFjaChmdW5jdGlvbiAoY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgR3JhZGUoY29udGFpbmVyKTtcbiAgICB9KSA6IG5ldyBHcmFkZShjb250YWluZXJzKTtcbn07XG5cbn0se31dfSx7fSxbMV0pKDEpXG59KTsiXSwiZmlsZSI6InZlbmRvci9ncmFkZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
