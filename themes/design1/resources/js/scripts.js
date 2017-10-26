$(document).ready(function(){
	
	$('.tab-menu li:first-child').click(function(event){
		$('[data-tab]').hide()
		$('[data-tab~="t1"]').show()
		$('.tab-menu li a').removeClass('active')
		$(this).find('a').addClass('active')
		event.preventDefault();
	})
	$('.tab-menu li:nth-child(2)').click(function(event){
		$('[data-tab]').hide()
		$('[data-tab~="t2"]').show()
		$('.tab-menu li a').removeClass('active')
		$(this).find('a').addClass('active')
		event.preventDefault();
	})
	$('.tab-menu li:nth-child(3)').click(function(event){
		$('[data-tab]').hide()
		$('[data-tab~="t3"]').show()
		$('.tab-menu li a').removeClass('active')
		$(this).find('a').addClass('active')
		event.preventDefault();
	})
	$('.tab-menu li:nth-child(4)').click(function(event){
		$('[data-tab]').hide()
		$('[data-tab~="t4"]').show()
		$('.tab-menu li a').removeClass('active')
		$(this).find('a').addClass('active')
		event.preventDefault();
	})
	
	$('.the-result .left a').click(function(){
		$('.the-result .right').show()
	})
 
 	$('.click-more').click(function(){
		$(this).find('.see-more').slideToggle()
	})
 	 

	$(function() {
	    $('input[name="daterange"]').daterangepicker();
	})

	$(function() {
	    $('input[name="thisdate"]').daterangepicker({
	        singleDatePicker: true,
	        showDropdowns: true
	    })
	})

	$('.between-button').click(function(){
		$('.between-date').show()
		$('.this-date').hide()
		
	})

	$('.this-date-button').click(function(){
		$('.this-date').show()
		$('.between-date').hide()
	})
	/***
	$('#search').keyup(function() {
		if($(this).val() == 'econ' ){
			$('.the-result').show();
		}
		    else{
		    	$('.the-result').hide();
		    }
		});
		 ***/
	$('section').click(function(){
		$('.the-result').hide();
	})

	$('.mobile-button').click(function(){
		$('.left.col-3').slideToggle();
		$('body').toggleClass( "no-scroll" );
	})

	$(window).on('resize', function() {
        if ($(window).width() > 698) {
           $('.left.col-3').show()
        }  
        if ($(window).width() < 698) {
           $('.left.col-3').hide()
        }  
	});
	
})