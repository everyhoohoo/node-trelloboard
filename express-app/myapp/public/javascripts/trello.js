    $(document).ready(function() {
        let swimlaneID = 0;
        let cardID = 0;
        let column;
        let card;


        $("#startBtn").click(addSwimLane);
        function addSwimLane() {
            swimlaneID++;

            var idSL = "swimlane" + swimlaneID;
            var swimlane = $("<div>", { "id": idSL, "data-swimlane-id": swimlaneID, "class": "swimlane" });

            $(".container").append(swimlane);

            var btnMoveSwimlaneLeft = $("<input>", { "type": "button", "value": "◀️", "data-swimlane-id": swimlaneID, "data-direction": "left", "click": moveSwimlane });
            swimlane.append(btnMoveSwimlaneLeft);

            var btnAddCard = $("<input>", { "type": "button", "value": "Add Card", "id": "btnAddCard" + swimlaneID, "data-swimlane-id": swimlaneID, "click": addCard });
            swimlane.append(btnAddCard);

            var btnDelSwimlane = $("<input>", { "type": "button", "value": "X", "id": "btnDel" + swimlaneID, "data-swimlane-id": swimlaneID, "click": deleteSwimlane });
            swimlane.append(btnDelSwimlane);

            var btnMoveSwimlaneRight = $("<input>", { "type": "button", "value": "▶️", "data-swimlane-id": swimlaneID, "data-direction": "right", "click": moveSwimlane});
            swimlane.append(btnMoveSwimlaneRight);

            console.log(eval(swimlane));

            $.ajax({
                method: "POST",
                url: "http://localhost:8080/columns",
                data: column = {id: idSL, dSwimlaneID: swimlaneID, classType: "swimlane"}
            })
            .done(function(msg) {
                alert("Data Saved: " + msg);
            });
        };

        function deleteSwimlane() {
            let slid = $(this).data("swimlane-id");

            let container = $(".container");
            let swimlane = $("#swimlane" + slid);

            swimlane.remove();
        };

        function addCard() {
            cardID++;

            let slid = $(this).data("swimlane-id");
            let cid = "card"+ cardID;

            var txtTitle = prompt("Name your card:");
            var txtDescription = prompt("Description of your task:");

            var card = $("<div>", { "id": cid, "data-swimlane-id": slid, "class": "card" });

            var cardButtons = $("<div>", { "class": "card-buttons" });

            var btnMoveLeft = $("<input>", { "id": "btnMoveLeft" + cardID, "type": "button", "value": "◀️", "data-card-id": cardID, "data-move-direction": "left", "click": moveCard });
            cardButtons.append(btnMoveLeft);

            var btnDelete = $("<input>", { "id": "btnDel" + cardID, "type": "button", "value": "X", "id": "btnDel" + swimlaneID, "data-card-id": cardID, "click": deleteCard });
            cardButtons.append(btnDelete);

            var btnMoveRight = $("<input>", { "id": "btnMoveRight", "type": "button", "value": "▶️", "data-card-id": cardID, "data-move-direction": "right", "click": moveCard });
            cardButtons.append(btnMoveRight);

            card.append(cardButtons);

            var title = $("<p></p>");
            title.html(txtTitle);
            card.append(title);

            var desc = $("<p></p>");
            desc.html(txtDescription);
            card.append(desc);

            let swimlane = $("#swimlane" + slid);
            swimlane.append(card);

            $.ajax({
                method: "POST",
                url: "http://localhost:8080/cards",
                data: card = {id: cid, dSwimlaneID: slid, classType: "card", title: txtTitle, description: txtDescription}
            })
            .done(function(msg) {
                alert("Data Saved: " + msg);
            });
        };

        function deleteCard() {
            //let slid = $(this).parent().parent().data("swimlane-id");
            let cid = $(this).data("card-id");
            //let swimlane = $("#swimlane" + slid);
            let card = $("#card" + cid);

            card.remove();
            //$("#swimlane" + slid).remove($("#card" + cid))
        };

        function moveSwimlane() {
            let slid = $(this).data("swimlane-id");
            let swimlane = $("#swimlane" + slid);
            let container = $(".container");
            let previous = $("#swimlane" + slid).prev();
            let next = $("#swimlane" + slid).next();

            console.log($(this).data("direction"));
            console.log(swimlane);

            if ($(this).data("direction") == "left") {
            	$(previous).before(swimlane);
                
            } else if ($(this).data("direction") == "right") {
                $(next).after(swimlane);
            }
        };

        function moveCard() {
            let slid = $(this).parent().parent().data("swimlane-id");
            //console.log(slid);
            let cid = $(this).data("card-id");
            //console.log(cid);
            let card = $("#card" + cid);
            let leftSlid;
            let rightSlid;
            let left;
            let right;

            try {
                left = $("#swimlane" + slid).prev();
                leftSlid = left.data("swimlane-id");
            } catch (err) {
                console.error(e);
            }

            try {
                right = $("#swimlane" + slid).next();
                rightSlid = right.data("swimlane-id");
            } catch (err) {
                console.err(err);
            }

            console.log(left);
            console.log(right);

            let direction = $(this).data("move-direction");

            if (left != null && direction == "left") {
                left.append(card);
                card.data("swimlane-id",leftSlid);
            } else if (right != null && direction == "right") {
                right.append(card);
                card.data("swimlane-id",rightSlid);
            }
        };
    });