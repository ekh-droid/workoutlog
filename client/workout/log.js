$(function() {
    $.extend(WorkoutLog, {
        log: {
            workouts: [],

            setDefinitions: function() {
                var defs = WorkoutLog.definition.userDefinition;
                var length = defs.length;
                var opts;
                for (var i = 0; i < length; i++) {
                    opts += "<option value='" + defs[i].id + "'>" + defs[i].description + "</option>";
                }
                $("#log-definition").children().remove();
                $("#log-definition").append(opts);
            },

            setHistory: function() {
                var history = WorkoutLog.log.workouts;
                var len = history.length;
                var lis = "";
            
             for (var i = 0; i < len; i++) {
                lis += "<li class='list-group-item'>" + history[i].def + " - " + history[i].result + "</li>"
                + "<div class ='pull-right'>" + "<button id='"+ history[i].id+ "' class='remove'><strong>X</strong></button>" +"</div</li>"
                }
            //  for (var i = 0; i < len; i++) {
            //      liSs += "<li class='list-group-item'>" +
                        // history[i].id + " - " +
            //           history[i].def + " - " +
            //          history[i].result + " " +
                        // pass the log.id into the button's id attribute // watch your quotes!
                      
                
                $("#history-list").children().remove();
                $("#history-list").append(lis);
            },
            create: function() {
                var itsLog = {
                    description: $("#log-description").val(),
                    result: $("#log-result").val(),
                    def: $("#log-definition option:selected").text()
                };
                var postData = {
                    log: itsLog
                };
                var logger = $.ajax({
                    type: "POST",
                    url: WorkoutLog.API_BASE + "log",
                    data: JSON.stringify(postData),
                    contentType: "application/json"
                });

                logger.done(function(data) {
                    WorkoutLog.log.workouts.push(data);
                    $("#log-description").val("");
                    $("log-result").val("");
                    $('a[href="#history"]').tab("show");
                });
            },

            getWorkout: function() {
                var thisLog = {
                    id: $(this).attr("id")
                };
                console.log(thisLog);
                var logID = thisLog.id;
                var updateData = {
                    log: thisLog
                };
                var getLog = $.ajax({
                    type: "GET",
                    url: WorkoutLog.API_BASE + "log/" + logID,
                    data: JSON.stringify(updateData),
                    contentType: "application/json"
                });

                getLog.done(function(data) {
                    $('a[href="#update-log"]').tab("show");
                    $('#update-result').val(data.result);
                    $('#update-description').val(data.description);
                    $('#update-id').val(data.id)
                });
            },
            updateWorkout: function() {
                $("#update").text("Update");
                var updateLog = {
                    id: $('#update-id').val(),
                    desc: $("#update-description").val(),
                    result: $("#update-result").val(),
                    def: $("#update-definition option:selected").text()
                };
                for (var i = 0; i < WorkoutLog.log.workouts.length; i++) {
                    if (WorkoutLog.log.workouts[i].id == updateLog.id) {
                        WorkoutLog.log.workouts.splice(i, 1);
                    }
                }
                WorkoutLog.log.workouts.push(updateLog);
                var updateLogData = {
                    log: updateLog
                };
                var updater = $.ajax({
                    type: "PUT",
                    url: WorkoutLog.API_BASE + "log",
                    data: JSON.stringify(updateLogData),
                    contentType: "application/json"
                });


                updater.done(function(data) {
                    console.log(data);
                    $("#update-description").val("");
                    $("#update-result").val("");
                    $('a[href="#history"]').tab("show");
                });
            },
           
            },
            fetchAll: function() {
                var fetchDefs = $.ajax({
                        type: "GET",
                        url: WorkoutLog.API_BASE + "log",
                        headers: {
                            "authorization": window.localStorage.getItem("sessionToken")
                        }
                    })
                    fetchDefs.done(function(data) {
                        WorkoutLog.log.workouts = data;
                    })
                    .fail(function(err) {
                        console.log(err);
                    })
                },

             delete: function() {
                var thisLog = {
                    id: $(this).attr("id")
                };
                var deleteData = {log: thisLog };
                var deleteLog = $.ajax({
                    type: "DELETE",
                    url: WorkoutLog.API_BASE + "log",
                    data: JSON.stringify(deleteData),
                    contentType: "application/json"
                });
                $(this).closest("li").remove();

                for (var i = 0; i < WorkoutLog.log.workouts.length; i++) {
                    if (WorkoutLog.log.workouts[i].id == thisLog.id) {
                        WorkoutLog.log.workouts.splice(i, 1);
                    }
                }
                deleteLog.fail(function() {
                    console.log("nope, didn't get deleted.");
                });
            }
        
    });

    $("#log-save").on("click", WorkoutLog.log.create);
    $("#history-list").delegate('.remove', 'click', WorkoutLog.log.delete);
    if (window.localStorage.getItem("sessionToken")) {
        WorkoutLog.log.fetchAll();
    }
});