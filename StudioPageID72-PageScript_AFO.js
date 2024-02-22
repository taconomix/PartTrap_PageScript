/*== PageID=72 2023/10/31 =================================================================
	Custom Page Script 

	Page ID:    ID=72
	Products:   AFO-CONF1
	
==========================================================================================*/



/*========================================================
	Add class to hide Brand radio button.
		Added 2022/11/08
========================================================*/
	var sStyle = `
		/* Custom Style Sheet from PartTrap Studio PageScript */

		.config-selection-radio.Brand {

			display:none;
		}

		.alertify-log-error {
					background: #4c5966;
					color: #FFFFFF
		}`;

		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = sStyle;
		document.head.appendChild(css);



/*========================================================
	Customer-Specific Option Changes
		Changed 2023/10/26
========================================================*/
	var modPrep = 'input[field-name="kPrepped_c"]';
	var myCust  = $(document.body).attr("data-customer");
	var myUser  = document.getElementById("CurrentUserName").value;
	var cfCusts = ["Asviray","MID46635", "SURESTEP", "davidt", "HANGER", "LUM46804"];
	var prepAllow = ['LUM46804', 'HANGER', 'MID46635', 'SURESTEP', 'stmetzger', 'ecogswell'];

	
	var isPrepCust = prepAllow.indexOf(myCust) >= 0 || prepAllow.indexOf(myUser) >= 0;

	if ( !isPrepCust ) 
		$(modPrep).parents('div.config-selection-radio').hide();




	/*==================================================
		Trigger validate-fields on loading saved config
			Added 2022/12/13
	===================================================*/
	$(document).ready(function() {

		if (isSavedConfig) {

			$('.measurement-value-container').find('.measurement-validate-input').trigger('change');
			var hasRtMeas = false;
			for (var i = 1; i <= 13; i++) {
				if ( !isNaN(parseFloat( $('[validate-field="dMeas' + i + 'r_c"]').val() )) ) hasRtMeas = true;
			}
			if (hasRtMeas) $('[name="kSplit"]').click();
		}


		/*============================================================
            Adjust CSS for Add To Cart button
                Added 2023/06/19
        ============================================================*/
        $('.add-config-to-cart').addClass('btn');
        $('.add-config-to-cart').css("font-weight","bold");
        $('.add-config-to-cart').css("margin-top", "13px");
        $('.add-config-to-cart').css("margin-left","13px");


		/*============================================================
			Get UserID - Temp fix until PartTrap will pass email
				Changed 2023/03/17
		============================================================*/
		addToSummary("Username",myUser,"PTUserEmail_c");
	});




/*========================================================
	Add 'Adjustment' classes to Heel/Ankle/FF Adj Fields
		Added 2022/11/08
========================================================*/

	$('.Heel.Correction, .Ankle.Correction').addClass('Adjustment');
	$('.Forefoot.Correction').addClass('Adjustment Heel');




/*========================================================
	Select Inner Boot Alert on kHeelCut
		added 2023/03/23
========================================================*/

	$(document).on('click', '[field-name="kHeelCut_c"]', function (e) {

		if ( $(this).is(':checked') ) {
		    
			var cBoot = $('[field-name="cBoot_c"]:selected').attr("value");
			var hcMsg = "Please select an inner boot material.";
			if ( cBoot == null || cBoot == "None" ) alert(hcMsg);
		}
	});




/*========================================================
	Cast Warning
		added 2023/10/31
========================================================
	$('input[field-name="ModType_c"]').on('change', function () {

			if ( $(this).attr("data-value") != "M" )
				alert('To ensure casts are processed correctly, please send a copy of the O-Form attached to your confirmation email when shipping casts.');

	});
*/




