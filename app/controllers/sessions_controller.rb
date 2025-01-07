class SessionsController < ApplicationController
  allow_unauthenticated_access only: %i[ new create ]
  rate_limit to: 10, within: 3.minutes, only: :create, with: -> { redirect_to new_session_url, alert: "Tente novamente mais tarde." }

  def new
  end

  def create
    if user = User.authenticate_by(params.permit(:email_address, :password))
      start_new_session_for user
      session[:user_id] = user.id
      redirect_to after_authentication_url
    else
      redirect_to new_session_path, alert: "Tente outro endereço de e-mail ou senha."
    end
  end

  def destroy
    terminate_session
    redirect_to new_session_path
  end
end