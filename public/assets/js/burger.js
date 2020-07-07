$(function() {

    // Add a new burger
    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newburger").val().trim(),
            devoured: 0
        };

        // Send POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("Added a new burger");
            // Show updated burger list by reloading
            location.reload();
        });
    });

    $(".devourburger").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");
        var eaten = {
            devoured: 1
        };

        // Send PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: eaten
        }).then(function() {
            console.log("Burger was devoured");
            // Show updated devoured list by reloading
            location.reload();
        });
    });

    $(".throwaway").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");

        // Send DELETE request
        $.ajax({
            type: "DELETE",
            url: "/api/burgers/" + id
        }).then(location.reload());
    });
})