/*========================================================
	Alternate Patterns
		Changed 2023/10/31
========================================================*/

	$('div.bAltPattern').hide();


	$(document).on('click', '.config-selection-image-slider.Pattern a', function (e) {

		$('div.config-selected-image-container').children('input[field-name="cPattern_c"]').attr('id','myPattern');
		
		var selectedOther = $('#myPattern').attr('data-value') == "MATERIALS";

		if (  selectedOther && isPrepCust ) {
			
			$('div.bAltPattern').show();
			$('div.bAltPattern').trigger('change');

		} else {

			$('div.bAltPattern').hide();
		}

		validateRequiredImages($('.Pattern.row'));
	});



	$(document).on('change', '.bAltPattern', function (e) {

		var altPattern = $('div.bAltPattern :selected');

		var altPatternPN = altPattern.attr('value')? altPattern.attr('data-value'): "MATERIALS";

		addToSummary("Pattern", altPatternPN, 'cPattern_c');
		
	});





/*========================================================
	Disable "Add To Cart" if DeviceType not valid
		Added 2022/11/08
========================================================*/

	$(document).on('mouseenter touch', '.order-notes-container', function (e) {
		
		validateRequiredImages($('.Device.Type.AFO'));
		validateRequiredImages($('.Pattern.row'));

		var missingPattern = $('.Pattern.row').hasClass('not-valid');
		var missingType = $('.Device.Type.AFO').hasClass('not-valid');

		$('.add-config-to-cart').attr('disabled', (missingPattern || missingType) )		

	});





/*========================================================
	Get values + send data for right side Measurements
		Changed 2022/12/13
========================================================*/

	$(document).on('change', '[validate-field="dMeas1r_c"]',  function(e) { validRightMeas(1); });
	$(document).on('change', '[validate-field="dMeas2r_c"]',  function(e) { validRightMeas(2); });
	$(document).on('change', '[validate-field="dMeas3r_c"]',  function(e) { validRightMeas(3); });
	$(document).on('change', '[validate-field="dMeas4r_c"]',  function(e) { validRightMeas(4); });
	$(document).on('change', '[validate-field="dMeas5r_c"]',  function(e) { validRightMeas(5); });
	$(document).on('change', '[validate-field="dMeas6r_c"]',  function(e) { validRightMeas(6); });
	$(document).on('change', '[validate-field="dMeas7r_c"]',  function(e) { validRightMeas(7); });
	$(document).on('change', '[validate-field="dMeas8r_c"]',  function(e) { validRightMeas(8); });
	$(document).on('change', '[validate-field="dMeas9r_c"]',  function(e) { validRightMeas(9); });
	$(document).on('change', '[validate-field="dMeas10r_c"]', function(e) { validRightMeas(10);});
	$(document).on('change', '[validate-field="dMeas11r_c"]', function(e) { validRightMeas(11);});
	$(document).on('change', '[validate-field="dMeas12r_c"]', function(e) { validRightMeas(12);});
	$(document).on('change', '[validate-field="dMeas13r_c"]', function(e) { validRightMeas(13);});





/*========================================================
	Correct visibility rules for ModNotes
		Added 2022/11/23
========================================================*/
	
	var modFN = 'input[field-name="ModType_c"]';

	$(modFN).on('change', function () {

		
		$('.Mod.Notes').addClass('show-mod-notes');


		// Warning to reference ordernum, added 2023/10/31
		var castAlert = 'Fabrication from cast selected.\n\nWhen shipping casts, please send a copy of the O-Form you receive in the confirmation email.\n\nCasts received without this O-Form may cause fabrication issues.\n\nOrder will be released from "Hold" status when casts are received.';
		var scanAlert = 'Fabrication from scan selected.\n\nWhen sending scans, please reference the order number you receive in the confirmation email.\n\nScans received without an order number may cause delays in fabrication.';

		if ( $(this).attr("data-value") == "C" )
			alert( castAlert );

		if ( $(this).attr("data-value") == "S" )
			alert( scanAlert );

	});




