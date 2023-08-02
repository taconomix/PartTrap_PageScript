


/*==================================================================
    Change #btnDelivery Text (span)

        Bryce: Ask Katie what this should say.
==================================================================*/
    
    /*var newButtonText = "Confirm and review order"; 

    $(document).ready(function() {

        $('[id="btnDelivery"]')[0].textContent = newButtonText;

    });*/




/*==================================================================
    Trigger #btnSummary click event on #btnDelivery click
        Skips Delivery & Payment sections
        Hides Delivery options section

        -Appears to function properly, not tested enough
        -Can we eliminate the scrolling?
==================================================================*/

    /*$(document).on('click', '[id="btnDelivery"]', function (e) {
        
        if ( $('[id="SelectState"]').children("option:selected").attr('value').length ) {
        
           $('[id="btnSummary"]').click();
           $('[id="referencesField"]').hide();
        }
    });*/




/*==================================================================
    Trigger #btnChangeAddress click event on #btnPrevious click
        Skips back to address
        Hides Delivery options section
        
        -Appears to function properly, not tested enough
==================================================================*/
    
    /*$(document).on('click', '[id="btnPrevious"]', function (e) {
        
           $('[id="btnChangeAddress"]').click();
           $('[id="referencesField"]').hide();
    });*/

