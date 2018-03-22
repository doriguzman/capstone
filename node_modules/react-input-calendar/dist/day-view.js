'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment-range');

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

var _viewHeader = require('./view-header');

var _viewHeader2 = _interopRequireDefault(_viewHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DayView = function (_React$Component) {
  (0, _inherits3.default)(DayView, _React$Component);

  function DayView() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, DayView);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DayView.__proto__ || (0, _getPrototypeOf2.default)(DayView)).call.apply(_ref, [this].concat(args))), _this), _this.cellClick = function (e) {
      var cell = e.target;
      var date = parseInt(cell.innerHTML, 10);
      var newDate = _this.props.date ? _this.props.date.clone() : (0, _moment2.default)();

      if (isNaN(date)) return;

      if (cell.className.indexOf('prev') > -1) {
        newDate.subtract(1, 'months');
      } else if (cell.className.indexOf('next') > -1) {
        newDate.add(1, 'months');
      }

      newDate.date(date);
      _this.props.setInputDate(newDate, true);
    }, _this.next = function () {
      var nextDate = _this.props.date.clone().add(1, 'months');
      if (_this.props.maxDate && nextDate.isAfter(_this.props.maxDate, 'day')) {
        nextDate = _this.props.maxDate;
      }
      _this.props.setInternalDate(nextDate);
    }, _this.prev = function () {
      var prevDate = _this.props.date.clone().subtract(1, 'months');
      if (_this.props.minDate && prevDate.isBefore(_this.props.minDate, 'day')) {
        prevDate = _this.props.minDate;
      }
      _this.props.setInternalDate(prevDate);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(DayView, [{
    key: 'getDays',
    value: function getDays() {
      var _props = this.props,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          date = _props.date;

      var now = date ? date : (0, _moment2.default)();
      var start = now.clone().startOf('month').weekday(0);
      var end = now.clone().endOf('month').weekday(6);
      var month = now.month();
      var today = (0, _moment2.default)();
      var currDay = now.date();
      var year = now.year();
      var days = [];

      (0, _moment2.default)().range(start, end).by('days', function (day) {
        days.push({
          label: day.format('D'),
          prev: day.month() < month && !(day.year() > year) || day.year() < year,
          next: day.month() > month || day.year() > year,
          disabled: day.isBefore(minDate, 'day') || day.isAfter(maxDate, 'day'),
          curr: day.date() === currDay && day.month() === month,
          today: day.date() === today.date() && day.month() === today.month() && day.year() === today.year()
        });
      });
      return days;
    }
  }, {
    key: 'getDaysTitles',
    value: function getDaysTitles() {
      return [0, 1, 2, 3, 4, 5, 6].map(function (i) {
        return {
          label: (0, _moment2.default)().weekday(i).format('dd')
        };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var titles = this.getDaysTitles().map(function (item, i) {
        return _react2.default.createElement(_cell2.default, { classes: 'day title', key: i, value: item.label });
      });
      var days = this.getDays().map(function (item, i) {
        return _react2.default.createElement(_cell2.default, {
          classes: (0, _classnames2.default)({
            day: true,
            next: item.next,
            prev: item.prev,
            disabled: item.disabled,
            current: item.curr,
            today: item.today
          }),
          key: i,
          value: item.label
        });
      });
      var currentDate = this.props.date ? this.props.date.format('MMMM') : (0, _moment2.default)().format('MMMM');

      return _react2.default.createElement(
        'div',
        { className: 'view days-view', onKeyDown: this.keyDown },
        _react2.default.createElement(_viewHeader2.default, {
          data: currentDate,
          next: this.next,
          prev: this.prev,
          titleAction: this.props.nextView
        }),
        _react2.default.createElement(
          'div',
          { className: 'days-title' },
          titles
        ),
        _react2.default.createElement(
          'div',
          { className: 'days', onClick: this.cellClick },
          days
        )
      );
    }
  }]);
  return DayView;
}(_react2.default.Component);

DayView.propTypes = {
  date: _propTypes2.default.object.isRequired,
  minDate: _propTypes2.default.any,
  maxDate: _propTypes2.default.any,
  setInternalDate: _propTypes2.default.func,
  setInputDate: _propTypes2.default.func,
  nextView: _propTypes2.default.func
};
exports.default = DayView;