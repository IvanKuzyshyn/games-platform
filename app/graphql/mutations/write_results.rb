class Mutations::WriteResults < Mutations::Base
  argument :user_id, Integer, required: true
  argument :data, String, required: true

  field :result, Types::ResultType, null: true
  field :errors, [String], null: true

  def resolve(user_id:, data:)
    result = Result.create(user_id: user_id, data: data)

    {
        result: result.valid? ? result : nil,
        errors: result.errors.full_messages
    }
  end
end