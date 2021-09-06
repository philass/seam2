# Delete old test database
psql -h localhost -U postgres -c "DROP DATABASE test;"
# Make fresh test database
psql -h localhost -U postgres -c "CREATE DATABASE test;"
# Migrate database schema
DATABASE_URL=postgres://postgres@localhost:5432/test npm run migrate up
# Populate tables from json file
node load-customer-data.js
