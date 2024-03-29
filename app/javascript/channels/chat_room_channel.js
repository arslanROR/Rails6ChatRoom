import consumer from "./consumer"

consumer.subscriptions.create("ChatRoomChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    if (data["user_id"] == current_user_id) {
      append_meesage_in_div(data, "sender")
    } else {
      append_meesage_in_div(data, "receiver")
    }
    
  }
});

var current_user_id;
var message_submitted;
var get_messages;
var append_meesage_in_div;
$(document).on('turbolinks:load', function () {
  $.ajax({url: "/current_user", success: function(result){
    // alert("id: " + result.user_id + ", name: " + result.user_name);
    current_user_id = result.user_id
    // console.log(current_user_id);
  }});
  get_messages()
  message_submitted() 
})

message_submitted = function () {
        $('#message_content').on('keydown', function (event) {
          if (event.keyCode === 13) {
            $('#submit_form').click()
            event.target.value = ''
          }
        })
      }

get_messages = function () {
        $.ajax({url: "/messages", success: function(result){
          var i;
          for (i = 0; i < result.length; i++) {
            if (result[i]["user_id"] == current_user_id) {
              append_meesage_in_div(result[i], "sender")
            } else {
              append_meesage_in_div(result[i], "receiver")
            }  
          } 
        }});
      }

append_meesage_in_div = function (data, sender_or_receiver){

  if (sender_or_receiver == "sender") {
    var div = '<div class="media w-50 ml-auto mb-3">' +
                      '<p class="text-small mb-0 mr-3 text-muted"> [ Me ] </p>' +
                      '<div class="media-body"> ' +
                        '<div class="bg-primary rounded py-2 px-3 mb-2">' +
                          '<p class="text-small mb-0 text-white">' + data["message_content"] +  '</p>' +
                        '</div>' +
                        '<p class="small text-muted">' + data["time"] + '</p>' +
                      '</div>' +
                    '</div>'
  } else {
    var div = '<div class="media w-50 mb-3">' + 
                      '<p class="text-small mb-0 text-muted"> [ From ' + data["username"] + ' ] </p>' +  
                      '<div class="media-body ml-3">' + 
                        '<div class="bg-light rounded py-2 px-3 mb-2">' + 
                          '<p class="text-small mb-0 text-muted">' + data["message_content"] + '</p>' + 
                        '</div>' + 
                        '<p class="small text-muted">' + data["time"] + '</p>' +
                      '</div>' +
                    '</div>'
  }

  // Called when there's incoming data on the websocket for this channel
  $("#msg_box").append(div);
  var div = $("#msg_box");
  div.scrollTop(div.prop('scrollHeight'));
}