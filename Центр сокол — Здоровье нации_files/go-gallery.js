/**
 * <codeheader>
 * <name>Go Gallery</name>
 * <version>1.0</version>
 * <description>Responsive filterable gallery plugin with media categories. Shortcode driven, easy to use, lightweight yet powerful. Display beautiful galleries without slowing down your page load.</description>
 * <base>https://ampae.com/go-gallery/</base>
 * <author>V Bugroff</author>
 * <email>bugroff@protonmail.com</email>
 * <author>M Karodine</author>
 * <email>usr04@protonmail.com</email>
 * <author>Tim de Jong</author>
 * <author>AlViMedia</author>
 * <email>support@alvimedia.com</email>
 * <author>AMPAE</author>
 * <email>info@ampae.com</email>
 * <copyright file="LICENSE.txt" company="AMPAE">
 * THIS CODE ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR
 * A PARTICULAR PURPOSE.
 * </copyright>
 * <date>2019-04-08</date>
 * <summary>
 * Main Styles for Go Gallery;
 * </summary>
 * </codeheader>
**/

(function($){

    var Gallery = {

        init: function(){

            $('.go-gallery').each(function(){
                new Gallery.Instance(this);
            });

        },

        Instance: function(element){

            var instance = this;

            this.container = $(element);
            this.id = this.container.attr('id');

            this.menuColor = this.container.data('menu-color');
            this.menuBg = this.container.data('menu-bg');
            this.menuBgHover = this.container.data('menu-bg-hover');
            this.menuGap = this.container.data('menu-gap');

            this.bg = this.container.data('bg');
            this.gap = this.container.data('gap');
            this.borderSize = this.container.data('border-size');
            this.borderColor = this.container.data('border-color');

            this.descColor = this.container.data('desc-color');
            this.descShadow = this.container.data('desc-shadow');

            this.filters = this.container.find('ul.go-gallery-filters');
            this.list = this.container.find('ul.go-gallery-list');

            this.items = $('li', this.container);
            this.win = $(window);

            this.init = function(){
                this.prepareStyle();
                this.list.isotope({
                    itemSelector: '.go-gallery-item',
                    layoutMode: 'masonry'
                });

                this.filters.find('a').on('click', this.filter.bind(this));

                if(this.container.hasClass('style-squared')){
                    var item, figure, image;
                    this.items.each(function(){
                        item = $(this);
                        image = $('<div>').addClass('image').css('background-image', 'url(' + item.find('img').attr('src') + ')');
                        item.find('figure').append(image);
                    });
                }
            };

            this.loadImage = function(source, callback){
                var image = new Image();
                image.onload = callback;
                image.src = source;
            };

            this.filter = function(event){
                event.stopPropagation();
                var link = $(event.target);
                var category = link.data('filter');
                if(category != ''){
                    this.list.isotope({filter: '.category-' + category.toLowerCase()});
                }else{
                    this.list.isotope({filter: ''});
                }
                return false;
            };

            this.prepareStyle = function(){

                var style = $('<style>');
                var prefix = '#' + this.id;

                style.html([
                    prefix + ' ul.go-gallery-list li.go-gallery-item {',
                    'padding: ' + (this.gap / 2) + 'px;',
                    '}',
                    prefix + ' ul.go-gallery-list li.go-gallery-item .image-wrap {',
                    'padding: ' + this.borderSize + 'px;',
                    'background: ' + this.borderColor + ';',
                    '}',
                    prefix + ' ul.go-gallery-list li.go-gallery-item figcaption p {',
                    'color: ' + this.descColor + ';',
                    '}',
                    prefix + ' ul.go-gallery-list li.go-gallery-item figcaption h2 {',
                    'color: ' + this.descColor + ';',
                    'text-shadow: ' + '0px 4px 3px rgba(127,127,127,0.6), 0px 8px 13px rgba(127,127,127,0.2), 0px 18px 23px rgba(127,127,127,0.2)' + ';',
                    '}',
                    prefix + ' {',
                    'background-color: ' + this.bg + ';',
                    '}',
                    prefix + ' ul.go-gallery-filters li a {',
                    'background-color: ' + this.menuBg + ';',
                    'color: ' + this.menuColor + ';',
                    'margin: 0 ' + (this.menuGap / 2) + 'px;',
                    '}',
                    prefix + ' ul.go-gallery-filters li a:hover {',
                    'background-color: ' + this.menuBgHover + ';',
                    '}',
                    prefix + ' ul.go-gallery-filters li a:focus {',
                    'background-color: ' + this.menuBgHover + ';',
                    '}'
                ].join(''));
                $(document.head).append(style);
                this.list.css('margin', this.gap / 2);
            };
            imagesLoaded(this.container.get(0), this.init.bind(this));
        }
    };
    $(document).ready(Gallery.init);
})(jQuery);
