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
        this.image.src = this.container.css("background-image").replace(/(url\(|\)|'|")/gi, '');
       // this.image = this.container.querySelector('img');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ2ZW5kb3IvZ3JhbmRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLkdyYWRlID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIHByZWZpeGVzID0gWyd3ZWJraXQnLCAnbW96JywgJ21zJywgJ28nXTtcblxudmFyIEdyYWRlID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdyYWRlKGNvbnRhaW5lcikge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgR3JhZGUpO1xuXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB0aGlzLmltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdGhpcy5jb250YWluZXIuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiKS5yZXBsYWNlKC8odXJsXFwofFxcKXwnfFwiKS9naSwgJycpO1xuICAgICAgIC8vIHRoaXMuaW1hZ2UgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLmltZylcblxuICAgICAgICAvL3RoaXMuaW1hZ2UgPSB0aGlzLmNvbnRhaW5lci5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpLnJlcGxhY2UoLyh1cmxcXCh8XFwpfCd8XCIpL2dpLCAnJyk7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5pbWFnZURpbWVuc2lvbnMgPSB7XG4gICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgIGhlaWdodDogMFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlRGF0YSA9IFtdO1xuICAgICAgICB0aGlzLnJlYWRJbWFnZSgpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhHcmFkZSwgW3tcbiAgICAgICAga2V5OiAncmVhZEltYWdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlYWRJbWFnZSgpIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VEaW1lbnNpb25zLndpZHRoID0gdGhpcy5pbWFnZS53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VEaW1lbnNpb25zLmhlaWdodCA9IHRoaXMuaW1hZ2UuaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0SW1hZ2VEYXRhJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEltYWdlRGF0YSgpIHtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VEYXRhID0gQXJyYXkuZnJvbSh0aGlzLmN0eC5nZXRJbWFnZURhdGEoMCwgMCwgdGhpcy5pbWFnZURpbWVuc2lvbnMud2lkdGgsIHRoaXMuaW1hZ2VEaW1lbnNpb25zLmhlaWdodCkuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldENodW5rZWRJbWFnZURhdGEnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q2h1bmtlZEltYWdlRGF0YSgpIHtcbiAgICAgICAgICAgIHZhciBwZXJDaHVuayA9IDQ7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlRGF0YS5yZWR1Y2UoZnVuY3Rpb24gKGFyLCBpdCwgaSkge1xuICAgICAgICAgICAgICAgIHZhciBpeCA9IE1hdGguZmxvb3IoaSAvIHBlckNodW5rKTtcbiAgICAgICAgICAgICAgICBpZiAoIWFyW2l4XSkge1xuICAgICAgICAgICAgICAgICAgICBhcltpeF0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJbaXhdLnB1c2goaXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcjtcbiAgICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0UkdCQUdyYWRpZW50VmFsdWVzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFJHQkFHcmFkaWVudFZhbHVlcyh0b3ApIHtcbiAgICAgICAgICAgIHJldHVybiB0b3AubWFwKGZ1bmN0aW9uIChjb2xvciwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3JnYignICsgY29sb3IucmdiYS5zbGljZSgwLCAzKS5qb2luKCcsJykgKyAnKSc7XG4gICAgICAgICAgICB9KS5qb2luKCcsJyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldENTU0dyYWRpZW50UHJvcGVydHknLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Q1NTR3JhZGllbnRQcm9wZXJ0eSh0b3ApIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSB0aGlzLmdldFJHQkFHcmFkaWVudFZhbHVlcyh0b3ApO1xuICAgICAgICAgICAgcmV0dXJuIHByZWZpeGVzLm1hcChmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdiYWNrZ3JvdW5kLWltYWdlOiAtJyArIHByZWZpeCArICctbGluZWFyLWdyYWRpZW50KFxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvIGJvdHRvbSByaWdodCxcXG4gICAgICAgICAgICAgICAgICAgICAgICAnICsgdmFsICsgJ1xcbiAgICAgICAgICAgICAgICAgICAgKSc7XG4gICAgICAgICAgICB9KS5jb25jYXQoWydiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgICAgICAgICAgICAgICAgICB0byBib3R0b20gcmlnaHQsXFxuICAgICAgICAgICAgICAgICAgICAnICsgdmFsICsgJ1xcbiAgICAgICAgICAgICAgICApJ10pLmpvaW4oJzsnKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0VG9wVmFsdWVzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFRvcFZhbHVlcyh1bmlxKSB7XG4gICAgICAgICAgICByZXR1cm4gW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShPYmplY3Qua2V5cyh1bmlxKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciByZ2JhS2V5ID0ga2V5O1xuICAgICAgICAgICAgICAgIHZhciBjb21wb25lbnRzID0ga2V5LnNwbGl0KCd8JyksXG4gICAgICAgICAgICAgICAgICAgIGJyaWdodG5lc3MgPSAoY29tcG9uZW50c1swXSAqIDI5OSArIGNvbXBvbmVudHNbMV0gKiA1ODcgKyBjb21wb25lbnRzWzJdICogMTE0KSAvIDEwMDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgcmdiYTogcmdiYUtleS5zcGxpdCgnfCcpLFxuICAgICAgICAgICAgICAgICAgICBvY2N1cnM6IHVuaXFba2V5XVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEuYnJpZ2h0bmVzcyAtIGIuYnJpZ2h0bmVzcztcbiAgICAgICAgICAgIH0pLnJldmVyc2UoKS5zbGljZSgwLCAyKSkpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRVbmlxVmFsdWVzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFVuaXFWYWx1ZXMoY2h1bmtlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNodW5rZWQucmVkdWNlKGZ1bmN0aW9uIChhY2N1bSwgY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBjdXJyZW50LmpvaW4oJ3wnKTtcbiAgICAgICAgICAgICAgICBpZiAoIWFjY3VtW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjdW1ba2V5XSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWNjdW1ba2V5XSA9ICsrYWNjdW1ba2V5XTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW07XG4gICAgICAgICAgICB9LCB7fSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlckdyYWRpZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckdyYWRpZW50KCkge1xuICAgICAgICAgICAgdmFyIGNodW5rZWQgPSB0aGlzLmdldENodW5rZWRJbWFnZURhdGEoKTtcbiAgICAgICAgICAgIHZhciBncmFkaWVudFByb3BlcnR5ID0gdGhpcy5nZXRDU1NHcmFkaWVudFByb3BlcnR5KHRoaXMuZ2V0VG9wVmFsdWVzKHRoaXMuZ2V0VW5pcVZhbHVlcyhjaHVua2VkKSkpO1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gKHRoaXMuY29udGFpbmVyLmdldEF0dHJpYnV0ZSgnc3R5bGUnKSB8fCAnJykgKyAnICcgKyBncmFkaWVudFByb3BlcnR5O1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5pbWFnZURpbWVuc2lvbnMud2lkdGg7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmltYWdlRGltZW5zaW9ucy5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgMCk7XG4gICAgICAgICAgICB0aGlzLmdldEltYWdlRGF0YSgpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJHcmFkaWVudCgpO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEdyYWRlO1xufSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjb250YWluZXJzKSB7XG4gICAgTm9kZUxpc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoY29udGFpbmVycykgPyBBcnJheS5mcm9tKGNvbnRhaW5lcnMpLmZvckVhY2goZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gbmV3IEdyYWRlKGNvbnRhaW5lcik7XG4gICAgfSkgOiBuZXcgR3JhZGUoY29udGFpbmVycyk7XG59O1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7Il0sImZpbGUiOiJ2ZW5kb3IvZ3JhbmRlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
