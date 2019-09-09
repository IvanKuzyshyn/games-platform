module Types
  class MutationType < GraphQL::Schema::Object
    field :writeResults, mutation: Mutations::WriteResults
    field :createUser, mutation: Mutations::CreateUser
  end
end
