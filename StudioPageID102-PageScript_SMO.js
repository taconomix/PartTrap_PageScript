/*== PageID: 102 -2023/07/13 =================================================
    
    Custom Page Script - All Page Logic
        Hard-coded Script Elements Removed
        NOT FULLY TESTED
    
    Page ID:  ID=102
    Products: SMO-CONF4 (Development)
    Products: SMO-CONF1 (surestep), SMO-CONF2 (bigshot), SMO-CONF3 (trad)
    
    Created: 2023/07/13
    Changed: 

        --Kevin Veldman (kevin.veldman@tutanota.com)
============================================================================*/


/*============================================================================
    Trigger Initial Events
============================================================================*/
    // Setup Saved Config ___________________________________________
    var isSavedConfig = false;
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    if (urlParams.get('configId')) {
        isSavedConfig = true;
        console.log("Saved Configuration Loaded");
    }

    // Trigger Document Ready Events ________________________________
    $(document).ready(function() {

        //__ Set Bigshot Values _____________________________________
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
                }

                if (selectedDataValue == "BIG") {
                    $('.Plastic.Thickness [data-value="18"]').attr("selected", "selected")
                    $('.Plastic.Thickness select').val('1/8"').change();
                }
            });
        }

        //__ Adjust CSS for Add To Cart button ______________________
        $('.add-config-to-cart').addClass('btn');
        $('.add-config-to-cart').css("font-weight","bold");
        $('.add-config-to-cart').css("margin-top", "13px");
        $('.add-config-to-cart').css("margin-left","13px");


        //__ Get UserID as Variable _________________________________
        var thisUser = document.getElementById("CurrentUserName").value;
        addToSummary("Username",thisUser,"PTUserEmail_c");


        //__ Trigger validate-fields on loading saved config ________
        if ( !isSavedConfig ) {
            setDefaultCheckBox();

        } else {

            setFieldsFromSave(); // populateFieldsFromSaveConfig();

            $('.measurement-value-container').find('.inch-whole').trigger('change');
            $('.measurement-value-container').find('.inch-divedend').trigger('change');
            $('.measurement-value-container').find('.inch-devisor').trigger('change');
            $('.measurement-value-container').find('.measurement-validate-input').trigger('change');
            
            var hasRtMeas = false;
            for ( var i = 1; i <= 13; i++ ) 
                if ( !isNaN(parseFloat($(getMsValidate(i + 'r')).val() )) ) 
                    hasRtMeas = true;
            
            if (hasRtMeas) $('[name="kSplit"]').click();
        }
    });


    // Page Load Functions __________________________________________
        function setFieldsFromSave() { //KV Version of populateFieldsFromSaveConfig()

            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var configId = urlParams.get('configId')
            var configName = urlParams.get('configName')
            var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));

            $.each(dienenConfigs, function (i, item) {

                if (item.configId != configId) return;
                
                $.each(item.configValueData[0], function (a, itemdata) {

                    var thisFN = '[field-name="' + itemdata.name + '"]';
                    var thisDV = '[data-value="' + itemdata.datavalue + '"]';
                    var classDropDown = '.config-selection-container.config-selection-dropdown option ';
                    var inputType = $(thisFN).attr('type');

                    if (inputType == "radio" && $(thisFN).closest(classDropDown).length > 1)
                         inputType = "dropdown";
                    else inputType = $(thisFN).attr('type');

                    if (inputType == "radio")
                        $(thisFN + thisDV).click().trigger("change");

                    if (inputType == "text" || inputType == "number") 
                        $(thisFN).val(itemdata.datavalue).trigger("change");

                    if (inputType == "checkbox" && itemdata.datavalue == "true")
                        $(thisFN + '[value="' + itemdata.description + '"]').click();

                    if (inputType == "image")
                        $(thisFN + thisDV).closest('.select-image-container').find('img').click();

                    if (inputType == "dropdown") {
                        $(thisFN + thisDV).attr("selected", "selected");
                        $(thisFN + thisDV).closest('select').val(itemdata.description).change();
                    }

                    if (inputType == "textArea") {
                        $(thisFN).val(itemdata.datavalue);
                        addNotesToConfig();
                    }

                    if (inputType == "measurement") {
                        var measValContainer = '.measurement-value-container'; 
                        $(thisFN).closest(measValContainer).find('.inch-whole').val(itemdata.inchWhole);
                        $(thisFN).closest(measValContainer).find('.inch-divedend').val(itemdata.inchDividend);
                        $(thisFN).closest(measValContainer).find('.inch-devisor').val(itemdata.inchDivisor);
                    }
                });
            });
        }

        function setDefaultCheckBox() {
            var selectedCheckBoxes = $(".tab-content").find("input:checked");
            $(selectedCheckBoxes).each(function () { changeValue(this); });
        }


