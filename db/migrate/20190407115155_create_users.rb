class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :id
      t.string :name

      t.timestamps
    end
    add_index :users, :name, unique: true
  end
end
