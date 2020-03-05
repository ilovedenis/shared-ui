( function( $ ) {

	// Enable strict mode.
	'use strict';

	// Define global SUI object if it does not exist.
	if ( 'object' !== typeof window.SUI ) {
		window.SUI = {};
	}

	/**
	 * @desc Notifications function to show when alert.
	 *
	 * @param noticeId
	 *
	 * @param noticeMessage
	 *
	 * @param noticeOptions
	 */
	SUI.openNotice = ( noticeId, noticeMessage, noticeOptions ) => {

		// Get notification node by ID.
		const noticeNode  = $( '#' + noticeId );
		const nodeWrapper = noticeNode.parent();

		// Check if element ID exists.
		if ( null === typeof noticeNode || 'undefined' === typeof noticeNode ) {
			throw new Error( 'No element found with id="' + noticeId + '".' );
		}

		// Check if element has correct attribute.
		if ( 'alert' !== noticeNode.attr( 'role' ) ) {
			throw new Error( 'Notice requires a DOM element with ARIA role of alert.' );
		}

		// Check if notice message is empty.
		if ( null === typeof noticeMessage || 'undefined' === typeof noticeMessage || '' === noticeMessage ) {
			throw new Error( 'Notice requires a message to print.' );
		}

		let utils = utils || {};

		/**
		 * @desc Verify if property is an array.
		 */
		utils.isObject = ( obj ) => {

			if ( ( null !== obj || 'undefined' !== obj ) && $.isPlainObject( obj ) ) {
				return true;
			}

			return false;

		};

		/**
		 * @desc Deep merge two objects.
		 * Watch out for infinite recursion on circular references.
		 */
		utils.deepMerge = ( target, ...sources ) => {
			if ( ! sources.length ) {
				return target;
			}

			const source = sources.shift();

			if ( utils.isObject( target ) && utils.isObject( source ) ) {

				for ( const key in source ) {

					if ( utils.isObject( source[ key ]) ) {

						if ( ! target[ key ]) {
							Object.assign( target, { [key]: {} });
						}
						utils.deepMerge( target[key], source[ key ]);

					} else {
						Object.assign( target, { [key]: source[ key ] });
					}
				}
			}

			return utils.deepMerge( target, ...sources );
		};

		/**
		 * @desc Declare default styling options for notifications.
		 */
		utils.setProperties = ( incomingOptions = {}) => {

			utils.options = [];

			const defaults = {
				type: 'default',
				icon: 'info',
				dismiss: {
					show: false,
					label: 'Close this notice',
					tooltip: '',
				},
				autoclose: {
					show: true,
					timeout: 3000,
				},
			};

			utils.options[0] = utils.deepMerge( defaults, incomingOptions );
		};

		utils.setProperties( noticeOptions );

		/**
		 * @desc Verify if property is an array.
		 */
		utils.isArray = ( obj ) => {

			if ( ( null !== obj || 'undefined' !== obj ) && $.isArray( obj ) ) {
				return true;
			}

			return false;

		};

		/**
		 * @desc Verify if property exists.
		 */
		utils.propExists = ( arr, prop ) => {

			if ( ( null !== typeof prop || 'undefined' !== typeof prop ) && arr.hasOwnProperty( prop ) ) {
				return true;
			}

			return false;

		};

		/**
		 * @desc Grab property from object.
		 */
		utils.getProperty = ( prop ) => {

			const defOptions = utils.options;
			const newOptions = noticeOptions;

			// Check if default option exists.
			if ( true === utils.propExists( defOptions[0], prop ) ) {

				// Check if new options exist in array to overwrite default one.
				if ( true === utils.isArray( newOptions ) ) {

					// Check if default option property can be overwritten.
					if ( true === utils.propExists( newOptions[0], prop ) && true === utils.propExists( defOptions[0], prop ) ) {
						defOptions[0][prop] = newOptions[0][prop];
					}
				}

				return defOptions[0][prop];

			}
		};

		/**
		 * @desc Build notice dismiss.
		 */
		utils.buildDismiss = () => {

			let html = '';

			const dismiss = utils.getProperty( 'dismiss' );

			if ( true === dismiss.show ) {

				html = document.createElement( 'div' );
				html.className = 'sui-notice-actions';

					let innerHTML = '';

					if ( '' !== dismiss.tooltip ) {
						innerHTML += '<div class="sui-tooltip" data-tooltip="' + dismiss.tooltip + '">';
					}

						innerHTML += '<button class="sui-button-icon">';

							innerHTML += '<i class="sui-icon-check" aria-hidden="true"></i>';

							if ( '' !== dismiss.label ) {
								innerHTML += '<span class="sui-screen-reader-text">' + dismiss.label + '</span>';
							}

						innerHTML += '</button>';

					if ( '' !== dismiss.tooltip ) {
						innerHTML += '</div>';
					}

				html.innerHTML = innerHTML;

			}

			return html;
		};

		/**
		 * @desc Build notice icon.
		 */
		utils.buildIcon = () => {

			let html = '';

			const icon = utils.getProperty( 'icon' );

			if ( '' !== icon ) {

				html = document.createElement( 'span' );
				html.className += 'sui-notice-icon sui-icon-' + icon + ' sui-md';
				html.setAttribute( 'aria-hidden', true );

				if ( 'loader' === icon ) {
					html.classList.add( 'sui-loading' );
				}
			}

			return html;

		};

		/**
		 * @desc Build notice message.
		 */
		utils.buildMessage = () => {

			const html = document.createElement( 'div' );

			html.className = 'sui-notice-message';

			html.innerHTML = noticeMessage;
			html.prepend( utils.buildIcon() );

			return html;
		};

		/**
		 * @desc Build notice markup.
		 */
		utils.buildNotice = () => {

			const html = document.createElement( 'div' );
			html.className = 'sui-notice-content';

			html.append( utils.buildMessage(), utils.buildDismiss() );

			return html;

		};

		/**
		 * @desc Show notification message.
		 */
		utils.showNotice = ( animation, timeout ) => {

			// Remove tabindex.
			noticeNode.removeAttr( 'tabindex' );

			// Print notification message.
			noticeNode.append( utils.buildNotice() );

			// Show animation.
			if ( 'slide' === animation ) {
				noticeNode.slideDown( timeout );
			} else if ( 'fade' === animation ) {
				noticeNode.fadeIn( timeout );
			} else {
				noticeNode.show( timeout );
			}
		};

		/**
		 * @desc Open notification message.
		 */
		utils.openNotice = ( animation, timeout = 300 ) => {

			const dismiss   = utils.getProperty( 'dismiss' );
			const autoclose = utils.getProperty( 'autoclose' );

			// Check if element is already visible.
			if ( noticeNode.is( ':visible' ) ) {

				// Close notice.
				SUI.closeNotice( noticeId );

				// Show notice.
				utils.showNotice( animation, timeout );

			} else {

				// Show notice.
				utils.showNotice( animation, timeout );

			}

			// Load after notice show animation stops.
			setTimeout( () => {

				// Check if notice can dismiss.
				if ( true === dismiss.show ) {

					// Focus dismiss button.
					noticeNode.find( '.sui-notice-actions button' ).focus();

					// Dismiss button.
					noticeNode.find( '.sui-notice-actions button' ).on( 'click', SUI.closeNotice( noticeId ) );
				} else {

					// Check if autoclose is enabled.
					if ( true === autoclose.show ) {
						setTimeout( () => SUI.closeNotice( noticeId ), ( timeout + parseInt( autoclose.timeout ) ) );
					}
				}
			}, ( timeout ) );
		};

		/**
		 * @desc Initialize function.
		 */
		let init = () => {

			/**
			 * When notice should float, it needs to be wrapped inside:
			 * <div class="sui-floating-notices"></div>
			 *
			 * IMPORTANT: This wrapper goes before "sui-wrap" closing tag
			 * and after modals markup.
			 */
			if ( nodeWrapper.hasClass( 'sui-floating-notices' ) ) {
				utils.openNotice( 'slide' );
			} else {
				utils.openNotice( 'fade' );
			}
		};

		init();

		return this;

	};

	SUI.closeNotice = () => {};

	SUI.notice = () => {};

	SUI.notice();

}( jQuery ) );