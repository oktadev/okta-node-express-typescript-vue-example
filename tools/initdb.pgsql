-- Dropping guitars table...
DROP TABLE IF EXISTS guitars;

-- Create guitars table...
CREATE TABLE IF NOT EXISTS guitars (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , user_id varchar(50) NOT NULL
    , brand varchar(50) NOT NULL
    , model varchar(50) NOT NULL
    , year smallint NULL
    , body_type varchar(50) NULL
    , color varchar(50) NULL
    , number_of_strings smallint NULL
    , hasPickups bool NULL
    , hasMIDI bool NULL
    , bridge_type varchar(50) NULL
);

-- Year, Brand, Model, Color, 
-- Type (electric, acoustic, bass, acoustic bass, resonator, steel, pedal steel), 
-- number of strings, Body (solid, semi-hollow, hollow), 
-- Has Pickups, Has MIDI, bridge type (fixed, tremolo)

INSERT INTO guitars ( user_id, brand, model ) VALUES ( '123', 'Gibson', 'ES-335' );

SELECT * FROM guitars;