module Types
  class QueryType < GraphQL::Schema::Object
    field :user, Types::UserType, null: true do
      argument :name, String, required: true
    end
    def user(name:)
      User.find_by({name: name})
    end
  end
end