/*============================================================================
    User or Customer-specific changes
============================================================================*/
    var myCust  = $(document.body).attr("data-customer");
    var myUser  = document.getElementById("CurrentUserName").value;

    // Prepped Device Option ________________________________________
    var modPrep = 'input[field-name="kPrepped_c"]';
    var prepAllow = [
        'MID46635', 'HANGER', 'SURESTEP', 'stmetzger', 'ecogswell'];

    if ( prepAllow.indexOf(myCust) < 0 && prepAllow.indexOf(myUser) < 0) 
        $(modPrep).parents('div.config-selection-radio').hide();


    // Alternate Patterns ___________________________________________
    $('div.bAltPattern').hide();

    $(document).on('click', '.config-selection-image-slider.Pattern a', function (e) {

        if (  $('div.config-selected-image-container').children('input[field-name="cPattern_c"]').attr('data-value') == "MATERIALS" ) {
            if (prepAllow.indexOf(myCust) >= 0) $('div.bAltPattern').show();
            $('div.bAltPattern').trigger('change');
        } else {
            $('div.bAltPattern').hide();
        }
        validateReqdImages($('.Pattern.row'));
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


/*============================================================================
    Add style element => css style sheet (Update SectionID !!)
============================================================================*/
    var sStyle = `
    /* Custom Style Sheet from PartTrap Studio PageScript */

    .block-from-summary .config-selection-button.separate {
    }`;

    var css = document.createElement("style");
    css.innerHTML = sStyle;
    document.getElementById("section_293").appendChild(css);


/*============================================================================
    Save Configuration
============================================================================*/
    $('.save-config-button').on('click', function (e) {
        if ( confirm("Save configuration: " + $('[field-name="LastNamePID_c"]').val()) ) {
            addNotesToConfig();
            saveConfiguration();
        }
    });


    $('#deleteConfigSelector').on('change', function (e) {

        var selectedConfig = $(this).children("option:selected");
        if (confirm("Delete configuration: " + selectedConfig.val())) {

            var configId = selectedConfig.attr("config-id");
            deleteSavedConfig(configId);
            populateSelector();

            alert(selectedConfig.val() + " is deleted");
        }
    });


    // Save Config Functions ________________________________________
        function saveConfiguration() {
            if ( !(localStorage.getItem("dienen-configs")) ) {
                var dienenConfigs = [];
                var configsSerialized = JSON.stringify(dienenConfigs);
                localStorage.setItem("dienen-configs", configsSerialized);
            }
            addToLocalStorage();
        }

        function addToLocalStorage() {
            if (isSavedConfig) {
                addToSavedConfig();
                return;
            }
            var configName = "";
            var configId = Math.random();
            var configUrl = window.location.href.split('?')[0];
            var fullDate = new Date();
            var coinfigCreateDate = fullDate.toLocaleDateString("en-US");

            $.each(selectedData, function (i, item) { if (item.name == "LastNamePID_c") configName = item.datavalue; });

            var configObj = {
                configName: configName,
                configId: configId,
                configUrl: configUrl,
                configCreateDate: coinfigCreateDate,
                configValueData: []
            };

            configObj.configValueData.push(selectedData);
            var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));

            dienenConfigs.push(configObj);
            var configsSerialized = JSON.stringify(dienenConfigs);
            localStorage.setItem("dienen-configs", configsSerialized);
            var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));

            populateSelector();
            alert("Configuration " + configName + " is saved");
            window.location.href = "/";
        }

        function addToSavedConfig() {
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var configId = urlParams.get('configId')
            var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));
            var configName;

            $.each(dienenConfigs, function (i, item) {
                if (item.configId == configId) {
                    configName = item.configName;
                    item.configValueData = [];
                    item.configValueData.push(selectedData);
                }
            });

            var configsSerialized = JSON.stringify(dienenConfigs);
            localStorage.setItem("dienen-configs", configsSerialized);
            var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));

            alert("Configuration " + configName + " is saved");
            window.location.href = "/";
        }

        function populateSelector() {
            var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));
            if (dienenConfigs) {
                
                $('#configSelector option').remove();
                $('#configSelector').append('<option></option>');
                
                $.each(dienenConfigs, function (i, item) {
                    $('#configSelector').append('<option config-id="' + item.configId + '" config-url="' + item.configUrl + '" value="' + item.configName + '">' + item.configName + " " + item.configCreateDate +'</option>');
                });

                $('#deleteConfigSelector option').remove();
                $('#deleteConfigSelector').append('<option></option>');
                $.each(dienenConfigs, function (i, item) {
                    $('#deleteConfigSelector').append('<option config-id="' + item.configId + '" config-url="' + item.configUrl + '" value="' + item.configName + '">' + item.configName + " " + item.configCreateDate + '</option>');
                });
            }
        }

        function deleteSavedConfig(configIdParam = "") {
            var configId;

            if (configIdParam == "") {
                var queryString = window.location.search;
                var urlParams = new URLSearchParams(queryString);
                configId = urlParams.get('configId')
            } else {
                configId = configIdParam;
            }

            var dienenConfigs = JSON.parse(localStorage.getItem("dienen-configs"));
            $.each(dienenConfigs, function (i, item) { if (item.configId == configId) delete dienenConfigs[i]; });

            var newConfigList = [];
            dienenConfigs.map((elem) => { if (elem !== '') newConfigList.push(elem); });
            var configsSerialized = JSON.stringify(newConfigList);
            localStorage.setItem("dienen-configs", configsSerialized);

            populateSelector();
        }


