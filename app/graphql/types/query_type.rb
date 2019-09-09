module Types
  class QueryType < GraphQL::Schema::Object
    field :user, Types::UserType, null: true do
      argument :name, String, required: true
    end

    field :results, [Types::ResultType, null: true], null: false

    def user(name:)
      User.find_by({name: name})
    end

    def results
      Result.all
    end
  end
end
