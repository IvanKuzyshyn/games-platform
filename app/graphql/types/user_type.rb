module Types
  class UserType < Types::BaseObject
    field :id, Integer, null: false
    field :name, String, null: false
    field :created_at, String, null: false
    field :updated_at, String, null: false
  end
end