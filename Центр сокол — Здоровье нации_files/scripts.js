/*
 * <codeheader>
 * <name>AMPAE Qt LightBox</name>
 * <version>1.0</version>
 * <description>Qt LightBox</description>
 * <base>https://ampae.com/</base>
 * <author>AMPAE</author>
 * <email>info@ampae.com</email>
 * <copyright file="LICENSE.txt" company="AMPAE">
 * THIS CODE ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR
 * A PARTICULAR PURPOSE.
 * </copyright>
 * <date>2018-09-17</date>
 * <summary>
 * Script for Qt LightBox;
 * </summary>
 * </codeheader>
*/
jQuery(document).on('click', '#qt_popup_close', function() {qt_popup_down();});
jQuery(document).on('click', '#qt_popup_lb .qt_popup_content', function() {qt_popup_down();});

jQuery(function($) {
    $('.qt-lightbox').click( function(e) {
        e.preventDefault();

		var tmp_href = $(this).attr('data-source');
		var tmp_title = $(this).attr('title');
        var tmp_desc = $(this).attr('desc');

$('#qt_popup_lb .qt_popup_body .qt_popup_content').css('background', 'url('+tmp_href+') center center  no-repeat');

$('#qt_popup_lb .qt_popup_body .qt_popup_content').css('background-size', 'contain');


$('#qt_popup_lb .qt_popup_body .qt_popup_content').css('-webkit-background-size', 'contain');
$('#qt_popup_lb .qt_popup_body .qt_popup_content').css('-moz-background-size', 'contain');
$('#qt_popup_lb .qt_popup_body .qt_popup_content').css('-o-background-size', 'contain');
$('<span class=title>' + tmp_title + '</span>').appendTo('#qt_popup_lb .qt_popup_header');
$('<span class=desc>' + tmp_desc + '</span>').appendTo('#qt_popup_lb  .qt_popup_footer');

qt_popup_up();

	});
});

function qt_popup_up(){
  jQuery('body').prepend('<div id="qt_popup_overlay"></div>');

  jQuery('#qt_popup_overlay').animate({opacity:0.9},500);
  jQuery('#qt_popup_lb').fadeIn(500);
}

function qt_popup_down(){

  jQuery('#qt_popup_lb').fadeOut(500);

  jQuery('#qt_popup_overlay').animate({opacity:0.0},500, function(){
    jQuery('#qt_popup_lb .qt_popup_header .title').remove();
    jQuery('#qt_popup_lb .qt_popup_footer .desc').remove();
    jQuery('#qt_popup_overlay').remove();
  });
}
