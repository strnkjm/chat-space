json.id @message.id
json.created_at @message.created_at.in_time_zone('Tokyo').strftime("%Y年%m月%d日 %H時%M分")
json.user_name @message.user.name
json.content @message.content
json.image @message.image.url