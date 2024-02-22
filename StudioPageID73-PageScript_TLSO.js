/*== PageID=73 2023/10/31 ==================================================================
    
    Custom Page Script
    
    Page ID:    ID=73
    Products:   TLSO-CONF1
==========================================================================================*/


/*========================================================
    Add css styling to make new fields visible. 
        Added 2022/11/28
========================================================*/

    var sStyle = `
    /* Custom Style Element from PartTrap Studio PageScript */

    .config-button {
        margin: 4px;
        background-color: white;
        border-radius: 4px;
        border: 1px solid #4c5966;
        overflow: hidden;
        float: left;
        padding: 0px !important;
        margin: 4px !important;
    }

        .config-button label {
            float: left;
            line-height: 3.0em;
            width: 100%;
            height: 100%;
            margin:0px !important;
        }

            .config-button label span {
                text-align: center;
                padding: 3px 0;
                display: block;
                color: #4c5966;
            }

            .config-button label input {
                position: absolute;
                display: none;
                color: #fff !important;
            }

        /* selects all of the text within the input element and changes the color of the text */
                .config-button label input + span {
                    color: #4c5966;
                }


        /* This will declare how a selected input will look giving generic properties */
            .config-button input:checked + span {
                text-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
                background: #9cb92d;
            }



    .config-selection-container.modifications_TLSO {
        display:block;
    }

    .config-selection-container.additions_TLSO {
        display:block;
    }`;




    var css = document.createElement("style");
    css.innerHTML = sStyle;
    document.getElementById("section_331").appendChild(css);



/*============================================================
    Get UserID - Temp fix until PartTrap will pass email
        Added 2023/02/28
============================================================*/
    $(document).ready(function() {

        var thisUser = document.getElementById("CurrentUserName").value;
        addToSummary("Username",thisUser,"PTUserEmail_c");


        /*============================================================
            Adjust CSS for Add To Cart button
                Added 2023/06/19
        ============================================================*/
        $('.add-config-to-cart').addClass('btn');
        $('.add-config-to-cart').css("font-weight","bold");
        $('.add-config-to-cart').css("margin-top", "13px");
        $('.add-config-to-cart').css("margin-left","13px");

    });




/*========================================================
    Customer-Specific Option Changes
        Changed 2023/10/31
========================================================*/
    var modPrep = 'input[field-name="kPrepped_c"]';
    var myCust  = $(document.body).attr("data-customer");
    var myUser  = document.getElementById("CurrentUserName").value;
    var cfCusts = ["Asviray","MID46635", "SURESTEP", "davidt", "HANGER", "LUM46804"];
    var prepAllow = ['LUM46804', 'HANGER', 'MID46635', 'SURESTEP', 'stmetzger', 'ecogswell'];

    
    var isPrepCust = prepAllow.indexOf(myCust) >= 0 || prepAllow.indexOf(myUser) >= 0;

    if ( !isPrepCust ) 
        $(modPrep).parents('div.config-selection-radio').hide();



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
    Set "modifications_TLSO" as a button radio-set
        '[name="..."]' Uses the VISIBLE button name.
        '[field-name="..."]' Uses the database field.
        Added 2022/11/28
========================================================*/

    var antO = '[name="Anterior Opening"]';
    var pstO = '[name="Posterior Opening"]';
    var bivO = '[name="Bi-Valve"]';

    var aGill = '[name="Anterior Gill Mods"]';
    var lGill = '[name="Lateral Gill Mods"]';
    var abCut = '[name="Abdominal Cutout"]';
    var aGuss = '[name="Add Gusset"]';
    var kSoft = '[name="Softee TLSO"]';
    var parentDiv = 'div.col-sm-3.config-button';

    $(document).on('click', antO, function (e) {

        if ($(pstO).is(':checked')) $(pstO).click();
        if ($(bivO).is(':checked')) $(bivO).click();

        if ($(antO).is(':checked')) { 

            if ($(aGill).is(':checked')) $(aGill).click();
            if ($(abCut).is(':checked')) $(abCut).click();
            if ($(aGuss).is(':checked')) $(aGuss).click();
            
            $(aGill).parents(parentDiv).hide();
            $(abCut).parents(parentDiv).hide();
            $(aGuss).parents(parentDiv).hide();
        
        } else {

            $(aGill).parents(parentDiv).show();
            $(abCut).parents(parentDiv).show();
            $(aGuss).parents(parentDiv).show();
        }
    });

    $(document).on('click', pstO, function (e) {

        if ($(bivO).is(':checked')) $(bivO).click();
        if ($(antO).is(':checked')) $(antO).click();
        
        $(aGill).parents(parentDiv).show();
        $(abCut).parents(parentDiv).show();
        $(aGuss).parents(parentDiv).show();
        $(lGill).parents(parentDiv).show();
    });

    $(document).on('click', bivO, function (e) {

        if ($(pstO).is(':checked')) $(pstO).click();
        if ($(antO).is(':checked')) $(antO).click();
        
        if ($(bivO).is(':checked')) { 

            if ($(lGill).is(':checked')) $(lGill).click();
            if ($(kSoft).is(':checked')) $(kSoft).click();
            
            $(lGill).parents(parentDiv).hide();
            $(kSoft).parents(parentDiv).hide();

        } else {

            $(lGill).parents(parentDiv).show();
            $(kSoft).parents(parentDiv).show();
        }
    });

    $(document).on('click', aGuss, function (e) {
        if ($(aGuss).is(':checked') && !$(abCut).is(':checked')) $(abCut).click();
    });

    $(document).on('click', abCut, function (e) {
        if ($(aGuss).is(':checked') && !$(abCut).is(':checked')) $(aGuss).click();
    });


