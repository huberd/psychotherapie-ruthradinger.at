'use strict';
document.addEventListener( 'alpine:initialized', () => {
	var data = tryDecode();
	headspinDataInitialization( data );
	
	
	document.querySelector( '.headspin-loader' ).classList.add( 'fade-out' );
} );
window.headspinDataInitialization = function ( data ) {
	initSavedData( data );
	Alpine.store('migrations').run()
	window.init_event = new CustomEvent( 'headspinready', { detail: '' } );
	//window.dispatchEvent(init_event);
	document.dispatchEvent( init_event );
	window.headspinReloadTokenAPP = new CustomEvent( 'reloadtokenapp', {
		detail: '',
	} );
	window.dispatchEvent( headspinReloadTokenAPP );
	//document.querySelector('#twp-iframe-light').src = window.location.origin;
	//document.querySelector('#twp-iframe-dark').src = window.location.origin;
	setTimeout(() => {
		Alpine.store('appView').updateAllCharts()
	}, 2000);
};
function initSavedData( data ) {
	
	var blacklist = [ 'defSelector', 'lightSelector', 'darkSelector' ];
	Alpine.store( 'defaults' ).data = JSON.parse(
		JSON.stringify( Alpine.store( 'pd' ) ),
		( k, v ) => ( v === 'true' ? true : v === 'false' ? false : v )
	);
	if ( data == null ) return false;
	for ( var [ key, value ] of Object.entries( Alpine.store( 'pd' ) ) ) {
		if ( data.hasOwnProperty( key ) ) {
			var option = JSON.parse( JSON.stringify( data[ key ] ), ( k, v ) =>
				v === 'true' ? true : v === 'false' ? false : v
			);

			if ( ! blacklist.includes( key ) )
				Alpine.store( 'pd' )[ key ] = option;
		
		}
	}
	//HeadspinloadData = null;
}
window.resetDefaultSingle = function ( option ) {
	for ( var [ key, value ] of Object.entries( Alpine.store( 'pd' ) ) ) {
		if ( key.includes( option ) ) {
			if ( headspinDefaults.hasOwnProperty( key ) ) {
				var option = JSON.parse(
					JSON.stringify( Alpine.store( 'defaults' )[ key ] ),
					( k, v ) =>
						v === 'true' ? true : v === 'false' ? false : v
				);
				Alpine.store( 'pd' )[ key ] = option;
			}
		}
	}
};

function tryDecode() {
	try {
		var data = HeadspinloadData.data;
		data = atob(data);
		data = JSON.parse(data)
		console.info("Headspin data loader API v2")
		return data;
	} catch (error) {
		return  HeadspinloadData.data;
	}
}