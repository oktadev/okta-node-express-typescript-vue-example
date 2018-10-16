import axios from "axios";
import Vue from "vue";

// tslint:disable no-unused-expression
new Vue( { // eslint-disable-line no-new
	computed: {
		noGuitars(): boolean {
			return this.isLoading === false && this.guitars.length === 0;
		}
	},
	data() {
		return { isLoading: true, guitars: [] };
	},
	el: "#app",
	mounted() {
		axios
			.get( "/api/guitars/all" )
			.then( ( res: any ) => {
				this.isLoading = false;
				this.guitars = res.data;
			} )
			.catch( ( err: any ) => {
				// tslint:disable no-console
				console.log( err ); // eslint-disable-line no-console
			} );
	}
} );
