function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

;

(function ($) {
  // Define global SUI object if it doesn't exist.
  if ('object' !== _typeof(window.SUI)) {
    window.SUI = {};
  }

  SUI.select = {};

  SUI.select.formatIcon = function (data, container) {
    var markup;
    var label = data.text;
    var icon = $(data.element).attr('data-icon');

    if (!data.id) {
      return label; // optgroup.
    }

    if ('undefined' !== typeof icon) {
      markup = '<span class="sui-icon-' + icon.toLowerCase() + '" aria-hidden="true"></span> ' + label;
    } else {
      markup = label;
    }

    return markup;
  };

  SUI.select.formatIconSelection = function (data, container) {
    var markup;
    var label = data.text;
    var icon = $(data.element).attr('data-icon');

    if ('undefined' !== typeof icon) {
      markup = '<span class="sui-icon-' + icon.toLowerCase() + '" aria-hidden="true"></span> ' + label;
    } else {
      markup = label;
    }

    return markup;
  };

  SUI.select.formatColor = function (data, container) {
    var markup, border;
    var label = data.text;
    var color = $(data.element).attr('data-color');

    if (!data.id) {
      return label; // optgroup.
    }

    if ('undefined' !== typeof color) {
      switch (color) {
        case '#FFF':
        case 'white':
        case '#FFFFFF':
          border = '#000';
          break;

        case '#FAFAFA':
        case '#F8F8F8':
        case '#F2F2F2':
          border = '#333';
          break;

        default:
          border = color;
          break;
      }

      markup = '<span class="sui-color" style="border-color: ' + border + '; background-color: ' + color + ';" aria-hidden="true"></span> ' + label;
    } else {
      markup = label;
    }

    return markup;
  };

  SUI.select.formatColorSelection = function (data, container) {
    var markup;
    var label = data.text;
    var color = $(data.element).attr('data-color');

    if ('undefined' !== typeof color) {
      switch (color) {
        case '#FFF':
        case 'white':
        case '#FFFFFF':
          border = '#000';
          break;

        case '#FAFAFA':
        case '#F8F8F8':
        case '#F2F2F2':
          border = '#333';
          break;

        default:
          border = color;
          break;
      }

      markup = '<span class="sui-color" style="border-color: ' + border + '; background-color: ' + color + ';" aria-hidden="true"></span> ' + label;
    } else {
      markup = label;
    }

    return markup;
  };

  SUI.select.formatVars = function (data, container) {
    var markup;
    var label = data.text;
    var content = $(data.element).val();

    if (!data.id) {
      return label; // optgroup.
    }

    if ('undefined' !== typeof content) {
      markup = '<span class="sui-variable-name">' + label + '</span><span class="sui-variable-value">' + content + '</span> ';
    } else {
      markup = label;
    }

    return markup;
  };

  SUI.select.formatVarsSelection = function (data, container) {
    var markup;
    var label = data.text;
    markup = '<span class="sui-icon-plus-circle sui-md" aria-hidden="true"></span>';
    markup += '<span class="sui-screen-reader-text">' + label + '</span>';
    return markup;
  };

  SUI.select.init = function (select) {
    var getParent = select.closest('.sui-modal-content'),
        getParentId = getParent.attr('id'),
        selectParent = getParent.length ? $('#' + getParentId) : $('.sui-2-11-0'),
        hasSearch = 'true' === select.attr('data-search') ? 0 : -1,
        isSmall = select.hasClass('sui-select-sm') ? 'sui-select-dropdown-sm' : '';
    select.SUIselect2({
      dropdownParent: selectParent,
      minimumResultsForSearch: hasSearch,
      dropdownCssClass: isSmall
    });
  };

  SUI.select.initIcon = function (select) {
    var getParent = select.closest('.sui-modal-content'),
        getParentId = getParent.attr('id'),
        selectParent = getParent.length ? $('#' + getParentId) : $('.sui-2-11-0'),
        hasSearch = 'true' === select.attr('data-search') ? 0 : -1,
        isSmall = select.hasClass('sui-select-sm') ? 'sui-select-dropdown-sm' : '';
    select.SUIselect2({
      dropdownParent: selectParent,
      templateResult: SUI.select.formatIcon,
      templateSelection: SUI.select.formatIconSelection,
      escapeMarkup: function escapeMarkup(markup) {
        return markup;
      },
      minimumResultsForSearch: hasSearch,
      dropdownCssClass: isSmall
    });
  };

  SUI.select.initColor = function (select) {
    var getParent = select.closest('.sui-modal-content'),
        getParentId = getParent.attr('id'),
        selectParent = getParent.length ? $('#' + getParentId) : $('.sui-2-11-0'),
        hasSearch = 'true' === select.attr('data-search') ? 0 : -1,
        isSmall = select.hasClass('sui-select-sm') ? 'sui-select-dropdown-sm' : '';
    select.SUIselect2({
      dropdownParent: selectParent,
      templateResult: SUI.select.formatColor,
      templateSelection: SUI.select.formatColorSelection,
      escapeMarkup: function escapeMarkup(markup) {
        return markup;
      },
      minimumResultsForSearch: hasSearch,
      dropdownCssClass: isSmall
    });
  };

  SUI.select.initSearch = function (select) {
    var getParent = select.closest('.sui-modal-content'),
        getParentId = getParent.attr('id'),
        selectParent = getParent.length ? $('#' + getParentId) : $('.sui-2-11-0'),
        isSmall = select.hasClass('sui-select-sm') ? 'sui-select-dropdown-sm' : '';
    select.SUIselect2({
      dropdownParent: selectParent,
      minimumInputLength: 2,
      maximumSelectionLength: 1,
      dropdownCssClass: isSmall
    });
  };

  SUI.select.initVars = function (select) {
    var getParent = select.closest('.sui-modal-content'),
        getParentId = getParent.attr('id'),
        selectParent = getParent.length ? $('#' + getParentId) : $('.sui-2-11-0'),
        hasSearch = 'true' === select.attr('data-search') ? 0 : -1;
    select.SUIselect2({
      theme: 'vars',
      dropdownParent: selectParent,
      templateResult: SUI.select.formatVars,
      templateSelection: SUI.select.formatVarsSelection,
      escapeMarkup: function escapeMarkup(markup) {
        return markup;
      },
      minimumResultsForSearch: hasSearch
    });
  };

  $('.sui-select').each(function () {
    var select = $(this);

    if ('icon' === select.data('theme')) {
      SUI.select.initIcon(select);
    } else if ('color' === select.data('theme')) {
      SUI.select.initColor(select);
    } else if ('search' === select.data('theme')) {
      SUI.select.initSearch(select);
    } else {
      SUI.select.init(select);
    }
  });
  $('.sui-variables').each(function () {
    var select = $(this);
    SUI.select.initVars(select);
  });
})(jQuery);