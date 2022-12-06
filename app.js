const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./src/connection');
const router = express.Router();

const port = 3000;

app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

sequelize.authenticate().then(()=>{
    console.log("Connection to Database established...");
}).catch((error)=>{
    console.error("Unable to connect to database:  ", error);
});
const errHandler = err => {
    console.error("Error :",err);
};
const Result = require('./src/models/Result');


app.use('/', router);
router.get('/', (req,res) => {
    res.render('index');
});

router.get('/teacher', (req,res)=>{
    Result.findAll().then((results)=>{
        // console.log("Results: ", results);
        res.render('teacher', {
            results
        });
    }).catch(err=>(console.log("Error: ", err)));
});

router.get('/add-result', (req,res)=>{
    res.render('addResult');
});

router.get('/results', (req,res)=>{
    Result.findAll().then((results)=>{
        res.status(200).send(results);
    }).catch(err=>(console.log("Error: ", err)));
});


router.post('/add-result', (req, res)=>{

    // console.log(req.body);
    // res.redirect('/teacher');

    let {rollNo, name, dob, marks} = req.body;
    let errors = [];

    if(!rollNo) {
        errors.push({text: "Please add Roll No"});
    }
    if(!name) {
        errors.push({text: "Please add Name"});
    }
    if(!dob) {
        errors.push({text: "Please add Date of Birth"});
    }
    if(!marks) {
        errors.push({text: "Please add Marks"});
    }

    if(errors.length > 0){
        console.log("Errors exist");
    } else {
        Result.create({
            rollNo,
            name,
            dob,
            marks
        }).then(result=>res.redirect('/teacher'))
        .catch(err=>console.log(err));
    }


});

router.get('/edit/:rollNo', (req, res)=>{
    let rollNo = req.params.rollNo;

    Result.findOne({where: {
        rollNo: rollNo
        }
    }).then((result)=>{
        console.log(result.dataValues);

        res.render('editResult', {
            result: result.dataValues
        });
    }).catch((err)=>{
        console.log(err);
        res.redirect('/student');
    });    
})

router.get('/delete/:rollNo', (req, res)=>{
    let rollNo = req.params.rollNo;

    Result.destroy({
        where: {
            rollNo: rollNo
        }
    }).then(result=>res.redirect('/teacher'))
    .catch(err=>console.log(err));

});

router.post('/update-result', (req,res)=>{
    let {rollNo, name, dob, marks} = req.body;
    let errors = [];
    if(!rollNo) {
        errors.push({text: "Please add Roll No"});
    }
    if(!name) {
        errors.push({text: "Please add Name"});
    }
    if(!dob) {
        errors.push({text: "Please add Date of Birth"});
    }
    if(!marks) {
        errors.push({text: "Please add Marks"});
    }

    if(errors.length > 0){
        console.log("Errors exist");
    } else {
        Result.update({
            rollNo,
            name,
            dob,
            marks
        }, {
            where: {
                rollNo: rollNo,
            }
        }).then(result=>res.redirect('/teacher'))
        .catch(err=>console.log(err));
    }

})

router.get('/student', (req,res)=>{
    res.render('student');
});

router.post('/search', (req,res)=>{
    let {rollNo, name} = req.body;
    
    Result.findOne({where: {
        rollNo: rollNo
        }
    }).then((result)=>{
        console.log(result.dataValues);

        res.render('viewResult', {
            result: result.dataValues
        });
    }).catch((err)=>{
        console.log(err);
        res.redirect('/student');
    });
});

router.get('/view-result', (req,res)=>{
    
    res.render('viewResult')
})

app.listen(port, ()=>{
    console.log('Server is running on port 3000');
});