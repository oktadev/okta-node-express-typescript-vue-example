import * as shell from "shelljs";

shell.cp( "-R", "src/db/sql", "dist/db/" );
shell.cp( "-R", [ "src/views", "src/public" ], "dist/" );
shell.rm( [ "dist/public/js/*.ts", "dist/public/js/*.json" ] );
