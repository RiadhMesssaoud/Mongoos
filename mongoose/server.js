const mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://iyed:12345@cluster0.hvotr.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//schema

const personSchema = new mongoose.Schema({
    name : {type :String,
    required:[true, 'Please check your data entry, no name specified!']},
    age : Number,
    favoriteFoods : [{type: String}]
})

//Creating the Document

const Person = mongoose.model("Person", personSchema)


const person = new Person ({
  name : 'zak',
  age : 27,
  favoriteFoods : ['HAmburger', 'Rice', 'Paella', 'Tacos']  
})

//Saving document with calback function

person.save(function(err, data){
if(err) {
    console.log(err);
} else {
    console.log(data);
}
})

//Passing data in the arrayOfPeople database

const arrayOfPeople=[
    {name: "sergy" , age: 36 , favoriteFoods: ["Hamburger", "Chiken", "Fish"]} ,
    {name: "Alok" , age: 35 , favoriteFoods: ["Salad", "Pizza", "Meat"]} ,
    {name: "sara" , age: 33 , favoriteFoods: ["Spaghetti", "Rice", "Burrito"]} ,
    {name: "hassen" , age: 50 , favoriteFoods: ["Cake", "Burrito", "Rice"]} ,
    {name: "sawssen" , age: 18 , favoriteFoods: ["Cake", "Choclate", "Chips"]} ,
    {name: "Amira" , age: 19 , favoriteFoods: ["Hamburger", "Burrito", "Meat"]}]

//adding the data in mongodb

    const createManyPeople = (arrayOfPeople, done) => {
        Person.create(arrayOfPeople, (err, data) => {
          if (err) return done(err);
          return done(null, data);
        });
      };
      createManyPeople()

      
// Searching person with specific name Alok and shows his data

Person.find({name: "Alok"}, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log('the first person found with name Alok' + data)
    }
} )

//Finding person who likes a specific food "example: Cake, Burrito and Rice"

Person.findOne({favoriteFoods: [ "Cake", "Burrito", "Rice"]}, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log('The first person Who likes Cake,Burrito and Rice is' + data)
    }
} )

//Searching person by a specific given id 5f7dff68cffe3d4a3c0f7a58

Person.findById("5f7dff68cffe3d4a3c0f7a58", (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        console.log('the  person With the id 5f7dff68cffe3d4a3c0f7a58' + data)
    }
})

//Searching person by a specific given id 5f7dff68cffe3d4a3c0f7a58 and edit and save his favoriteFoods "example: add "Cheese""

Person.findById("5f7dff68cffe3d4a3c0f7a58", (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        data.favoriteFoods.push("Cheese")
        data.save()
        console.log('The person With the id 5f7dff68cffe3d4a3c0f7a58 has been updated' + data)
    }
})

// Finding a person with a specific name "exemple: Alok" and updating his age to 20

Person.findOneAndUpdate({name:'Alok'}, {age: 24}, { new: true }, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        
        console.log('the  person With the name Alok and setting his age to 24' + data)
    }
})


// finding a person with a specific id exp 5f7dff68cffe3d4a3c0f7a58 and deleting it

Person.findByIdAndRemove("5f7dff68cffe3d4a3c0f7a58", (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        
        console.log('the  person With the id 5f7dff68cffe3d4a3c0f7a58 and deleting it' + data)
    }
})

//Deleting all persons with the name "sara"

Person.deleteMany({name: 'sara'}, (err, data)=>{
    if (err) {
        console.log(err);
    } else {
        
        done(null, data)
    }
})

//Find people who like Burrito. Sort them by name, limit the results to two documents, and hide their age

Person.find({favoriteFoods: { $all : ["Burrito"]}}).sort({'name':1}).limit(2).select('name favoriteFoods').exec((error,data)=>{
    if (error){console.log(error)}
    else {
      console.log("Two People  like burrito "+data); }})