/*============================================================================
    Add to Cart
============================================================================*/
    var selectedData = [];
    var stockCodeToAddToBasket = "webSMO";

    $('.Device.Type').on('change', function (e) { 
        $("#myselect option:selected").text(); 
    });


    $(document).on('click', '.add-config-to-cart', function (e) {

        if (confirm("Device Configuration cannot be edited once added to cart. Continue?")) {

            var configData = selectedData.slice();
            var deviceDesc = "";

            $.each(selectedData, function(i,item) { 
                if (item.name == "cDeviceCode_c") deviceDesc = item.description } 
            );

            var myQty = ( $('input[field-name="cSBLR_c"]:checked').attr("data-value") == "B" )? 2: 1;

            var data = {
                stockCode: stockCodeToAddToBasket,
                qty: myQty,
                deviceCodeDescription: deviceDesc,
                ConfigurationItems: configData
            };

            $.post('/DienenConfiguratorAddToBasket/AddToBasket', data, function (result) {
                if (result) {
                    if (result.Success) {

                        alertify.success(result.Message);
                        PT.Sections.Basket.miniBasket.UpdateMiniBasket();
                        if (isSavedConfig) deleteSavedConfig(); // Add confirm message?

                    } else {
                        alertify.error(result.Message);
                    }
                } else {
                    alertify.success("Saved");
                }
            });
        }
    });


    // Disable "Add To Cart" if pattern not valid
    $(document).on('mouseenter touch', '.order-notes-container', function (e) {
        validateReqdImages($('.Pattern.row'));

        if ( $('.Pattern.row').hasClass('not-valid') ) 
             $('.add-config-to-cart').attr('disabled', true );
        else $('.add-config-to-cart').attr('disabled', false);
    });


/*============================================================================
    Custom Visibility and Validation Rules
============================================================================*/
    var modFN = 'input[field-name="ModType_c"]';
    var modType = $(modFN + ':checked').attr("data-value");
    var InvalidClass = ((modType == "M")? 'not-valid': 'valid-not-valid');

    // Visibility for Mod Note Fields
    $(modFN).on('change', function () {
        
        modType = $(this).attr("data-value");
        var _notes = '.Ankle.Cast.Modifications, .Heel.Correction, .Ankle.Correction, .Forefoot.Correction';
        
        if (modType == "M") {

            InvalidClass = 'not-valid';
            var _oldInvClass = '#menu1 .valid-not-valid';

            $(_oldInvClass + ' .measurement-input').val("").attr("data-value", ""); // Why clear values?
            $(_oldInvClass + ' .measurement-input').trigger("change");
            $(_oldInvClass).addClass(InvalidClass);
            $(_oldInvClass).removeClass('valid-not-valid');

            $(_notes).removeClass('show-heel-ankle-adjustments');
            $('.Mod.Notes').removeClass('show-mod-notes');

        } else {
            InvalidClass = 'valid-not-valid';
            $(_notes).addClass('show-heel-ankle-adjustments');
            $('.Mod.Notes').addClass('show-mod-notes');
        }
    });


    // Reminder alert to select Inner Boot for kHeelCut
    $(document).on('click', '[field-name="kHeelCut_c"]', function (e) {

        if ( $(this).is(':checked') ) {
            
            var _boot = $('[field-name="cBoot_c"]:selected').attr("value");
            var _msg = "Please select an inner boot material.";
            if ( _boot == null || _boot == "None" ) alert(_msg);
        }
    });


    // Set Rush buttons to Radio Set Rules
    var noRush = '[name="No Rush"]';
    var rush0D = '[field-name="kRush0D_c"]';
    var rush1D = '[field-name="kRush1D_c"]';

    $(document).on('click', noRush, function(e) { clearButtons ( rush0D, rush1D ); });
    $(document).on('click', rush0D, function(e) { clearButtons ( noRush, rush1D ); });
    $(document).on('click', rush1D, function(e) { clearButtons ( rush0D, noRush ); });

    function clearButtons ( clear1, clear2 ) { // Button collection to Radio Set rules
        if ( $(clear1).is(':checked') ) $(clear1).click();
        if ( $(clear2).is(':checked') ) $(clear2).click();
    }


