class Mutations::Base < GraphQL::Schema::RelayClassicMutation
  object_class GraphQL::Schema::Object
  field_class GraphQL::Schema::Field
  input_object_class GraphQL::Schema::InputObject
end