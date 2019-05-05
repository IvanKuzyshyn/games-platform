class Mutations::CreateUser < Mutations::Base
  argument :name, String, required: true

  field :user, Types::UserType, null: true
  field :errors, [String], null: true

  def resolve(name:)
    user = User.create(name: name)

    {
      user: user.valid? ? user : nil,
      errors: user.errors.full_messages
    }
  end
end