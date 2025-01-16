class CreateBoardGames < ActiveRecord::Migration[7.2]
  def change
    create_table :board_games do |t|
      t.string :name
      t.integer :min_players
      t.integer :max_players
      t.integer :playing_time
      t.string :difficulty

      t.timestamps
    end
  end
end
