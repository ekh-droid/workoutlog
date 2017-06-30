$(function(){
	$.extend(WorkoutLog, {
		//signup method
			signup:function(){
				//username,pass variables
				var username =$("#su_username").val();
				var password =$("#su_password").val();
				//user object
				var user = {
						user: {
								username: username,
								password: password
						}
				};
			

	//signup post
			var signup = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "user",
					data: JSON.stringify( user ),
					contentType: "application/json"
			});
	//signup done/fail
			signup.done(function(data) {
				if(data.sessionToken) {
						WorkoutLog.setAuthHeader(data.sessionToken);
						WorkoutLog.definition.fetchAll();
						WorkoutLog.log.fetchAll;
						console.log("welcome to the cult");
						console.log(data.sessionToken);

				}

				$("#signup-modal").modal("hide");
				$(".disabled").removeClass("disabled");
				$("#loginout").text("Logout");

				 $('.nav-tabs a[href="#define"]').tab('show');
             	 $("#su_username").val("");
              	 $("#su_username").val("");
             	 $('a[href="#define"]').tab("show");
				console.log("a new account has been created");

			}).fail(function() {
				$("#su_error").text("There was an issue with sign up").show();
			});
		},

		login : function(){
			var username = $("su_username").val();
			var password = $("su_password").val();
			var user = {
				user : {
					username: username,
					password: password

		}};

			var login = $.ajax({
				type: "POST",
				url: WorkoutLog.API_BASE + "login",
				data: JSON.stringify(user),
				contentType: "application/json"
		});

			login.done(function(data){
				if(data.sessionToken){
		WorkoutLog.setAuthHeader(data.sessionToken)
		WorkoutLog.definition.fetchAll();
		WorkoutLog.log.fetchAll()
				}
		 window.location.href = "#home";
        $('a[href="#home"]').tab("show");

			$("#login-modal").modal("hide")
			$(".disabled").removeClass("disabled");
			$("#loginout").text("Logout")
			}).fail(function(){
				$("#li_error").text("there was a problem with loggin up!").show();
			})
		},
		//property to log out user, then after logining out returns the logging in function
		logout: function(){
			if(window.localStorage.getItem("sessionToken")){
					window.localStorage.removeItem("sessionToken")
					$("#logininout").text("Login")
			}
		}


	}); //end workout log
	$("#signup").on("click", WorkoutLog.signup);
	$("#login").on('click', WorkoutLog.login);
	$("#loginout").on('click', WorkoutLog.logout);

	if(window.localStorage.getItem("sessionToken")){
		$("#loginout").text("Logout");
	}
});//end outside function

