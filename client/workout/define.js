$(document).ready(function(){
	$.extend(Workoutlog, {
		definition: {
			userDefinition : [],

			create: function(){
					var def = {
						desc: , $("#def-description").val(),
						type: $("#def-logtype").val()
					}

					var postData = { definition: def};

					var define = $.ajax({
						type: "POST"
						url: Workout.API_BASE + "definition",
						data: JSON.stringify(postData),
						contentType: "application/json"

					})

					define.done(function(data){
						Workoutlog.definition.userDefinition.push(data.definition)
					})


			},

			fetchAll: function(){
				if( window.localStorage.getItem("sessionToken")){
					Workoutlog.definition.fetchAll();
				}

			}
		}
	})

	$("#def-save").on('click', Workoutlog.definition.create);
})