
<div id="my_popup" class="remove-all-inherited">
  <span id="pv" class="remove-all-inherited content">Plainview</span>
  <span id="msg" class="remove-all-inherited content">This is a message.</span>
  <span id="my_popup_close" class="remove-all-inherited content">&times;</span>
</div>


<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdn.rawgit.com/vast-engineering/jquery-popup-overlay/1.7.13/jquery.popupoverlay.js"></script>

<script>
  // $(document).ready(function() {
  //   var swapC = function() {
  //     window.setTimeout(function() { swapC() }, 500);
      // $('.remove-all-inherited').removeAttr('style');
      $('.remove-all-inherited').css('all', 'initial');

      $('#my_popup').popup({
        opacity: 100,
        backgroundactive: true,
        autoopen: true,
        vertical: 'top',
        horizontal: 'center',
        autozindex: true
      });

      $('#my_popup').attr('style', 'position: fixed !important');
      $('#my_popup').attr('style', 'top: 0 !important');
      $('#my_popup').css('box-sizing', 'border-box');
      $('#my_popup').css('width', '100%');
      $('#my_popup').css('line-height', '120%');
      $('#my_popup').css('margin', '0 auto');
      $('#my_popup').css('border', '1px solid transparent');
      $('#my_popup').css('border-radius', '4px');
      $('#my_popup').css('border-radius', '4px');
      $('#my_popup').css('background-color', '#8cbfd9');
      $('#my_popup').css('z-index', '100');
      $('#my_popup').css('display', 'flex');

      $('.content').css('display', 'inline');
      $('.content').css('margin', '10px');
      $('.content').css('vertical-align', 'middle');
      $('.content').css('color', '#000');

      $('#pv').css('font-weight', 'bold');
      $('#my_popup_close').css('cursor', 'pointer');
      $('#my_popup_close').css('position', 'absolute');
      $('#my_popup_close').css('right', '0');

      $('#my_popup_close').click(function() {
        $('#my_popup').css('display', 'none');
      })
  //     swapC();
  //   };
  // });

</script>
