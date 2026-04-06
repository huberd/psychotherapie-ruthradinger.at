document.addEventListener( 'alpine:init', () => {
	Alpine.store( 'sync', {
		run() {
			rt_sync.postMessage( '100' );
			Alpine.store( 'sync' ).syncInProgress = true;
			Alpine.store( 'sync' ).steps.length = 0;
			Alpine.store( 'sync' ).steps.push( Alpine.store( 'sync' ).error );
		},
		syncInProgress: false,
		steps: [
			{
				step: 'Please open Page builder and run sync again',
				desc: 'Please open Breakdance Builder',
				status: 'false',
			},
		],
		error: {
			step: 'Please open Page builder and run sync again',
			desc: 'Please open Breakdance Builder',
			status: 'false',
		},
	} );
} );
