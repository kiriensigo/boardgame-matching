require 'rails_helper'

RSpec.describe "Api::V1::BoardGames", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/board_games/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/api/v1/board_games/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/board_games/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/api/v1/board_games/update"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/board_games/destroy"
      expect(response).to have_http_status(:success)
    end
  end

end
