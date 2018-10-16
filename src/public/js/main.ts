import axios from "axios";
import Vue from "vue";

// tslint:disable no-unused-expression
new Vue( { // eslint-disable-line no-new
	computed: {
		hazGuitars(): boolean {
			return this.isLoading === false && this.guitars.length > 0;
		},
		noGuitars(): boolean {
			return this.isLoading === false && this.guitars.length === 0;
		}
	},
	data() {
		return {
			brand: "",
			color: "",
			guitars: [],
			isLoading: true,
			model: "",
			year: ""
		};
	},
	el: "#app",
	methods: {
		addGuitar() {
			const guitar = {
				brand: this.brand,
				color: this.color,
				model: this.model,
				year: this.year
			};
			axios
				.post( "/api/guitars/add", guitar )
				.then( () => {
					this.$refs.year.focus();
					this.brand = "";
					this.color = "";
					this.model = "";
					this.year = "";
					this.loadGuitars();
				} )
				.catch( ( err: any ) => {
					// tslint:disable no-console
					console.log( err ); // eslint-disable-line no-console
				} );
		},
		deleteGuitar( id: string ) {
			axios
				.delete( `/api/guitars/remove/${ id }` )
				.then( this.loadGuitars )
				.catch( ( err: any ) => {
					// tslint:disable no-console
					console.log( err ); // eslint-disable-line no-console
				} );
		},
		loadGuitars() {
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
	},
	mounted() {
		return this.loadGuitars();
	}
} );
