$(function () {
    'use strict';
    var abbrShowAs = function(strShowAs) {
        if (strShowAs.length > 200) {
            return strShowAs.substr(0,199) + "..."
        } else {
            return strShowAs;
        }
    };
    // set the width of the autocomplete widget
    /*
    $.extend($.ui.autocomplete.prototype.options, {
            open: function(event, ui) {
                $(this).autocomplete("widget").css({
                    "width": ($(this).width() + "px")
                });
            }
        });
    */
    $.widget( "custom.catcomplete", $.ui.autocomplete, {
        _create: function() {
          this._super();
          this.widget().menu( "option", "items", "> :not(.ui-ac-group)" );
        },
        _renderMenu: function( ul, items ) {
          var that = this;
          console.log(" _renderMenu ", items);
          $.each( items, function( index, item ) {
            var li;
            if (item.hasOwnProperty('searchResult')) {
                console.log(" searchResult = ", item.searchResult);
                ul.append( "<li class='ui-ac-group name-"+ item.name + "'>" + item.label + "</li>" );  
                // we do this to force it into an array since if there is a single result, it is not an arry
                var searchResult = [].concat(item.searchResult);
                $.each(searchResult, function(index, resultItem) {
                    console.log(" _renderItemData ", resultItem);
                    li  = that._renderItemData(ul, resultItem);
                });
            }
          });
        }
      });
    
    $("#search").catcomplete({
        'minLength':3,
        autoFocus: true,
        'source': function(request, response) {
            $.ajax({
                url: '/gw/service/searchac/',
                dataType: 'json',
                data: {
                    query: request.term
                },
                success: function(data) {
                    console.log(' DATA = ', request.term);
                    response(data.searchGroups.searchGroup);
                }
            });
        },
        
        'select': function(event, ui) {
            location.href = 'document.html?iri=' + ui.item.exprAbstract['expr-iri'];
            return false;
        }
    })
    .catcomplete("instance")._renderItem = function(ul, item) {
        var resultRow = [];
        //var exprIri = item.exprAbstract['expr-iri'];
        //console.log(" EXPR ABSTRACT ", item);
        //var thURL = exprIri.substr(0, exprIri.lastIndexOf('/')) + "/" + item.exprAbstract.thumbnail.src;
        resultRow.push(
            '<div class="ui-ac-item-render">',
            // uncomment below to show thumbnail
            //'<img class="ui-ac-item-render-thumb" height="200px" src="http://localhost'+ thURL  +'" width="auto" alt="thumb" />',
            '<div class="ui-ac-item-render-content">',
            '<h3 >' + abbrShowAs(item.exprAbstract.publishedAs.showAs).toLowerCase() + '</h3>',
            '<nav class="ui-act-item-meta">',
            '<ol >',
             '<li >', '<span class="ui-ac-item-type">' +  item.exprAbstract.type.name + '</span>' ,'</li>',
             '<li >', '<span class="ui-ac-item-country">' +  item.exprAbstract.country.showAs + '</span>' ,'</li>',
             '<li >', '<span class="ui-ac-item-date">' +  item.exprAbstract.date[1].value + '</span>' ,'</li>',
            '</ol>',
            '</nav>',
            '</div>',
            '</div>'
        );
        //console.log( " RESULT ROW ", resultRow);
        return $("<li class='ui-ac-item'>")
            .append(resultRow.join(''))
            .appendTo(ul);   
    };
    // check for invalid enter key press
    $("#search").keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            event.stopPropagation();    
            return false;
        }
     });
   
});