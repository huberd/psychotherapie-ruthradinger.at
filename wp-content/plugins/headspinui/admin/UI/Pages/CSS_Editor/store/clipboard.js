function fallbackCopyTextToClipboard( text, t, d, s ) {
	var textArea = document.createElement( 'textarea' );
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = '0';
	textArea.style.left = '0';
	textArea.style.position = 'fixed';

	document.body.appendChild( textArea );
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand( 'copy' );
		var msg = successful ? 'successful' : 'unsuccessful';
		toast( t, {
			type: s,
			description: d,
		} );
	} catch ( err ) {
		window.prompt( 'Copy to clipboard: Ctrl+C, Enter', txt );
	}

	document.body.removeChild( textArea );
}
window.copyToClipboard = function ( text, title, desc, status ) {
	if ( title == undefined ) title = 'Clipboard success!';
	if ( desc == undefined ) desc = 'Data is copied to clipboard';
	if ( status == undefined ) status = 'success';
	if ( ! navigator.clipboard ) {
		fallbackCopyTextToClipboard( text, title, desc, status );
		return;
	}
	navigator.clipboard.writeText( text ).then(
		function () {
			toast( title, { type: status, description: desc } );
		},
		function ( err ) {
			console.error( 'Async: Could not copy text: ', err );
		}
	);
};
