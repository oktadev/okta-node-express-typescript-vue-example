-- Dropping guitars table...
DROP TABLE IF EXISTS guitars;

-- Create guitars table...
CREATE TABLE IF NOT EXISTS guitars (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , user_id VARCHAR(50)
    , name VARCHAR(50)
);

INSERT INTO guitars ( user_id, name ) VALUES ( '123', 'Gibson ES-335' );
