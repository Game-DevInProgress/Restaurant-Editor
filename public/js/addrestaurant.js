function submit(){
    let restaurant = {};
	restaurant["name"] = document.getElementById("restaurantName").value;
	restaurant["delivery_fee"] = parseFloat(document.getElementById("deliveryFee").value).toFixed(2);
	restaurant["min_order"] = parseFloat(document.getElementById("minOrder").value).toFixed(2);
	
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			const response = JSON.parse(this.response);
			let url = `http://localhost:3000/restaurants/${response['id']}`
			window.location.replace(url);
		}
	}
	
	//Send a POST request to the server containing the recipe data
	req.open("POST", `/restaurants`,true);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(restaurant));
}