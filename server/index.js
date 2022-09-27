const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "eventza",
  });
  
  app.get("/", (req, res) => {
    res.send("hi");
  });
  
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  
  app.post("/adminlogin", (req, res) => {
    const adminid = req.body.adminid;
    const password = req.body.password;
  
    const sqlauth = "SELECT * FROM admin WHERE adminid=? AND adpass=?";
  
    db.query(
      sqlauth,
      [adminid, password],
      (err, result) => {
        console.log(result);
        if (err) {
          res.send({ err: err });
        }
        if (result.length>0) {
          res.send(result);
        } else {
          res.send({ message: "Incorrect username or password" });
        }
      }
    );
  });

  
  app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username)
    const sqlauth = "SELECT * FROM users WHERE uname=? AND pass=?";
  
    db.query(
      sqlauth,
      [username, password],
      (err, result) => {
        console.log(result);
        if (err) {
          res.send({ err: err });
        }
        if (result.length>0) {
          res.send(result);
        } else {
          res.send({ message: "Incorrect username or password" });
        }
      }
    );
  });


  app.get("/api/event/:id", (req, res) => {
    adminid = req.params.id;
    const sqlSelect = "SELECT eventdetails.*, admin.adminname FROM eventdetails inner join admin on admin.adminid=eventdetails.adminid WHERE eventdetails.adminid=?;"
    db.query(sqlSelect,[adminid], (err, result) => {
      res.send(result);
    });
  });

  app.post("/api/addevent", (req, res) => {
    const eventname = req.body.eventname;
    const eventtype = req.body.eventtype;
    const eventdate = req.body.eventdate;
    const eventtime = req.body.eventtime;
    const eventstatus = req.body.eventstatus;
    const reglink = req.body.reglink;
    const adminid = req.body.adminid;
  
  
    const sqlInsert =
      "INSERT into eventdetails(adminid, eventname, eventtype, eventdate, eventtime, eventstatus, reglink) values (?,?,?,?,?,?,?)";
    db.query(sqlInsert, [adminid, eventname, eventtype, eventdate, eventtime, eventstatus, reglink], (err, result) => {
      console.log(err);
    });
  });

  app.post("/api/adduser", (req, res) => {
    const uname = req.body.uname;
    const email = req.body.email;
    const pass = req.body.pass;
  
    const sqlInsert =
      "INSERT into users(uname, email, pass) values (?,?,?)";
    db.query(sqlInsert, [uname,email,pass], (err, result) => {
      console.log(err);
    });
  });

  app.post("/api/deleteevent/:id", (req, res) => {
    const eventid  = req.params.id;

    console.log(eventid)
    const sqlDelete ="DELETE FROM eventdetails WHERE eventid=?";
    db.query(sqlDelete, [eventid], (err, result)=>{
      console.log(err)
    })
  })

  app.get("/api/showevent/:id", (req, res) => {
    eventid = req.params.id;
    const sqlSelect = "SELECT * FROM eventdetails  WHERE eventid=?;"
    db.query(sqlSelect,[eventid], (err, result) => {
      res.send(result);
    });
  });

  app.get("/api/events", (req, res) => {
    const sqlSelect = "SELECT * FROM eventdetails;"
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  });

  app.get("/api/csi", (req, res) => {
    const adminid = "csi";
    const sqlSelect = "SELECT * FROM eventdetails  WHERE adminid=?;"
    db.query(sqlSelect,[adminid], (err, result) => {
      res.send(result);
    });
  });
  app.get("/api/ieee", (req, res) => {
    const adminid = "ieee";
    const sqlSelect = "SELECT * FROM eventdetails  WHERE adminid=?;"
    db.query(sqlSelect,[adminid], (err, result) => {
      res.send(result);
    });
  });
  app.get("/api/iste", (req, res) => {
    const adminid = "iste";
    const sqlSelect = "SELECT * FROM eventdetails  WHERE adminid=?;"
    db.query(sqlSelect,[adminid], (err, result) => {
      res.send(result);
    });
  });
  app.get("/api/asme", (req, res) => {
    const adminid = "asme";
    const sqlSelect = "SELECT * FROM eventdetails  WHERE adminid=?;"
    db.query(sqlSelect,[adminid], (err, result) => {
      res.send(result);
    });
  });
  app.get("/api/igs", (req, res) => {
    const adminid = "igs";
    const sqlSelect = "SELECT * FROM eventdetails  WHERE adminid=?;"
    db.query(sqlSelect,[adminid], (err, result) => {
      res.send(result);
    });
  });
  app.get("/api/ici", (req, res) => {
    const adminid = "ici";
    const sqlSelect = "SELECT * FROM eventdetails  WHERE adminid=?;"
    db.query(sqlSelect,[adminid], (err, result) => {
      res.send(result);
    });
  });
  app.get("/api/iedc", (req, res) => {
    const adminid = "iedc";
    const sqlSelect = "SELECT * FROM eventdetails  WHERE adminid=?;"
    db.query(sqlSelect,[adminid], (err, result) => {
      res.send(result);
    });
  });

  app.get("/api/ieee", (req, res) => {
    const adminid = "ieee";
    const sqlSelect = "SELECT * FROM eventdetails  WHERE adminid=?;"
    db.query(sqlSelect,[adminid], (err, result) => {
      res.send(result);
    });
  });

  app.get("/fullevent", (req, res) => {
    const sqlSelect = "SELECT * FROM eventdetails;"
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  });

  app.get("/eventdate", (req, res) => {
    const sqlSelect = "SELECT adminid, eventdate FROM eventdetails;"
    db.query(sqlSelect, (err, result) => {
      res.send(result);
    });
  });

  app.post("/api/updatevent", (req, res) => {
    const eventname = req.body.eventname;
    const eventtype = req.body.eventtype;
    const eventdate = req.body.eventdate;
    const eventtime = req.body.eventtime;
    const eventstatus = req.body.eventstatus;
    const reglink = req.body.reglink;
    const eventid = req.body.eventid;
  
  
    const sqlUpdateschool =
      "UPDATE eventdetails SET eventname = ? ,eventtype = ?,eventdate = ?, eventtime = ?, eventstatus = ? , reglink=? WHERE eventid = ?;";
    db.query(sqlUpdateschool, [eventname,eventtype,eventdate, eventtime, eventstatus, reglink, eventid], (err, result) => {
      console.log(err);
    });
  });
  

  app.listen(5000, () => {
    console.log("Running");
  });
  