/*========================================================
	Hide|Show Adjustment Degree input when not needed
		Added 2023/10/10
========================================================*/

	$(document).on('change', 'input[field-name="cAnkleMods_c"]', function () {

	    if ( $(this).attr('data-value') )
	        $('.Adjustment.row').hide();
	    else 
	    	$('.Adjustment.row').show();
	});




/*========================================================
	Set visibility rules for Separate Left/Right Meas
		Changed 2022/12/13
========================================================*/

	var msBox1st = [1,4,6,12];
	var msBoxLbl = ['Circumferences','Widths','Lengths','Finish Height'];


	$('input[field-name="cSBLR_c"]').on('change', function () { //v1
		var splitBox = $('[name="kSplit"]').parents('div.config-selection-container');
		if ( $(this).attr("data-value") == "B" ) splitBox.show();
			else splitBox.hide();

		if ( !($('[name="kSplit"]').is(':checked')) ) { 
			$('[name="kSplit"]').parents('label').children('span')[0].textContent = "Click to Enable";
			toggleMeasBoxes();
		}
	});



	$(document).on('click', '[name="kSplit"]', function (e) {

		var rms = '.RightMs .measurement-input';
		var buttonSpan = $(this).parents('label').children('span');
		if ( buttonSpan[0].textContent.includes("Click") ) flipRightMeas(); 

		if ( $(this).is(':checked') ) {
			buttonSpan[0].textContent = "Separate Measurements Enabled";
			toggleMeasBoxes('split');

			if ( $(modFN+':checked').attr("data-value") == "M" ) {
				$(rms).attr('required', 'required');
				$('.RightMs').closest('.config-selection-measurement-value').attr('required', 'required');
				$('[field-name="dMeas10r_c"]').removeAttr('required', 'required');
				$('[field-name="dMeas11r_c"]').removeAttr('required', 'required');
			} else {
				$(rms).removeAttr('required', 'required');
			}
			
			copyValsTo('right');

		} else {
			buttonSpan[0].textContent = "Separate Measurements Disabled";
			toggleMeasBoxes();

			$(rms).removeAttr('required', 'required');
			$(rms).removeClass('not-valid');
			$('.RightMs .measurement-values').removeClass('not-valid');

			copyValsTo('left');
		}
	});



