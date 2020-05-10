class HomeController < ApplicationController
  before_action :authenticate_user!
  def index
    @message = Message.new
  end
  def get_current_user
    render json: {user_name: current_user.username, user_id: current_user.id}
  end
end
