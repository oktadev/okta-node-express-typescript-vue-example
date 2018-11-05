import axios from "axios";
import * as M from "materialize-css";
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
			selectedGuitar: "",
			selectedGuitarId: 0,
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
		confirmDeleteGuitar( id: string ) {
			const guitar = this.guitars.find( ( g: any ) => g.id === id );
			this.selectedGuitar = `${ guitar.year } ${ guitar.brand } ${ guitar.model }`;
			this.selectedGuitarId = guitar.id;
			const dc = this.$refs.deleteConfirm;
			const modal = M.Modal.init( dc );
			// const modal = M.Modal.getInstance( dc );
			modal.open();
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
