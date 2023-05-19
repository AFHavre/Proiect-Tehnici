function fetchDest() {
    const p = document.createElement("p");
	p.innerText = "nu m-am conectat la json...";
	p.setAttribute("id","loading");
	document.body.appendChild(p);
	const content = document.getElementById("content");
	
	fetch("http://localhost:3000/destinations", {method: 'get'})
	.then((response)=>{
		response.json()
		.then((data)=>{
            if (data.length) {
				document.body.removeChild(p);
			}
            for (let i = 0; i<data.length; i++) {
                const br = document.createElement("br");

                const nume = document.createElement("h2");
				nume.innerText=data[i].name;
				content.appendChild(nume);

                const hotel = document.createElement("hotel");
				hotel.innerText=data[i].hotel;
				content.appendChild(hotel);

                content.appendChild(br);

				const desc = document.createElement("desc");
				desc.innerText=data[i].description;
				content.appendChild(desc);
				
				const button = document.createElement("button");
				button.innerText = "Edit";
				button.onclick = function() {
					editDest(data[i].id)
				}
				
				content.appendChild(button);
				
				const buttonDel = document.createElement("button");
				buttonDel.innerText = "Delete";
				buttonDel.onclick = function() {
					deleteDest(data[i].id);
				}
				
				content.appendChild(buttonDel);

				const divider = document.createElement("hr");
				content.appendChild(divider);
			}
		})
	});
	
}

function addDest() {
	const name = document.getElementById("name").value;
    const hotel = document.getElementById("hotel").value;
	const desc = document.getElementById("desc").value;


	if (!name || !desc || !hotel) {
		alert("Invalid data!");
	    return;
	}
	const newDest = { name: name, hotel: hotel, description: desc };
	
	fetch("http://localhost:3000/destinations", 
		  {method: 'post', 
		   headers: 
		   {
			   'Content-Type' : 'application/json'
		   },
		   body: JSON.stringify(newDest)
		  }).then(function(response)
				  {
					console.log(response); window.location.reload();}
				  );
}


function editDest(id) {
	const name = document.getElementById("name").value;
    const hotel = document.getElementById("hotel").value;
	const desc = document.getElementById("desc").value;


	if (!name || !desc || !hotel) {
		alert("Invalid data!");
	    return;
	}
	const newDest = { name: name, hotel: hotel, description: desc };

	fetch("http://localhost:3000/destinations/"+id, 
		  {method: 'put', 
		   headers: 
		   {
			   'Content-Type' : 'application/json'
		   },
		   body: JSON.stringify(newDest)
		  }).then(function(response)
				  {
					console.log(response); window.location.reload();}
				  );
	
}

function deleteDest(id) {
	fetch("http://localhost:3000/destinations/"+id, 
		  {method: 'delete', 
		  }).then(function(response)
				  {
					console.log(response); window.location.reload();}
				  );
}

// function(arg){}  este ac lucru cu (arg)=>{}
fetchDest();