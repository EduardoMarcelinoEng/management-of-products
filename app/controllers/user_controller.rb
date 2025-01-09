class UserController < ApplicationController
  allow_unauthenticated_access only: %i[ index create new ]
  skip_before_action :verify_authenticity_token, :only => [:create]

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    if User.exists?(email_address: params[:email_address])
      redirect_to "/nova-conta", status: 409, alert: "O e-mail informado já foi cadastrado."
    else
      @user = User.new(params.permit(:email_address, :password, :password_confirmation))
      if @user.save
        redirect_to root_path
      else
        render :new, status: :unprocessable_entity
      end
    end
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.expect(user: [ :email_address, :password, :password_confirmation ])
    end
end
