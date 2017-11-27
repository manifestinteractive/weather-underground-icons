$(function () {

  var iconType = 'svg';
  var iconColor = 'white';
  var iconSize = '64';
  var iconTime = 'day';
  var iconFocus = ' ';
  var timeout = null;



  hljs.configure({
    languages: [ 'html' ]
  });

  function resizeIcons() {
    var width = $(window).width();

    switch (true) {
      case (width >= 320 && width < 960):
        iconSize = '32';
        break;
      case (width >= 960 && width < 1200):
        iconSize = '64';
        break;
      case (width >= 1200):
        iconSize = '128';
        break;
    }

    setTimeout(function(){
      $('#iconSize').val(iconSize).trigger('change');
    }, 0);
  }

  $(window).resize(resizeIcons);

  resizeIcons();

  function selectText(elm) {
    var range;
    if (document.selection) {
      range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(elm));
      range.select();
    } else if (window.getSelection) {
      range = document.createRange();
      range.selectNode(document.getElementById(elm));
      window.getSelection().addRange(range);
    }
  }

  $('#iconType').change(function () {
    iconType = $('option:selected', this).val();
    $('.demo').removeClass('svg no-svg').addClass(iconType);
  });

  $('#iconColor').change(function () {
    iconColor = $('option:selected', this).val();
    $('i.wu').removeClass('wu-white wu-black wu-solid-white wu-solid-black').addClass('wu-' + iconColor);
    $('.demo').removeClass('demo-white demo-black demo-solid-white demo-solid-black').addClass('demo-' + iconColor);
    $('body').removeClass('demo-white demo-black demo-solid-white demo-solid-black').addClass('demo-' + iconColor);

    if ($('i.active').length > 0) {
      iconFocus = '<i class="wu wu-' + iconSize + ' wu-' + iconColor + ' wu-' + iconTime + ' wu-' + $('i.active').data('name') + '"></i>';

      $('#iconSource').text(iconFocus);
      $('#iconSource').each(function (i, block) {
        hljs.highlightBlock(block);
      });
    }
  });

  $('#iconTime').change(function () {
    iconTime = $('option:selected', this).val();
    $('i.wu').removeClass('wu-night wu-day').addClass('wu-' + iconTime);

    if ($('i.active').length > 0) {
      iconFocus = '<i class="wu wu-' + iconSize + ' wu-' + iconColor + ' wu-' + iconTime + ' wu-' + $('i.active').data('name') + '"></i>';

      $('#iconSource').text(iconFocus);
      $('#iconSource').each(function (i, block) {
        hljs.highlightBlock(block);
      });
    }
  });

  $('#iconSize').change(function () {
    iconSize = $('option:selected', this).val();
    $('i.wu').removeClass('wu-16 wu-32 wu-64 wu-128 wu-256').addClass('wu-' + iconSize);
    $('.demo').removeClass('demo-16 demo-32 demo-64 demo-128 demo-256').addClass('demo-' + iconSize);

    if ($('i.active').length > 0) {
      iconFocus = '<i class="wu wu-' + iconSize + ' wu-' + iconColor + ' wu-' + iconTime + ' wu-' + $('i.active').data('name') + '"></i>';

      $('#iconSource').text(iconFocus);
      $('#iconSource').each(function (i, block) {
        hljs.highlightBlock(block);
      });
    }
  });

  $('i.wu').hover(function () {
    clearTimeout(timeout);
    $('#iconSource').text($(this).data('name')).removeClass('hljs javascript');
  }, function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      $('#iconSource').text(iconFocus);

      if (iconFocus !== ' ') {
        $('#iconSource').each(function (i, block) {
          hljs.highlightBlock(block);
        });
      }
    }, 250);
  });

  $('i.wu').click(function () {
    var selected = $(this).data('name');
    $(this).toggleClass('active');
    $('i.active').not(this).removeClass('active');

    iconFocus = (iconFocus == selected) ? ' ' : '<i class="wu wu-' + iconSize + ' wu-' + iconColor + ' wu-' + iconTime + ' wu-' + selected + '"></i>';

    if ($('i.active').length > 0) {
      $('#iconSource').text(iconFocus);
      $('#iconSource').each(function (i, block) {
        hljs.highlightBlock(block);
      });
    } else {
      iconFocus = ' ';
      $('#iconSource').text(iconFocus).removeClass('hljs javascript');
    }
  })

  $('#iconSource').click(function(){
    selectText('iconSource');
  });
});
