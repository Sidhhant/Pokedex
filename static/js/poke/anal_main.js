
$(document).ready(function(){
	var datab = []
	var dataw = []
	var datah = []
	var load = '<div class="ui segment" style="height:300px;">'+
            '<div class="ui active dimmer">'+
            '<div class="ui text loader">Loading</div>'+
            '</div>'+
            '<p></p>'+
        '</div>';

function create_graph(data, x) {
		$("#graphic").html("");
	    //sort bars based on value
        data = data.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
        })
        //console.log(data);
        //set up svg using margin conventions - we'll need plenty of room on the left for labels
        var margin = {
            top: 15,
            right: 25,
            bottom: 15,
            left: 250
        };

        var width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#graphic").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            if(x == 1){
        		svg.append("text")
        		.attr("x", (width / 2))             
        		.attr("y", 0 + (margin.top / 5))
        		.attr("text-anchor", "middle")  
        		.style("font-size", "16px") 
        		.style("text-decoration", "underline")
        		.style("font-family", "'Courier New', Courier, monospace")
        		.style("fill", "green")  
        		.text("Base Experience");    	
            }
            else if(x==2){
            	svg.append("text")
        		.attr("x", (width / 2))             
        		.attr("y", 0 + (margin.top / 5))
        		.attr("text-anchor", "middle")  
        		.style("font-size", "16px") 
        		.style("text-decoration", "underline")
        		.style("font-family", "'Courier New', Courier, monospace")
        		.style("fill", "green")  
        		.text("Weight");    	
            }
            else{
            	svg.append("text")
        		.attr("x", (width / 2))             
        		.attr("y", 0 + (margin.top / 5))
        		.attr("text-anchor", "middle")  
        		.style("font-size", "16px") 
        		.style("text-decoration", "underline")
        		.style("font-family", "'Courier New', Courier, monospace")
        		.style("fill", "green")  
        		.text("Height");    	
            
            }
        


        var x = d3.scale.linear()
            .range([0, width])
            .domain([0, d3.max(data, function (d) {
                return d.value;
            })]);

        var y = d3.scale.ordinal()
            .rangeRoundBands([height, 0], .1)
            .domain(data.map(function (d) {
                return d.name;
            }));

        //make y axis to show bar names
        var yAxis = d3.svg.axis()
            .scale(y)
            //no tick marks
            .tickSize(10)
            .orient("left");

        var gy = svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("g")

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("height", y.rangeBand())
            .attr("x", 0)
            .attr("width", function (d) {
                return x(d.value);
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2 + 4;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function (d) {
                return x(d.value) + 3;
            })
            .text(function (d) {
                return d.value;
            });
    
}


function anal_gr(data) {
	
	var l = data.poke_d.length;
	
	datab.length = 0;
	dataw.length = 0;
	datah.length = 0;
	for(var i=0;i<l;i++)
	{
		var dictb = {
			"name" : data.poke_d[i].name,
			"value" : data.poke_d[i].base_experience
		};
		datab.push(dictb);
		var dictw = {
			"name" : data.poke_d[i].name,
			"value" : data.poke_d[i].weight
		};
		dataw.push(dictw);
		var dicth = {
			"name" : data.poke_d[i].name,
			"value" : data.poke_d[i].height
		};
		datah.push(dicth);
	}

	data = datab;
	create_graph(data);
    
}

$(document).on('click', ".be_btn", function (){
	create_graph(datab, 1);
});
$(document).on('click', ".wt_btn", function (){
	create_graph(dataw, 2);
});
$(document).on('click', ".ht_btn", function (){
	create_graph(datah, 3);
});

 	
	
	var i = 0;
		$.ajax({
   		url: 'analytics/',
   		data: {
      		'index': i,
   		},
   		error: function() {
   			alert("Not Working");
   		},
   		success: function(data) {
   			//console.log(data);
   			//console.log(data);
   			anal_gr(data);
   			i = data.index;
   		},
   		type: 'GET'
		});

	

	$(document).on('click', ".f_anal", function (){
	//var i = 0;
	$("#graphic").html(load);
	$.ajax({
   		url: 'analytics/',
   		data: {
      		'index': i,
   		},
   		error: function() {
   			alert("Not Working");
   		},
   		success: function(data) {
   			//console.log(data);
   			//console.log(data);
   			$("#graphic").html("");
   			anal_gr(data);
   			i = data.index;
   		},
   		type: 'GET'
		});
	});
	$(document).on('click', ".b_anal", function (){
	//var i = 0;
	if(i>11){
	$("#graphic").html(load);
	$.ajax({
   		url: 'pre_anal/',
   		data: {
      		'index': i,
   		},
   		error: function() {
   			alert("Not Working");
   		},
   		success: function(data) {
   			//console.log(data);
   			//console.log(data);
   			$("#graphic").html("");
   			anal_gr(data);
   			i = data.index;
   		},
   		type: 'GET'
		});
		}
	});

});

