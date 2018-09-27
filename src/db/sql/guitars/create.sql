CREATE TABLE ${schema~}.guitars
(
    id serial PRIMARY KEY,
    user_id varchar(50) not null,
    name text NOT NULL
)
