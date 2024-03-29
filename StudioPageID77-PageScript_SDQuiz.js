/*== PageID=77 2023/08/31 ==============================================
    
    Sole Dynamix Quiz Custom Page Script 

    Page ID:    ID=77
    Products:   SOLEDYNAMIX-PERF, SOLEDYNAMIX-COMF, SOLEDYNAMIX-SPEC
    
    ChangeDate: 2023/08/31 -KV
======================================================================*/

var stkCodePath = '.config-selected-image-container [field-name="stockCodeShoe"]';

var path = { 
    site: window.location.origin + '/en/page/',
    type: ['SPEC', 'PERF', 'COMF'], 
    page: [123, 124, 125], 
    name: '/' + Math.random().toString(16).substring(2,15)
};

$('.add-config-to-cart').html('View your results');



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
    $('.config-selection-image-slider.Shoe.Style').find('a').on('click', function(e){
        
        var isSpec = $(this).find('input').attr('data-value') == "SOLEDYNAMIX-SPEC";

        if ( isSpec == $('.noDx').is(':checked') ) 
            $('.noDx').click();

        $('.noDx').closest('.col-sm-3').attr('style', isSpec? 'display: none;': '');
    });




/*========================================================
    Redirect to landing pages on Add-to-Cart
        Changed 2023/08/31
========================================================*/

    // Disable original add to cart function
    $(document).off('click', '.add-config-to-cart'); 

    // Add Product & Config Data to cart, redirect to landing pages
    $(document).on('click', '.add-config-to-cart', function (e) {
        
        var data = {
            stockCode: $(stkCodePath).attr('data-value'),
            qty: 1,
            ConfigurationItems: selectedData.slice(),
            deviceCodeDescription: $(stkCodePath).attr('item-descrip')
        };


        $.post('/DienenConfiguratorAddToBasket/AddToBasket', data, function (result) {

            if ( !result ) return;
            
            if ( !result.Success ) { 
                alertify.error( result.Message );  
                return; 
            }

            alertify.success( result.Message );
            PT.Sections.Basket.miniBasket.UpdateMiniBasket();

            hrefToResultsPage( data.stockCode, 1500 );
        });
    });




/*========================================================
    Script Funcitons
========================================================*/

    function hrefToResultsPage( desc, wait = 0 ) { 

        var i = path.type.indexOf( desc.substring(12) );
        var link = path.site + path.page[i] + path.name;
        
        setTimeout(function() { 
            window.location.href = link; 
        }, wait);
    }




/*== CHANGE LOG ===============================================================

    2023/08/29: +Redirect to product landing pages after Cart add;
    
    2023/08/30: +Update partnum selector in redirect;
                +Add "None" condition option functionality;
    
    2023/08/31: +Update redirect using path enum;
                +Update .dx visibility changes for future Button change;
                +Patch button visibility bug showing checkbox;
                +Change span on add-to-cart button;
                +Add setTimeout on redirect to let user see success alert;

=============================================================================*/
