document.addEventListener( 'alpine:init', () => {
	Alpine.data( 'modal', ( initialOpenState = false ) => ( {
		modalOpen: initialOpenState,
		toggle(evname) {
			if ( Alpine.store( 'project' ).invalidColorSchemaInput )
				return false;
				
			// Dispatch custom event if evname is provided
			if (evname) {
				this.$el.dispatchEvent(new CustomEvent(evname, { 
					bubbles: true,
					detail: { modal: this }
				}));
			}
			
			if ( this.modalOpen ) {
				return this.close();
			}

			this.$refs.button.focus();

			this.modalOpen = true;
			Alpine.store('appView').updateAllCharts()
		},
		close( focusAfter ) {
			if ( ! this.modalOpen && ! Alpine.store( 'project' ).schemaEdit )
				return;

			this.modalOpen = false;
			Alpine.store( 'project' ).schemaEdit = false;

			focusAfter && focusAfter.focus();
		},
	} ) );
	Alpine.data( 'dropdown', ( initialOpenState = false ) => ( {
		dropdownOpen: initialOpenState,
		toggle() {
			this.$refs.button.focus();
			this.dropdown = true;
		},
		close( focusAfter ) {
			this.dropdownOpen = false;
			focusAfter && focusAfter.focus();
		},
	} ) );

} );