/*========================================================
    Disable "Add To Cart" if Opening not selected
        Added 2022/11/08
========================================================*/

    $(document).on('mouseenter touch', '.order-notes-container', function (e) {

        if ( !$(bivO).is(':checked') && !$(pstO).is(':checked') && !$(antO).is(':checked') ) {
            $('.add-config-to-cart').attr('disabled', true)
        } else {
            $('.add-config-to-cart').attr('disabled', false)
        }
    });


/*========================================================
    Validate measurements to send data to Epicor. 
        Added 2022/12/02
========================================================*/

    var tlso_ms = [ 'dWaistAxlaLEN_c', 'dScapWaistLEN_c', 'dTrochWaistLEN_c', 'dWaistStrnmLEN_c', 
        'dWaistSympLEN_c', 'dSympAsisLEN_c', 'dCRCatAxla_c', 'dCRCatNipLn_c', 'dCRCatXyphd_c', 
        'dCRCatLowRib_c', 'dCRCatWaist_c', 'dCRCatTroch_c', 'dMLatAxla_c', 'dMLatNipLn_c', 'dMLatXyphd_c', 
        'dMLatLowRib_c', 'dMLatWaist_c', 'dMLatTroch_c', 'dAPatAxla_c', 'dAPatNipLn_c' ];

    $(document).on('change', '[validate-field="'+tlso_ms[0] +'"]', function (e) { onMeasChange( tlso_ms[0] ); });
    $(document).on('change', '[validate-field="'+tlso_ms[1] +'"]', function (e) { onMeasChange( tlso_ms[1] ); });
    $(document).on('change', '[validate-field="'+tlso_ms[2] +'"]', function (e) { onMeasChange( tlso_ms[2] ); });
    $(document).on('change', '[validate-field="'+tlso_ms[3] +'"]', function (e) { onMeasChange( tlso_ms[3] ); });
    $(document).on('change', '[validate-field="'+tlso_ms[4] +'"]', function (e) { onMeasChange( tlso_ms[4] ); });
    $(document).on('change', '[validate-field="'+tlso_ms[5] +'"]', function (e) { onMeasChange( tlso_ms[5] ); });
    $(document).on('change', '[validate-field="'+tlso_ms[6] +'"]', function (e) { onMeasChange( tlso_ms[6] ); });
    $(document).on('change', '[validate-field="'+tlso_ms[7] +'"]', function (e) { onMeasChange( tlso_ms[7] ); });
    $(document).on('change', '[validate-field="'+tlso_ms[8] +'"]', function (e) { onMeasChange( tlso_ms[8] ); });
    $(document).on('change', '[validate-field="'+tlso_ms[9] +'"]', function (e) { onMeasChange( tlso_ms[9] ); });
    $(document).on('change', '[validate-field="'+tlso_ms[10]+'"]', function (e) { onMeasChange( tlso_ms[10]); });
    $(document).on('change', '[validate-field="'+tlso_ms[11]+'"]', function (e) { onMeasChange( tlso_ms[11]); });
    $(document).on('change', '[validate-field="'+tlso_ms[12]+'"]', function (e) { onMeasChange( tlso_ms[12]); });
    $(document).on('change', '[validate-field="'+tlso_ms[13]+'"]', function (e) { onMeasChange( tlso_ms[13]); });
    $(document).on('change', '[validate-field="'+tlso_ms[14]+'"]', function (e) { onMeasChange( tlso_ms[14]); });
    $(document).on('change', '[validate-field="'+tlso_ms[15]+'"]', function (e) { onMeasChange( tlso_ms[15]); });
    $(document).on('change', '[validate-field="'+tlso_ms[16]+'"]', function (e) { onMeasChange( tlso_ms[16]); });
    $(document).on('change', '[validate-field="'+tlso_ms[17]+'"]', function (e) { onMeasChange( tlso_ms[17]); });
    $(document).on('change', '[validate-field="'+tlso_ms[18]+'"]', function (e) { onMeasChange( tlso_ms[18]); });
    $(document).on('change', '[validate-field="'+tlso_ms[19]+'"]', function (e) { onMeasChange( tlso_ms[19]); });



