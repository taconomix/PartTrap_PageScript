/*== PageID=20 2023/06/13 ====================================================
	Custom Page Script 
	
	Page ID:    ID=20
	Products:   SMO-CONF1 (surestep), SMO-CONF2 (bigshot), SMO-CONF3 (trad)
	
	Changed: 2023/06/13 -KV
============================================================================*/

/*========================================================
	Add style element => css style sheet
		Added 2022/12/08
		UPDATE SECTION ID BY PAGE
========================================================*/
	var sStyle = `
	/* Custom Style Sheet from PartTrap Studio PageScript */

	.block-from-summary .config-selection-button.separate {
	}`;


	var css = document.createElement("style");
	css.innerHTML = sStyle;
	document.getElementById("section_293").appendChild(css);



/*========================================================
	Initial page-script by Peter Hallberg 
		Added 2022/11/08
========================================================*/
	$(document).ready(function() {
	   
		if ( $('.Device.Type select [data-value="BIG"]').length && $('.Device.Type select [data-value="BSL"]').length ) {
			$("body").addClass("big-bsl");
			$('.Inner.Boot [data-value="OPTEK332"]').attr("selected", "selected")
			$('.Inner.Boot select').val('3/32" Clear OpTek').change();
		  
			$(document).on('change', '.Device.Type select', function (e) {
				var selectedDataValue = $(this).children("option:selected").attr('data-value');
					$('.Plastic.Thickness option').removeAttr('selected');
		  
				if (selectedDataValue == "BSL") {
					$('.Plastic.Thickness [data-value="332"]').attr("selected", "selected")
					$('.Plastic.Thickness select').val('3/32"').change();
					console.log("datavalue: " + selectedDataValue);
				}

				if (selectedDataValue == "BIG") {
					$('.Plastic.Thickness [data-value="18"]').attr("selected", "selected")
					$('.Plastic.Thickness select').val('1/8"').change();
					console.log("datavalue: " + selectedDataValue);
				}
			});
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
			Trigger validate-fields on loading saved config
				Added 2022/12/13
		============================================================*/
		if (isSavedConfig) {
			$('.measurement-value-container').find('.measurement-validate-input').trigger('change');
			var hasRtMeas = false;
			for (var i = 1; i <= 13; i++) {
				if ( !isNaN(parseFloat( $('[validate-field="dMeas' + i + 'r_c"]').val() )) ) hasRtMeas = true;
			}
			if (hasRtMeas) $('[name="kSplit"]').click();
		}


		/*============================================================
			Get UserID - Temp fix until PartTrap will pass email
				Added 2023/02/28
		============================================================*/
		var thisUser = document.getElementById("CurrentUserName").value;
		addToSummary("Username",thisUser,"PTUserEmail_c");
	});



/*========================================================
	Reminder alert to select Inner Boot for kHeelCut
		added 2023/03/22
========================================================*/
	$(document).on('click', '[field-name="kHeelCut_c"]', function (e) {

		if ( $(this).is(':checked') ) {
			
			var cBoot = $('[field-name="cBoot_c"]:selected').attr("value");
			var hcMsg = "Please select an inner boot material.";
			if ( cBoot == null || cBoot == "None" ) alert(hcMsg);
		}
	});



/*========================================================
	Customer-Specific Option Changes
		Changed 2023/04/24
		--Added HANGER to prepAllow until we add users
========================================================*/
	var modPrep = 'input[field-name="kPrepped_c"]';
	var myCust  = $(document.body).attr("data-customer");
	var myUser  = document.getElementById("CurrentUserName").value;
	var prepAllow = ['MID46635', 'HANGER', 'SURESTEP', 'stmetzger', 'ecogswell'];

	if ( prepAllow.indexOf(myCust) < 0 && prepAllow.indexOf(myUser) < 0) {
		$(modPrep).parents('div.config-selection-radio').hide();
	}


/*========================================================
	Alternate Patterns
		Added 2023/03/29
========================================================*/
	$('div.bAltPattern').hide();

	$(document).on('click', '.config-selection-image-slider.Pattern a', function (e) {

		if (  $('div.config-selected-image-container').children('input[field-name="cPattern_c"]').attr('data-value') == "MATERIALS" ) {
			if (myCust == "MID46635") $('div.bAltPattern').show();
			$('div.bAltPattern').trigger('change');
		} else {
			$('div.bAltPattern').hide();
		}
		validateRequiredImages($('.Pattern.row'));
	});

	$(document).on('change', '.bAltPattern', function (e) {

		var frPtrn = $('div.bAltPattern :selected');
		if ( frPtrn.attr('value') ) {
			$('div.config-selected-image-container').children('input[field-name="cPattern_c"]').attr('data-value', frPtrn.attr('data-value'));
			addToSummary("Pattern", frPtrn.attr('data-value'), 'cPattern_c');
		} else {
			addToSummary("Pattern", "MATERIALS", 'cPattern_c');
		}
	});



/*========================================================
	Disable "Add To Cart" if pattern not valid
		Added 2023/04/10
========================================================*/
	$(document).on('mouseenter touch', '.order-notes-container', function (e) {
		validateRequiredImages($('.Pattern.row'));

		if ( $('.Pattern.row').hasClass('not-valid') ) {
			$('.add-config-to-cart').attr('disabled', true)
		} else {
			$('.add-config-to-cart').attr('disabled', false)
		}
	});



/*========================================================
	Get values + send data for right side Measurements
		Changed 2022/12/13
========================================================*/

	$(document).on('change', '[validate-field="dMeas1r_c"]' , function (e) { validRightMeas(1); });
	$(document).on('change', '[validate-field="dMeas2r_c"]' , function (e) { validRightMeas(2); });
	$(document).on('change', '[validate-field="dMeas3r_c"]' , function (e) { validRightMeas(3); });
	$(document).on('change', '[validate-field="dMeas4r_c"]' , function (e) { validRightMeas(4); });
	$(document).on('change', '[validate-field="dMeas5r_c"]' , function (e) { validRightMeas(5); });
	$(document).on('change', '[validate-field="dMeas6r_c"]' , function (e) { validRightMeas(6); });
	$(document).on('change', '[validate-field="dMeas7r_c"]' , function (e) { validRightMeas(7); });
	$(document).on('change', '[validate-field="dMeas8r_c"]' , function (e) { validRightMeas(8); });
	$(document).on('change', '[validate-field="dMeas9r_c"]' , function (e) { validRightMeas(9); });
	$(document).on('change', '[validate-field="dMeas10r_c"]', function (e) { validRightMeas(10);});
	$(document).on('change', '[validate-field="dMeas11r_c"]', function (e) { validRightMeas(11);});
	$(document).on('change', '[validate-field="dMeas12r_c"]', function (e) { validRightMeas(12);});
	$(document).on('change', '[validate-field="dMeas13r_c"]', function (e) { validRightMeas(13);});



/*========================================================
	Validate + send data for Meas 12 & 13
		Changed 2022/12/12
========================================================*/

	$(document).on('change', '[validate-field="dMeas12_c"], [validate-field="dMeas13_c"]', function (e) {

		var fName0 = '[field-name="dMeas12_c"]';
		var fName1 = '[field-name="dMeas13_c"]';
		var fVal0 = parseFloat($('[validate-field="dMeas12_c"]').val());
		var fVal1 = parseFloat($('[validate-field="dMeas13_c"]').val());
		var NotValClass = "valid-not-valid";

		if (!isNaN(fVal0)) {
			$(fName0).removeClass(NotValClass);
			$(fName0).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValClass);
			$(fName0).val(fVal0)
			$(fName0).attr("data-value", fVal0)
		} else {
			$(fName0).val("")
			$(fName0).attr("data-value", "")
		}
		$(fName0).trigger("change");

		if (!isNaN(fVal1)) {
			$(fName1).removeClass(NotValClass);
			$(fName1).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValClass);
			$(fName1).val(fVal1)
			$(fName1).attr("data-value", fVal1)
		} else {
			$(fName1).val("")
			$(fName1).attr("data-value", "")
		}     
		$(fName1).trigger("change");
	});



