$(function() {
  function buildHTML(message){
    var text = '<ul class="message-list">' +
                  '<li class="message">' +
                    '<div class="message-name">' +
                      message.user_name +
                    '</div>' +
                    '<div class="message-time">' +
                      message.created_at +
                    '</div>' +
                    '<div class="message-body">' +
                      '<p class="lower-message__content">' +
                        message.content +
                      '</p>'
    var not_image = '</div></li></ul>'
    var image =  '<img class="image" src=${message.image}>'
                  '</div></li></ul>'
    if(message.image == null){
      html = text + not_image;
    }else{
      html = text + image;
    }
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents_main--body').append(html)
      $('.form-message').val('')
      $('.submit').prop("disabled", false)
      $('.contents_main--body').animate({scrollTop: $('.contents_main--body')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
  })
});
