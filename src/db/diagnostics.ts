import fs from "fs";
import os from "os";
import * as pgMonitor from "pg-monitor";
import { IOptions } from "pg-promise";

pgMonitor.setTheme( "matrix" );
const $DEV = process.env.NODE_ENV === "development";
const logFile = "./db-errors.log";

pgMonitor.setLog( ( msg, info ) => {
	if ( info.event === "error" ) {
		let logText = os.EOL + msg;
		if ( info.time ) {
			logText = os.EOL + logText;
		}
		fs.appendFileSync( logFile, logText );
	}

	if ( !$DEV ) {
		info.display = false;
	}
} );

export = {
	init( options: IOptions<any> ) {
		if ( $DEV ) {
			pgMonitor.attach( options );
		} else {
			pgMonitor.attach( options, [ "error" ] );
		}
	}
};
