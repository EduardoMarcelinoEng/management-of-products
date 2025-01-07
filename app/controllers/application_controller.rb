class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?
  include Authentication
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  def current_user
    current_user_id = session[:user_id]
    @current_user = User.find_by(id: current_user_id)
  end

  def logged_in?
    current_user != nil
  end
end