/*============================================================================
    Set values on field changes
============================================================================*/
    $(document).on('change', '.config-selection-button input', function (e) {
        if ($(this).is(":checked")) {
            $(this).closest('.config-button').addClass('is-selected');
            $(this).attr('data-value', true)
        } else {
            $(this).attr('data-value', false)
            $(this).closest('.config-button').removeClass('is-selected');
        }
    });


    $(document).on('change', '.config-selection-input input', function (e) {
        $(this).attr('data-value', $(this).val())
    });


    $(document).on("click", ".slider-img-conf img, .config-image-list img", function () {
        var dataValue = $(this).closest('.select-image-container').find('input').attr('data-value');
        var fieldName = $(this).closest('.select-image-container').find('input').attr('field-name');
        var descr = "Pattern";

        addToSummary(descr, dataValue, fieldName);
    });


    $('.config-selection-dropdown select').on('change', function (e) {
        var selectedDataValue = $(this).children("option:selected").attr('data-value');
        var selectedDescription = $(this).children("option:selected").text();
        var fieldName = $(this).children("option:selected").attr('field-name');

        addToSummary(selectedDescription, selectedDataValue, fieldName)
    });


    $(document).on('change', '.imperial-metric-radio-container input', function (e) {
        var myMeasType = $('input[field-name="cSsmlUnit_c"]:checked').attr('data-value');
        var metricClass = 'show-metric-measure-inputs';

        if (myMeasType == "I") $('.config-main-container').removeClass(metricClass);
        if (myMeasType == "M") $('.config-main-container').addClass(metricClass);
    });


    $(document).on('change', '.config-selection-input input, .config-selection-radio input, .config-selection-button input, .measurement-input', function (e) {
        changeValue(this);
    });


    $('[field-name="dPatientWt_c"]').on('change', function () {
        if ($(this).val() > 100) {
            $('.Device.Type [data-value="BIG"]').attr("selected", "selected")
            $('.Device.Type select').val('Surestep Bigshot').change();
        } else {
            $('.Device.Type [data-value="BSL"]').attr("selected", "selected")
            $('.Device.Type select').val('Bigshot Lite').change();
        }
    });


    $(document).on("click", ".config-image-list a", function (e) {
        e.preventDefault();
        var items = $(this).children().clone();

        $(this).closest('.config-selection-container').find('.config-selected-image-container').empty();
        $(this).closest('.config-selection-container').find('.config-selected-image-container').append($(this).children('input').clone());
        $(this).closest('.config-selection-container').find('.config-selected-image-container').append("<img src=\"" + $(this).children('img').data('imageurl') + "\" class=\"img-responsive\" />");
    });


    $(document).on('change', '.measurment-inches-values input', function (e) {

        var container = $(this).closest('.measurment-inches-values');
        var inchWhole = parseFloat($(container).find('.inch-whole').val());
        var inchDividend = parseFloat($(container).find('.inch-divedend').val());
        var inchDivisor = parseFloat($(container).find('.inch-devisor').val());

        if ( inchDivisor > 16 || ($(container).find('.inch-devisor').val() != "" && inchDivisor != 0 && (inchDivisor % 2) != 0) ) {

            $(container).find('.measuremnt-error-container').empty();
            $(container).find('.measuremnt-error-container').append('The divisor must be one of ["", 0, 2, 4, 8, 16].');
            return;

        } else {
            $(container).find('.measuremnt-error-container').empty();
        }

        if ($(container).find('.inch-devisor').val() != "" && inchDivisor != 0) {

            if (inchDividend > inchDivisor) {

                $(container).find('.measuremnt-error-container').empty();
                $(container).find('.measuremnt-error-container').append("Invalid Measurement. Please double-check.");
                return;

            } else {
                $(container).find('.measuremnt-error-container').empty();
                var measInputVal = inchWhole + inchDividend / inchDivisor;
            }
        } else {
            var measInputVal = inchWhole;
        }

        $(container).find('.measuremnt-error-container').empty();
        $(container).closest('.measurement-value-container').find('.measurement-validate-input').val(measInputVal);
        $(container).closest('.measurement-value-container').find('.measurement-validate-input').trigger("change");
    });


    $('.config-selection-measurement-value select').on('change', function (e) {

        var selectedDataValue1 = $(this).closest('.measurement-values').find('.measure-value-1').children("option:selected").val();
        var selectedDataValue2 = $(this).closest('.measurement-values').find('.measure-value-2').children("option:selected").val();
        
        if (selectedDataValue1 != "" && selectedDataValue2 != "") {
            $(this).closest('.measurement-value-container').find('input').val(selectedDataValue1 + "." + selectedDataValue2)
            $(this).closest('.measurement-value-container').find('input').attr("data-value", selectedDataValue1 + "." + selectedDataValue2)
            $(this).closest('.measurement-value-container').find('input').trigger("change");
        }

        if (selectedDataValue1 == "" || selectedDataValue2 == "") {
            $(this).closest('.measurement-value-container').find('input').val("")
            $(this).closest('.measurement-value-container').find('input').attr("data-value", "")
        }
    });


    $("#internalNoteText, #noteText").on('change keyup paste', function () { 
        addNotesToConfig(); 
    });


    // Value Change Functions _______________________________________
        function changeValue(item) {
            var itemDesc = $(item).attr('name');
            var inchWhole = "", inchDividend = "", inchDivisor = "";

            if ( $(item).hasClass("numeric") && !checkIfNumeric(item) ) return;

            if ( !$(item).hasClass("numeric") && $(item).hasClass('measurement-input') ) {
                inchWhole = $(item).closest(".measurement-value-container").find('.inch-whole').val();
                inchDividend = $(item).closest(".measurement-value-container").find('.inch-divedend').val();
                inchDivisor = $(item).closest(".measurement-value-container").find('.inch-devisor').val();
            }
            addToSummary(itemDesc, $(item).attr('data-value'), $(item).attr('field-name'), inchWhole, inchDividend, inchDivisor);
        }

        function checkIfNumeric(item) { // Check if item is Numeric (PH)
            var isNum = $.isNumeric($(item).val());
            if ( isNum ) 
                 $(item).removeClass("not-valid");
            else $(item).addClass("not-valid");
            return isNum;
        }

        function validateReqiredFields(element) {
            $($(element).find('[required="required"]')).each(function () {
                var cfg = 'config-selection-';
                if ($(this).hasClass(cfg + 'dropdown')         ) validateReqdDropDowns(   $(this));
                if ($(this).hasClass(cfg + 'radio')            ) validateReqdRadioButtons($(this));
                if ($(this).hasClass(cfg + 'image-slider')     ) validateReqdImages(      $(this));
                if ($(this).hasClass(cfg + 'input')            ) validateReqdTextFields(  $(this));
                if ($(this).hasClass(cfg + 'measurement-value')) validateReqdMeasVals(    $(this));
            });
        }

        function validateReqdMeasVals(element) {
            $(element).find('[required="required"]').each(function () {
                
                if ($(this).val() == "") {
                    $(element).addClass("not-valid");
                    $(this).addClass("not-valid");
                    $(this).closest('.measurement-value-container').find('.measurment-inches-values').addClass("not-valid");

                } else {
                    $(element).removeClass("not-valid");
                    $(this).removeClass("not-valid");
                    $(this).closest('.measurement-value-container').find('.measurment-inches-values').removeClass("not-valid");
                }
            });
        }

        function validateReqdTextFields(element) {
            $(element).find('[required="required"]').each(function () {
                if ($(this).val() == "") {
                    $(element).addClass("not-valid");
                    $(this).addClass("not-valid");
                } else {
                    $(element).removeClass("not-valid");
                    $(this).removeClass("not-valid");
                }
            });
        }

        function validateReqdDropDowns(element){
            if ($(element).find("option:selected").text() == "") 
                 $(element).addClass("not-valid");
            else $(element).removeClass("not-valid");
        }

        function validateReqdRadioButtons(element){
            if ($(element).find('input').is(':checked')) $(element).removeClass("not-valid");
            else $(element).addClass("not-valid");

            var csmv = '.config-selection-measurement-value', r = 'required';
            
            if ( modType == "M" ) {
                $('.Circumference').closest(csmv).attr(r, r);
                $('.Width').closest(csmv).attr(r, r);
                $('.Distance').closest(csmv).attr(r, r);

                $('.Circumference .measurement-input').attr(r, r);
                $('.Width .measurement-input').attr(r, r);
                $('.Distance .measurement-input').attr(r, r);

                for ( var i = 10; i <= 13; i++ ) {
                    $('[field-name="dMeas' + i +'_c"]').removeAttr(r, r);
                }
            } else {
                $('.Circumference').closest(csmv).removeAttr(r, r);
                $('.Width').closest(csmv).removeAttr(r, r);
                $('.Distance').closest(csmv).removeAttr(r, r);

                $('.Circumference .measurement-input').removeAttr(r, r);
                $('.Width .measurement-input').removeAttr(r, r);
                $('.Distance .measurement-input').removeAttr(r, r);

                $('.measurement-validate-input').trigger("change");
                $('.Circumference').closest('.config-selection-input').closest('.tab-pane').find('.not-valid').removeClass('not-valid');
                $('#menu1 .not-valid, #menu1.not-valid').removeClass('not-valid');
            }
        }

        function validateReqdImages(element) {
            if ($(element).find('.config-selected-image-container input').length) 
                 $(element).removeClass("not-valid");
            else $(element).addClass("not-valid");
        }

        function addToSummary(description, datavalue, fieldname, inchWhole = "", inchDividend = "", inchDivisor ="") {
            if (typeof datavalue !== "undefined" && typeof fieldname !== "undefined" && fieldname !== "") {
                
                selectedData = selectedData.filter(f => f.name != fieldname);
                var summaryObj = { 
                    name: fieldname, datavalue: datavalue, description: description, inchWhole: inchWhole, inchDividend: inchDividend, inchDivisor: inchDivisor 
                };
                
                selectedData.push(summaryObj);
                $('.summary-container .' + fieldname).remove();
                $('.summary-container').append("<p class=" + fieldname + "><span>" + description + " | </span> <span>" + datavalue + " | </span> <span>" + fieldname + " </span></p>");
            }
        }

        function addNotesToConfig() {
            var orderNotes = $('#noteText').val();
            var custNotes  = $('#internalNoteText').val();

            $('#internalNoteText').attr("data-value", custNotes);
            $('#noteText').attr("data-value", orderNotes);
            changeValue($('#internalNoteText'));
            changeValue($('#noteText'));
        }


