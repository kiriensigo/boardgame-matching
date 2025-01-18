Rails.application.routes.draw do
  get "home/index"
  # Devise関連のルーティング
  devise_for :users, controllers: { 
    omniauth_callbacks: 'users/omniauth_callbacks' 
  }
  root 'home#index'
  # APIコントローラーのルーティング
  namespace :api do
    namespace :v1 do
      resources :users
      resources :board_games
    end
  end
end