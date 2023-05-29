// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {
    var addedMainItems = []; // Array to store the added items | general itens
    var addedItems = []; // Array to store the added items | multiples responses inside item
    var addedInvalidReponses = []; // Array to store the added items | multiples responses inside item
    var addedItem; // Array to store the added items | unique response inside item

    $(document).on("click", "#addItens", function () {
        event.preventDefault(); // Prevent default form submission
        var text = `    
       `
        if (text.trim() !== "") {
            addedMainItems.push(text); // Add the item to the array
            var listItem = $(text).addClass("main-item").appendTo("#modal-itens");
            $("<button>").addClass("deleteMainItemBtn").text("Delete").appendTo(listItem);
            $(this).val(""); // Clear the input field
        }
    });

    $("#textInput").keypress(function (event) {
        if (event.keyCode === 13 || event.which === 13) { // Check if Enter key is pressed
            event.preventDefault(); // Prevent default form submission
            var text = $(this).val();
            if (text.trim() !== "") {
                addedItems.push(text); // Add the item to the array
                var listItem = $(`<div>`).addClass("item-container deleteBtn").appendTo("#itemList");
                $("<div>").addClass("item").text(text).attr("data-text", text).appendTo(listItem);
                $("<button>").addClass("deleteBtn").text("x").appendTo(listItem);
                $(this).val(""); // Clear the input field
            }
        }
    });

    $("#textInputUnique").keypress(function (event) {
        if (event.keyCode === 13 || event.which === 13) { // Check if Enter key is pressed
            event.preventDefault(); // Prevent default form submission
            var text = $(this).val().trim();


            // Check if an item with the same ID already exists
            var existingItem = $("#" + addedItem);
            existingItem.remove();
            addedItem = text;
            var listItem = $("<div>").attr("id", text).addClass("item-container deleteBtn").appendTo("#itemList");
            $("<div>").addClass("item").text(text).attr("data-text", text).appendTo(listItem);
            $("<button>").addClass("deleteBtn").text("x").appendTo(listItem);

        }
    });

    $("#textInputInvalidReponses").keypress(function (event) {
        if (event.keyCode === 13 || event.which === 13) { // Check if Enter key is pressed
            event.preventDefault(); // Prevent default form submission
            var text = $(this).val();
            if (text.trim() !== "") {
                addedInvalidReponses.push(text); // Add the item to the array
                var listItem = $(`<div>`).addClass("item-container deleteBtn").appendTo("#itemListInvalidResponses");
                $("<div>").addClass("item").text(text).attr("data-text", text).appendTo(listItem);
                $("<button>").addClass("deleteBtnInvalidReponses").text("x").appendTo(listItem);
                $(this).val(""); // Clear the input field
            }
        }
    });

    // ---

    // Get the container element where you want to display the data
    const dataContainer = document.getElementById('itens-list');


    function updateContent() {
        conso
        // Map the array and generate HTML content
        const htmlContent = addedInvalidReponses.map(item => `<p>${item}</p>`).join('');

        // Set the generated HTML content inside the container
        dataContainer.innerHTML = htmlContent;
    }


    // ---


    $(document).on("click", ".deleteBtn", function () {
        var itemText = $(this).closest(".item-container").attr("data-text"); // Get the text of the item
        var index = addedItems.indexOf(itemText);
        if (index !== -1) {
            addedItems.splice(index, 1); // Remove the item from the array
        } else {
            addedItem = null
        }
        $(this).closest(".item-container").remove();
    });

    $(document).on("click", ".deleteBtnInvalidReponses", function () {
        var itemText = $(this).closest(".item-container").attr("data-text"); // Get the text of the item
        var index = addedItems.indexOf(itemText);
        if (index !== -1) {
            addedItems.splice(index, 1); // Remove the item from the array
        } else {
            addedItem = null
        }
        $(this).closest(".item-container").remove();
    });

    $("form").submit(function () {
        // Access the added items array here before submitting the form
        console.log(addedItems);
        // ...
    });

    $(document).on("click", "#addItem", function () {
        const descricao = document.getElementById('descricao-item-input').value;
        const ordem = document.getElementById('ordem-item-input').value;
        var a = document.getElementById("myDropdown").value;
        const dataItem = {
            descricao,
            ordem,
            tipo: a,
            tipo_data: addedItem ? addedItem : addedItems,
            respostas_invalidam: addedInvalidReponses
        }

        console.log(dataItem)
    });

    $("#imageInput").on("change", function () {
        var fileName = $(this).val().split("\\").pop();
        $("#fileName").text(fileName);
    });

    $("form").submit(function () {
        // Access the added items array here before submitting the form
        console.log(addedItems);
        // ...
    });

    function showInputFile() {
        var existingItem = $("#data-image");
        existingItem.remove();

        var htmlString = '<div id="data-image" class="hide-3">' +
            '<div class="image-upload hide-3">' +
            '<input type="file" id="imageInput" accept="image/*" />' +
            '<label for="imageInput">' +
            '<i class="fas fa-upload"></i> Adicionar imagem' +
            '</label>' +
            '</div>' +
            '<div id="fileName" class="document-name">Nenhum arquivo selecionado</div>' +
            '</div>';

        $('#itemList').append(htmlString); // replace 'container' with the ID or selector of the container element where you want to add the HTML

    }

    function removeInputFile() {
        var existingItem = $("#data-image");
        existingItem.remove();
    }

    var a = document.getElementById("myDropdown");
    var dataInput = document.getElementById("data-input");
    var dataInputUnique = document.getElementById("data-input-unique");
    a.addEventListener('change', function () {
        switch (this.value[0]) {
            case '3':
                dataInput.classList.remove("hide");
                removeInputFile()
                dataInputUnique.classList.add("hide-2")
                break;
            case '5':
                showInputFile()
                dataInput.classList.add("hide")
                dataInputUnique.classList.add("hide-2");
                break;
            case '6':
                removeInputFile()
                dataInput.classList.add("hide")
                dataInputUnique.classList.remove("hide-2");
                break;

            default:
                dataInput.classList.add("hide");
                removeInputFile()
                dataInputUnique.classList.add("hide-2");

                break;
        }
    }, false);

});