$(function () {
    'use strict';
    
    $.widget( "custom.catcomplete", $.ui.autocomplete, {
        _create: function() {
          this._super();
          this.widget().menu( "option", "items", "> :not(.ui-ac-group)" );
        },
        _renderMenu: function( ul, items ) {
          var that = this;
          $.each( items, function( index, item ) {
            var li;
            if (item.hasOwnProperty('searchResult')) {
                ul.append( "<li class='ui-ac-group name-"+ item.name + "'>" + item.label + "</li>" );  
                $.each(item.searchResult, function(index, resultItem) {
                    li  = that._renderItemData(ul, resultItem);
                });
            }
          });
        }
      });
    
    $("#search").catcomplete({
        'minLength':3,
        'source': function(request, response) {
            $.ajax({
                url: '/gw/service/searchac/',
                dataType: 'json',
                data: {
                    query: request.term
                },
                success: function(data) {
                   // console.log(' DATA = ', data.searchGroups.searchGroup);
                    response(data.searchGroups.searchGroup);
                }
            });
        }
    })
    .catcomplete("instance")._renderItem = function(ul, item) {
        return $("<li class='ui-ac-item'>")
            .append("<div>" + item.exprAbstract.publishedAs.showAs + "</div>")
            .appendTo(ul);   
    };
   
});