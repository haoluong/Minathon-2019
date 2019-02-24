const express = require('express')
const app = express()
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const url = require('url')
const saltRounds = 10

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));


//This function is used to create a connection to
//the local mysql database. 
function connection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'minathon'
    })
}

/*This for login. This request receives 2 params:
- email : string
- password: string
Then it check email in the database. 
- If email existed, check the password.
    - If the password is the same with it in database, return http status 200
    - Else return http status 401 Unauthorized
- If it does not return http status 404
Password is encrypted before comparing.
*/
app.post("/login", (req, res) => {
    //Get all params
    let sdt = req.body.sdt
    let password = req.body.password

    //This query for checking the exitstence of the email
    const queryString = "SELECT * FROM users WHERE sdt = " + sdt;
    console.log('inside login')
    //Connection to the database for checking
    connection().query(queryString, (err, rows, fields) => {
        //This error
        if (err) {
            console.log("Failed to query for users: " + err.message)
            return
        }
        // If the rows.length = 1,so the email exists in the database
        if (rows.length == 1) {
            let result = Object.values(JSON.parse(JSON.stringify(rows)))
            // Check password
            if (bcrypt.compareSync(password, result[0]['PASSWORD'])) {
                
                //Login ok
                //Return the list of subcribe
                return res.json({
                    permission: result[0]['PERMISSION'],
                    id: result[0]['CMND']
                })
            }
            //Login fail. Error password
            res.sendStatus(401)
            console.log("Password failed")
            return
        }
        else {
            //The email does not exist in the database
            console.log('lllll')
            res.status(404).send('Email not found');
            return
        }
    })
})


/*This for logout. When the user logout this will be call.
The input param is email.
*/

app.post("/logout", (req, res) => {
    //Get mail
    var email = req.body.email

    //Use to check the existence of the user email
    const queryString = "SELECT * FROM users WHERE email = ?";

    //This connection to check the existence of the user email
    connection().query(queryString, [email], (err, rows, fields) => {
        //Error when the queryString is fail
        if (err) {
            console.log("Failed to query for users: " + err.message)
            return
        }
        //If the result has one line. So that email was existed
        if (rows.length == 1) {
            const updateQuery = "UPDATE users SET lastlogout =? WHERE email = ?";
            //Connection for update
            connection().query(updateQuery, [new Date(), email], (err, rows, fields) => {
                //Check if the query was failed
                if (err) {
                    console.log("Failed to query for users: " + err.message)
                    res.sendStatus(404)
                    return
                }
                console.log("Update lastlogin successfully.")
                res.sendStatus(200)
                return
            })
        }
        else {
            res.sendStatus(404)
            console.log("Check email failed")
            return
        }
    })
})

/*This for register. This request receives 7 params:
- email : string
- password : string
- username : string
- isheat : boolean (true or false)
- islight : boolean (true or false)
- ishumid : boolean (true or false)
- ishumidsoil : boolean (true or false)
Then it check email in the database. 
- If email existed, return http status 404
- If it does not, insert to the database and return http status 200
Password is encrypted before saving to the database.
*/
app.post("/register", (req, res) => {
    //Get all params
    let ho_ten = req.body.ho_ten
    let nam_sinh = req.body.nam_sinh
    let gioi_tinh = req.body.gioi_tinh
    let email = req.body.email
    let sdt = req.body.sdt
    let cmnd = req.body.cmnd
    let dia_chi = req.body.dia_chi
    let permission = 0
    let point = 0
    let password = req.body.password

    //Encrypt password
    var encryptedPassword = bcrypt.hashSync(password, saltRounds)

    //Use to check the existence of the user email
    const queryString = "SELECT * FROM users WHERE cmnd = " + cmnd;

    //This connection to check the existence of the user email
    connection().query(queryString, (err, rows, fields) => {
        //Error when the queryString is fail
        if (err) {
            console.log("Failed to query for users: " + err.message)
            return
        }
        
        //If the result has one line. So that email was existed
        if (rows.length == 1) {
            res.sendStatus(404)
            console.log("Email existed.")
            return
        }
        else {
            //This query for inserting the user info.
            const queryString = "insert into users(ho_ten,nam_sinh,gioi_tinh,email,sdt,password,cmnd,dia_chi,permission,point) values(?,?,?,?,?,?,?,?,?,?)";

            //This connection for inserting the user info
            connection().query(queryString, [ho_ten,nam_sinh,gioi_tinh,email,sdt, encryptedPassword,cmnd,dia_chi,permission,point], (err, rows, fields) => {
                //Check if the query was failed
                if (err) {
                    console.log("Failed to query for users: " + err.message)
                    return
                }
                //Insert successful. Return http response ok
                res.sendStatus(200)
                console.log("Insert successfulley")
                return
            })
        }
    })
})


