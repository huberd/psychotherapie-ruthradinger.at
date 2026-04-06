'use strict';
document.addEventListener( 'DOMContentLoaded', function () {
	//Make the DIV element draggagle:
	const dragElementsIDs = [ 'resize-handle' ];
	dragElementsIDs.forEach( ( el ) => {
		dragElement( document.getElementById( el ) );
	} );

	function dragElement( elmnt ) {
		var pos1 = 0,
			pos2 = 0,
			pos3 = 0,
			pos4 = 0,
			left = 0,
			top = 0,
			mainW = 0;

		if ( document.getElementById( elmnt.id + '-header' ) ) {
			/* if present, the header is where you move the DIV from:*/
			document.getElementById( elmnt.id + '-header' ).onmousedown =
				dragMouseDown;
		} else {
			/* otherwise, move the DIV from anywhere inside the DIV:*/
			elmnt.onmousedown = dragMouseDown;
		}

		function dragMouseDown( e ) {
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
            document.querySelector("html").classList.add('js-panel-resize')
		}

		function elementDrag( e ) {
            let max = document.getElementById("postcss-app").getBoundingClientRect().width - 360 - document.querySelector(".aside-tree").getBoundingClientRect().width;
			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			//left = document.querySelector("html").getBoundingClientRect().width - e.clientX ;
            mainW = e.clientX - document.querySelector("main").getBoundingClientRect().left;
            if(mainW > max){
                mainW = max;
            }
			if ( mainW < 250 ) mainW = 250;
			// set the element's new position:
			document.querySelector("html").style.setProperty("--preview-width", mainW + "px") 
			document.querySelector(".aside-preview-wrapper").style.maxWidth =  Number(document.querySelector("header").getBoundingClientRect().width - document.querySelector(".aside-tree").getBoundingClientRect().width - mainW) + "px";
			console.log(document.querySelector(".aside-preview-wrapper").style.maxWidth )
		}

		function closeDragElement() {
			/* stop moving when mouse button is released:*/
			document.onmouseup = null;
			document.onmousemove = null;
            document.querySelector("html").classList.remove('js-panel-resize')
		}
	}
} );
