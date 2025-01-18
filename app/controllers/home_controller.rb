class HomeController < ApplicationController
  def index
    @user = current_user if user_signed_in?
    
    # デバッグ情報を出力
    Rails.logger.debug "HomeController#index アクションが呼び出されました"
    Rails.logger.debug "ユーザーログイン状態: #{user_signed_in?}"
    Rails.logger.debug "current_user: #{@user.inspect}"
    
    # 明示的にレンダリング
    render 'index'
  end
end