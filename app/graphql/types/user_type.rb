module Types
  class UserType < GraphQL::Schema::Object
    graphql_name 'User'

    field :id, ID, null: false
    field :name, String, null: false
    field :created_at, String, null: false
    field :updated_at, String, null: false
  end
end