const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')
//id generator
const {v4: uuidv4} = require('uuid')
//hashpass
const bcrypt = require('bcrypt')
//token signup
const jwt = require('jsonwebtoken')


app.use(cors());
app.use(express.json());



//get alltodos
app.get('/todos/:userEmail', async (req,res) => {
    
    const {userEmail} = req.params;
    //console.log(userEmail);

    try{
       const todos =  await pool.query('SELECT * from todos where user_email = $1', [userEmail]);
       res.json(todos.rows);
    }catch (err) {
        console.error(error)
    };
});

//createnewTodo
app.post('/todos', async (req,res) => {
    const {user_email, title, progress, date} = req.body;
    
    const id = uuidv4();
    console.log(id, user_email, title, progress, date);
    try{
        const newTodo = await pool.query(`insert into todos(id, user_email,title, progress, date) values ($1, $2, $3, $4, $5)`,
        [id, user_email, title,progress, date]);
        res.json(newTodo);
    }catch (err){
        
            console.log(err);
        
    }
})

//editTodo
app.put(`/todos/:id`, async (req,res) => {
    const {id} = req.params;
    const {user_email, title, progress, date} = req.body;
    
    //const id = uuidv4();
    console.log(id, user_email, title, progress, date);
    try{
        const editTodo = await pool.query(`update todos set user_email = $1, title = $2, progress =$3, date = $4 where id=$5;`,
        [ user_email, title,progress, date, id]);
        res.json(editTodo);
    }catch (err){
        
            console.log(err);
        
    }
})

//deleteTodo
app.delete(`/todos/:id`, async (req,res) => {
    const {id} = req.params;       
    try{
        const deleteTodo = await pool.query(`delete from todos where id=$1;`,
        [ id]);
        res.json(deleteTodo);
    }catch (err){      
         console.log(err);
        }
})

//signup
app.post('/signup', async (req,res) => {
    const {email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    try{
        const signup = await pool.query(`insert into users (email, hashed_password) values ($1 , $2)`,
        [email, hashedPassword]);

        const token = jwt.sign({email}, 'secret', {expiresIn:'1hr'});

        res.json({ email, token});

    }catch (err){
        console.log(err);
    }
})

//login
app.post('/login', async (req,res) => {
    const {email, password} = req.body;
    try{
        const users = await pool.query('select * from users where email = $1', [email]);
        
        if (!users.rows.length) return res.json({detail: 'User not existanto'});

        const success = await bcrypt.compare(password, users.rows[0].hashed_password);
        const token = jwt.sign({email}, 'secret', {expiresIn:'1hr'});

        if(success){
            res.json({'email' : users.rows[0].email, token})
            
        }else{
            res.json({detail: "login failed"});
        }
    }catch (err){
        console.log(err);
    }
})


app.listen(PORT, ()=> console.log(`server frci no porte ${PORT}`));