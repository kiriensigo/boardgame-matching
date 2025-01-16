class Api::V1::BoardGamesController < ApplicationController
  before_action :set_board_game, only: [:show, :update, :destroy]

  def index
    @board_games = BoardGame.all
    render json: @board_games
  end

  def show
    render json: @board_game
  end

  def create
    @board_game = BoardGame.new(board_game_params)
    if @board_game.save
      render json: @board_game, status: :created
    else
      render json: @board_game.errors, status: :unprocessable_entity
    end
  end

  def update
    if @board_game.update(board_game_params)
      render json: @board_game
    else
      render json: @board_game.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @board_game.destroy
    head :no_content
  end

  private

  def set_board_game
    @board_game = BoardGame.find(params[:id])
  end

  def board_game_params
    params.require(:board_game).permit(:name, :min_players, :max_players, :playing_time, :difficulty, :description)
  end
end