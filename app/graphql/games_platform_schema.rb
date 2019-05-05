class GamesPlatformSchema < GraphQL::Schema
  mutation(Types::MutationType)
  query(Types::QueryType)

  max_complexity 200
  max_depth 10
end
