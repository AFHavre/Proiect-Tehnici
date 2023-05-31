var destinatii = document.getElementById("destinatii");

destinatii.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const hotel = document.getElementById("hotel").value;
	const desc = document.getElementById("desc").value;

    let newDest={
        nume: name,
        hotel: hotel,
        description: desc
    };
    fetch("http://localhost:3000/destinations", 
    {method: 'post', 
     headers: 
     {
         'Content-Type' : 'application/json'
     },
     body:  JSON.stringify(newDest)
    }).then(function(response){
        console.log(response.text()); 
        if( response.status == 200) { 
            alert('user valid');
        }
        if( response.status == 450) {
            alert('user invalid');
        }
        if( response.status != 200 && response.status != 450) {
            alert(`response error : ${response.status}`);
        }
        window.location.reload()
    });
});