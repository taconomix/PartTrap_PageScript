/*=================================================================
    Add "Powered by EBiz Charge" to the cart page
=================================================================*/

    var eBizImg = '<img src="/en/image/getthumbnail/1335?width=135&amp;height=31&amp;s=001" data-id="1335">';
    var eBizTxt = '<h6 style="padding-right: 5px;">Powered by</h6>';

    jQuery('<div>', {

        class: 'row ebiz col-sm-12 pull-right',
        style: 'text-align: right; padding-right: 15px; padding-top: 3px; display: none;'

    }).insertAfter('#summarySection');

    $('.ebiz').append('<div style="float: right;">' + eBizImg + '</div>');
    $('.ebiz').append('<div style="float: right;">' + eBizTxt + '</div>');




/*==================================================================
    Event listener, fixes bugs on skipped fields
            -not sure why. I need to learn JavaScript.
==================================================================*/

    $(document).on('change', '#btnRow', function (e) {

        if ( $(this).attr('data-value') ) $('.ebiz').show();
        else $('.ebiz').hide();
    });




/*==================================================================
    Change #btnDelivery Text 
==================================================================*/

    $('#btnDelivery').html("Confirm & Review Order");



/*==================================================================
    Skip Delivery, Payment fields after address entry 
            -Can we eliminate the scrolling?
==================================================================*/

    $('#btnDelivery').on('click', function () {
        
        if ( $('[id="SelectState"]').children("option:selected").attr('value').length ) {

            $('#btnChangeAddress').attr('style',"display: none;");
            $('#referencesField').attr('style',"margin-top: 30px; display: none;");
            $('#btnPayment').click();

            $('#btnSummary').attr('style',"display: none;");
            $('#btnChangeDelivery').attr('style',"display: none;");
            $('#paymentField').attr('style',"margin-top: 30px; display: none;");
            $('#btnSummary').click();

            $('#btnDelivery').attr('style','');
            $('#backToBasket').attr('style','');

            $('#btnRow').attr('data-value',true);
            $('#btnRow').change();
        }
    });




/*==================================================================
    Skip back to address entry from final checkout
==================================================================*/

    $(document).on('click', '#btnPrevious', function () {

            $('#btnChangeDelivery').click();
            $('#paymentField').attr('style',"margin-top: 30px; display: none;");
            
            $('#btnChangeAddress').click();
            $('#referencesField').attr('style',"margin-top: 30px; display: none;");
            
            $('#addressInputFields').find('input' ).removeAttr('disabled');
            $('#addressInputFields').find('select').removeAttr('disabled');

            $('#btnRow').attr('data-value','');
            $('#btnRow').change();
    });