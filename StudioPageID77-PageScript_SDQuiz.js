/*== PageID=77 2023/08/30 ==============================================
    
    Sole Dynamix Quiz Custom Page Script 

    Page ID:    ID=77
    Products:   SOLEDYNAMIX-PERF, SOLEDYNAMIX-COMF, SOLEDYNAMIX-SPEC
    
    ChangeDate: 2023/08/30 -KV
======================================================================*/

var stkCodePath = '.config-selected-image-container [field-name="stockCodeShoe"]';

/*========================================================
    Condition selection "none" functionality
        Changed 2023/08/30
========================================================*/

    //_ Add classes to Condition options
    var specDxBox = $('.config-selection-button.Additional');

    specDxBox.find('input').addClass('dx');
    specDxBox.find('input[name="None"]').attr('class','noDx');



    //_ Clear "None" when any condition is selected
    $('.dx').on('click', function (e) { 
        if ( $(this).is(':checked') ) $('.noDx:checked').click(); 
    });


    //_ Clear conditions when "None" is selected
    $('.noDx').on('click', function (e) {
        if ( $(this).is(':checked') ) $('.dx:checked').click(); 
    });



    //_ Uncheck, hide noDx option for SPEC
    $('.config-first-step-selection span').on('click', function (e) {
        
        var isSpec = $(stkCodePath).attr('data-value').substring(12) == "SPEC";

        if ( isSpec == $('.noDx').is(':checked') ) 
            $('.noDx').click();

        if ( isSpec ) $('.noDx').hide();
        else $('.noDx').show();
    });




/*========================================================
    Redirect to landing pages on Add-to-Cart
        Changed 2023/08/30

        --waiting for approval to enable
========================================================*/


    $(document).off('click', '.add-config-to-cart'); // remove original click function

    $(document).on('click', '.add-config-to-cart', function (e) {

        // Get config data
        var configData = selectedData.slice();
        var deviceDescription = $(stkCodePath).attr('item-descrip');
        
        var data = {
            stockCode: stockCodeToAddToBasket,
            qty: 1,
            ConfigurationItems: configData,
            deviceCodeDescription: deviceDescription
        };


        // Post to cart when no errors found
        $.post('/DienenConfiguratorAddToBasket/AddToBasket', data, function (result) {

            if ( result ) {

                if ( result.Success ) {

                    // Update basket
                    alertify.success( result.Message );
                    PT.Sections.Basket.miniBasket.UpdateMiniBasket();
                    if ( isSavedConfig ) deleteSavedConfig();


                    // Custom Redirect
                    var type = ['SPEC', 'PERF', 'COMF'];
                    var link = ['condition-specific', 'sport', 'comfort'];
                    var page = [123, 124, 125];

                    var _i = type.indexOf( $(stkCodePath).attr('data-value').substring(12) );

                    window.location.href = window.location.origin + '/en/page/' + page[_i] + '/sitename-result-' + link[_i];

                } else {
                    alertify.error(result.Message);
                }
            }
        });
    });


/*== CHANGE LOG ===============================================================

    2023/08/29: +Redirect to product landing pages after Cart add;
    2023/08/30: +Update partnum selector in redirect;
                +Add "None" condition option functionality;

=============================================================================*/