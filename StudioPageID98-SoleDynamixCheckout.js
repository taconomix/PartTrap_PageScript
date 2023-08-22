


/*==================================================================
    Change #btnDelivery Text (span)

        Bryce: Ask Katie what this should say.
==================================================================*/
    
    var newButtonText = "Confirm and review order"; 

    $(document).ready(function() {

        $('[id="btnDelivery"]')[0].textContent = newButtonText;

    });




/*==================================================================
    Trigger #btnSummary click event on #btnDelivery click
        Skips Delivery & Payment sections
        Hides Delivery options section

        -Appears to function properly, not tested enough
        -Can we eliminate the scrolling?
==================================================================*/

    $(document).on('click', '[id="btnDelivery"]', function (e) {
        
        if ( $('[id="SelectState"]').children("option:selected").attr('value').length ) {
        
           $('[id="btnSummary"]').click();
           $('[id="referencesField"]').hide();
        }
    });




/*==================================================================
    Trigger #btnChangeAddress click event on #btnPrevious click
        Skips back to address
        Hides Delivery options section
        
        -Appears to function properly, not tested enough
==================================================================*/
    
    $(document).on('click', '[id="btnPrevious"]', function (e) {
        
           $('[id="btnChangeAddress"]').click();
           $('[id="referencesField"]').hide();
    }); 




/*=================================================================

    Add Powered by EBiz Charge to the cart page
    Reformat part of the checkout process
    
=================================================================*/

/*=================================================================

    Add Powered by EBiz Charge to the cart page
    Reformat part of the checkout process
    
=================================================================*/

    $('#summaryWrapper').children('.row').children('.col-sm-12').append('<div class="row ebiz"></div>');
    $('.ebiz').append('<div class="ebimg" style="float: right;"></div>');
    $('.ebimg').append('<img src="/en/image/getthumbnail/1335?width=135&amp;height=31&amp;s=001" data-id="1335">');
    $('.ebiz').append('<div class="ebtxt" style="float: right;"></div>');
    $('.ebtxt').append('<h6 style="padding-right: 5px;">Powered by</h6>');
    $('.ebiz').css({'text-align': 'right', 'padding-right': '15px', 'padding-top': '3px'});
    
    //put with the other dev one
    $('.col-sm-7.col-xs-6 h5').css({'padding-left': '175px'});
    $('.col-sm-5.col-xs-6 h5').css({'padding-right': '10px'});













