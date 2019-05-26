namespace :graphql do
  task schema: :environment do
    schema_def = GamesPlatformSchema.to_definition
    schema_path = 'schema.graphql'
    File.write(Rails.root.join(schema_path), schema_def)

    puts "Updated #{schema_path}"
  end
end