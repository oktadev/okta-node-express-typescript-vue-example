DELETE 
FROM    ${schema~}.guitars
WHERE   user_id = ${userId}
  AND   id = ${id}