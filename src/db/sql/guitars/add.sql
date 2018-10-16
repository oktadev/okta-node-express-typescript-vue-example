INSERT INTO ${schema~}.guitars( 
    user_id
    , brand
    , model
    , year
    , color
--    , body_type
--    , number_of_strings
--    , hasPickups
--    , hasMIDI
--    , bridge_type
)
VALUES( ${userId}
    , ${brand}
    , ${model}
    , ${year}
    , ${color}
--    , ${bodyType}
--    , ${numberOfStrings}
--    , ${hasPickups}
--    , ${hasMIDI}
--    , ${bridgeType}
)
RETURNING 
    id
