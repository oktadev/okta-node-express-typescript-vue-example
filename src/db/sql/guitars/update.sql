UPDATE ${schema~}.guitars
SET brand = ${brand}
    , model = ${model}
    , year = ${year}
    , color = ${color}
--    , body_type = ${bodyType}
--    , number_of_strings = ${numberOfStrings}
--    , hasPickups = ${hasPickups}
--    , hasMIDI = ${hasMIDI}
--    , bridge_type = ${bridgeType}
WHERE   
    id = ${id}
    AND user_id = ${userId}
RETURNING
    id