/*This will get the information of an email. This will return
- email
- isheat
- ishumid
- islight
- ishumidsoil
with the same order
*/
//An error here

app.get("/current_login", (req, res) => {
    //This query for getting information
    const queryString = `SELECT email FROM users `;

    //This connection for inserting the user info
    connection().query(queryString, [], (err, rows, fields) => {
        //Check if the query was failed
        if (err) {
            console.log("Failed to query for users: " + err.message)
            return []
        }
        //Check the information
        if (rows.length > 0) {
            //The email exits, return the result
            //Map for get some of the result information
            const returnValue = rows.map((row) => {
                return {
                    email: row.email,
                    username: row.username,
                    isheat: row.isheat,
                    ishumid: row.ishumid,
                    islight: row.islight,
                    ishumidsoil: row.ishumidsoil
                }
            })
            console.log(returnValue)
            console.log("Get list current login successfully")
            res.json(returnValue[0])
            return
        }
        console.log("No current login here.")
        res.sendStatus(404)
        return
    })
})

/*This will update the subcribe of the email
*/
app.post("/update", (req, res) => {
    //Get all params
    var email = req.body.email
    var isheat = req.body.isheat ? 1 : 0
    var ishumid = req.body.ishumid ? 1 : 0
    var islight = req.body.islight ? 1 : 0
    var ishumidsoil = req.body.ishumidsoil ? 1 : 0

    //This query for getting information
    const queryString = "SELECT * FROM users WHERE email = ?";

    //This connection for inserting the user info
    connection().query(queryString, [email], (err, rows, fields) => {
        //Check if the query was failed
        if (err) {
            console.log("Failed to query for users: " + err.message)
            return
        }
        //Check the information
        if (rows.length == 1) {
            //The email exits, return the result
            const updateQuery = "UPDATE users SET isheat =?, ishumid =?, islight=?, ishumidsoil=? WHERE email = ?";
            //Connection for update
            connection().query(updateQuery, [isheat, ishumid, islight, ishumidsoil, email], (err, rows, fields) => {
                //Check if the query was failed
                if (err) {
                    console.log("Failed to query for users: " + err.message)
                    return
                }
                console.log("Update successfully.")

                const returnValueQuery = "select * from users where email = ?";
                connection().query(returnValueQuery, [email], (err, rows, fields) => {
                    if (err) {
                        console.log("Error query: " + err.message)
                        res.sendStatus(404)
                        return
                    }
                    const returnValue = rows.map((row) => {
                        return {
                            email: row.email,
                            username: row.username,
                            isheat: row.isheat,
                            ishumid: row.ishumid,
                            islight: row.islight,
                            ishumidsoil: row.ishumidsoil
                        }
                    })
                    res.json(returnValue)
                    return
                })
            })
        }
        else {
            //Email does not exist. Return http status 404
            res.sendStatus(404)
            console.log("Update information fail.")
            return
        }
    })
})

// FOR SELLER
app.post("/sells", (req, res) => {
    //Get all params
    let ten_hh = req.body.ten_hh
    let ngay_tao = new Date()
    let status = "Chua Nhan"
    let owner = req.body.owner
    let type = req.body.type
    let cmnd_receiver = null
    let first_time = null
    let mshh = 2
    let count = "SELECT COUNT(*) FROM goods" 
    connection().query(count, (err, rows, fields)=>{
        if (err) {
            console.log("Failed to query for goods: " + err.message)
            return
        }
        let result = Object.values(JSON.parse(JSON.stringify(rows)))
        mshh = result[0]['COUNT(*)'] + 1
        //This query for getting information
        const queryString = "insert into goods(mshh,ten_hh,ngay_tao,status,owner,type,cmnd_receiver,first_time) values(?,?,?,?,?,?,?,?)";

        //This connection for inserting the user info
        connection().query(queryString, [mshh,ten_hh,ngay_tao,status,owner,type,cmnd_receiver,first_time], (err, rows, fields) => {
            //Check if the query was failed
            if (err) {
                console.log("Failed to query for goods: " + err.message)
                return
            }
            //Check the information
            res.sendStatus(200)
            console.log("Insert successfulley")
            return
        })
    })
    
})

