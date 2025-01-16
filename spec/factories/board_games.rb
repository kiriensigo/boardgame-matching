FactoryBot.define do
  factory :board_game do
    name { "MyString" }
    min_players { 1 }
    max_players { 1 }
    playing_time { 1 }
    difficulty { "MyString" }
  end
end
