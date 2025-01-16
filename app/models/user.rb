class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
         
  has_many :user_favorite_games
  has_many :favorite_games, through: :user_favorite_games, source: :board_game
end