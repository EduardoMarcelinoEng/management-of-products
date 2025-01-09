class SignUpController < ApplicationController
  allow_unauthenticated_access only: %i[ index create new ]

  def index
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to action: 'index'
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.expect(user: [ :email ])
    end
end
