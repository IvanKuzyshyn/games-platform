module Types
  class QueryType < Types::BaseObject

    field :user, Types::UserType, null: true,
      description: "Platform user"

    def user
      User.first
    end

  end
end
