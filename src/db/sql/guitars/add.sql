INSERT INTO ${schema~}.guitars( user_id, name )
VALUES( ${userId}, ${name} )
RETURNING id, name