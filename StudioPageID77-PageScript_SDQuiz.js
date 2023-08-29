/*== PageID=77 2023/08/29 ==============================================
    
    Sole Dynamix Quiz Custom Page Script 

    Page ID:    ID=77
    Products:   SOLEDYNAMIX-PERF, SOLEDYNAMIX-COMF, SOLEDYNAMIX-SPEC
    
    ChangeDate: 2023/08/29 -KV
======================================================================*/


/*========================================================
    Redirect to landing pages on Add-to-Cart
        Changed 2023/08/29
========================================================*/

    // Remove original on-click function
    $(document).off('click', '.add-config-to-cart');


    // New on-click function (mostly copied from original)
    $(document).on('click', '.add-config-to-cart', function (e) {

        // Get config data
        var configData = selectedData.slice();
        var deviceDescription = $('.config-selected-image-container [field-name="cDeviceCode_c"]').attr('item-descrip');
        
        var data = {
            stockCode: stockCodeToAddToBasket,
            qty: 1,
            ConfigurationItems: configData,
            deviceCodeDescription: deviceDescription
        };


        // Post to cart when no errors found
        $.post('/DienenConfiguratorAddToBasket/AddToBasket', data, function (result) {

            if (result) {

                if (result.Success) {

                    // Construct link to custom pages
                    var partNum = ['SOLEDYNAMIX-SPEC', 'SOLEDYNAMIX-PERF', 'SOLEDYNAMIX-COMF'];
                    var linkEnd = ['condition-specific', 'sport', 'comfort'];
                    var pageId  = [123, 124, 125];

                    var iPartNum = partNum.indexOf( stockCodeToAddToBasket );

                    var redirectLink = pageId[iPartNum] + '/sitename-result-' + linkEnd[iPartNum];

                    // Update basket
                    alertify.success(result.Message);
                    PT.Sections.Basket.miniBasket.UpdateMiniBasket();
                    if (isSavedConfig) {
                        deleteSavedConfig();
                    }

                    // Redirect to custom link
                    window.location.href = window.location.origin + '/en/page/' + redirectLink;
                
                } else {
                    alertify.error(result.Message);
                }
            
            } else {
                alertify.success("Saved");
            }
        });
    });


/*== CHANGE LOG ===============================================================

    2023/08/29: +Redirect to product landing pages after Cart add;

=============================================================================*/