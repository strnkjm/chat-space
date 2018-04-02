$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var text = `<ul class="messages-list" data-message-id= "${message.id}">
                  <li class="message">
                    <div class="message-name">
                      ${message.user_name}
                    </div>
                    <div class="message-time">
                      ${message.created_at}
                    </div>
                    <div class="message-body">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div></li></ul>`
    var image = '<img class="image" src=${message.image}>'
    var html = (message.image == null) ? text : text + image
    return html;
  }
    function putHTML(message){
      var html = buildHTML(message);
      $('.contents_main--body').append(html)
      $('.form-message').val('')
      $('.image').val('')
      $('.submit').prop("disabled", false)
      $('.contents_main--body').animate({scrollTop: $('.contents_main--body')[0].scrollHeight}, 'swing');
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
     putHTML(data);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    })
    return false;
  })
  var autoUpdate = setInterval(function() {
    if (document.URL.match("/groups/.*/messages")) {
    var id = $('.messages-list').last().attr('data-message-id');
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {id: id},
      dataType:'json'
    })
    .done(function(messages){
      messages.forEach(function(messages){
        var html = buildHTML(messages);
        $('.contents_main--body').append(html)
        $('.form-message').val('')
        $('.image').val('')
        $('.contents_main--body').animate({scrollTop: $('.contents_main--body')[0].scrollHeight}, 3000, 'swing');
      })
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    })
    }else{
      clearInterval(autoUpdate);
  }} , 3000 );
});
