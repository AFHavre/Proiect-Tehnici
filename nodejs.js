const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid");
const fs = require("fs");
const { request } = require("http");
const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.post("/login", (req,res)=>{
  const credentials=req.body;
  const users= readJSONFile('users');
  let flag=false;
  users.forEach( (user)=> 
  {
    console.log(user.id);
    if(user.id===credentials.id && user.password===credentials.password){
      flag=true;
    }
  });
  if(flag){
    res.status(200).send("Found");
  }
  else{
    res.status(450).send("ERROR");
  }
})

app.post("/destinations", (req, res) => {
  const destList = readJSONFile('destinations');
  const newDest = req.body;
  newDest.id = uuid.v4.apply();
  destList.push(newDest);
  writeJSONFile(destList, null);
  res.status(200).send(newDest);
  return;
});

app.get("/destinations", (req, res) => {
  const destList = readJSONFile('destinations');
  if(destList != undefined && destList.length != 0) {
    res.status(200).send(destList);
  } else {
    res.status(204).send('No destinations found!');
  }
  return;
});

app.put("/destinations/:id", (req, res) => {
  const destList = readJSONFile('destinations');
  const id = req.params.id;
  const update = req.body;
  let destToUpdate = null;
  for (let i = 0; i < destList.length; i++) {
    if (destList[i].id === id) {
        if (update.name) {
            destList[i].name = update.name;
        }
        
        if (update.hotel) {
            destList[i].hotel = update.hotel;
        }

        if (update.hotdescriptionel) {
          destList[i].description = update.description;
        }

        destToUpdate = destList[i];
        break;
    }
  }
  writeJSONFile(destToUpdate, null);
  if (destToUpdate === null) {
    res.status(204).send('No destination found!')
  } else {
    res.status(200).send(destToUpdate);
  }
});

app.delete("/destinations/:id", (req, res) => {
  const destList = readJSONFile('destinations');
  const id = req.params.id;
  let check = false;
  for(let i = 0; i < destList.length; i++) {
    if(destList[i].id == id) {
        check = true;
        destList.splice(i, 1);
        break;
    }
  }
  writeJSONFile(destList, null);
  if (check === true) {
    res.status(200).send('Destination deleted!');
  } else {
    res.status(204).send('No destination found!');
  }
});

function readJSONFile(obj, all) {
  if (all) {
    return JSON.parse(fs.readFileSync("./dest.json"));
  } else {
    return JSON.parse(fs.readFileSync("./dest.json"))[obj];
  }
  
}

function writeJSONFile(destinations, users) {
  const content = readJSONFile(null, true);
  if (destinations) {
    content.destinations = destinations
  } else if(users) {
    content.users = users;
  }
  fs.writeFileSync(
    "./dest.json",
    JSON.stringify(content, null, 4),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// app.post('/register', (req, res) => {
//   const newUser = req.body;
//   const users = readJSONFile('users');
//   let flag = false;
//   for(let i = 0; i < users.length;i ++) {
//     if(users[i].email === newUser.email) {
//       flag = true;
//       break;
//     }
//   }
//   if(flag) {
//     res.status(400).send("User already exists!");
//   } else {
//     users.push(newUser);
//     writeJSONFile(null, users);
//     res.status(200).send("User added!");
//   }
// })

app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);