// Functions ________________________________________

    function onMeasChange ( measField ) {

        var dvField  = '[field-name="' + measField + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + measField + '"]').val()));
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal);
        $(dvField).attr("data-value", fieldVal);
        $(dvField).trigger("change");
        //$(dvField).val(fieldVal).attr("data-value", fieldVal).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    }




/*== CHANGE LOG =================================================================================
    
    11/23/2022: ModNotes visibility rules reversed. Issue Corrected. 
    11/28/2022: Add rules for opening type button radio set.
    12/02/2022: Add rules to Bivalve click for Softee TLSO. Updated drFixData method.
    12/04/2022: Add same code from SMO config 12/13 measurements to get it to send data.
    2023/02/28: Hide Prepped Option except for TOP/SURESTEP;
    2023/02/28: Add PartTrap UserID to OrderDtl.PTUserEmail_c; -KV
    2023/04/24: +prepAllow to include users stmetzger & ecogswell
    2023/07/05: +move measurement validation to Function onMeasChange
    
===============================================================================================*/



    /*========================================================
      Validate measurements to send data to Epicor. 
        Added 2022/12/02
        Removed 2023/07/06?
    ==========================================================

    var tlso_ms01 = 'dWaistAxlaLEN_c';
    var tlso_ms02 = 'dScapWaistLEN_c';
    var tlso_ms03 = 'dTrochWaistLEN_c';
    var tlso_ms04 = 'dWaistStrnmLEN_c';
    var tlso_ms05 = 'dWaistSympLEN_c';
    var tlso_ms06 = 'dSympAsisLEN_c';
    var tlso_ms07 = 'dCRCatAxla_c';
    var tlso_ms08 = 'dCRCatNipLn_c';
    var tlso_ms09 = 'dCRCatXyphd_c';
    var tlso_ms10 = 'dCRCatLowRib_c';
    var tlso_ms11 = 'dCRCatWaist_c';
    var tlso_ms12 = 'dCRCatTroch_c';
    var tlso_ms13 = 'dMLatAxla_c';
    var tlso_ms14 = 'dMLatNipLn_c';
    var tlso_ms15 = 'dMLatXyphd_c';
    var tlso_ms16 = 'dMLatLowRib_c';
    var tlso_ms17 = 'dMLatWaist_c';
    var tlso_ms18 = 'dMLatTroch_c';
    var tlso_ms19 = 'dAPatAxla_c';
    var tlso_ms20 = 'dAPatNipLn_c';

    $(document).on('change', '[validate-field="' + tlso_ms01 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms01 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms01 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms02 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms02 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms02 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });


    $(document).on('change', '[validate-field="' + tlso_ms03 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms03 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms03 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms04 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms04 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms04 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });


    $(document).on('change', '[validate-field="' + tlso_ms05 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms05 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms05 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms06 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms06 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms06 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms07 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms07 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms07 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms08 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms08 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms08 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms09 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms09 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms09 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms10 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms10 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms10 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms11 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms11 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms11 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms12 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms12 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms12 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });


    $(document).on('change', '[validate-field="' + tlso_ms13 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms13 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms13 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms14 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms14 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms14 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });


    $(document).on('change', '[validate-field="' + tlso_ms15 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms15 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms15 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms16 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms16 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms16 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms17 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms17 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms17 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms18 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms18 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms18 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms19 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms19 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms19 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    });

    $(document).on('change', '[validate-field="' + tlso_ms20 + '"]', function (e) {
        
        var dvField  = '[field-name="' + tlso_ms20 + '"]';
        var fieldVal = (parseFloat($('[validate-field="' + tlso_ms20 + '"]').val()));
        var myVal = ( !isNaN(fieldVal) ) ? fieldVal : "";
        var NotValidClassName = "valid-not-valid";

        $(dvField).val(fieldVal)
        $(dvField).attr("data-value", fieldVal)
        $(dvField).trigger("change");

        if (!isNaN(fieldVal)) {
            $(dvField).removeClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(NotValidClassName);
        } else {
            $(dvField).addClass(NotValidClassName);
            $(dvField).closest('.measurement-value-container').find('.measurment-inches-values').addClass(NotValidClassName);
        } 
    }); 

    
    // Original replacement for above, using functions - never used

    $(document).on('change', '[validate-field="'+tlso_ms01+'"]', function (e) { onMeasChange( tlso_ms01 ); });
    $(document).on('change', '[validate-field="'+tlso_ms02+'"]', function (e) { onMeasChange( tlso_ms02 ); });
    $(document).on('change', '[validate-field="'+tlso_ms03+'"]', function (e) { onMeasChange( tlso_ms03 ); });
    $(document).on('change', '[validate-field="'+tlso_ms04+'"]', function (e) { onMeasChange( tlso_ms04 ); });
    $(document).on('change', '[validate-field="'+tlso_ms05+'"]', function (e) { onMeasChange( tlso_ms05 ); });
    $(document).on('change', '[validate-field="'+tlso_ms06+'"]', function (e) { onMeasChange( tlso_ms06 ); });
    $(document).on('change', '[validate-field="'+tlso_ms07+'"]', function (e) { onMeasChange( tlso_ms07 ); });
    $(document).on('change', '[validate-field="'+tlso_ms08+'"]', function (e) { onMeasChange( tlso_ms08 ); });
    $(document).on('change', '[validate-field="'+tlso_ms09+'"]', function (e) { onMeasChange( tlso_ms09 ); });
    $(document).on('change', '[validate-field="'+tlso_ms10+'"]', function (e) { onMeasChange( tlso_ms10 ); });
    $(document).on('change', '[validate-field="'+tlso_ms11+'"]', function (e) { onMeasChange( tlso_ms11 ); });
    $(document).on('change', '[validate-field="'+tlso_ms12+'"]', function (e) { onMeasChange( tlso_ms12 ); });
    $(document).on('change', '[validate-field="'+tlso_ms13+'"]', function (e) { onMeasChange( tlso_ms13 ); });
    $(document).on('change', '[validate-field="'+tlso_ms14+'"]', function (e) { onMeasChange( tlso_ms14 ); });
    $(document).on('change', '[validate-field="'+tlso_ms15+'"]', function (e) { onMeasChange( tlso_ms15 ); });
    $(document).on('change', '[validate-field="'+tlso_ms16+'"]', function (e) { onMeasChange( tlso_ms16 ); });
    $(document).on('change', '[validate-field="'+tlso_ms17+'"]', function (e) { onMeasChange( tlso_ms17 ); });
    $(document).on('change', '[validate-field="'+tlso_ms18+'"]', function (e) { onMeasChange( tlso_ms18 ); });
    $(document).on('change', '[validate-field="'+tlso_ms19+'"]', function (e) { onMeasChange( tlso_ms19 ); });
    $(document).on('change', '[validate-field="'+tlso_ms20+'"]', function (e) { onMeasChange( tlso_ms20 ); });*/


    /*========================================================
        Remove requirement for Ankle Measurement fields. 
            Added   2022/11/23
            Removed 2022/12/04
    ========================================================

    $('[field-name="dMeas1_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas2_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas3_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas4_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas5_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas6_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas7_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas8_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas9_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas10_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas11_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas12_c"]').removeAttr('required', 'required');
    $('[field-name="dMeas13_c"]').removeAttr('required', 'required');

    $('[field-name="dMeas1_c"]').removeClass('not-valid');
    $('[field-name="dMeas2_c"]').removeClass('not-valid');
    $('[field-name="dMeas3_c"]').removeClass('not-valid');
    $('[field-name="dMeas4_c"]').removeClass('not-valid');
    $('[field-name="dMeas5_c"]').removeClass('not-valid');
    $('[field-name="dMeas6_c"]').removeClass('not-valid');
    $('[field-name="dMeas7_c"]').removeClass('not-valid');
    $('[field-name="dMeas8_c"]').removeClass('not-valid');
    $('[field-name="dMeas9_c"]').removeClass('not-valid');
    $('[field-name="dMeas10_c"]').removeClass('not-valid');
    $('[field-name="dMeas11_c"]').removeClass('not-valid');
    $('[field-name="dMeas12_c"]').removeClass('not-valid');
    $('[field-name="dMeas13_c"]').removeClass('not-valid');

    $('[field-name="dMeas1_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas2_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas3_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas4_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas5_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas6_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas7_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas8_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas9_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas10_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas11_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas12_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');
    $('[field-name="dMeas13_c"]').closest('.measurement-value-container').find('.measurment-inches-values').removeClass('not-valid');

    $('.measurement-validate-input').trigger("change"); */