//
/*== PageID=75 2023/11/28 ==================================================================
    Custom Page Script 
    
    Page ID:    ID=75
    Products:   AFO-CONF2 (Stabilizer)
    
        --Kevin Veldman
==========================================================================================*/


/*========================================================
    Trigger validate-fields on loading saved config
        Changed 2022/12/21
========================================================*/
    $(document).ready(function() {

        if ( isSavedConfig ) {

            $('.measurement-value-container').find('.measurement-validate-input').trigger('change');
            
            var hasRtMeas = false;
            
            for ( var i = 1; i <= 13; i++ ) 
            {
                var hasValidRtMeas = !isNaN(parseFloat( $('[validate-field="dMeas' + i + 'r_c"]').val() ));

                if ( hasValidRtMeas ) hasRtMeas = true;
            }

            if ( hasRtMeas ) $('[name="kSplit"]').click();


            var valColor = $('[field-name="cPattern_c"]').closest('select').val();

            if ( valColor.length > 0 ) $('[name="'+valColor+'"]').click();


            var valStrap = $('[field-name="cStrapType_c"]').closest('select').val();

            if ( valStrap == "Lace" ) $('[name="Lace"]'  ).click();
            if ( valStrap == "Velcro" ) $('[name="Velcro"]').click();


            var StrutValue = $('[field-name="cReinforceType_c"]').closest('select').val();

            if ( StrutValue == "Carbon Fiber Y-Strut" ) $('[name="Split_Y"]' ).click();
            if ( StrutValue == "Carbon Fiber Strut"   ) $('[name="Vertical"]').click();

        }

    });





/*========================================================
    Customer-Specific Option Changes
        Added 2023/01/31
========================================================*/

    var modPrep = 'input[field-name="kPrepped_c"]';
    var myCust  = $(document.body).attr("data-customer");

    if ( myCust != "MID46635" && myCust != "SURESTEP" ) {
        $(modPrep).parents('div.config-selection-radio').hide();
    }





/*========================================================
    Get values + send data for right side Measurements
        Changed 2022/12/13
========================================================*/

    $(document).on('change', '[validate-field="dMeas1r_c"]',  function (e) { validRightMeas( 1); });
    $(document).on('change', '[validate-field="dMeas2r_c"]',  function (e) { validRightMeas( 2); });
    $(document).on('change', '[validate-field="dMeas3r_c"]',  function (e) { validRightMeas( 3); });
    $(document).on('change', '[validate-field="dMeas4r_c"]',  function (e) { validRightMeas( 4); });
    $(document).on('change', '[validate-field="dMeas5r_c"]',  function (e) { validRightMeas( 5); });
    $(document).on('change', '[validate-field="dMeas6r_c"]',  function (e) { validRightMeas( 6); });
    $(document).on('change', '[validate-field="dMeas7r_c"]',  function (e) { validRightMeas( 7); });
    $(document).on('change', '[validate-field="dMeas8r_c"]',  function (e) { validRightMeas( 8); });
    $(document).on('change', '[validate-field="dMeas9r_c"]',  function (e) { validRightMeas( 9); });
    $(document).on('change', '[validate-field="dMeas10r_c"]', function (e) { validRightMeas(10); });
    $(document).on('change', '[validate-field="dMeas11r_c"]', function (e) { validRightMeas(11); });
    $(document).on('change', '[validate-field="dMeas12r_c"]', function (e) { validRightMeas(12); });
    $(document).on('change', '[validate-field="dMeas13r_c"]', function (e) { validRightMeas(13); });





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





/*==========================================================
    Fix headers, hide value fields;
        Changed 2022/12/21 -BW
==========================================================*/

    $('div.brace_color').children('h3')[0].textContent = "Color";
    $('div.Heel_AFO').children('h3')[0].textContent = "Heel";
    $('div.Strap_Type').children('h3')[0].textContent = "Closure";
    $('div.Strut_Stab').children('h3')[0].textContent = "Optional Reinforcement";
    $('[name="Split_Y"]').parents('label').children('span')[0].textContent = 'Split "Y"';

    $('div.strap_type_val').hide();
    $('div.brace_color_val').hide();
    $('div.Reinforcement').hide();





/*==========================================================
    Toggle true/false buttons on click, set value fields;
        Added: 2022/12/21 -BW
==========================================================*/

    // brace_color, brace_color_val
    $(document).on('click', '[name="Black"]', function (e) { // "Black"
        clickBoxRadio('cPattern_c', 'Black', false, 'Black', 'White', 'US Flag');
    });

    $(document).on('click', '[name="White"]', function (e) { // "White"
        clickBoxRadio('cPattern_c', 'White', false, 'White', 'Black', 'US Flag');
    });

    $(document).on('click', '[name="US Flag"]', function (e) { // "US Flag"
        clickBoxRadio('cPattern_c', 'US Flag', false, 'US Flag', 'Black', 'White');
    });


    // Heel_AFO
    $(document).on('click', '[name="Enclosed"]', function (e) { // "Enclosed"
        clickBoxRadio('', '', false, 'Enclosed', 'Open');
    });

    $(document).on('click', '[name="Open"]', function (e) { // "Open"
        clickBoxRadio('', '', false, 'Open', 'Enclosed');
    });


    // Strap_Type, Strap_Type_Val
    $(document).on('click', '[name="Velcro"]', function (e) { // "Velcro" 
        clickBoxRadio('cStrapType_c', 'Velcro', false, 'Velcro', 'Lace');
    });

    $(document).on('click', '[name="Lace"]', function (e) { // "Lace" 
        clickBoxRadio('cStrapType_c', 'Lace', false, 'Lace', 'Velcro');
    });


    // Strut_Stab, Reinforcement
    $(document).on('click', '[name="Vertical"]', function (e) { // "Vertical"
        clickBoxRadio('cReinforceType_c', 'Carbon Fiber Strut', true, 'Vertical', 'Split_Y');
    });

    $(document).on('click', '[name="Split_Y"]', function (e) { // "Split_Y"
        clickBoxRadio('cReinforceType_c', 'Carbon Fiber Y-Strut', true, 'Split_Y', 'Vertical');
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


    function clickBoxRadio(dataFieldName, dataValue, isOptional, btnName0, btnName1, btnName2 = "") {

        btn0 = '[name="' + btnName0 + '"]';
        btn1 = '[name="' + btnName1 + '"]';
        btn2 = '[name="' + btnName2 + '"]';

        dvFN = '[field-name="' + dataFieldName + '"]';
        hasValField = dataFieldName != '';

        if ($(btn1).is(':checked')) $(btn1).click();
        
        if ( btnName2 != "" ) {
            if ($(btn2).is(':checked')) $(btn2).click();
        }

        if ( hasValField ) {
            if ($(btn0).is(':checked')) {
                $(dvFN).closest('select').val(dataValue).change();
            } else if ( isOptional ) {
                $(dvFN).closest('select').val('None').change(); 
            }
        }
    }




/*== CHANGE LOG =================================================================================
    
    2023/11/28:
        +Adjust Strap/Strut field values to match configurator;
    
    2022/12/21: 
        +Set value drop-downs, unclick alternate options; -Bryce
        +Function for button sets;
        +Changed docReady function to check boxes on Saved Config Load;

=========================================the meetings will continue until morale improves======*/