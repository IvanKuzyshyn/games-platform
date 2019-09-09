module Types
  class ResultType < GraphQL::Schema::Object
    graphql_name 'Result'

    field :id, ID, null: false
    field :user_id, Integer, null: false
    field :data, String, null: false
    field :created_at, String, null: false
    field :updated_at, String, null: false
  end
end