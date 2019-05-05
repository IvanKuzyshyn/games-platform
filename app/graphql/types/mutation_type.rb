module Types
  class MutationType < GraphQL::Schema::Object
    field :createUser, mutation: Mutations::CreateUser
  end
end