//FOR RECEIVER
//Function for set time out
function sellingNow(mshh,owner){
    let query = 'UPDATE goods SET status = "Da Nhan" WHERE mshh = ' + mshh
    connection().query(query, (err, rows, fields) => {
        if (err){
            console.log("Failed to update status for goods: " + err.message)
            return
        }
        console.log("Update status goods successful")
        let increaseQuery = 'UPDATE users SET point = point + 1 WHERE cmnd = ' + owner
        connection().query(increaseQuery, (err, rows, fields)=>{
            if (err){
                console.log("Failed to update point for users: " + err.message)
                return
            }
            console.log("Update point users successful")
        })
        return
    }) 
}
app.post("/receives", (req, res) => {
    //Get all params
    let mshh = req.body.mshh
    let first_time = new Date()
    let cmnd_receiver = req.body.cmnd_receiver
    let query = 'SELECT first_time,cmnd_receiver,owner FROM goods WHERE status = "Chua Nhan" AND mshh = ' + mshh 
    connection().query(query, (err, rows, fields)=>{
        if (err) {
            console.log("Failed to query for goods: " + err.message)
            return
        }
        if (rows.length === 1){
            let result = Object.values(JSON.parse(JSON.stringify(rows)))
            if (result[0]['first_time'] !== null) {
                let priorityQuery = "SELECT priority FROM users WHERE cmnd = " + result[0]['cmnd_receiver']
                connection().query(priorityQuery, (err, getPriRow, fields) => {
                    if (err) {
                        console.log("Failed to get priority: " + err.message)
                        return
                    }
                    let oldPriority = Object.values(JSON.parse(JSON.stringify(getPriRow)))
                    let priorityNewQuery = "SELECT priority FROM users WHERE cmnd = " + cmnd_receiver
                    connection().query(priorityNewQuery, (err, getNewPriRow, fields) => {
                        if (err) {
                            console.log("Failed to get new priority: " + err.message)
                            return
                        }
                        let newPriority = Object.values(JSON.parse(JSON.stringify(getNewPriRow)))
                        if (newPriority[0]['priority'] > oldPriority[0]['priority']){
                            let updatePriority = "UPDATE goods SET cmnd_receiver =? WHERE mshh = " + mshh
                            connection().query(updatePriority, [cmnd_receiver], (err, rows, fields) => {
                                if (err) {
                                    console.log("Failed to update priority: " + err.message)
                                    return
                                }
                                res.sendStatus(200)
                                console.log("Update priority successfull")
                                return
                            })
                        }
                        res.sendStatus(200)
                        return
                    })
                })
            }else {
                let updateQuery = "UPDATE goods SET first_time = ?, cmnd_receiver = ? WHERE mshh = " + mshh
                
                connection().query(updateQuery, [first_time, cmnd_receiver], (err, updateRow, fields) => {
                    
                    if (err) {
                        console.log("Failed to update for first time: " + err.message)
                        return
                    }
                    setTimeout(function(){
                        sellingNow(mshh,rows[0]['owner'])
                    }, 3000)
                    res.sendStatus(200)
                    console.log("Update first time successfull")
                    return
                })
            }
        }
        else{
            res.sendStatus(404)
        }
    })
})

app.get("/items", (req,res,next)=>{
    let url_part = url.parse(req.url, true);
    let type = url_part.query.type
    let query = 'SELECT * FROM goods WHERE status = "CHUA NHAN"'
    if (type !== '') query += ' AND type =  "'+ type + '"'
    connection().query(query, (err, rows, fields)=> {
        if (err) {
            console.log("Failed to query for list items: " + err.message)
            return
        }
        let result = Object.values(JSON.parse(JSON.stringify(rows)))
        let listItems = []
        result.forEach(element => {
            listItems.push({
                mshh: element['MSHH'],
                ten_hh: element['TEN_HH'],
                ngay_tao: element['NGAY_TAO'],
                status: element['STATUS'],
                owner: element['OWNER'],
                type: element['TYPE'],
                cmnd_receiver: element['CMND_RECEIVER'],
                first_time: element['FIRST_TIME']
            })
        });
        
        return res.json(listItems)
    })
})

//Open the server at the port ... 
//Start server by code: nodemon app.js
app.listen(6969, () => {
    console.log("Server is starting on port 6969...")
})