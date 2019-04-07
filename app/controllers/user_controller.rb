class UserController < ApplicationController
  def index
    users = User.first

    render json: users
  end

  def find
  end
end
