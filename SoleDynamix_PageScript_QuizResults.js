
// Remove video-headline class that borks the CSS
$('.video-headline').removeClass('video-headline');


// Set "results are in" message for mobile formats
jQuery('<div>', {

    id:    'h2Mobile',
    class: 'hidden',
    style: 'background: #0F0F0F; padding-top: 2px; padding-bottom: 3px;'

}).insertAfter('.how-it-works-hero');


jQuery('<h2>', {

    style: 'color: #fff; text-align: center; margin: 0px;',
    html:  'Your results are in!'

}).appendTo('#h2Mobile');



// Toggle visibility and Hero Image width on window Resize
$(window).on('resize', function(e) { 
    
    if ( $(window).width() <= 1184 ) {

        $('#resultImg').attr("style","width: 100%;");
        $('#h2Mobile').removeClass('hidden');

    } else {

        $('#resultImg').attr("style","width: 70%;");
        $('#h2Mobile').addClass('hidden');
    }
});


$(window).trigger('resize');