/*========================================================
	New AFO filters for non-CF Customers; +bugfixes
		Added 2023/03/17
========================================================*/
	if ( (cfCusts.indexOf(myUser) < 0) && (cfCusts.indexOf(myCust) < 0) ) {

		// Hide Brand selection, Floor Rection option
		$('.Brand.row').addClass('hidden');
		$('.Brand.row .col-sm-6').addClass('hidden');
		$('[field-name="cAnkleType_c"][data-value="FR"]').hide();
		$('[for="Floor Reaction"]').hide();

		// Hide all CFab Types
		var hideKeys = [105,110,115,125,210,211,212,230,440,445,450,455];
		var saveKeys = [120,122,123,124,126,130,215,216,220,221,225,226];
		filterAFOs( saveKeys );
	} 


	$(document).on('change', '.config-selection-radio.Ankle.Type input, .config-selection-radio.Brand input', function (e) {

		var myAnkle = $('input[field-name="cAnkleType_c"]:checked').attr('data-value');
		var myBrand = $('input[name="Brand"]:checked').attr('data-value');
		$('.Ankle.Type.row').removeClass('hide-ankle-pl'); // Bugfix: hidden PL icon

		if ( (cfCusts.indexOf(myUser) < 0) && (cfCusts.indexOf(myCust) < 0) ) {

			var sKeys = ( myAnkle == "SA" ) ? [120,122,126,130]:
						( myAnkle == "HA" ) ? [215,216,220,221,225,226]:
						( myAnkle == "PL" ) ? [123,124]: [];

			if ( sKeys.length > 0 ) filterAFOs(sKeys);

		} else {

			var sKeysA = ( myAnkle == "SA" ) ? [120,122,125,126,130,212,440,450]:
						 ( myAnkle == "PL" ) ? [105,123,124]:
						 ( myAnkle == "HA" ) ? [210,211,215,216,220,221,225,226,230,445,455]:
						 ( myAnkle == "FR" ) ? [110,115,121]: [];

			var sKeysB = ( myBrand == "IN" ) ? [120,121,122,123,124,215,216]:
						 ( myBrand == "SS" ) ? [126,130,220,221,225,226]:
						 ( myBrand == "CF" ) ? [105,110,115,125,210,211,212,230]:
						 ( myBrand == "DR" ) ? [440,445,450,455]: [];
		
			if ( sKeysA.length > 0 && sKeysB.length > 0 ) filterAFOs( sKeysA, sKeysB );
			else filterAFOs( (sKeysA.length > sKeysB.length)? sKeysA: sKeysB );

			$('.Ankle.Type.row').removeClass('hide-ankle-fr'); // Bugfix: hidden FR icon
		}
	});

	/*__ DeviceCode Reference _____________________________

		KEY    Brand   Ankle   Desc
		105     CF      PL      Posterior Leaf AFO
		115     CF      FR      Floor Reaction AFO
		120     IN      SA      Indy 2-Stage (Solid Ankle)
		121     IN      FR      Indy 2-Stage (Floor Reaction)
		122     IN      SA      Indy 2-Stage (Solid Ankle, Bigshot)
		123     IN      PL      Indy 2-Stage (Posterior Leaf)
		124     IN      PL      Indy 2-Stage (Posterior Leaf, Bigshot)
		125     CF      SA      Solid Ankle AFO
		126     SS      SA      Bigshot Solid Ankle AFO
		130     SS      SA      Surestep Advanced AFO
		210     CF      HA      Hinged AFO
		211     CF      HA      Bigshot Hinged AFO
		212     CF      SA      Adult Ankle Stirrup
		215     IN      HA      Indy 2-Stage (Hinged)
		216     IN      HA      Indy 2-Stage (Hinged, Bigshot)
		220     SS      HA      South Bend Pullover
		221     SS      HA      South Bend Pullover (Bigshot)
		225     SS      HA      Pullover AFO
		226     SS      HA      Pullover AFO (Bigshot)
		230     CF      HA      Ultraflex AFO
		440     DR      SA      DRAFO High Profile Solid-Ankle
		445     DR      HA      DRAFO High Profile Hinged
		450     DR      SA      DRAFO Medium Profile Solid-Ankle
		455     DR      HA      DRAFO Medium Profile Hinged
		460     DR      SA      DRAFO Symes DRP
	_____________________________________________________*/




/*========================================================
	Toe-Walker Code
		Added 2022/12/21
========================================================*/
	var kToeWalk = $('[name="kToeWalk"]').parents('div.col-sm-3');
	kToeWalk.children('label').children('span')[0].textContent = "Toe-Walker SMO";

	$(document).on("click", ".slider-img-conf img, .config-image-list img", function () {
		
		var imgPick = $(this).parents('a').children('input');

		if ( imgPick.attr('field-name') == "cDeviceCode_c" ) {
			
			var dataVal  = imgPick.attr('data-value');
			var brandVal = $('input[name="Brand"]:checked').attr('data-value');

			if ( brandVal == "IN" || (dataVal >= 220 && dataVal <= 226) ) kToeWalk.show();
				else kToeWalk.hide();
		}
	});

	$(document).on('change', '.config-selection-radio.Ankle.Type input, .config-selection-radio.Brand input', function (e) {
		var brandVal = $('input[name="Brand"]:checked').attr('data-value');

		if ( brandVal == "IN" ) kToeWalk.show();
			else kToeWalk.hide();
	});



