'use strict';
document.addEventListener( 'headspinready', function () {

	const swal_timeout = 1000;

	const colorPicker = document.getElementById( 'schema-cp' );
	const radixBrowse = document.getElementById( 'browse-palette' );

	window.schemaWheel = new ReinventedColorWheel( {
		appendTo: document.getElementById( 'newSchemaCP' ),

		hsv: [ 0, 100, 100 ],
		wheelDiameter: 250,
		wheelThickness: 20,
		handleDiameter: 15,
		wheelReflectsSaturation: true,
		onChange: function ( color ) {
			syncColors();
		},
	} );
	window.tippyColorpicker = new ReinventedColorWheel( {
		appendTo: document.getElementById( 'tippy-colorpicker-wheel' ),

		hsv: [ 0, 100, 100 ],
		wheelDiameter: 250,
		wheelThickness: 24,
		handleDiameter: 15,
		wheelReflectsSaturation: false,
		onChange: function ( color ) {
			Alpine.store('colorWheel').tcpValue = color.hex;
			debouncedTcpOnChange();
		},
	} );
	function debounce(fn, delay = 200) {
		let timeout;
		return (...args) => {
		  clearTimeout(timeout);
		  timeout = setTimeout(() => fn(...args), delay);
		};
	  }
	  const debouncedTcpOnChange = debounce(() => {
		Alpine.store('colorWheel').tcpOnChange();
	  }, 300);


	  const wrapper = document.getElementById('colorpicker-wrapper'); // contains live picker

	  // single Tippy instance that wraps the wrapper
	  const picker = document.getElementById('colorpicker-wrapper');
	  let currentTarget = null;
	  
	  /**
	   * Smart positioning function that automatically decides placement
	   * based on available viewport space
	   */
	  function positionPicker(target) {
		if (!target || !picker) return;
		
		const rect = target.getBoundingClientRect();
		const pickerRect = picker.getBoundingClientRect();
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		const scrollY = window.scrollY;
		const scrollX = window.scrollX;
		
		// Get picker dimensions (use actual size if visible, otherwise measure temporarily)
		let pickerWidth = pickerRect.width || picker.offsetWidth || 300;
		let pickerHeight = pickerRect.height || picker.offsetHeight || 300;
		
		// If picker is hidden, temporarily show it to measure
		const wasHidden = picker.style.display === 'none';
		if (wasHidden) {
		  picker.style.visibility = 'hidden';
		  picker.style.display = 'block';
		  pickerWidth = picker.offsetWidth || 300;
		  pickerHeight = picker.offsetHeight || 300;
		  picker.style.display = 'none';
		  picker.style.visibility = '';
		}
		
		// Calculate available space in each direction
		const spaceBelow = viewportHeight - rect.bottom;
		const spaceAbove = rect.top;
		const spaceRight = viewportWidth - rect.left;
		const spaceLeft = rect.right;
		
		// Add padding for better UX
		const padding = 10;
		
		// Decide vertical position (top or bottom)
		let top;
		if (spaceBelow >= pickerHeight + padding || spaceBelow >= spaceAbove) {
		  // Position below
		  top = rect.bottom + scrollY + padding;
		} else {
		  // Position above
		  top = rect.top + scrollY - pickerHeight - padding;
		}
		
		// Decide horizontal position (left or right)
		let left;
		if (spaceRight >= pickerWidth + padding || spaceRight >= spaceLeft) {
		  // Position to the right (align with left edge of target)
		  left = rect.left + scrollX;
		} else {
		  // Position to the left (align with right edge of target)
		  left = rect.right + scrollX - pickerWidth;
		}
		
		// Ensure picker doesn't go off-screen (clamp to viewport)
		left = Math.max(padding, Math.min(left - scrollX, viewportWidth - pickerWidth - padding)) + scrollX;
		top = Math.max(padding, Math.min(top - scrollY, viewportHeight - pickerHeight - padding)) + scrollY;
		
		// Apply positioning
		picker.style.top = `${top}px`;
		picker.style.left = `${left}px`;
		
		if (wasHidden) {
		  picker.style.display = 'block';
		}
	  }
	  
	  document.body.addEventListener('click', (e) => {
		const target = e.target.closest('[data-tippy-picker]');
		
		// Check if click is inside the picker itself
		const clickInsidePicker = picker && picker.contains(e.target);
		
		if (!target && !clickInsidePicker) {
		  // click outside: hide picker
		  picker.style.display = 'none';
		  currentTarget = null;
		  return;
		}
		
		// If clicking inside picker, don't do anything (keep it open)
		if (clickInsidePicker) {
		  return;
		}
	  
		currentTarget = target;
		positionPicker(target);
	  });
	  
	  window.addEventListener('scroll', () => {
		if (!currentTarget) return;
		positionPicker(currentTarget);
	  });
	  
	  window.addEventListener('resize', () => {
		if (!currentTarget) return;
		positionPicker(currentTarget);
	  });

	function syncColors() {
		var color = schemaWheel;
		Alpine.store( 'project' ).invalidColorSchemaInput = false;

		var val1 = document.getElementById( 'sc-hex' ).value;
		var val2 = document.getElementById( 'sc-hex2' ).value;

		if ( val1 != schemaWheel.hex ) {
			document.getElementById( 'sc-hex' ).value = schemaWheel.hex;
		}
		if ( Alpine.store( 'project' ).schemaEditorTab == 'custom' ) {
			if ( val2 != schemaWheel.hex ) {
				document.getElementById( 'sc-hex2' ).value = chroma(
					schemaWheel.hex
				).hex();
				throttle(
					Alpine.store( 'project' ).setCustomColor(
						chroma( schemaWheel.hex ).hex()
					),
					1000
				);
			}
		}

		//refresh preview
	}
	//syncColors();
} );

function throttle( cb, delay = 1000 ) {
	let shouldWait = false;
	let waitingArgs;
	const timeoutFunc = () => {
		if ( waitingArgs == null ) {
			shouldWait = false;
		} else {
			cb( ...waitingArgs );
			waitingArgs = null;
			setTimeout( timeoutFunc, delay );
		}
	};

	return ( ...args ) => {
		if ( shouldWait ) {
			waitingArgs = args;
			return;
		}

		cb( ...args );
		shouldWait = true;
		setTimeout( timeoutFunc, delay );
	};
}
