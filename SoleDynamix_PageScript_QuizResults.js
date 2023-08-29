var h2MobileDiv = '<div id="h2Mobile" class="hidden" style="background: #0F0F0F;">';
var h2MobileTxt = '<h2 style="color: #fff; text-align: center;">Your results are in!</h2><div>';

$(h2MobileDiv + h2MobileTxt).insertAfter(".how-it-works-hero");


$(window).on('resize', function(e) { 
    
    if ( $(window).width() < 1184 ) {

        $('#resultImg').attr("style","width: 100%;");
        $('#h2Mobile').removeClass('hidden');

    } else {

        $('#resultImg').attr("style","width: 70%;");
        $('#h2Mobile').addClass('hidden');
    }
});


$(window).trigger('resize');