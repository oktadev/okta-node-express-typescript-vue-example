SELECT  count(*) AS total 
FROM    ${schema~}.guitars
WHERE   user_id = ${userId}