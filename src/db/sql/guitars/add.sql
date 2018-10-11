INSERT INTO ${schema~}.guitars( user_id
    , brand
    , model
    , year
    , body_type
    , color
    , number_of_strings
    , hasPickups
    , hasMIDI
    , bridge_type )
VALUES( ${userId}
    , ${brand}
    , ${model}
    , ${year}
    , ${bodyType}
    , ${color}
    , ${numberOfStrings}
    , ${hasPickups}
    , ${hasMidi}
    , ${bridgeType} )
RETURNING 
    id
    , brand
    , model
    , year
    , body_type
    , color
    , number_of_strings
    , hasPickups
    , hasMIDI
    , bridge_type