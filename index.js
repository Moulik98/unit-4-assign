    const express = require("express")
    const mongoose = require("mongoose")
    const app = express()
    app.use(express.json())
    const connect = ()=>{
        return mongoose.connect("mongodb://127.0.0.1:27017/lib")
    }
    const userSchema = new mongoose.Schema({
        firstName : {type:String,required:true},
        lastName : {type:String,required:false}
    }
    ,
    {
        timestamps:true,
        versionKey:false
    })
    const User = mongoose.model("user",userSchema)
    const bookSchema = new mongoose.Schema({
        Name : {type:String,required:true},
        body : {type:String,required:false},
        sectionId : {type:mongoose.Schema.Types.ObjectId,
            ref:"section",
            required:true},
    },
    {
        timestamps:true,
        versionKey:false
    })
    const Book = mongoose.model("book",bookSchema)
    const sectionSchema = new mongoose.Schema({
    Name : {type:String,required:true},
    },
    {
        timestamps:true,
        versionKey:false
    })
    const Section = mongoose.model("section",sectionSchema)
    const authorSchema = new mongoose.Schema({
        userId : {type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true},
        authorName: {type:String,require:true}
    }
    ,
    {
        timestamps:true,
        versionKey:false
    })
    const Author = mongoose.model("author",authorSchema)
    const bookAuthor = new mongoose.Schema({
        bookId : {type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true},
        authorId : {type:mongoose.Schema.Types.ObjectId,
            ref:"author",
            required:true}
    }
    ,
    {
        timestamps:true,
        versionKey:false
    })
    const BookAuthor = mongoose.model("bookAuthor",bookAuthor)
    const booksection = new mongoose.Schema({
        bookId : {type:mongoose.Schema.Types.ObjectId,
        ref:"book",
        required:true},
        sectionId : {type:mongoose.Schema.Types.ObjectId,
            ref:"section",
            required:true}
    }
    ,
    {
        timestamps:true,
        versionKey:false
    })
    const Booksection = mongoose.model("booksection",booksection)
    // crud section
    app.get("/section",async(req,res)=>
    {
        try{
            const section = await Section.find().lean().exec()
            return res.status(200).send(section)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.post("/section",async(req,res)=>
    {
        try{
            const section = await Section.create(req.body)
            return res.status(201).send(section)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.get("/user",async(req,res)=>
    {
        try{
            const user = await User.find().lean().exec()
            return res.status(200).send(user)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.post("/user",async(req,res)=>
    {
        try{
            const user = await User.create(req.body)
            return res.status(201).send(user)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.delete("/section/:id",async(req,res)=>
    {
        try{
            const section = await Section.findByIdAndDelete(req.params.id).lean().exec()
            return res.status(200).send(section)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.post("/book",async(req,res)=>
    {
        try{
            const book = await Book.create(req.body)
            return res.status(201).send(book)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.get("/book",async(req,res)=>
    {
        try{
            const book = await Book.find().lean().exec()
            return res.status(200).send(book)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.post("/author",async(req,res)=>
    {
        try{
            const author = await Author.create(req.body)
            return res.status(201).send(author)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.get("/author",async(req,res)=>
    {
        try{
            const author = await Author.find().lean().exec()
            return res.status(200).send(author)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.post("/bookauthor",async(req,res)=>
    {
        try{
            const bookauthor = await BookAuthor.create(req.body)
            return res.status(201).send(bookauthor)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.get("/bookauthor",async(req,res)=>
    {
        try{
            const bookauthor = await BookAuthor.find().populate({path:"bookId",select:["Name"]}).populate({path:"authorId",select:["authorName"]}).lean().exec()
            return res.status(200).send(bookauthor)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.get("/booksection",async(req,res)=>
    {
        try{
            const booksection = await Booksection.find().populate({path:"bookId",select:["Name"]}).populate({path:"sectionId",select:["Name"]}).lean().exec()
            return res.status(200).send(booksection)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.patch("/bookauthor/:id",async(req,res)=>
    {
        try{
            const bookauthor = await BookAuthor.findByIdAndUpdate(req.params.id,req.body,{new:true})
            return res.status(201).send(bookauthor)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.post("/booksection",async(req,res)=>
    {
        try{
            const booksection = await Booksection.create(req.body)
            return res.status(201).send(booksection)
        }
        catch(err)
        {
            return res.status(500).send(err.message)
        }
    })
    app.listen(4000, async()=>
    {
    try{
                await connect()
            
    }
    catch(err){
        console.log(err)
    }
    console.log("listen to the port 4000")
    })