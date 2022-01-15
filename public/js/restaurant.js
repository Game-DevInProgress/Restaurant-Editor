let newCategories = []
let newItems = []
let restaurantID = window.location.pathname.split("/")[2];

function addCat(){
    let cat = document.getElementById("newCatName").value;
    newCategories.push(cat);
    let cats = `<div id="newCategories">`;

    for(let i =0;i<newCategories.length;i++){
        cats += `<p> ${newCategories[i]}</p>`
    }
    cats += `</div>`
    document.getElementById("newCategories").innerHTML = cats
}

function addItem(){
    let item = {}
    item["Cat"] = document.getElementById("newItemCat").value;
    item["description"] = document.getElementById("newItemDescription").value;
    item["name"] = document.getElementById("newItemName").value;
    item["price"] = document.getElementById("newItemPrice").value;
    newItems.push(item);
    let items = `<div id="newItems">`;

    for(let i =0;i<newItems.length;i++){
        items += `<div>
                    <p> Item ${i+1}: </p>
                    <p> Item Category:${newItems[i].Cat}</p>
                    <p> Name:${newItems[i].name}</p>
                    <p> Price:${newItems[i].price}</p>
                    <p> Description:${newItems[i].description}</p>
                    <br>`
                    
    }
    items += `</div>`
    document.getElementById("newItems").innerHTML = items;
}

function sendChanges(){
    let xhttp = new XMLHttpRequest();
    let payload = {
                    "newCats": newCategories,
                    "newItems": newItems,
                    "name": document.getElementById("name").value,
                    "deliveryFee": document.getElementById("deliveryFee").value,
                    "minOrder": document.getElementById("minOrder").value}
    let url = `/restaurants/${restaurantID}`;
    xhttp.onreadystatechange = function() {
		if(xhttp.readyState==4 && xhttp.status==200){
			alert("Successfully Updated restaurant");
			window.location.replace("http://localhost:3000"+url);
		}
	}
	
	//Send a POST request to the server containing the recipe data
	xhttp.open("PUT", url,true);
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(payload));
}