/*========================================================
	Empty measurements invalid for Meas
		Added 2023/03/23
========================================================*/
	$(document).on("click", '[data-toggle="tab"][href="#menu1"]', function (e) {
		
		if ( $(modFN+':checked').attr("data-value") == "M" ) {

			for ( var i = 1; i <= 6; i++ ) {
				var fN = '[field-name="dMeas' + i + '_c"]';
				if ( $(fN).attr('data-value') == 0 )  $(fN).addClass('not-valid');
			}
		} else {
			for ( var i = 1; i <= 6; i++ ) {
				var fN = '[field-name="dMeas' + i + '_c"]';
				$(fN).removeClass('not-valid');
			}
		}
	});



/*========================================================
	Add Shoe Options + Add shoes to cart
		Added 2023/08/17 
				--Bryce Wieczorek <bwieczorek@Hanger.com>
========================================================*/
	
	// Shoe Options Styling
	var shoeCartButtonColor = '#9cb92d'; 

	$('.shoeType .col-sm-6.selected-image-parent-container h3').html('SELECTED SHOES');
	$('.config-selection-image-slider.shoeType.row').children('.selected-image-parent-container').children('.row').children().children().css({'width': '360px', 'height': '360px'});
	$('.config-selection-container.config-selection-image-slider.shoeType.row').append('<div class="col-sm-12">');
	$('.config-selection-container.config-selection-dropdown.row.shoeSizes').children().removeClass('col-sm-6');
	$('.config-selection-container.config-selection-dropdown.row.shoeSizes').removeClass('config-selection-container row');
	$('.config-selection-dropdown.shoeSizes').addClass('col-sm-6');
	$('.config-selection-dropdown.shoeSizes.col-sm-6').appendTo('.config-selection-container.config-selection-image-slider.shoeType.row');
	$('.config-selection-container.config-selection-image-slider.shoeType.row').append('<div class="col-sm-6 button">');
	$('.config-selection-container.config-selection-image-slider.shoeType.row').children('.col-sm-6.button').append('<button class="add-shoe-to-cart"><b>Add Shoe to cart</b></button>');
	$('.config-selection-container.config-selection-image-slider.shoeType.row').children('.col-sm-6.button').css({'width': '440px', 'height': '79.9px'});
	$('.config-selection-container.config-selection-image-slider.shoeType.row').children('.col-sm-6.button').children('.add-shoe-to-cart').css({'height': '33.98px', 'margin-top': '46.01px'});
	$('.config-selection-container.config-selection-image-slider.shoeType.row').children('.col-sm-6.button').css({'display': 'grid', 'justify-content': 'left', 'align-itmes': 'center', 'text-align': 'center'});
	$('.add-shoe-to-cart').css({'background': shoeCartButtonColor, 'border-color': shoeCartButtonColor, 'color': '#fff', 'border': '1px solid transparent'});


	// Hide shoe size dropdown and button
	$('.config-selection-dropdown.shoeSizes.col-sm-6').hide();
	$('.col-sm-6.button').hide();


	// Variables used for Shoe PartNum Retreival
	var meas6val = parseFloat( $('[validate-field="dMeas6_c"]').val() ); // Measurement #6 Value
	var ShoeSize = 0; 
	var ShoeProd = '';
	var shoePartNum = '';


	// Toggle visibility when Meas6 changes
	$(document).on('change', '[validate-field="dMeas6_c"]' , function (e) { 
		
		meas6val = parseFloat( $('[validate-field="dMeas6_c"]').val() );
		
		if ( isNaN(meas6val) ) return;

		if ( meas6val > 6.25 || meas6val < 2.75 )
			 $('div.shoeType').hide();
		else $('div.shoeType').show();
	}); 



	// Set visible size options, get part number when type is selected
	$(document).on('click', 'div.shoeType > .config-image-list', function (e) {
		
		// Get Product PartNum prefix for selected shoe
		ShoeProd = $('.shoeType').find('.config-selected-image-container').children().attr('data-value'); 
		
		// Re-set size to "" when new color is clicked
		$('.shoeSizes option').prop('selected', function() {
	    	return this.defaultSelected;
		});

		// Get Sizing, Availability, hide out of stock, get part number
		makeMagic(ShoeProd);
	});



	// Get Size, show Add To Cart Button
	$(document).on('change', 'div.shoeSizes', function(){
		
		// Get the selected shoe size value from dropdown
		ShoeSize = $('div.shoeSizes :selected').attr('data-value'); 

		if (ShoeSize == 'None' || ShoeSize == 0) 
			return;

		shoePartNum = getShoePartNum(ShoeProd, ShoeSize);
		
		// Only show Cart button when PartNum is valid
		$('.col-sm-6.button').show(); 
		
	});


	// Button Hover styling
	$('.add-shoe-to-cart').hover(function() {

		$('.add-shoe-to-cart').css({'background': '#4c5966', 'border-color': '#4c5966'});
		}, function() {
			$('.add-shoe-to-cart').css({'background': shoeCartButtonColor, 'border-color': shoeCartButtonColor});
		}
	);


	// Add Shoes to cart
	$(document).on('click', '.col-sm-6.button', function (e) {

		addExtrasToCart( shoePartNum );

	});



