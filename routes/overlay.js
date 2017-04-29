var msg = document.createElement("div");
msg.setAttribute("class", "msg");
msg.style.width = "100%";
msg.style.pedding = "15px";
msg.style.marginBottom= "20px";
msg.style.border = "1px solid transparent";
msg.style.borderRadius = "4px";
msg.style.borderColor = "#bce8f1";
msg.style.backgroundColor = "#d9edf7";
msg.style.color = "#245269";
msg.style.zIndex = "10";
msg.style.lineHeight = "170%";
$("body").append(msg);

// logo
var logo = document.createElement("h3");
logo.style.margin = "0 10px 0 10px";
logo.style.display = "inline";
logo.innerHTML = "Plainview";
$(".msg").append(logo);

// archival info
function showMessage(finalizedTime) {
  var message = document.createElement("span");
  message.style.margin = "0 auto";
  message.innerHTML = "This article has been unchanged since [" + finalizedTime + "].";
  $(".msg").append(message);
}

var url = "http://www.cnn.com/2017/04/27/politics/trump-executive-orders/index.html";
var text = "While the orders have run";

$.ajax({
  method: "POST",
  url: "http://www.plainview.io/archives",
  data: {url: url, text: text},
  dataType: "json",
  success: function(data) {
    // console.log(data);
    var finalizedTime = data.archive.times.finalized;
    showMessage(finalizedTime);
  }
});

// article info modal
