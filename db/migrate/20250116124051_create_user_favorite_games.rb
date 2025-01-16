class CreateUserFavoriteGames < ActiveRecord::Migration[7.2]
  def change
    create_table :user_favorite_games do |t|
      t.references :user, null: false, foreign_key: true
      t.references :board_game, null: false, foreign_key: true

      t.timestamps
    end
  end
end
