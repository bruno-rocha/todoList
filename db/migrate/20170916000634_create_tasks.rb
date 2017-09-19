class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.boolean :is_done, default: false
      t.date :date

      t.timestamps
    end
  end
end
