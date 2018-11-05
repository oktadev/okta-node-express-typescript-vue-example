-- Dropping guitars table...
DROP TABLE IF EXISTS guitars;

-- Create guitars table...
CREATE TABLE IF NOT EXISTS guitars (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , user_id varchar(50) NOT NULL
    , brand varchar(50) NOT NULL
    , model varchar(50) NOT NULL
    , year smallint NULL 
    , color varchar(50) NULL
);

/* 
Other properties you may consider:
    * Type (electric, acoustic, bass, acoustic bass, resonator, steel, pedal steel)
    * Number of strings
    * Body (solid, semi-hollow, hollow)
    * Has Pickups
    * Has MIDI
    * Bridge type (fixed, tremolo)
*/