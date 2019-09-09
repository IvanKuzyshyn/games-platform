class User < ApplicationRecord
  has_many :result

  validates_uniqueness_of :name
end
