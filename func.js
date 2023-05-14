var descId = "";

function fetchDest() {
	const content = document.getElementById("content");
	
	fetch("http://localhost:3000/destinations", {method: 'get'})
	.then((response)=>{
		response.json()
		.then((data)=>{
            for (let i = 0; i<data.length; i++) {
                const nume = document.createElement("h2");
				nume.innerText=data[i].name;
				content.appendChild(nume);
				const desc = document.createElement("desc");
				desc.innerText=data[i].description;
				content.appendChild(desc);
				
				const button = document.createElement("button");
				button.innerText = "Edit";
				button.onclick = function() {
					document.getElementById("name").innerText = data[i].name;
					document.getElementById("desc").value = data[i].description;
					descId = data[i].id;
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
	const name = document.getElementById("name").innerText;
	const desc = document.getElementById("desc").value;

	if (!name || !desc) {
		alert("Invalid data!");
	    return;
	}
	const newDest = { name: name, description: desc };
	
	
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


function editDest() {
	const name = document.getElementById("name").innerText;
	const desc = document.getElementById("desc").value;
	if (!name || !desc) {
		alert("Invalid data!");
		return;
	}
	const newDest = { name: name, description: desc };

	fetch("http://localhost:3000/destinations/"+descId, 
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