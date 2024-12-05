// Importation des modules nécessaires
const express =require("express"); // Framework pour créer un serveur we
const mongoose=require("mongoose");// Bibliothèque pour interagir avec MongoDB

// Définition du port d'écoute du serveur
const Port=process.env.Port|| 5000;// Utilise la variable d'environnement ou le port 5000 par défaut

// Création d'une instance de l'application Express
const app=express();

// Connectez-vous à MongoDB nide via Mongoose
mongoose.connect('mongodb+srv://BlogUser:123456789%23@cluster0.gu7on.mongodb.net/myapp?retryWrites=true&w=majority',{

});

// Obtenez une référence à la connexion
const connection = mongoose.connection;

// Gestionnaire d'événement : Quand la connexion à MongoDB est établie
connection.once("open" , ()=>{
    console.log("MongoDB connected"); // Confirmation de la connexion réussie
});
//Quand une erreur se produit avec MongoDB
connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});



// Middleware pour parser les requêtes JSON
app.use(express.json());



// Utilisation des routes pour les utilisateurs
const userRoute =require("./routes/user");
app.use("/user",userRoute);





// Définition d'une route pour l'API
app.route("/").get((req,res)=>res.json("Hello World !"));// Renvoie un message JSON à la racine


// Démarrage du serveur sur le port défini
app.listen(Port,()=>console.log(`your server is running on port ${Port}`));// Message de confirmation