/*========================================================
	Functions referenced above.
		Changed 2023/03/17
========================================================*/
		function addExtrasToCart( stkCode ) {

		var data = { 

			'Product.StockCode': stkCode, 
			'Product.ProductType': "Product", 
			'Product.IsRefinementOptional': "False", 
			Quantity: 1 
		};

		$.post('/Basket/AddToBasket',data,function ( result ) {

			if (result) {

				if (result.success) {

					alertify.success("Shoes Added to Cart");
					PT.Sections.Basket.miniBasket.UpdateMiniBasket();

				} else {
					alertify.error("UNABLE TO ADD ITEM: We apologize. This item is temporarily out of stock.");
				}
			}
		});
	}



	// Swap image position on Right Meas Boxes

	function flipRightMeas() { 
		for (var i = 0; i < msBox1st.length; i++) {
			var fN = '[field-name="dMeas' + msBox1st[i] + 'r_c"]';
			$(fN).parents('div.col-sm-12').children().first().insertAfter($(fN).parents('div.col-sm-6'));
		}
	}



	// Show|Hide right, change labels for all meas boxes for split

	function toggleMeasBoxes(sType = 'equal') { 

		var NotValClass = ( $(modFN+':checked').attr("data-value") == "M" )? "not-valid": "valid-not-valid";

		for (var i = 0; i < msBox1st.length; i++) {
			var boxL = $('[field-name="dMeas' + msBox1st[i] + '_c"]').parents('div.config-selection-container');
			var boxR = $('[field-name="dMeas' + msBox1st[i] +'r_c"]').parents('div.config-selection-container');
			
			if ( sType == 'split' ) {
				boxR.show();
				boxR.children('h3')[0].textContent = msBoxLbl[i] + ' (Right Foot)';
				boxL.children('h3')[0].textContent = msBoxLbl[i] + ' (Left Foot)' ;
			} else if ( sType == 'equal') {
				boxR.hide();
				boxR.removeClass(NotValClass);
				boxL.children('h3')[0].textContent = msBoxLbl[i];
			}
		}
	}



	// Trigger changes to save+send data. Adapted from PartTrap's AFO <script>.   

	function validRightMeas(msNum) { 
		var NotValClass = ( $(modFN+':checked').attr("data-value") == "M" ) ? "not-valid" : "valid-not-valid";
		var fName = '[field-name="dMeas' + msNum + 'r_c"]';
		var fVal = parseFloat( $('[validate-field="dMeas' + msNum + 'r_c"]').val() );

		if (!isNaN(fVal)) {
			$(fName).removeClass(NotValClass);
			$(fName).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValClass);
			$(fName).val(fVal)
			$(fName).attr("data-value", fVal)
		} else {
			$(fName).val("")
			$(fName).attr("data-value", "")
		}
		$(fName).trigger("change");
	}


	function copyValsTo(sDest = 'right') { // Copy meas values+inputs to other foot if blank
		for ( var i = 1; i <= 13; i++ ) {
			var mvc = '.measurement-value-container', dI = '.inch-whole', dN = '.inch-divedend', dD = '.inch-devisor';
			var mvcSrc = $('[field-name="dMeas' + i + (sDest == 'right' ? '' : 'r') + '_c"]').closest(mvc);
			var msDest = $('[field-name="dMeas' + i + (sDest == 'right' ? 'r': '' ) + '_c"]');
			
			if (msDest.val() === "" || msDest.val() === "undefined") {
				msDest.closest(mvc).find(dI).val( mvcSrc.find(dI).val() ).trigger('change');
				msDest.closest(mvc).find(dN).val( mvcSrc.find(dN).val() ).trigger('change');
				msDest.closest(mvc).find(dD).val( mvcSrc.find(dD).val() ).trigger('change');
			}
		}
	}


	function filterAFOs ( arKeys0, arKeys1 = [] ) { // Hide all AFOs except from array parameter
		$('.Device.Type .config-image-list .col-sm-3').addClass('hidden');
			
		for ( var i = 0; i < arKeys0.length; i++ ) {
			if ( arKeys1.length==0 || arKeys1.indexOf(arKeys0[i]) >= 0 ) { // handle multiple filters
				var fName = '[data-value="' + arKeys0[i] + '"][field-name="cDeviceCode_c"]';
				$(fName).closest('.col-sm-3').removeClass('hidden');
			}
		}
	}

	
	/*========================================================
		Shoe Add Functions - 2023/08/17
					--Bryce Wieczorek <bweiczorek@Hanger.com>
	========================================================*/
	function makeMagic(ShoeProd) {

		if ( isNaN(meas6val) || meas6val == 0) {
			
			// Show the size selector + button if a shoe is Selected
			if (ShoeProd !== '') {
				$('.config-selection-dropdown.shoeSizes.col-sm-6').show();
				setSizeRows(ShoeProd);
			}

		} else {
				
			// Increase by 1 size every 1/4 inch, starting at 2 5/8" 
			ShoeSize = 3 + Math.floor( 4 * (meas6val - 2.625) );
				
			//Show the button if a shoe is Selected
			$('.col-sm-6.button').show();
			shoePartNum = getShoePartNum(ShoeProd, ShoeSize);
		}
	}


	function getShoePartNum  ( prefix, size ) { 

		var letters = ( size >= 10 )? 'WY': 'WT';
		var sSize   = ( size >  13 )? size-13: size;
		
		switch (prefix) {
			
			// Sized: 3T - 12Y;
			case 'SSSABK':
			case 'SSSAPK':
			case 'SSSNPK':
			case 'SSSNBK':
			case 'SSSNBL':
				sSize += '.0'
				return prefix + sSize + letters;
				break;
			
			// Sizes: 3T - 9T; (Extra 0 in PartNum)
			case 'SSSNGR':  
			case 'SSSNPU':
				sSize += '.0'
				return prefix + '0' + sSize + letters;
				break;
			
			// Sizes: 10Y - 3Y; (Extra 0 in PartNum)
			case 'SSSNGO':
			case 'SSSNBG':
				sSize += '.0'
				return prefix + (sSize<10? '0': '') + sSize + letters;
				break;
			
			// Sizes: 3T - 3Y;
			case 'SSHE':
				letters = 'TAN' + letters;
				return prefix + (sSize<10? '0': '') + sSize + letters;
				break;
		}
	}


	function setSizeRows (prod) {

		switch(prod) {

			//shoes without sizes 10Y - 3Y
			case 'SSSNGR':
			case 'SSSNPU':
				for ( var i = 3; i <= 16; i++ ) {
					if (i > 13) {
						var num = i - 13;
						var jqname = '.shoeSizes option[value="Youth Size 0' + num + '"]';
						$(jqname).hide();
					}else if ( i == 13) {
						var jqname = '.shoeSizes option[value="Youth Size ' + i + '"]';
						$(jqname).hide();
					}else if (i < 10) {
						var jqname = '.shoeSizes option[value="Toddler Size 0' + i + '"]';
						$(jqname).show();   
					}else {
						var jqname = '.shoeSizes option[value="Youth Size ' + i + '"]';
						$(jqname).hide();
					}
				}
				break;

			//shoes with only sizes 10Y - 3Y
			case 'SSSNGO':
			case 'SSSNBG':
				for ( var i = 3; i <= 16; i++ ) {
					if (i > 13) {
						var num = i - 13;
						var jqname = '.shoeSizes option[value="Youth Size 0' + num + '"]';
						$(jqname).show();
					}else if ( i == 13) {
						var jqname = '.shoeSizes option[value="Youth Size ' + i + '"]';
						$(jqname).show();
					}else if (i < 10) {
						var jqname = '.shoeSizes option[value="Toddler Size 0' + i + '"]';
						$(jqname).hide();
					}else {
						var jqname = '.shoeSizes option[value="Youth Size ' + i + '"]';
						$(jqname).show();
					}
				}
				break;

			//shoes with sizes 3T - 12Y
			case 'SSSAPK':
			case 'SSSABK':
			case 'SSSNPK':
			case 'SSSNBK':
			case 'SSSNBL':
				for ( var i = 3; i <= 16; i++ ) {
					if (i > 13) {
						var num = i - 13;
						var jqname = '.shoeSizes option[value="Youth Size 0' + num + '"]';
						$(jqname).hide();
					}else if ( i == 13) {
						var jqname = '.shoeSizes option[value="Youth Size ' + i + '"]';
						$(jqname).hide();
					}else if (i < 10) {
						var jqname = '.shoeSizes option[value="Toddler Size 0' + i + '"]';
						$(jqname).show();
					}else {
						var jqname = '.shoeSizes option[value="Youth Size ' + i + '"]';
						console.log(3 - jqname);
						$(jqname).show();
					}
				}
				break;

			//shoe(s) with all of the sizes
			case 'SSHE':
				for ( var i = 3; i <= 16; i++ ) {
					if (i > 13) {
						var num = i - 13;
						var jqname = '.shoeSizes option[value="Youth Size 0' + num + '"]';
						$(jqname).show();
					} else if ( i == 13) {
						var jqname = '.shoeSizes option[value="Youth Size ' + i + '"]';
						$(jqname).show();
					} else if (i < 10) {
						var jqname = '.shoeSizes option[value="Toddler Size 0' + i + '"]';
						$(jqname).show();
					} else {
						var jqname = '.shoeSizes option[value="Youth Size ' + i + '"]';
						$(jqname).show();
					}
				}
				break;
		}
	}


/*== CHANGE LOG =================================================================================
	
	2023/09/21: 
		+Always show ModNotes;

	2023/08/24: 
		+Add Shoe Selection & Cart-add capability;

	2023/04/24: 
		+prepAllow to include users stmetzger & ecogswell

	2023/04/13: 
		+TOP allow CFab devices again (undo above)

	2023/04/10: 
		+Validate that any measurement is selected; -rm all users/custs from CFab;

	2023/03/29: 
		+Friddles Input, visibility rules, cPattern_c override;

	2023/03/22: 
		+BugFix: Measurements were being bypassed;
		+kHeelCut alert to select Inner Boot;

	2023/03/17: 
		+DeviceCode filters for non-CFab Customers;
		+Global vars for UserID, CustID; +Global arrays for Allow Prep/CFab Users;

	2023/02/28: 
		+Hide kPrepped except for TOP/SURESTEP;
		+PartTrap UserID => OrderDtl.PTUserEmail_c; -KV

	2022/12/21: 
		+ToeWalker visibility rules;

	2022/12/15: 
		+Right-side measurements fields, handle changes;

	2022/11/23: 
		+BugFix: ModNotes visibility rules reversed;

=========================================the meetings will continue until morale improves======*/