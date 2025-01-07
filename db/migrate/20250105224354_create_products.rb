class CreateProducts < ActiveRecord::Migration[8.0]
  def change
    create_table :products do |t|
      t.references :user
      t.string :name, null: false

      t.timestamps
    end
  end
end