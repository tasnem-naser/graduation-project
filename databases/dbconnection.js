import mongoose from "mongoose"

export const dbConnection = () => {
    mongoose.connect("mongodb+srv://admin:Rq9K2Hqnlw6HzBLI@cluster0.5mhmytf.mongodb.net/robbikya").then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('databases error', err);
    })
}



//4KxjXIicF9XOGH1b