class AddDescriptionToBoardGames < ActiveRecord::Migration[7.2]
  def change
    add_column :board_games, :description, :text
  end
end
