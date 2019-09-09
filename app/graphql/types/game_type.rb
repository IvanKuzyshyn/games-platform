module Types
  class GameType < GraphQL::Schema::Object
    graphql_name 'Game'

    field :id, Integer, null: false
    field :name, String, null: false
    field :title, String, null: false
    field :type, String, null: false
  end
end