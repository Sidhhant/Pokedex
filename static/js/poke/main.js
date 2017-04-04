function modal_fill(data) {
	$(".ui.modal>.header").html(data.name);
	$(".ui.modal>.image.content>.ui.medium.image>img").attr('src','/static/images/poke/'+data.key+'.png');
	$(".ui.modal>.image.content>.description>.be").html("Base Experience : "+data.base_experience);
	$(".ui.modal>.image.content>.description>.or").html("Order : "+data.order);
	$(".ui.modal>.image.content>.description>.ht").html("Height : "+data.height);
	$(".ui.modal>.image.content>.description>.wt").html("Weight : "+data.weight);

}
function nxt(data) {
	var hl = "";
  	for(var key in data.poke_dict)
  	{
  		hl += ""+'<div class="item">'+
       				'<img class="ui avatar image sprite" src="/static/images/poke/'+key+'.png" style="display: block; width: 212px; height: 155px;" id="img_'+ key +'">'+
       				'<div class="content">'+
           			'<div class="header p_name">'+ data.poke_dict[key] +'</div>'+
          			'</div>'+
        		'</div>';
  	}
  	$(".pokeDisp").html(hl);
  	//console.log(hl);
}

function pre(data) {
	var hl = "";
  	for(var key in data.poke_dict)
  	{
  		hl += ""+'<div class="item">'+
       				'<img class="ui avatar image sprite" src="/static/images/poke/'+key+'.png" style="display: block; width: 212px; height: 155px;" id="img_'+ key +'">'+
       				'<div class="content">'+
           			'<div class="header p_name">'+ data.poke_dict[key] +'</div>'+
          			'</div>'+
        		'</div>';
  	}
  	$(".pokeDisp").html(hl);
}
$(document).ready(function(){
	//for (var i in 500){
	 // $(".preload").css("background",'url(/static/images/poke/'+ i +'.png)');
	//}
   
   $('.ui.two .item').on('click', function() {
      $('.ui.two .item').removeClass('active');
      $(this).addClass('active');
   });
   
   $('.ui.horizontal.list .item').on('click', function() {
      //alert("as");
      //$('.ui.horizontal.list .item').removeClass('active');
      //$(this).addClass('active');
   });

   $('.ui.labeled.icon.button.left').on('click', function() {
        if (index>21){
          $.ajax({
   		   url: 'previous/',
   		   data: {
      	  	  'index': index,
   		   },
   		   error: function() {
   		 	   alert("Not Working");
   		   },
   		   success: function(data) {
   		 	   pre(data);
   		 	   //console.log(data);
   		  	   index = data.index;
   		   },
   		   type: 'GET'
		   });
    	}
   });

    $('.ui.right.labeled.icon.button').on('click', function() {
       $.ajax({
   		url: 'next/',
   		data: {
      		'index': index,
   		},
   		error: function() {
   			alert("Not Working");
   		},
   		success: function(data) {
   			nxt(data);
   			index = data.index;
   		},
   		type: 'GET'
		});
    });

    $(".ui.fourteen.wide.column.horizontal.list.pokeDisp>.item").on('click',function(){
    	var key = $(this).find(">img").attr('id');
    	key = key.split("_");
    	//alert(key[1]);
    	key = key[1];
    	$.ajax({
   		url: 'detail/',
   		data: {
      		'key': key,
   		},
   		error: function() {
   			alert("Not Working");
   		},
   		success: function(data) {
   			//console.log(data);
   			modal_fill(data);
   		},
   		type: 'GET'
		});

		$('.ui.modal').modal('show');
	});
});

$(document).on('click', ".ui.fourteen.wide.column.horizontal.list.pokeDisp>.item", function (){
    	var key = $(this).find(">img").attr('id');
    	key = key.split("_");
    	//alert(key[1]);
    	key = key[1];
    	$.ajax({
   		url: 'detail/',
   		data: {
      		'key': key,
   		},
   		error: function() {
   			alert("Not Working");
   		},
   		success: function(data) {
   			//console.log(data);
   			modal_fill(data);
   		},
   		type: 'GET'
		});

		$('.ui.modal').modal('show');
	});


$(document).on('click', ".f_tab", function (){
    $(".Pokedex").show();
    $(".analytics").hide();
});

$(document).on('click', ".s_tab", function (){
    $(".Pokedex").hide();
    $(".analytics").show();
});