/*========================================================
	Correct visibility rules for ModNotes
		Added 2022/11/23
========================================================*/
	var modFN = 'input[field-name="ModType_c"]';
	$(modFN).on('change', function () {
		if ($(this).attr("data-value") == "M") {
			$('.Mod.Notes').removeClass('show-mod-notes');
		} else {
			$('.Mod.Notes').addClass('show-mod-notes');
		}
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
	Make empty measurements invalid for Meas
		Added 2023/03/22
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
	Functions referenced above.
		Changed 2022/12/13
========================================================*/
	function flipRightMeas() { // Swap image position on Right Meas Boxes
		for (var i = 0; i < msBox1st.length; i++) {
			var fN = '[field-name="dMeas' + msBox1st[i] + 'r_c"]';
			$(fN).parents('div.col-sm-12').children().first().insertAfter($(fN).parents('div.col-sm-6'));
		}
	}

	function toggleMeasBoxes(sType = 'equal') { // Show|Hide right, change labels for all meas boxes for split
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

	function validRightMeas(msNum) { // Trigger changes to save+send data. Adapted from PartTrap's AFO <script>.   
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



/*== CHANGE LOG =================================================================================

	2022/11/21: BugFix: No data was saving/sending for dMeas12, dMeas13;

	2022/11/23: BugFix: ModNotes visibility rules reversed;

	2022/12/08: +Enabling Left/Right Separate Measurements;

	2022/12/12: +Hide right-measurements unless kSplit selected;
				+populate dual measurements loading saved config;
				Refactor validate-fields in function, move from $(document).ready();

	2022/12/14: +Function to copy right-vals to blank left-vals when applicable;
				BugFix: ModType_c References;

	2023/02/28: +Hide Prepped Option except for TOP/SURESTEP;
				+PartTrap UserID => OrderDtl.PTUserEmail_c;

	2023/03/22: BugFix: Can no longer bypass Measurements; 

	2023/03/23: +kHeelCut/Select Inner Boot alert;

	2023/03/29: +Friddles Pattern combo, visibility handling;

	2023/04/10: +Validate that any measurement is selected; -rm all users/custs from CFab;

	2023/04/24: +prepAllow to include users stmetzger & ecogswell

	2023/06/19: +CSS changes for Add to Cart button;

=========================================the meetings will continue until morale improves======*/