class BggApiService
    include HTTParty
    base_uri 'https://boardgamegeek.com/xmlapi2'
  
    class << self
      def search_games(query, exact: false)
        params = {
          query: query,
          type: 'boardgame',
          exact: exact ? 1 : 0
        }
        
        response = get('/search', query: params)
        results = parse_search_response(response)
        
        results.sort_by do |game|
          [
            game[:name].downcase.include?('expansion') ? 1 : 0,
            game[:name].downcase.include?('fan') ? 1 : 0
          ]
        end
      end
  
      def get_game_details(game_id)
        response = get('/thing', query: { 
          id: game_id, 
          stats: 1,
          versions: 1
        })
        parse_game_details(response)
      end
  
      private
  
      def parse_search_response(response)
        return [] unless response.success?
  
        doc = Nokogiri::XML(response.body)
        doc.xpath('//item').map do |item|
          {
            id: item['id'],
            name: item.at_xpath('.//name')['value'],
            year_published: item.at_xpath('.//yearpublished')&.[]('value'),
            type: item['type']
          }
        end
      end
  
      def parse_game_details(response)
        return nil unless response.success?
  
        doc = Nokogiri::XML(response.body)
        item = doc.at_xpath('//item')
        return nil unless item
  
        {
          id: item['id'],
          name: item.at_xpath('.//name[@type="primary"]')['value'],
          min_players: item.at_xpath('.//minplayers')['value'].to_i,
          max_players: item.at_xpath('.//maxplayers')['value'].to_i,
          playing_time: item.at_xpath('.//playingtime')['value'].to_i,
          description: clean_description(item.at_xpath('.//description')&.text),
          year_published: item.at_xpath('.//yearpublished')['value'],
          image: item.at_xpath('.//image')&.text,
          rating: item.at_xpath('.//statistics/ratings/average')['value'].to_f,
          weight: item.at_xpath('.//statistics/ratings/averageweight')['value'].to_f
        }
      end

      
      def clean_description(text)
        return '' unless text
        text.gsub('&#10;', "\n").gsub(/&[a-zA-Z]+;/, ' ').strip
      end
    end
  end