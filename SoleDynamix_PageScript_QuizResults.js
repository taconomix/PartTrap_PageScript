// Add left and right padding to the top two secions
/*$('#section_643').css({'padding-left': '200px', 'padding-right': '200px'});
$('#section_639').css({'padding-left': '50px', 'padding-right': '50px'});

// Change the size of the middle sections and their images
$('#section_640').find('img').css({'object-fit': 'contain'});
$('#section_641').find('img').css({'object-fit': 'contain'});
$('#section_642').find('img').css({'object-fit': 'contain'});
$('#section_640').find('div.gray-bg').css({'min-height': '300px', 'max-height': '500px'});
$('#section_641').find('div.half-image-container-w').css({'min-height': '300px', 'max-height': '500px'});
$('#section_642').find('div.gray-bg').css({'min-height': '300px', 'max-height': '550px'});
*/

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

