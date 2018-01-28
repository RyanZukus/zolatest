var seed = [
		{
		"name": "Joe",
		"age": 24,
		"priority": 1,
		"category": "cat2"
		},
		{
		"name": "Jane",
		"age": 76,
		"priority": 4,
		"category": "cat1"
		},
		{
		"name": "Kevin",
		"age": 32,
		"priority": 2,
		"category": "cat2"
		},
		{
		"name": "Lucy",
		"age": 54,
		"priority": 1,
		"category": "cat3"
		},
		{
		"name": "Colin",
		"age": 34,
		"priority": 3,
		"category": "cat1"
		},
		{
		"name": "Franny",
		"age": 36,
		"priority": 2,
		"category": "cat3"
		},
		{
		"name": "Neil",
		"age": 74,
		"priority": 4,
		"category": "cat2"
		},
		{
		"name": "Katy",
		"age": 55,
		"priority": 3,
		"category": "cat2"
		},
	];

function rendertable(data) {
	var sort = $('#usertable').data('sort');
	var filter = $('#usertable').data('filter');

	$('#usertable').empty();
	var celldata = "";
	var userdata = _.clone(data);
	if(sort == 1){
		userdata.sort(function(a, b) {
			var nameA = a['name'].toUpperCase();
			var nameB = b['name'].toUpperCase();
			if (nameA < nameB) {
			return -1;
			}
			if (nameA > nameB) {
			return 1;
			}

			return 0;
		});
	}
	if(sort == 2){
		userdata.sort(function (a, b) {
			return a['priority'] - b['priority'];
		});
	}
	$.each(userdata, function(i,val){
		celldata = "";
		if(filter == 'any' || filter == val['category']) {
			celldata = "<div class='usercell priority-" + val['priority'] + 
				"'><h2 class='name'>" + val['name'] + "</h2><p class='age'>" + 
				val['age'] + "</p><p class='category'>" + val['category']+ "</p></div>";
		}
		$('#usertable').append(celldata);
	});
}

function populatefilter(data){
	var catdata = _.clone(data);
	var categories = [];
	$.each(catdata, function(i,val){
		categories.push(val['category']);
	});
	categorylist = $.unique(categories);
	categorylist.sort();

	radiodata = "";
	$.each(categorylist, function(i,val){
		radiodata = "<input type='radio' name='filter-category' value='" + 
			val + "' id='fc-" + i + "'><label for='fc-" + i + "'>" + val +"</label>";
		$('#filtration .filter-wrapper').append(radiodata);
	});
	
}

$(document).ready(function() {
	populatefilter(seed);

    rendertable(seed);

	$('#sorter').change(function(){
		var sortval = $(this).val();
		$('#usertable').data('sort', sortval);
		rendertable(seed);
	});

	$('#filtration input').change(function(){
		var filterval = $(this).val();
		console.log(filterval);
		$('#usertable').data('filter', filterval);
		rendertable(seed);
	});
});

