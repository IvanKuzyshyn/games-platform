class UserController < ApplicationController
  def index
    users = User.find_by({name: "Ivan"})

    render json: users
  end
end