/*============================================================================
    Validate, Send Data for Measurements
============================================================================*/
    var errorText1 = "Measurements are outside the range for typical foot shape. Please double-check the highlighted measurements. If all measurements are correct, we will require a Cast or Scan to complete this order.";
    var errorText2 = "Length to 1st Metatarsal Head should be longer than Length to 5th Metatarsal Head.";
    var errorText3 = "Height to medial Maleolus should be greater than lateral Maleolus.";
    var errorText4 = "Full foot length on the medial side should be greater than the lateral side.";

    $(document).on('change', getMsValidate( 5, 6 ), function(e) { 
        validMeasRatio( 5, 6, 1.4767, 2.2515 ); // Meas6 must be >= 147.67% * Meas5  AND  <= 225.15% * Meas5
    });

    $(document).on('change', getMsValidate( 5, 1 ), function(e) { 
        validMeasRatio( 5, 1, 1.9848, 3.0372 ); // Meas1 must be >= 198.48% * Meas5  AND  <= 303.72% * Meas5
    });

    $(document).on('change', getMsValidate( 5, 2 ), function(e) { 
        validMeasRatio( 5, 2, 2.6962, 3.7474 ); // Meas2 must be >= (269.62% * Meas5)  AND  <= (374.74% * Meas5)
    });

    $(document).on('change', getMsValidate( 1, 2 ), function(e) { 
        validMeasRatio( 1, 2, 1.1109, 1.5977 ); // Meas2 must be >= 111.09% * Meas1  AND  <= 159.77% * Meas1
    });

    $(document).on('change', getMsValidate( 3, 2 ), function(e) { 
        validMeasRatio( 3, 2, 1.0010, 2.0000 ); // Meas2 must be > Meas3 
    });

    $(document).on('change', getMsValidate( 7, 6 ), function(e) { 
        validMeasRatio( 7, 6, 1.0010, 2.0000, errorText2 ); // Meas6 must be > Meas7 
    });

    $(document).on('change', getMsValidate( 9, 8 ), function(e) { 
        validMeasRatio( 9, 8, 1.0010, 2.0000, errorText3 ); // Meas8 must be > Meas9 
    });

    $(document).on('change', getMsValidate( 11, 10 ), function(e) { 
        validMeasRatio( 11, 10, 1.001, 2.0, errorText4 ); // Meas10 must be > Meas11 
    });

    $(document).on('change', getMsValidate( 4 ), function(e) { 
        isValidMeas( 4, true,true ); // Meas4 is required
    });

    // Trigger value change on Meas 12, 13, all Right-side Measurements
    $(document).on('change', getMsValidate( 12 ) , function(e) { isValidMeas(12      ); });
    $(document).on('change', getMsValidate( 13 ) , function(e) { isValidMeas(13      ); });
    $(document).on('change', getMsValidate('1r') , function(e) { isValidMeas(1, false); });
    $(document).on('change', getMsValidate('2r') , function(e) { isValidMeas(2, false); });
    $(document).on('change', getMsValidate('3r') , function(e) { isValidMeas(3, false); });
    $(document).on('change', getMsValidate('4r') , function(e) { isValidMeas(4, false); });
    $(document).on('change', getMsValidate('5r') , function(e) { isValidMeas(5, false); });
    $(document).on('change', getMsValidate('6r') , function(e) { isValidMeas(6, false); });
    $(document).on('change', getMsValidate('7r') , function(e) { isValidMeas(7, false); });
    $(document).on('change', getMsValidate('8r') , function(e) { isValidMeas(8, false); });
    $(document).on('change', getMsValidate('9r') , function(e) { isValidMeas(9, false); });
    $(document).on('change', getMsValidate('10r'), function(e) { isValidMeas(10,false); });
    $(document).on('change', getMsValidate('11r'), function(e) { isValidMeas(11,false); });
    $(document).on('change', getMsValidate('12r'), function(e) { isValidMeas(12,false); });
    $(document).on('change', getMsValidate('13r'), function(e) { isValidMeas(13,false); });


    // Measurement Validation Functions _____________________________
        function isValidMeas( msNum, isLeft = true, reqd = false ) { // Trigger changes to save+send data. Adapted from PartTrap's AFO <script>.

            var _fN = '[field-name="dMeas' + msNum + (isLeft? '': 'r') + '_c"]';
            var _fV = parseFloat( $(getMsValidate(msNum+(isLeft?'':'r')).val() );

            $(_fN).val(isNaN(_fV)? "": _fV);
            $(_fN).attr("data-value", isNaN(_fV)? "": _fV);

            if (!isNaN(_fV)) {
                $(_fN).removeClass(InvalidClass);
                $(_fN).closest('.measurement-value-container').find('.measurment-inches-values').removeClass(InvalidClass);
            } else if (reqd) {
                $(_fN).addClass(InvalidClass);
                $(_fN).closest('.measurement-value-container').find('.measurment-inches-values').addClass(InvalidClass);
            }
            $(_fN).trigger("change");
        }

        function getMsValidate ( ms0, ms1 = '' ) {
            return '[validate-field="dMeas'+ms0+'_c"]' + ms1.length > 0? ', [validate-field="dMeas'+ms1+'_c"]': '';
        }

        function validMeasRatio ( ms0, ms1, minX, maxX, eTxt = '' ) {
            
            var mvc = '.measurement-value-container', miv = '.measurment-inches-values', mec = '.measuremnt-error-container';
            var fN = [ '[field-name="dMeas'+ms0+'_c"]', '[field-name="dMeas'+ms1+'_c"]' ];
            var fV = [ parseFloat( $(getMsValidate(ms0)).val() ), parseFloat( $(getMsValidate(ms1)).val() ) ];
            var eC = [ fN[0].closest(mvc).find(mec), fN[1].closest(mvc).find(mec)];

            if ( inNaN(fV[0]) || isNaN(fV[1]) ) return;

            var rngBound = [ (minX * fV[0]), (fV[1] / maxX) ];
            var isInRange = ( fV[1] >= rngBound[0] && fV[0] >= rngBound[1] );

            if ( isInRange ) {
                for ( let i = 0; i < fN.length; i++ ) {
                    $(fN[i]).removeClass(InvalidClass);
                    $(fN[i]).closest(mvc).find(miv).removeClass(InvalidClass);
                    $(eC[i]).empty();
                    $(fN[i]).val(fV[i]).attr("data-value", fV[i]);
                    $(fN[i]).trigger("change");
                }
            } else {
                for ( let i = 0; i < fN.length; i++ ) {
                    if ( modType == "M" ) {
                        $(fN[i]).addClass(InvalidClass);
                        $(fN[i]).closest(mvc).find(miv).addClass(InvalidClass);
                        $(eC[i]).empty().append( (eTxt=='')? errorText1: eTxt );
                        $(fN[i]).val("").attr("data-value", "");
                    } else { 
                        $(fN[i]).val(fV[i]).attr("data-value", fV[i]); 
                    }
                    $(fN[i]).trigger("change");
                }
            }
        }


/*========================================================
    Handle Split Left/Right Measurements
========================================================*/
    var msBox1st = [1,4,6,12];
    var msBoxLbl = ['Circumferences','Widths','Lengths','Finish Height'];


    $('input[field-name="cSBLR_c"]').on('change', function () { //v1
        var _splitBox = $('[name="kSplit"]').parents('div.config-selection-container');
        if ( $(this).attr("data-value") == "B" ) _splitBox.show();
            else _splitBox.hide();

        if ( !($('[name="kSplit"]').is(':checked')) ) { 
            $('[name="kSplit"]').parents('label').children('span')[0].textContent = "Click to Enable";
            toggleMeasBoxes();
        }
    });


    $(document).on('click', '[name="kSplit"]', function (e) {
        var _rms = '.RightMs .measurement-input';
        var _btnSpan = $(this).parents('label').children('span');
        if ( _btnSpan[0].textContent.includes("Click") ) flipRightMeas(); 

        if ( $(this).is(':checked') ) {
            _btnSpan[0].textContent = "Separate Measurements Enabled";
            toggleMeasBoxes('split');

            if ( modType == "M" ) {
                $(_rms).attr('required', 'required');
                $('.RightMs').closest('.config-selection-measurement-value').attr('required', 'required');
                $('[field-name="dMeas10r_c"]').removeAttr('required', 'required');
                $('[field-name="dMeas11r_c"]').removeAttr('required', 'required');
            } else {
                $(_rms).removeAttr('required', 'required');
            }
            
            copyValsTo('right');

        } else {
            _btnSpan[0].textContent = "Separate Measurements Disabled";
            toggleMeasBoxes();

            $(_rms).removeAttr('required', 'required');
            $(_rms).removeClass('not-valid');
            $('.RightMs .measurement-values').removeClass('not-valid');

            copyValsTo('left');
        }
    });


    // Split Measurement Toggle Functions ___________________________
        function flipRightMeas() { 
            // Swap image position on Right Meas Boxes
            for ( var i = 0; i < msBox1st.length; i++ ) {
                var _fN = '[field-name="dMeas' + msBox1st[i] + 'r_c"]';
                $(_fN).parents('div.col-sm-12').children().first().insertAfter($(_fN).parents('div.col-sm-6'));
            }
        }

        function toggleMeasBoxes(sType = 'equal') { 
            // Show|Hide right, change labels for all meas boxes for split
            for (var i = 0; i < msBox1st.length; i++) {
                var _boxL = $('[field-name="dMeas' + msBox1st[i] + '_c"]').parents('div.config-selection-container');
                var _boxR = $('[field-name="dMeas' + msBox1st[i] +'r_c"]').parents('div.config-selection-container');
                
                if ( sType == 'split' ) {
                    _boxR.show();
                    _boxR.children('h3')[0].textContent = msBoxLbl[i] + ' (Right Foot)';
                    _boxL.children('h3')[0].textContent = msBoxLbl[i] + ' (Left Foot)' ;
                } else if ( sType == 'equal') {
                    _boxR.hide();
                    _boxR.removeClass( InvalidClass );
                    _boxL.children('h3')[0].textContent = msBoxLbl[i];
                }
            }
        }

        function copyValsTo(sDest = 'right') { 
            // Copy meas values+inputs to other foot if blank
            for ( var i = 1; i <= 13; i++ ) {
                var _mvc = '.measurement-value-container', _dI = '.inch-whole', _dN = '.inch-divedend', _dD = '.inch-devisor';
                var mvcSrc = $('[field-name="dMeas' + i + (sDest == 'right' ? '' : 'r') + '_c"]').closest(_mvc);
                var msDest = $('[field-name="dMeas' + i + (sDest == 'right' ? 'r': '' ) + '_c"]');
                
                if (msDest.val() === "" || msDest.val() === "undefined") {
                    msDest.closest(_mvc).find(_dI).val( mvcSrc.find(_dI).val() ).trigger('change');
                    msDest.closest(_mvc).find(_dN).val( mvcSrc.find(_dN).val() ).trigger('change');
                    msDest.closest(_mvc).find(_dD).val( mvcSrc.find(_dD).val() ).trigger('change');
                }
            }
        }


/*============================================================================
    Other Page-interaction Events
============================================================================*/
    
    // Block certain tabs?
    $(document).on("mouseenter focus touchstart", ".nav-tabs li", function () {
        
        validateReqiredFields('.config-main-container .active');

        if ( !$(this).prev().hasClass('active') ) return;

        if ( $('.config-main-container .active .not-valid').length )
             $(this).find('a').addClass('disabled-link');
        else $(this).find('a').removeClass('disabled-link');
    });

    // Tabs scroll with user
    $(document).on('click', '.nav-tabs li a', function (e) {
        $('html, body').stop().animate({ 
            'scrollTop': $(".config-main-container").offset().top - 100 }, 100, 'swing', function () { 
                window.location.hash = $(".config-main-container"); }
        );
    });

    // Prevent using keyboard to activate locked tabs
    $(document).on('keydown', '.nav-tabs li a.disabled-link', function (e) {
        if (e.which == 13) e.preventDefault();
    });

    // Make empty measurements invalid on tab change
    $(document).on("click", '[data-toggle="tab"][href="#menu1"]', function (e) {
        
        for ( var i = 1; i <= 6; i++ ) {
            var _fN = '[field-name="dMeas' + i + '_c"]';

            if ( modType != "M" ) $(_fN).removeClass('not-valid');
            else if ( $(_fN).attr('data-value') == 0 ) $(_fN).addClass('not-valid');
        }
    });



/*== CHANGE LOG =================================================================================

    2023/07/13: See Script Elements for PageID 20;

=========================================the meetings will continue until morale improves======*/
