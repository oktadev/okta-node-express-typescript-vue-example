SELECT  
    id
    , brand
    , model
    , year
    , color
--    , body_type
--    , number_of_strings
--    , hasPickups
--    , hasMIDI
--    , bridge_type
FROM    ${schema~}.guitars
WHERE   user_id = ${userId}
  AND   ( brand ILIKE ${search} OR model ILIKE ${search} )