class MessagesController < ApplicationController
    

    def index
        @messages = Message.last(100).collect{|msg| {message: msg, message_content: msg.content, time: msg.created_at.strftime("%l:%M %p | %b %d"), username: msg.user.username, user_id: msg.user.id}} 
        render json: @messages       
    end

    def new
        @message = Message.new    
    end

    def create
        @message = current_user.messages.create(msg_params)
        if @message.save
            ActionCable.server.broadcast('chat_room_channel', 
                {message: @message, message_content: @message.content, time: @message.created_at.strftime("%l:%M %p | %b %d"), username: current_user.username, user_id: current_user.id})
        end
    end

    private
        def msg_params
            params.require(:message).permit(:content)
        end
end
