<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<div id="tooltip" class="tooltip fade bottom" role="tooltip">
  <!-- <div class="tooltip-arrow" style="left: 50%;"></div> -->
  <div class="tooltip-inner">
    Click to quote
  </div>
</div>

<script>
  var currentDomain = 'rawstory';

  $.ajax({
    method: 'GET',
    url: 'http://www.plainview.io/supported_websites',
    dataType: 'json'
  })
    .done(function(data) {

      var tags_retrieval = _.find(data, ['domain', currentDomain]).tags_retrieval;

      $('body').click(function(e){
        var selText = getSelectedText();
        if (selText == '') {
          $('#tooltip').removeClass('in');
        }
      })

      tags_retrieval.forEach(function(item) {
        var tag = item.tag;
        console.log(tag);
        $(tag).mouseup(function(e) {
          var selText = getSelectedText();
          if (selText != '') {
            console.log(selText.toString());
            // var range = selText.getRangeAt(0);
            // range.collapse(false);
            // var dummy = document.createElement("span");
            // range.insertNode(dummy);
            // var rect = dummy.getBoundingClientRect();
            // var x = rect.left, y = rect.top;
            // dummy.parentNode.removeChild(dummy);
            // console.log(x, y);
            placeTooltip(e.pageX, e.pageY);
          }
        });
      });
    }).fail(function(err) {
      console.log(err);
    })

    function getSelectedText() {
      if(window.getSelection) {
        return window.getSelection();
      } else {
        return '';
      }
    }

    function placeTooltip(x_pos, y_pos) {
      var elm = document.getElementById('tooltip');
      elm.style.position = 'absolute';
      elm.style.left = x_pos+'px';
      elm.style.top = y_pos+'px';
      $('#tooltip').addClass('in');
    }

    $('#tooltip').css('cursor', 'pointer');
    $('#tooltip').click(function(){
      $.ajax({
        method: 'POST',
        url: 'http://www.plainview.io/archives/',
        data: {
          url:
          text: getSelectedText().toString(),
        }
      })
    })
</script>
