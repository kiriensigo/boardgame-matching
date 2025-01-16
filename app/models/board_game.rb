class BoardGame < ApplicationRecord
    has_many :user_favorite_games
    has_many :users, through: :user_favorite_games
  
    validates :name, presence: true
    validates :min_players, presence: true, numericality: { greater_than: 0 }
    validates :max_players, presence: true, numericality: { greater_than_or_equal_to: :min_players }
  end
  