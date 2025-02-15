function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function ($) {
  // Enable strict mode.
  'use strict'; // Define global SUI object if it doesn't exist.

  if ('object' !== _typeof(window.SUI)) {
    window.SUI = {};
  }

  SUI.upload = function () {
    $('.sui-2-11-0 .sui-upload-group input[type="file"]').on('change', function (e) {
      var file = $(this)[0].files[0],
          message = $(this).find('~ .sui-upload-message');

      if (file) {
        message.text(file.name);
      }
    });
  };

  SUI.upload();
})(jQuery);