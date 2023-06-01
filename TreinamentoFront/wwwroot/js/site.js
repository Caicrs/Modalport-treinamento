// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
var arrayItens = [
    {
        descricao: "des 2",
        ordem: 2,
        tipo: "3 - Multipla escolha",
        tipo_data: [
            "res 1",
            "res 2",
            "res 3"
        ],
        respostas_invalidam: [
            "res 1"
        ]
    }
];

// Get the container element where you want to display the data
const dataContainer = document.getElementById('itens-list');


function updateContent() {
    // Map the array and generate HTML content
    const htmlContent = arrayItens.map((item, index) => `<tr class="itens-container" ${index % 2 === 0 ? `style='background: #808080;'` : null}>
      <td>${item.ordem}</td>
      <td>${item.descricao}</td>
      <td>${item.tipo[0]}</td>
      ${typeof item.tipo_data === "string"
            ? `<td>${item.tipo_data}</td>`
            : (typeof item.tipo_data === "object"
                ? `<td>${item.tipo_data.name || item.tipo_data.join(', ')}</td>`
                : `<td>Vazio 1</td>`)}
<td>${item.respostas_invalidam.length > 0 ? item.respostas_invalidam.join(", ") : 'Vazio'}</td>
    </tr > `).join('');

    // Set the generated HTML content inside the container
    dataContainer.innerHTML = htmlContent;
}

function itemLogic(array, newObject) {
    const ordemExists = array.some(obj => obj.ordem === newObject.ordem);
    if (ordemExists) {
        array.map((obj, i) => {
            console.log(obj.ordem >= newObject.ordem ? obj.ordem : null)
            if (obj.ordem >= newObject.ordem) {
                array[i].ordem = obj.ordem + 1
            }
        });
        array.push(newObject);

    } else {
        array.push(newObject);
    }
    const formatArray = array.sort((a, b) => a.ordem - b.ordem);
    updateContent()
    return formatArray;
}

updateContent()
// Usage example:




// Write your JavaScript code.
$(document).ready(function () {
    const filename = document.getElementById('fileName');
    var a = document.getElementById("myDropdown");
    var dataInputFile = document.getElementById("data-image");
    var dataInput = document.getElementById("data-input");
    var dataInputUnique = document.getElementById("data-input-unique");
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
                var listItem = $(`<div> `).addClass("item-container deleteBtn").appendTo("#itemList");
                $("<div>").addClass("item").text(text).attr("data-text", text).appendTo(listItem);
                $("<button>").addClass("deleteBtn").text("x").appendTo(listItem);
                $(this).val(""); // Clear the input field
            }
            document.getElementById("textInput").value = ""
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
            document.getElementById("textInputUnique").value = ""
        }
    });

    $("#textInputInvalidReponses").keypress(function (event) {
        if (event.keyCode === 13 || event.which === 13) { // Check if Enter key is pressed
            event.preventDefault(); // Prevent default form submission
            var text = $(this).val();
            if (text.trim() !== "") {
                addedInvalidReponses.push(text); // Add the item to the array
                var listItem = $(`<div> `).addClass("item-container deleteBtn").appendTo("#itemListInvalidResponses");
                $("<div>").addClass("item").text(text).attr("data-text", text).appendTo(listItem);
                $("<button>").addClass("deleteBtnInvalidReponses").text("x").appendTo(listItem);
                $(this).val(""); // Clear the input field
            }
            document.getElementById("textInputInvalidReponses").value = ""
        }
    });


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
        const ordem = parseInt(document.getElementById('ordem-item-input').value);
        var a = document.getElementById("myDropdown").value;
        const dataItem = {
            descricao,
            ordem,
            tipo: a,
            tipo_data: addedItems.length > 0 ? addedItems : addedItem,
            respostas_invalidam: addedInvalidReponses
        }
        console.log(dataItem)
        document.getElementById('descricao-item-input').value = ''
        document.getElementById('ordem-item-input').value = ''
        document.getElementById("myDropdown").value = ''
        addedInvalidReponses = []
        addedItem = []
        addedItems = []
        const itemListInvalidResponses = document.getElementById('itemListInvalidResponses');
        itemListInvalidResponses.innerHTML = '';
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';
        dataInput.classList.add("hide");
        dataInputFile.classList.add("hide-3")
        dataInputUnique.classList.add("hide-2");

        itemLogic(arrayItens, dataItem);

        console.log(arrayItens)
    });


    $("#imageInput").on("change", function (event) {
        var fileName = $(this).val().split("\\").pop();

        $("#fileName").text(fileName);
        addedItem = event.target.files[0];
        // Clear the input value
        event.target.files[0] = {}
    });

    $("form").submit(function () {
        // Access the added items array here before submitting the form
        console.log(addedItems);
        // ...
    });


    function removeInputFile() {
        var existingItem = $("#data-image");
        existingItem.remove();
    }

    a.addEventListener('change', function () {
        switch (this.value[0]) {
            case '1':
                dataInputFile.classList.remove("hide-3")
                dataInput.classList.add("hide")
                dataInputUnique.classList.add("hide-2");
                filename.innerHTML = 'Nenhum arquivo selecionado';
                break;
            case '3':
                dataInputFile.classList.add("hide-3")
                dataInput.classList.remove("hide");
                dataInputUnique.classList.add("hide-2")
                filename.innerHTML = 'Nenhum arquivo selecionado';
                break;
            case '5':
                dataInputFile.classList.remove("hide-3")
                dataInput.classList.add("hide")
                dataInputUnique.classList.add("hide-2");
                filename.innerHTML = 'Nenhum arquivo selecionado';
                break;
            case '6':
                dataInputUnique.classList.remove("hide-2");
                dataInputFile.classList.add("hide-3")
                dataInput.classList.add("hide")
                filename.innerHTML = 'Nenhum arquivo selecionado';
                break;
            default:
                dataInput.classList.add("hide");
                dataInputFile.classList.add("hide-3")
                dataInputUnique.classList.add("hide-2");
                filename.innerHTML = 'Nenhum arquivo selecionado';

                break;
        }
    }, false);

});