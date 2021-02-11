//mongodb+srv://123:<password>@cluster-wms.0uh3j.mongodb.net/test
var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var morgan = require("morgan");
var db = require("./config.js");
var cors = require('cors');
var mongoose = require('mongoose');
//const joinQuery = require("mongo-join-query");
var Schema = mongoose.Schema;
//const CircularJSON = require('circular-json');
const Axios = require("axios");
//const db = require("./config.js");
//const { json } = require("express");
//const foliokarvy = require("./route.js");
var app = express();
var port = process.env.port || 3001;
var srcpath = path.join(__dirname, '/public');
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//var getschema = require("../backend/route.js");//ravi line
var newdata="";var newdata1=""; 
var newdata2="";var datacon="";
const navcams = new Schema({
    SchemeCode: { type: String },
    ISINDivPayoutISINGrowth: { type: String },
    ISINDivReinvestment: { type: String },
    SchemeName: { type: String ,required: true},
    NetAssetValue: { type: Number },
    Date: { type: Date },
}, { versionKey: false });


const productdata = new Schema({
    id: { type: String },
    product_master_diffgr_id: { type: String },
    msdata_rowOrder: { type: String },
    AMC_CODE: { type: String },
    PRODUCT_CODE: { type: String },
    PRODUCT_LONG_NAME: { type: String },
    SYSTEMATIC_FREQUENCIES:{ type: String },
    SIP_DATES: { type: String },
    STP_DATES: { type: String },
    SWP_DATES: { type: String },
    PURCHASE_ALLOWED: { type: String },
    SWITCH_ALLOWED: { type: String },
    REDEMPTION_ALLOWED: { type: String },
    SIP_ALLOWED: { type: String },
    STP_ALLOWED: { type: String },
    SWP_ALLOWED: { type: String },
    REINVEST_TAG: { type: String },
    PRODUCT_CATEGORY: { type: String },
    ISIN: { type: String },
    LAST_MODIFIED_DATE: { type: String },
    ACTIVE_FLAG: { type: String },
    ASSET_CLASS: { type: String },
    SUB_FUND_CODE: { type: String },
    PLAN_TYPE: { type: String },
    INSURANCE_ENABLED: { type: String },
    RTACODE: { type: String },
    NFO_ENABLED: { type: String },
    NFO_CLOSE_DATE: { type: String },
    NFO_SIP_EFFECTIVE_DATE: { type: String },
    ALLOW_FREEDOM_SIP: { type: String },
    ALLOW_FREEDOM_SWP: { type: String },
    ALLOW_DONOR: { type: String },
    ALLOW_PAUSE_SIP: { type: String },
    ALLOW_PAUSE_SIP_FREQ: { type: String },
    PAUSE_SIP_MIN_MONTH: { type: String },
    PAUSE_SIP_MAX_MONTH: { type: String },
    PAUSE_SIP_GAP_PERIOD: { type: String },
}, { versionKey: false });

const foliocams = new Schema({
    AMC_CODE: { type: String },
    FOLIOCHK: { type: String },
    INV_NAME: { type: String },
    SCH_NAME: { type: String },
    JNT_NAME1: { type: String },
    JNT_NAME2: { type: String },
    HOLDING_NATURE: { type: String },
    PAN_NO: { type: String },
    JOINT1_PAN: { type: String },
    BANK_NAME: { type: String },
    AC_NO: { type: String },
    NOM_NAME: { type: String },
    NOM2_NAME: { type: String },
    NOM3_NAME: { type: String },
    IFSC_CODE: { type: String },
    PRODUCT: {type: String},
}, { versionKey: false });

const foliokarvyold = new Schema({
    Folio: { type: String },
    City: { type: String },
    Email: { type: String },
    BankAccno: { type: String },
    InvestorName: { type: String },
    PANNumber: { type: String },
}, { versionKey: false });

const foliokarvy = new Schema({
    FUNDDESC: { type: String },
    ACNO: { type: String },
    INVNAME: { type: String },
    JTNAME1: { type: String },
    JTNAME2: { type: String },
    BNKACNO: { type: String },
    BNAME: { type: String },
    PANGNO: { type: String },
    NOMINEE: { type: String },
}, { versionKey: false });

const foliofranklin = new Schema({
    BRANCH_N12: { type: String },
    BANK_CODE: { type: String },
    IFSC_CODE: { type: String },
    NEFT_CODE: { type: String },
    NOMINEE1: { type: String },
    FOLIO_NO: { type: String },
    INV_NAME: { type: String },
    JOINT_NAM1: { type: String },
    ADDRESS1: { type: String },
    BANK_NAME: { type: String },
    ACCNT_NO: { type: String },
    D_BIRTH: { type: String },
    F_NAME: { type: String },
    PHONE_RES: { type: String },
    PANNO1: { type: String },
}, { versionKey: false });

const transcams = new Schema({
    AMC_CODE: { type: String },
    FOLIO_NO: { type: String },
    PRODCODE: { type: String },
    SCHEME: { type: String },
    INV_NAME: { type: String }, 
    TRXNNO: {type: String },
    TRADDATE: { type: Date },   
    UNITS: { type: Number },
    AMOUNT: { type: Number },
    TRXN_NATUR: { type: String },
    SCHEME_TYP: { type: String },
    PAN: { type: String },
    TRXN_TYPE_: { type: String },   
    AC_NO: { type: String } ,
    BANK_NAME: { type: String } ,
}, { versionKey: false });

const transkarvy = new Schema({
    FMCODE: { type: String },
    TD_ACNO: { type: String },
    FUNDDESC: { type: String },
    TD_TRNO: { type: String },
    SMCODE: { type: String },
    INVNAME: { type: String },
    TD_TRDT: { type: Date },
    TD_POP: { type: String },
    TD_AMT: { type: Number },
    TD_APPNO: { type: String },
    UNQNO: { type: String },
    TD_NAV: { type: String },
    IHNO: { type: String },
    BRANCHCODE: { type: String },
    TRDESC: { type: String },
    PAN1: { type: String },
    ASSETTYPE:{ type: String},
    TD_UNITS: { type: Number},
    SCHEMEISIN:{ type: String},
    TD_FUND:{ type: String},
}, { versionKey: false });

const transfranklin = new Schema({
    COMP_CODE: { type: String },
    SCHEME_CO0: { type: String },
    SCHEME_NA1: { type: String },
    FOLIO_NO: { type: String },
    TRXN_TYPE: { type: String },
    TRXN_NO: { type: String },
    INVESTOR_2: { type: String },
    TRXN_DATE: { type: Date },
    NAV: { type: String },
    POP: { type: String },
    UNITS: { type: Number },
    AMOUNT: { type: Number },
    JOINT_NAM1: { type: String },
    ADDRESS1: { type: String },
    IT_PAN_NO1: { type: String },
    IT_PAN_NO2: { type: String },
    ISIN: { type: String },
}, { versionKey: false });

var cams_navSchema = new Schema({
    trxnno: {type: String },
    folio_no: { type: String },
    scheme: { type: String },
    inv_name: { type: String },
    traddate: { type: String },
    units: { type: String },
    amount: { type: String },
    trxn_nature: { type: String },
    scheme_type: { type: String },
    pan: { type: String },
    trxn_type_flag: { type: String },
}, { versionKey: false });

const cams_transSchema = new Schema({
    folio_no: { type: String },
    scheme: { type: String },
    inv_name: { type: String },
    ac_no: { type: String },
    bank_name: { type: String },
}, { versionKey: false });




app.get("/api/gettranscams", function (req, res) {
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            console.log("data="+data);
            res.send(data);
        }
    });
})


app.get("/api/getcamstransdata", function (req, res) {
    var model = mongoose.model('cams_trans', cams_transSchema, 'cams_trans');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})

app.post("/api/getsipstpuserwise", function (req, res) {
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);
    var name = req.body.pan;
        const pipeline = [  ///trans_cams
            {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",TRXN_NATUR:"$TRXN_NATUR",INV_NAME:"$INV_NAME",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
            {$project : {_id:0,INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",TRXN_NATUR:"$_id.TRXN_NATUR",INV_NAME:"$_id.INV_NAME",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRADDATE", month:{$month:('$_id.TRADDATE')}, year:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{PAN:name} , {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }}
            ]
        const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",TRDESC:"$TRDESC",INVNAME:"$INVNAME",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0,INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",TRXN_NATUR:"$_id.TRDESC",INV_NAME:"$_id.INVNAME",FOLIO_NO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:"$_id.TD_TRDT", month:{$month:('$_id.TD_TRDT')}, year:{$year:('$_id.TD_TRDT')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{PAN:name} , {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }}
            ]
        const pipeline2 = [  ///trans_franklin
            {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
            {$project : {_id:0,INVNAME:"$INVESTOR_2",PAN:"$_id.IT_PAN_NO1",TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRXN_DATE", month:{$month:('$_id.TRXN_DATE')}, year:{$year:('$_id.TRXN_DATE')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{PAN:name} , {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }}
            ]
                 var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
                 var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
                 var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
                transc.aggregate(pipeline, (err, newdata) => {
                     transk.aggregate(pipeline1, (err, newdata1) => {
                         transf.aggregate(pipeline2, (err, newdata2) => {
                           if(newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){    
                                    resdata= {
                                        status:200,
                                        message:'Successfull',
                                        data:  newdata2 
                                      }
                                   }else{
                                        resdata= {
                                        status:400,
                                        message:'Data not found',            
                                      }
                                    }
                                      var datacon = newdata2.concat(newdata1.concat(newdata))
                                      datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                     .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                     .reverse().map(JSON.parse) ;
                                     resdata.data = datacon
                                     res.json(resdata)
                                     return resdata
                                    });
                               });
                            });
})

app.post("/api/getsipstpall", function (req, res) {
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);
    // var mon=1;
    // var yer=2021;
    const pipeline = [  ///trans_cams
        {$group :   {_id : {TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
        {$project : {_id:0,TRXN_NATUR:"$_id.TRXN_NATUR",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRADDATE", month:{$month:('$_id.TRADDATE')}, year:{$year:('$_id.TRADDATE')}  }},
        {$match :   { $and: [  { month: mon }, { year: yer }, {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }}
        ]
     const pipeline1 = [  ///trans_karvy
        {$group :   {_id : {TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
        {$project : {_id:0,TRXN_NATUR:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:"$_id.TD_TRDT", month:{$month:('$_id.TD_TRDT')}, year:{$year:('$_id.TD_TRDT')}  }},
        {$match :   { $and: [  { month: mon }, { year: yer }, {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }}
        ]
    const pipeline2 = [  ///trans_franklin
        {$group :   {_id : {TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
        {$project : {_id:0,TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRXN_DATE", month:{$month:('$_id.TRXN_DATE')}, year:{$year:('$_id.TRXN_DATE')}  }},
        {$match :   { $and: [  { month: mon }, { year: yer }, {TRXN_NATUR:/Systematic/}, {TRXN_NATUR:{ $not: /^Systematic - From.*/ }} ] }}
        ]
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
     transc.aggregate(pipeline, (err, newdata) => {
        transk.aggregate(pipeline1, (err, newdata1) => {
           transf.aggregate(pipeline2, (err, newdata2) => {
                if(newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){  
                        resdata= {
                           status:200,
                           message:'Successfull',
                           data:  newdata2 
                         }
                        }else{
                           resdata= {
                           status:400,
                           message:'Data not found',            
                         }
                       }
                         var datacon = newdata2.concat(newdata1.concat(newdata))
                         datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                        .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                        .reverse().map(JSON.parse) ;
                         resdata.data = datacon
                        // console.log("datacon=",datacon)
                        res.json(resdata)
                        return resdata
                
                       });
                  });
                });
})

app.post("/api/gettransactionall", function (req, res) {
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);
            const pipeline = [  ///trans_cams
                {$group :   {_id : {TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
                {$project : {_id:0,TRXN_NATUR:"$_id.TRXN_NATUR",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRADDATE", month:{$month:('$_id.TRADDATE')}, year:{$year:('$_id.TRADDATE')}  }},
                {$match :   { $and: [  { month: mon }, { year: yer } ] }}
                ]
            const pipeline1 = [  ///trans_karvy
                {$group :   {_id : {TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
                {$project : {_id:0,TRXN_NATUR:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:"$_id.TD_TRDT", month:{$month:('$_id.TD_TRDT')}, year:{$year:('$_id.TD_TRDT')}  }},
                {$match :   { $and: [  { month: mon }, { year: yer } ] }}
                ]
            const pipeline2 = [  ///trans_franklin
                {$group :   {_id : {TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
                {$project : {_id:0,TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRXN_DATE", month:{$month:('$_id.TRXN_DATE')}, year:{$year:('$_id.TRXN_DATE')}  }},
                {$match :   { $and: [  { month: mon }, { year: yer },  ] }}
                ]
                var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
                 var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
                 var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
                transc.aggregate(pipeline, (err, newdata) => {
                     transk.aggregate(pipeline1, (err, newdata1) => {
                         transf.aggregate(pipeline2, (err, newdata2) => {
                             if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                                    resdata= {
                                        status:200,
                                        message:'Successfull',
                                        data:  newdata2 
                                      }
                                    }else{
                                        resdata= {
                                        status:400,
                                        message:'Data not found',            
                                      }
                                    }
                                    var datacon = newdata2.concat(newdata1.concat(newdata))
                                      datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                     .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                     .reverse().map(JSON.parse) ;
                                      resdata.data = datacon
                                     res.json(resdata)
                                     //return resdata
                                  });
                                });
                             });
                       
})

// app.post("/api/gettransactionuserwise", function (req, res) {
//     var mon = parseInt(req.body.month);
//     var yer = parseInt(req.body.year);
//     var pan = req.body.pan;
//         const pipeline = [  ///trans_cams
//             {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",TRXN_NATUR:"$TRXN_NATUR",INV_NAME:"$INV_NAME",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE:{ $dateToString: { format: "%Y-%m-%d", date: "$TRADDATE" }  }    }}}, 
//             {$project : {_id:0,INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",TRXN_NATUR:"$_id.TRXN_NATUR",INV_NAME:"$_id.INV_NAME",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRADDATE", month:{$month:('$_id.TRADDATE')}, year:{$year:('$_id.TRADDATE')}  }},
//             {$match :   { $and: [  { month: mon }, { year: yer },{PAN:pan}  ] }}
//             ]
//         // const pipeline1 = [  ///trans_karvy
//         //     {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",TRDESC:"$TRDESC",INVNAME:"$INVNAME",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
//         //     {$project : {_id:0,INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",TRXN_NATUR:"$_id.TRDESC",INV_NAME:"$_id.INVNAME",FOLIO_NO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:"$_id.TD_TRDT", month:{$month:('$_id.TD_TRDT')}, year:{$year:('$_id.TD_TRDT')}  }},
//         //     {$match :   { $and: [  { month: mon }, { year: yer },{PAN:pan}  ] }}
//         //     ]
//         // const pipeline2 = [  ///trans_franklin
//         //     {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
//         //     {$project : {_id:0,INVNAME:"$INVESTOR_2",PAN:"$_id.IT_PAN_NO1",TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRXN_DATE", month:{$month:('$_id.TRXN_DATE')}, year:{$year:('$_id.TRXN_DATE')}  }},
//         //     {$match :   { $and: [  { month: mon }, { year: yer },{PAN:pan} ] }}
//         //     ]
//             var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
//             // var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
//             // var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
//                 transc.aggregate(pipeline, (err, newdata) => {
//                     // transk.aggregate(pipeline1, (err, newdata1) => {
//                     //     transf.aggregate(pipeline2, (err, newdata2) => {
//                     //         if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
//                         if( newdata != 0){
//                                  resdata= {
//                                        status:200,
//                                        message:'Successfull',
//                                        data:  newdata
//                                      }
//                                    }else{
//                                        resdata= {
//                                        status:400,
//                                        message:'Data not found',            
//                                      }
//                                    }
//                                 //    var datacon = newdata2.concat(newdata1.concat(newdata))
//                                 //      datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                                 //     .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                                 //     .reverse().map(JSON.parse) ;
//                                 //      resdata.data = datacon
//                                     res.json(newdata)
//                                     return newdata
//                             //    });
//                             // });
//                 });
                      
// })

app.post("/api/gettaxsavinguserwise", function (req, res) {
    var yer = parseInt(req.body.fromyear);
    var secyer = parseInt(req.body.toyear);
    var name = req.body.pan;
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
         const pipeline = [  ///trans_cams
            {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",SCHEME:"$SCHEME",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
            {$project : {_id:0, INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",SCHEME:"$_id.SCHEME",TRXN_NATURE:"$_id.TRXN_NATUR", FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRADDATE", year1:{$year:('$_id.TRADDATE')}, year2:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [ { SCHEME:/Tax/} ,{PAN:name} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } }
        ]
          const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",FUNDDESC:"$FUNDDESC",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0, INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",SCHEME:"$_id.FUNDDESC",TRXN_NATURE:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",AMOUNT:"$_id.TD_AMT",TRADDATE:"$_id.TD_TRDT", year1:{$year:('$_id.TD_TRDT')}, year2:{$year:('$_id.TD_TRDT')}  }},
            {$match :   { $and: [ { SCHEME:/Tax/} ,{PAN:name} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } }
        ]
          const pipeline2 = [  ///trans_franklin
            {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE" ,year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }}},
            {$project : {_id:0, INVNAME:"$INVESTOR_2",PAN:"$_id.IT_PAN_NO1",SCHEME:"$_id.SCHEME_NA1",TRXN_NATURE:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRXN_DATE", year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }},
            {$match :   { $and: [ { SCHEME:/Tax/} ,{PAN:name} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } }
            ]
            transc.aggregate(pipeline, (err, newdata) => {
              transk.aggregate(pipeline1, (err, newdata1) => {
                transf.aggregate(pipeline2, (err, newdata2) => {
            if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                resdata= {
                    status:200,
                    message:'Successfull',
                    data:  newdata2 
                  }
                }else{
                    resdata= {
                    status:400,
                    message:'Data not found',            
                  }
                }
                var datacon = newdata2.concat(newdata1.concat(newdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
               .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
               .reverse().map(JSON.parse) ;
               resdata.data = datacon
               res.json(resdata)
               return resdata
            });
        });
     });
 });

 app.post("/api/gettaxsaving", function (req, res) {
    var yer = parseInt(req.body.fromyear);
    var secyer = parseInt(req.body.toyear);
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        const pipeline = [  ///trans_cams
            {$group :   {_id : {SCHEME:"$SCHEME",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
            {$project : {_id:0, SCHEME:"$_id.SCHEME",TRXN_NATURE:"$_id.TRXN_NATUR", FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRADDATE", year1:{$year:('$_id.TRADDATE')}, year2:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [  { SCHEME:/Tax/} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } }
            ]
        const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {FUNDDESC:"$FUNDDESC",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0, SCHEME:"$_id.FUNDDESC",TRXN_NATURE:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",AMOUNT:"$_id.TD_AMT",TRADDATE:"$_id.TD_TRDT", year1:{$year:('$_id.TD_TRDT')}, year2:{$year:('$_id.TD_TRDT')}  }},                   
            {$match :   { $and: [  { SCHEME:/Tax/} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } }
            ]
        const pipeline2 = [  ///trans_franklin
            {$group :   {_id : {SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
            {$project : {_id:0,SCHEME:"$_id.SCHEME_NA1",TRXN_NATURE:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRXN_DATE", year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }},
            {$match :   { $and: [  { SCHEME:/Tax/} ,{TRXN_NATURE:{ $not: /^Redemption.*/ }},{TRXN_NATURE:{ $not: /^Dividend Paid.*/ }},{TRXN_NATURE:{ $not: /^Switchout.*/ }},{TRXN_NATURE:{ $not: /^Transfer-Out.*/ }},{TRXN_NATURE:{ $not: /^Lateral Shift Out.*/ }}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } }
        ]
        transc.aggregate(pipeline, (err, newdata) => {
           transk.aggregate(pipeline1, (err, newdata1) => {
            transf.aggregate(pipeline2, (err, newdata2) => {
            if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0 ){
                resdata= {
                    status:200,
                    message:'Successfull',
                    data:  newdata2 
                  }
                }else{
                    resdata= {
                    status:400,
                    message:'Data not found',            
                  }
                }
                var datacon = newdata2.concat(newdata1.concat(newdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
               .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
               .reverse().map(JSON.parse) ;
               resdata.data = datacon
               res.json(resdata)
               return resdata
            });
          })
       });
 });         

app.post("/api/getdividend", function (req, res) {
    var yer = parseInt(req.body.fromyear);
    var secyer = parseInt(req.body.toyear);
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        const pipeline = [  ///trans_cams
            {$group :   {_id : {SCHEME:"$SCHEME",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
            {$project : {_id:0, SCHEME:"$_id.SCHEME",TRXN_NATURE:"$_id.TRXN_NATUR", FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRADDATE", year1:{$year:('$_id.TRADDATE')}, year2:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [  { TRXN_NATURE:/Dividend/} , { $or: [ {year1: yer } ,{year2: secyer } ] } ] } }
            ]
            const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {FUNDDESC:"$FUNDDESC",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0, SCHEME:"$_id.FUNDDESC",TRXN_NATURE:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",AMOUNT:"$_id.TD_AMT",TRADDATE:"$_id.TD_TRDT", year1:{$year:('$_id.TD_TRDT')}, year2:{$year:('$_id.TD_TRDT')}  }},
            {$match :   { $and: [  { TRXN_NATURE:/Dividend/} , { $or: [ {year1: yer } ,{year2: secyer } ] } ] } }
            ]
            const pipeline2 = [  ///trans_franklin
                {$group :   {_id : {SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
                {$project : {_id:0, SCHEME:"$_id.SCHEME_NA1",TRXN_NATURE:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRXN_DATE", year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }},
                {$match :   { $and: [  { TRXN_NATURE:/Dividend/} ,{$or: [ {year1: yer } ,{year2: secyer } ] } ] } }
                ]
        transf.aggregate(pipeline2, (err, newdata) => {
          transc.aggregate(pipeline, (err, newdata1) => {
           transk.aggregate(pipeline1, (err, newdata2) => {
            if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0 ){
                resdata= {
                    status:200,
                    message:'Successfull',
                    data:  newdata2 
                  }
                }else{
                    resdata= {
                    status:400,
                    message:'Data not found',            
                  }
                }
                var datacon = newdata2.concat(newdata1.concat(newdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
               .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
               .reverse().map(JSON.parse) ;
               resdata.data = datacon
               res.json(resdata)
               return resdata
            });
         });
     })
   
 });

 app.post("/api/getdividenduserwise", function (req, res) {
    var yer = parseInt(req.body.fromyear);
    var secyer = parseInt(req.body.toyear);
    var pan = req.body.pan;
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        const pipeline = [  ///trans_cams
            {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",SCHEME:"$SCHEME",TRXN_NATUR:"$TRXN_NATUR",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
            {$project : {_id:0, INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",SCHEME:"$_id.SCHEME",TRXN_NATURE:"$_id.TRXN_NATUR", FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRADDATE", year1:{$year:('$_id.TRADDATE')}, year2:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [ { TRXN_NATURE:/Dividend/} , { PAN:pan}, { $or: [ {year1: yer } ,{year2: secyer } ] } ] } }
          ]
          const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",FUNDDESC:"$FUNDDESC",TRDESC:"$TRDESC",TD_ACNO:"$TD_ACNO",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0, INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",SCHEME:"$_id.FUNDDESC",TRXN_NATURE:"$_id.TRDESC",FOLIO_NO:"$_id.TD_ACNO",AMOUNT:"$_id.TD_AMT",TRADDATE:"$_id.TD_TRDT", year1:{$year:('$_id.TD_TRDT')}, year2:{$year:('$_id.TD_TRDT')}  }},
            {$match :   { $and: [ { TRXN_NATURE:/Div/} ,{ PAN:pan},  { $or: [ {year1: yer } ,{year2: secyer } ] } ] } }
            ]
            const pipeline2 = [  ///trans_franklin
            {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",SCHEME_NA1:"$SCHEME_NA1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
            {$project : {_id:0, INVNAME:"$_id.INVESTOR_2",PAN:"$_id.IT_PAN_NO1",SCHEME:"$_id.SCHEME_NA1",TRXN_NATURE:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRXN_DATE", year1:{$year:('$_id.TRXN_DATE')}, year2:{$year:('$_id.TRXN_DATE')}  }},
            {$match :   { $and: [  { TRXN_NATURE:/Dividend/} ,{ PAN:pan},{$or: [ {year1: yer } ,{year2: secyer } ] } ] } }
            ]
            transf.aggregate(pipeline2, (err, newdata) => {
             transc.aggregate(pipeline, (err, newdata1) => {
              transk.aggregate(pipeline1, (err, newdata2) => {
            if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0){
                resdata= {
                    status:200,
                    message:'Successfull',
                    data:  newdata2 
                  }
                }else{
                    resdata= {
                    status:400,
                    message:'Data not found',            
                  }
                }
                var datacon = newdata2.concat(newdata1.concat(newdata))
                datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
               .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
               .reverse().map(JSON.parse) ;
               resdata.data = datacon
               res.json(resdata)
               return resdata
            });
        });
      });
 });

 app.post("/api/getamclist", function(req, res) {
    var resdata = "";
    Axios.get(
      "https://prodigyfinallive.herokuapp.com/getUserDetails",
      { data: { email: req.body.email } }
      //  {data:{ email:"sunilguptabfc@gmail.com"}}
    ).then(function(result) {
      if (result.data.data === undefined && req.body.email == "") {
        resdata = {
          status: 401,
          message: "Data not found"
        };
        res.json(resdata);
        return resdata;
      } else {
        if (
          result.data.data === undefined &&
          result.data.data === "" &&
          result.data.message === "Bank details not found " && 
          result.data.data.User[0] === undefined && 
          result.data.data.User[0].pan_card === undefined &&
          result.data.data.User[0] === ""  &&
          result.data.data.User[0].pan_card === ""
        ) {
          resdata = {
            status: 406,
            message: "Data not found"
          };
          res.json(resdata);
          return resdata;
        } else {
          var pan = result.data.data.User[0].pan_card;
          var folioc = mongoose.model("folio_cams", foliocams, "folio_cams");
          //var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
          var transc = mongoose.model("trans_cams", transcams, "trans_cams");
          var transk = mongoose.model("trans_karvy", transkarvy, "trans_karvy");
          const pipeline = [
            //folio_cams
            { $match: { PAN_NO: pan } },
            { $group: { _id: { FOLIOCHK: "$FOLIOCHK", AMC_CODE: "$AMC_CODE" } } },
            {
              $project: {
                _id: 0,
                folio: "$_id.FOLIOCHK",
                amc_code: "$_id.AMC_CODE"
              }
            }
          ];
          // 	const pipeline3 = [ //folio_karvy
          //             {"$match" : {PAN:pan}},
          //              {"$group" : {_id : {FOLIO_NO:"$FOLIO_NO", AMC_CODE:"$AMC_CODE"}}},
          //              {"$project" : {_id:0, folio:"$_id.FOLIO_NO", amc_code:"$_id.AMC_CODE"}}
          //         ]
          const pipeline1 = [
            //trans_cams
            { $match: { PAN: pan } },
            { $group: { _id: { FOLIO_NO: "$FOLIO_NO", AMC_CODE: "$AMC_CODE" } } },
            {
              $project: {
                _id: 0,
                folio: "$_id.FOLIO_NO",
                amc_code: "$_id.AMC_CODE"
              }
            }
          ];
          const pipeline2 = [
            //trans_karvy
            { $match: { PAN1: pan } },
            { $group: { _id: { TD_ACNO: "$TD_ACNO", TD_FUND: "$TD_FUND" } } },
            {
              $project: {
                _id: 0,
                folio: "$_id.TD_ACNO",
                amc_code: "$_id.TD_FUND"
              }
            }
          ];
          folioc.aggregate(pipeline, (err, newdata) => {
            transc.aggregate(pipeline1, (err, newdata1) => {
              transk.aggregate(pipeline2, (err, newdata2) => {
                if (
                  newdata2.length != 0 ||
                  newdata1.length != 0 ||
                  newdata.length != 0
                ) {
                  resdata = {
                    status: 200,
                    message: "Successfull",
                    data: newdata2
                  };
                } else {
                  resdata = {
                    status: 403,
                    message: "Data not found"
                  };
                }
                var datacon = newdata.concat(newdata1.concat(newdata2));
                datacon = datacon
                  .map(JSON.stringify)
                  .reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                  .filter(function(item, index, arr) {
                    return arr.indexOf(item, index + 1) === -1;
                  }) // check if there is any occurence of the item in whole array
                  .reverse()
                  .map(JSON.parse);
                resdata.data = datacon;
                //console.log("res="+JSON.stringify(resdata))
                res.json(resdata);
                return resdata;
              });
            });
          });
        }
      }
    });
  });
// app.get("/api/getamclist111", function (req, res) {
//     Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
//     {data:{ email:req.body.email}}
//     //{data:{ email:"sunilguptabfc@gmail.com"}}
//       ).then(function(result) {
//         if(result.data.data  === undefined || req.body.email == ''){
//             resdata= {
//                 status:400,
//                 message:'Data not found',            
//            }
//            res.json(resdata) 
//            return resdata;
//         }else{          
//        if(result.data.data === undefined && result.data.data == '' && result.data.message == "Bank details not found "){
//             resdata= {
//                 status:400,
//                 message:'Data not found',            
//            }
//            res.json(resdata) 
//            return resdata;
//         }else{
//         var pan =  result.data.data.User[0].pan_card;
//         var folio = mongoose.model('folio_cams', foliocams, 'folio_cams');
//         var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
//         const pipeline = [
//             {"$match" : {pan_no:pan}}, 
//              {"$group" : {_id : {foliochk:"$foliochk", amc_code:"$amc_code", product:"$product"}}}, 
//              {"$project" : {_id:0, folio:"$_id.foliochk", amc_code:"$_id.amc_code", product_code:"$_id.product"}}
//         ]
//         const pipeline1 = [
//             {"$match" : {PAN:pan}}, 
//              {"$group" : {_id : {FOLIO_NO:"$FOLIO_NO", AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE"}}}, 
//              {"$project" : {_id:0, folio:"$_id.FOLIO_NO", amc_code:"$_id.AMC_CODE", product_code:"$_id.PRODCODE"}}
//         ]
//         folio.aggregate(pipeline, (err, newdata) => {
//           trans.aggregate(pipeline1, (err, newdata1) => {
//             if(newdata1.length != 0 || newdata.length != 0){     
//                              resdata= {
//                                 status:200,
//                                 message:'Successfull',
//                                 data:  newdata1 
//                               }
//                             }else{
//                                 resdata= {
//                                 status:400,
//                                 message:'Data not found',            
//                            }
//                             }
//                             var datacon = newdata.concat(newdata1)
//                             datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
//                             .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
//                             .reverse().map(JSON.parse) ;
//                              resdata.data = datacon
//                             //console.log("res="+JSON.stringify(resdata))
//                             res.json(resdata)  
//                             return resdata                    
//                         });
//                     });
//               }
//             }      
//     });    
//     })


app.get("/api/getfoliolist", function (req, res) {
    Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
    {data:{ email:req.body.email}}
      ).then(function(result) {
        if(result.data.data  === undefined || req.body.email == ''){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{          
       if(result.data.data === undefined && result.data.data == '' && result.data.message == "Bank details not found "){
            resdata= {
                status:400,
                message:'Data not found',            
           }
           res.json(resdata) 
           return resdata;
        }else{
        var pan =  result.data.data.User[0].pan_card;
        var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams');
        var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
        var foliof = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        folioc.find({"pan_no":pan}).distinct("foliochk", function (err, newdata) { 
            foliok.find({"PANNumber":pan}).distinct("Folio", function (err, newdata1) { 
                foliof.find({"PANNO1":pan}).distinct("FOLIO_NO", function (err, newdata2) {
                    transc.find({"PAN":pan}).distinct("FOLIO_NO", function (err, newdata3) { 
                        transf.find({"IT_PAN_NO1":pan}).distinct("FOLIO_NO", function (err, newdata4) {
                    if(newdata4 != 0 || newdata3 != 0 || newdata2 != 0 || newdata1 != 0 || newdata != 0){    
                             resdata= {
                                status:200,
                                message:'Successfull',
                                data:  newdata4
                              }
                            }else{
                                resdata= {
                                status:400,
                                message:'Data not found',            
                           }
                            }
                            var datacon = newdata4.concat(newdata3.concat(newdata2.concat(newdata1.concat(newdata))))
                            var removeduplicates = Array.from(new Set(datacon));
                            resdata.data = removeduplicates
                            res.json(resdata)  
                            return resdata                    
                        });
                    });
                    });
                });
            });
        }
            }      
    });
    })

    app.get("/api/getapplicant", function (req, res) {
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
        const pipeline = [  //trans_cams
            {"$group" : {_id : {INV_NAME:{"$toUpper":["$INV_NAME"]}, PAN:"$PAN"}}}, 
            {"$project" : {_id:0, INVNAME:{"$toUpper":["$_id.INV_NAME"]}, PAN:"$_id.PAN"}}
       ]
       const pipeline1 = [  //trans_karvy
            {"$group" : {_id : {INVNAME:{"$toUpper":["$INVNAME"]}, PAN1:"$PAN1"}}}, 
            {"$project" : {_id:0, INVNAME:{"$toUpper":["$_id.INVNAME"]}, PAN:"$_id.PAN1"}}
       ]
       const pipeline2 = [ ///trans_franklin
            {"$group" : {_id : {INVESTOR_2:{"$toUpper":["$INVESTOR_2"]}, IT_PAN_NO1:"$IT_PAN_NO1"}}}, 
            {"$project" : {_id:0, INVNAME:{"$toUpper":["$_id.INVESTOR_2"]}, PAN:"$_id.IT_PAN_NO1"}}
       ]
            transc.aggregate(pipeline,  (err, newdata) => {
                transk.aggregate(pipeline1,  (err, newdata1) => {
                   transf.aggregate(pipeline2,  (err, newdata2) => {
                               if( newdata2.length != 0 || newdata1.length != 0 || newdata.length != 0 ){ 
                                   var datacon = newdata2.concat(newdata1.concat(newdata))
                                   datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                      .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                      .reverse().map(JSON.parse) ;
                                res.json(datacon)    
                               }
                        });
                   });
                });
    })
    app.get("/api/getapplicantfolio", function (req, res) {
        // var folioc = mongoose.model('folio_cams', foliocams, 'folio_cams');
        // var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
        // var foliof = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
        //            const pipeline = [  //folio_cams
        //                 {"$group" : {_id : {INV_NAME:"$INV_NAME", PAN_NO:"$PAN_NO"}}}, 
        //                 {"$project" : {_id:0, INVNAME:"$_id.INV_NAME", PAN:"$_id.PAN_NO"}}
        //            ]
        //            const pipeline1 = [  //folio_karvy
        //                 {"$group" : {_id : {INVNAME:"$INVNAME", PANGNO:"$PANGNO"}}}, 
        //                 {"$project" : {_id:0, INVNAME:"$_id.INVNAME", PAN:"$_id.PANGNO"}}
        //            ]
        //            const pipeline2 = [ ///folio_franklin
        //                 {"$group" : {_id : {INV_NAME:"$INV_NAME", PANNO1:"$PANNO1"}}}, 
        //                 {"$project" : {_id:0, INVNAME:"$_id.INV_NAME", PAN:"$_id.PANNO1"}}
        //            ]
        //     folioc.aggregate(pipeline,  (err, newdata) => {
        //         foliok.aggregate(pipeline1,  (err, newdata1) => {
        //             foliof.aggregate(pipeline2,  (err, newdata2) => {
            var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
            var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
            //var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
                           const pipeline = [  //trans_cams
                                {"$group" : {_id : {INV_NAME:"$INV_NAME", PAN:"$PAN"}}}, 
                                {"$project" : {_id:0, INVNAME:"$_id.INV_NAME", PAN:"$_id.PAN"}}
                           ]
                           const pipeline1 = [  //trans_karvy
                                {"$group" : {_id : {INVNAME:"$INVNAME", PAN1:"$PAN1"}}}, 
                                {"$project" : {_id:0, INVNAME:"$_id.INVNAME", PAN:"$_id.PAN1"}}
                           ]
                        //    const pipeline2 = [ ///trans_franklin
                        //         {"$group" : {_id : {INVESTOR_2:"$INVESTOR_2", IT_PAN_NO1:"$IT_PAN_NO1"}}}, 
                        //         {"$project" : {_id:0, INVNAME:"$_id.INVESTOR_2", PAN:"$_id.IT_PAN_NO1"}}
                        //    ]
                           transc.aggregate(pipeline,  (err, newdata) => {
                            transk.aggregate(pipeline1,  (err, newdata1) => {
                              //  transf.aggregate(pipeline2,  (err, newdata2) => {
                               if( newdata1.length != 0 || newdata.length != 0 ){ 
                                   var datacon = newdata1.concat(newdata)
                                   var removeduplicates = Array.from(new Set(datacon));
                                   res.json(removeduplicates)    
                               }
                       // });
                   });
                });
       })
    app.get("/api/getschemetype", function (req, res) {
     var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
          var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
            var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
            transc.find().distinct("SCHEME_TYPE", function (err, newdata) { 
               // foliok.find({"PANNumber":pan}).distinct("Folio", function (err, newdata1) { 
               //     foliof.find({"PANNO1":pan}).distinct("FOLIO_NO", function (err, newdata2) {
                       transk.find().distinct("ASSETTYPE", function (err, newdata3) { 
               //             transf.find({"IT_PAN_NO1":pan}).distinct("FOLIO_NO", function (err, newdata4) {
                      // if(newdata4 != 0 || newdata3 != 0 || newdata2 != 0 || newdata1 != 0 || newdata != 0){ 
                     
                               //var datacon = newdata4.concat(newdata3.concat(newdata2.concat(newdata1.concat(newdata))))
                               var datacon = newdata3.concat(newdata)
                             // var removeduplicates = Array.from(new Set(datacon));
                             //  resdata.data = removeduplicates
                               res.json(datacon)    
                           });
                       });
                     //  });
                 //  });
             //  });
       //     }
       //         }      
       // });
       })
    
    app.get("/api/getportfolio1", function (req, res) {
        var camsn = mongoose.model('cams_nav', navcams, 'cams_nav');    
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');   
        const pipeline1 = [  ///trans_karvy
            {"$match" : { INVNAME:req.query.name}},
            {"$group" : {_id :{FUNDDESC:"$FUNDDESC",TD_ACNO:"$TD_ACNO",ASSETTYPE:"$ASSETTYPE",SCHEMEISIN:"$SCHEMEISIN"},TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"}}}, 
            {"$group" : {_id :{SCHEME:"$_id.FUNDDESC",FOLIO_NO:"$_id.TD_ACNO",SCHEME_TYPE:"$_id.ASSETTYPE",SCHEMEISIN:"$_id.SCHEMEISIN"},UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"}}},
           ]   
        
        //    const pipeline = [  ///cams_nav
        //     {"$match" : { ISINDivPayoutISINGrowth:req.body.num}},
        //     {"$group" : {_id :{NetAssetValue:"$NetAssetValue"}}}, 
        //     {"$group" : {_id :{NetAssetValue:"$_id.NetAssetValue"}}}
        //    ]    

        // const pipeline2 = [  ///trans_franklin
        //     {"$match" : { INVESTOR_2:req.body.name}}, 
        //     {"$group" : {_id : {SCHEME_NA1:"$SCHEME_NA1",UNITS:"$UNITS",AMOUNT:"$AMOUNT",FOLIO_NO:"$FOLIO_NO",TRXN_TYPE:"$TRXN_TYPE"}}}, 
        //     {"$project" : {_id:0,SCHEME:"$_id.SCHEME_NA1",UNITS:"$_id.UNITS", AMOUNT:"$_id.AMOUNT",FOLIO_NO:"$_id.FOLIO_NO",SCHEME_TYPE:"$_id.TRXN_TYPE"}}
        // ]     
              
        //var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
         
        //var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');  
         //   transc.aggregate(pipeline, (err, data) => {
                transk.aggregate(pipeline1,  (err, data1) => {
                 //   camsn.aggregate(pipeline, (err, data2) => {
                    //transc.find({"inv_name":req.query.name},{_id:0,scheme:1,units:1,amount:1,folio_no:1,scheme_type:1}, function (err, data) {
                     //   if(data2.length != 0 || data1.length != 0 || data.length != 0 ){
                        if(data1 != 0 ){
                            if (err) {
                                res.send(err);
                            }
                            else {
                               //  var datacon = data2.concat(data1)
                                // var removeduplicates = Array.from(new Set(datacon));
                                // console.log("cams=",data)
                                // console.log("karvy=",data1)
                                // console.log("DATA=",data1)
                                 //console.log("DATA2=",data2)
                                res.send(data1);
                                return data1;
                            }
                         }
               // });
           // });
  });
})
app.get("/api/getportfolio", function (req, res) {
    var camsn = mongoose.model('cams_nav', navcams, 'cams_nav');    
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');   
    // const pipeline1 = [  ///trans_karvy
    //     {"$match" : { INVNAME:req.query.name}},
    //     {"$group" : {_id :{FUNDDESC:"$FUNDDESC",TD_ACNO:"$TD_ACNO",ASSETTYPE:"$ASSETTYPE",SCHEMEISIN:"$SCHEMEISIN"},TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"}}}, 
    //     {"$group" : {_id :{SCHEME:"$_id.FUNDDESC",FOLIO_NO:"$_id.TD_ACNO",SCHEME_TYPE:"$_id.ASSETTYPE",SCHEMEISIN:"$_id.SCHEMEISIN"},UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"}}},
    //    ]  
    const pipeline1=[
        {$match : { PAN1:req.body.pan}},
      //  {$group : {_id :{Days:{ $divide: [{ $subtract: [new Date(), '$TD_TRDT'] }, 1000 * 60 * 60 * 24] } }}},
        {$group :{_id:{ TD_ACNO:"$TD_ACNO", adddate: { $divide: [{ $subtract: [new Date(), '$TD_TRDT'] }, 1000 * 60 * 60 * 24] } }}},
        

       
//   {$group :{_id:{ TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_TRDT:"$TD_TRDT",sumDays:{$sum:"$_id.Days"},Days:{ $divide: [{ $subtract: [new Date(), '$_id.TD_TRDT'] }, 1000 * 60 * 60 * 24] } }}},
      //  {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
        //{$unwind: "$nav"},
       
      //  {$group:  {_id:{FUNDDESC:"$_id.FUNDDESC",SCHEMEISIN:"$_id.SCHEMEISIN",TD_ACNO:"$_id.TD_ACNO",ASSETTYPE:"$_id.ASSETTYPE", cnav:"$nav.NetAssetValue" } , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} } ,Days:{ $divide: [{ $subtract: [new Date(), '$_id.TD_TRDT'] }, 1000 * 60 * 60 * 24] }  },
       
      // {$project :{_id:0, SCHEME:"$_id.FUNDDESC",SCHEMEISIN:"$_id.SCHEMEISIN",FOLIO_NO:"$_id.TD_ACNO",SCHEME_TYPE:"$_id.ASSETTYPE",cnav:"$nav.NetAssetValue" UNITS:1,AMOUNT:1 }}
        ] 











    //     const pipeline1=[
    //         {$match : { PAN1:req.body.pan}},
    //         {$group : {_id :{FUNDDESC:"$FUNDDESC",SCHEMEISIN:"$SCHEMEISIN",TD_ACNO:"$TD_ACNO",ASSETTYPE:"$ASSETTYPE",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"},Days:{ $divide: [{ $subtract: [new Date(), '$TD_TRDT'] }, 1000 * 60 * 60 * 24] } }},
    //         {$group :{_id:{ FUNDDESC:"$_id.FUNDDESC",SCHEMEISIN:"$_id.SCHEMEISIN",TD_ACNO:"$_id.TD_ACNO",ASSETTYPE:"$_id.ASSETTYPE",cnav:"$nav.NetAssetValue"}, TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"},Days:{ $divide: [{ $subtract: [new Date(), '$TD_TRDT'] }, 1000 * 60 * 60 * 24] } }},
    //         {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
    //         //{$unwind: "$nav"},
           
    //         {$group:  {_id:{FUNDDESC:"$_id.FUNDDESC",SCHEMEISIN:"$_id.SCHEMEISIN",TD_ACNO:"$_id.TD_ACNO",ASSETTYPE:"$_id.ASSETTYPE", cnav:"$nav.NetAssetValue" } , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} } ,Days:{ $divide: [{ $subtract: [new Date(), '$_id.TD_TRDT'] }, 1000 * 60 * 60 * 24] }  },
           
    //    //     {$project :{_id:0, SCHEME:"$_id.FUNDDESC",SCHEMEISIN:"$_id.SCHEMEISIN",FOLIO_NO:"$_id.TD_ACNO",SCHEME_TYPE:"$_id.ASSETTYPE",cnav:"$nav.NetAssetValue" UNITS:1,AMOUNT:1 }}
    //         ] 
            transk.aggregate(pipeline1, (err, data1) => {
                              if (err) {
                                  res.send(err);
                              }
                              else {
                                  res.send(data1);
                                  return data1;
                              }
        
       // });
     });
})
   
  app.get("/api/getpan", function (req, res) {  
    const pipeline = [  //trans_cams
        {"$match" : {PAN:req.query.pan}}, 
         {"$group" : {_id : {PAN:"$PAN", INV_NAME:"$INV_NAME"}}}, 
         {"$project" : {_id:0, PAN:"$_id.PAN", INV_NAME:"$_id.INV_NAME"}}
    ]   
    const pipeline1 = [  //trans_karvy
        {"$match" : {PAN1:req.query.pan}}, 
        {"$group" : {_id : {PAN1:"$PAN1", INVNAME:"$INVNAME"}}}, 
        {"$project" : {_id:0, PAN:"$_id.PAN1", INV_NAME:"$_id.INVNAME"}}
    ]   
    const pipeline2 = [   //trans_franklin
        {"$match" : {IT_PAN_NO1:req.query.pan}}, 
         {"$group" : {_id : {IT_PAN_NO1:"$IT_PAN_NO1", INVESTOR_2:"$INVESTOR_2"}}}, 
         {"$project" : {_id:0, PAN:"$_id.IT_PAN_NO1", INV_NAME:"$_id.INVESTOR_2"}}
    ]    
    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');    
    var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');          
         transc.aggregate(pipeline, (err, data) => {
            transk.aggregate(pipeline1, (err, data1) => {
                transf.aggregate(pipeline2, (err, data2) => {
                    if(data2.length != 0 || data1.length != 0 || data.length != 0 ){
                        if (err) {
                            res.send(err);
                        }
                        else {
                            let merged = [];
                           merged = data1.map((item, i) => Object.assign({}, item, data2.map((items, j) => Object.assign({}, items, data[j]))));
                            res.send(merged);
                            return merged;
                        }
                     }
                });
            });
        });
})

    app.get("/api/getfolio", function (req, res) {
          var transc = mongoose.model('trans_cams', transcams, 'trans_cams'); 
          var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');  
          var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');             
                transc.find({"PAN":req.query.name}).distinct("FOLIO_NO", function (err, data) {
                  transk.find({"PAN1":req.query.name}).distinct("TD_ACNO", function (err, data1) {
                    transf.find({"IT_PAN_NO1":req.query.name}).distinct("FOLIO_NO", function (err, data2) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                            var datacon = data2.concat(data1.concat(data))
                            var removeduplicates = Array.from(new Set(datacon));
                                res.send(removeduplicates);
                                return removeduplicates;
                        }
                    });
                 });
               });
   })
    app.get("/api/getscheme", function (req, res) {
        var transc = mongoose.model('trans_cams', transcams, 'trans_cams');             
        var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');    
        var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');               
         transc.find({"FOLIO_NO":req.query.folio}).distinct("SCHEME", function (err, data) {  
            transk.find({"TD_ACNO":req.query.folio}).distinct("FUNDDESC", function (err, data1) {
               transf.find({"FOLIO_NO":req.query.folio}).distinct("SCHEME_NA1", function (err, data2) {
                
              if (err) {
                  res.send(err);
              }
              else {
                           var datacon = data2.concat(data1.concat(data))
                           var removeduplicates = Array.from(new Set(datacon));
                            res.send(removeduplicates);
                            return removeduplicates;
              }
            });
         });
        });
  })

//   app.get("/api/getfoliodetail", function (req, res) {  
//     const pipeline = [  //trans_cams
//         {"$match" : {"FOLIO_NO":req.query.folio,"SCHEME":req.query.scheme}}, 
//          {"$group" : {_id : {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO"},UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"},}}, 
//          {"$group" : {_id:  {INVNAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO"},UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"}}}
//     ]  
//     const pipeline11 = [  //folio_karvy
//         {"$match" : {"ACNO":req.query.folio,"FUNDDESC":req.query.scheme}}, 
//         {"$group" :{_id :  {INVNAME:"$INVNAME",BNAME:"$BNAME",BNKACNO:"$BNKACNO",NOMINEE:"$NOMINEE",JTNAME2:"$JTNAME2",JTNAME1:"$JTNAME1"} }}, 
//         {"$project":{_id:0,INVNAME:"$_id.INVNAME", BANK_NAME:"$_id.BNAME",AC_NO:"$_id.BNKACNO",NOMINEE:"$_id.NOMINEE",JTNAME2:"$_id.JTNAME2",JTNAME1:"$_id.JTNAME1"}}
//    ]    
//    const pipeline1=[  //trans_karvy
//            {$match : {"TD_ACNO":req.query.folio,"FUNDDESC":req.query.scheme}}, 
//            {$group :{_id : {INVNAME:"$INVNAME",SCHEMEISIN:"$SCHEMEISIN",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"}, TD_AMT:{$sum:"$TD_AMT"} }},
//            {$group :{_id:{ INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN",cnav:"$nav.NetAssetValue"}, TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"} }},
//            {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
//            {$group:  {_id:{INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN", cnav:"$nav.NetAssetValue" } , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }   },
//       ] 
  
//    var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
//    var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy'); 
//     var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');    
//    //var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');          
//         transc.aggregate(pipeline, (err, data) => {
//            transk.aggregate(pipeline1, (err, data1) => {
//                foliok.aggregate(pipeline11, (err, data2) => {
//               // transf.aggregate(pipeline2, (err, data2) => {
//                    if(data2.length != 0  || data1.length != 0  || data.length != 0 ){
//                        if (err) {
//                            res.send(err);
//                        }
//                        else {
//                           let merged = [];
//                            merged = data1.map((item, i) => Object.assign({}, item, data2[i]));
//                           //merged = data1.map((item, i) => Object.assign({}, item, data2.map((items, j) => Object.assign({}, items, data[j]))));
//                           console.log("merged=",merged)
//                           var datacon = data2.concat(data1.concat(data))
//                            var removeduplicates = Array.from(new Set(datacon));
//                             console.log("datacon=",datacon)
//                             console.log("data1=",data1)
//                             console.log("data2=",data2)
//                             console.log("data=",data)
//                           res.send(removeduplicates);
//                            return removeduplicates;
//                        }
//                     }
//                });
//            });
//        });
// })
  app.get("/api/getfoliodetail", function (req, res) {     
    const pipeline = [  //trans_cams
        {$match : {"FOLIO_NO":req.query.folio,"SCHEME":req.query.scheme}}, 
        {$group : {_id : {INV_NAME:"$INV_NAME",BANK_NAME:"$BANK_NAME",AC_NO:"$AC_NO", AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE", code :{$reduce:{input:{$split:["$PRODCODE","$AMC_CODE"]},initialValue: "",in: {$concat: ["$$value","$$this"]}} } ,UNITS:{$sum:"$UNITS"}, AMOUNT:{$sum:"$AMOUNT"}  }}},
        {$lookup:
        {
        from: "products",
        let: { ccc: "$_id.code", amc:"$_id.AMC_CODE"},
        pipeline: [
            { $match:
                { $expr:
                    { $and:
                    [
                        { $eq: [ "$PRODUCT_CODE",  "$$ccc" ] },
                        { $eq: [ "$AMC_CODE", "$$amc" ] }
                    ]
                    }
                }
            },
            { $project: {  _id: 0 } }
        ],
        as: "products"
        }},
        {$group :{ _id: {INV_NAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO", products:"$products.ISIN" } , UNITS:{$sum:"$_id.UNITS"}, AMOUNT:{$sum:"$_id.AMOUNT"} } },
        {$lookup: { from: 'cams_nav',localField: '_id.products',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
        {$project:  {_id:0 , INVNAME:"$_id.INV_NAME",BANK_NAME:"$_id.BANK_NAME",AC_NO:"$_id.AC_NO",products:"$products.ISIN", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$UNITS"},AMOUNT:{$sum:"$AMOUNT"} }   },
    ]
    const pipeline11 = [  //folio_karvy
        {$match : {"ACNO":req.query.folio}}, 
        {$group :{_id :  {INVNAME:"$INVNAME",BNAME:"$BNAME",BNKACNO:"$BNKACNO",NOMINEE:"$NOMINEE",JTNAME2:"$JTNAME2",JTNAME1:"$JTNAME1"} }}, 
        {$project:{_id:0,INVNAME:"$_id.INVNAME", BANK_NAME:"$_id.BNAME",AC_NO:"$_id.BNKACNO",NOMINEE:"$_id.NOMINEE",JTNAME2:"$_id.JTNAME2",JTNAME1:"$_id.JTNAME1"}}
   ]    
   const pipeline1=[  //trans_karvy
           {$match : {"TD_ACNO":req.query.folio,"FUNDDESC":req.query.scheme}}, 
           {$group :{_id : {INVNAME:"$INVNAME",SCHEMEISIN:"$SCHEMEISIN",cnav:"$nav.NetAssetValue"},TD_UNITS:{$sum:"$TD_UNITS"}, TD_AMT:{$sum:"$TD_AMT"} }},
           {$group :{_id:{ INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN",cnav:"$nav.NetAssetValue"}, TD_UNITS:{$sum:"$TD_UNITS"},TD_AMT:{$sum:"$TD_AMT"} }},
           {$lookup: { from: 'cams_nav',localField: '_id.SCHEMEISIN',foreignField: 'ISINDivPayoutISINGrowth',as: 'nav' } },
           {$project:  {_id:0, INVNAME:"$_id.INVNAME",SCHEMEISIN:"$_id.SCHEMEISIN", cnav:"$nav.NetAssetValue"  , UNITS:{$sum:"$TD_UNITS"},AMOUNT:{$sum:"$TD_AMT"} }   },
      ] 
  
   var transc = mongoose.model('trans_cams', transcams, 'trans_cams');   
   var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy'); 
    var foliok = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');    
   //var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');          
        transc.aggregate(pipeline, (err, data) => {
           transk.aggregate(pipeline1, (err, data1) => {
               foliok.aggregate(pipeline11, (err, data2) => {
              // transf.aggregate(pipeline2, (err, data2) => {
                if(data2 != 0  || data1 != 0 || data != 0){     
                       if (err) {
                           res.send(err);
                       }
                       else {
                          let merged = [];
                            merged = data1.map((item, i) => Object.assign({}, item, data2[i]));
                        //   //merged = data1.map((item, i) => Object.assign({}, item, data2.map((items, j) => Object.assign({}, items, data[j]))));
                        //   console.log("merged=",merged)
                          var datacon = merged.concat(data)
                           var removeduplicates = Array.from(new Set(datacon));
                          res.send(removeduplicates);
                           return removeduplicates;
                       }
                    }
               });
           });
       });
})
       
       app.post("/api/getschemelist", function (req, res) {
        var resdata="";
           Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
           {data:{ email:req.body.email}}
             ).then(function(result) {
               if(result.data.data  === undefined || req.body.email == ''){
                   resdata= {
                       status:400,
                       message:'Data not found',            
                  }
                  res.json(resdata) 
                  return resdata;
               }else{          
              if(result.data.data === undefined || result.data.data == '' || result.data.message == "Bank details not found "){
                   resdata= {
                       status:400,
                       message:'Data not found',            
                  }
                  res.json(resdata) 
                  return resdata;
               }else{
               var pan =  result.data.data.User[0].pan_card;
                var transc = mongoose.model('trans_cams', transcams, 'trans_cams');
                var transk = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
                var transf = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
               const pipeline = [
                        {$match : {PAN:pan}},
                        {$group : {_id : { AMC_CODE:"$AMC_CODE", PRODCODE:"$PRODCODE", code :{$reduce:{input:{$split:["$PRODCODE","$AMC_CODE"]},initialValue: "",in: {$concat: ["$$value","$$this"]}} }  }}},
                        {$lookup:
                        {
                        from: "products",
                        let: { ccc: "$_id.code", amc:"$_id.AMC_CODE"},
                        pipeline: [
                            { $match:
                                { $expr:
                                    { $and:
                                    [
                                        { $eq: [ "$PRODUCT_CODE",  "$$ccc" ] },
                                        { $eq: [ "$AMC_CODE", "$$amc" ] }
                                    ]
                                    }
                                }
                            },
                            { $project: {  _id: 0 } }
                        ],
                        as: "products"
                        }},
                        {$project :{ _id:0 , products:"$products" } },
                   ]
                const pipeline1=[  //trans_karvy
                    {$match : {PAN1:pan,SCHEMEISIN : {$ne : null}}}, 
                    {$group : {_id:{SCHEMEISIN:"$SCHEMEISIN"} }},
                    {$lookup: { from: 'products',localField: '_id.SCHEMEISIN',foreignField: 'ISIN',as: 'master' } },
                    { $unwind: "$master"},
                    {$project:{_id:0,products:"$master" }   },
               ] 
                const pipeline2=[ ///trans_franklin
                    {$match : {IT_PAN_NO1:pan,ISIN : {$ne : null}}}, 
                    {$group : {_id:{ISIN:"$ISIN"} }},
                    {$lookup: { from: 'products',localField: '_id.ISIN',foreignField: 'ISIN',as: 'master' } },
                    { $unwind: "$master"},
                    {$project:{_id:0,products:"$master" }   },
              ] 
                transc.aggregate(pipeline, (err, newdata2) => {
                   transf.aggregate(pipeline2, (err, newdata1) => {
                        transk.aggregate(pipeline1, (err, newdata) => {
                               if(newdata2.length != 0  || newdata1.length != 0 || newdata.length != 0){        
                                    resdata= {
                                       status:200,
                                       message:'Successfull',
                                       data:  newdata2
                                     }
                                   }else{
                                       resdata= {
                                       status:400,
                                       message:'Data not found',            
                                  }
                                   }
                                   var datacon = newdata2.concat(newdata1.concat(newdata))
                                   datacon = datacon.map(JSON.stringify).reverse() // convert to JSON string the array content, then reverse it (to check from end to begining)
                                   .filter(function(item, index, arr){ return arr.indexOf(item, index + 1) === -1; }) // check if there is any occurence of the item in whole array
                                   .reverse().map(JSON.parse) ;
                                    resdata.data = datacon
                                   res.json(resdata)  
                                   return resdata    
                                           
                          });
                       });
          
                     });   
                    
                }   
            }
           });
           })
    

app.get("/api/getfoliocams", function (req, res) {
    var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    model.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
})



app.post("/api/savecamsnav1", function (req, res) {
   var model = mongoose.model('cams_nav', navcams, 'cams_nav');
   //var model = mongoose.model('products', productdata, 'products');
    try{
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data);
            }
        });
    }
}catch(err){
console.log(e)
}
})

app.post("/api/savecamstrans", function (req, res) {
    var model = mongoose.model('cams_trans', cams_transSchema, 'cams_trans');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log(data);
            }
        });
    }
})

app.post("/api/savefoliocams", function (req, res) {
    var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            // else {
            //     //res.send({data:"Record has been Inserted..!!"});
            //     //console.log(data);
                
            // }
        });
    }
    console.log("successfully inserted")
})

app.post("/api/savefoliocamsold", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
       db.collection('folio_cams').updateMany(
                    { pan_no: req.body[i].pan_no , product: req.body[i].product }, 
                      {$set: 
                        { amc_code : req.body[i].amc_code ,
                          foliochk : req.body[i].foliochk ,
                          inv_name: req.body[i].inv_name ,
                          sch_name : req.body[i].sch_name ,
                          jnt_name1 : req.body[i].jnt_name1 ,
                          jnt_name2 : req.body[i].jnt_name2 ,
                          holding_nature : req.body[i].holding_nature ,
                          joint1_pan : req.body[i].joint1_pan ,
                          bank_name : req.body[i].bank_name ,
                          ac_no : req.body[i].ac_no ,
                          nom_name : req.body[i].nom_name ,
                          nom2_name : req.body[i].nom2_name ,
                          nom3_name : req.body[i].addres ,
                          ifsc_code : req.body[i].ifsc_code ,
                          product : req.body[i].product ,
                          pan_no : req.body[i].pan_no ,
                    }}, 
                    {
                        "upsert":true
                     }, 
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                           // console.dir("successfully");
                        }
                    })
}

 })

 app.post("/api/savetranscams1", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
       db.collection('trans_cams').updateMany(
                    { trxnno: req.body[i].trxnno }, 
                      {$set: 
                        { folio_no : req.body[i].folio_no ,
                          scheme : req.body[i].scheme ,
                          inv_name: req.body[i].inv_name ,
                          traddate : req.body[i].traddate ,
                          units : req.body[i].units ,
                          amount : req.body[i].amount ,
                          trxn_nature : req.body[i].trxn_nature ,
                          scheme_type : req.body[i].scheme_type ,
                          pan : req.body[i].pan ,
                          trxn_type_flag : req.body[i].trxn_type_flag ,
                          amc_code : req.body[i].amc_code ,
                          prodcode : req.body[i].prodcode ,
                          trxnno : req.body[i].trxnno ,
                    }}, 
                    {
                        "upsert":true
                     }, 
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                           // console.dir("successfully");
                        }
                    })
}

 })
 app.post("/api/savetranscams", function (req, res) {
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                 console.log(data)       
            }
        });
    }
    console.log("successfully inserted");
})

app.post("/api/savefoliokarvy", function (req, res) {
    var model = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            // else {
            //     //res.send({data:"Record has been Inserted..!!"});
                
            //     //console.log(data);
            // }
        });
    }
    console.log("successfully inserted")
})

app.post("/api/savefoliofranklin", function (req, res) {
    var model = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            // else {
            //     //res.send({data:"Record has been Inserted..!!"});
                
            //     //console.log(data);
            // }
        });
    }
    console.log("successfully inserted")
})



app.post("/api/savetranskarvy", function (req, res) {
    var model = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            // else {
            //   //  res.send({data:"Record has been Inserted..!!"});
            //     //console.log("foliokarvy="+foliofranklin)
            //     console.log("successfully inserted");
            // }
        });
    }
    console.log("successfully inserted");
})

app.post("/api/savetransfranklin", function (req, res) {
    var model = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    for (i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            // else {
            //     //res.send({data:"Record has been Inserted..!!"});
            //     //console.log("foliokarvy="+foliofranklin)
            //     console.log("successfully inserted");
            // }
        });
    }
    console.log("successfully inserted");
})

app.post("/api/Updatecamsnav", function(req, res) {
    var model = mongoose.model('cams_nav', cams_navSchema, 'cams_nav');  
    var i;
for (i = 0; i < req.body.length; i++) {   
  // model.find({trxnno : req.body[i].trxnno}).exec(function(err, newdata) {
  //  if (!newdata.length){   
        //console.log("length="+newdata.length);  
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                console.log(data);
                //res.send({data:"Record has been Inserted..!!"});
            }
        });

/*    } else {

        let folio_no="";
        var data = { $set:{ "folio_no" : req.body[i].folio_no ,
            "scheme" : req.body[i].scheme , inv_name : req.body[i].inv_name ,
            traddate: req.body[i].traddate ,
            units: req.body[i].units,
            amount: req.body[i].amount ,
             trxn_nature: req.body[i].trxn_nature,
            scheme_type: req.body[i].scheme_type,
            pan: req.body[i].pan,
            trxn_type_flag: req.body[i].trxn_type_flag }  }
            
        db.cams_nav.update({}, data,{multi:true}, (err , collection) => {
          if (err) throw err;
           console.log('Name exists already3='+collection);
        });
        
    }  */
 // });
}

})

app.post("/api/savecamsnav", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
       db.collection('cams_nav').updateMany(
                    { SchemeCode: req.body[i].SchemeCode }, 
                      {$set: 
                        { 
                          Date : new Date(req.body[i].Date) ,
                          NetAssetValue : Number(req.body[i].NetAssetValue) ,
                          SchemeName : req.body[i].SchemeName ,
                          ISINDivReinvestment : req.body[i].ISINDivReinvestment ,
                          ISINDivPayoutISINGrowth : req.body[i].ISINDivPayoutISINGrowth,
                          SchemeCode : req.body[i].SchemeCode ,
                    }}, 
                    {
                        "upsert":true
                     }, 
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                            console.dir("successfully");
                        }
                    })
}

 })

//api for Update data from database
app.post("/api/Updatedata", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
       db.collection('cams_nav').findAndModify(
                    {trxnno: req.body[i].trxnno}, // query
                    [['_id','asc']],  // sort order
                    {$set: { folio_no : req.body[i].folio_no ,
                        scheme : req.body[i].scheme ,
                        inv_name : req.body[i].inv_name ,
                        traddate: req.body[i].traddate ,
                        units: req.body[i].units,
                        amount: req.body[i].amount ,
                        trxn_nature: req.body[i].trxn_nature ,
                        scheme_type: req.body[i].scheme_type ,
                        pan: req.body[i].pan ,
                        trxn_type_flag: req.body[i].trxn_type_flag 
                        }}, // replacement, replaces only the field "hi"
                    {}, // options
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                            console.dir("successfully");
                            //console.dir(object);
                        }
                    })
}

 })

 app.post("/api/Updateinsertdata", function (req, res) {
    for (i = 0; i < req.body.length; i++) {   
       db.collection('cams_nav').updateMany(
                    { name : req.body[i].name}, 
                      {$set: { name : req.body[i].name ,
                        pin : req.body[i].pin ,
                        ages: req.body[i].ages ,
                        addres : req.body[i].addres ,
                    }}, 
                    {
                        "upsert":true
                     }, // options
                    function(err, object) {
                        if (err){
                            console.warn(err.message);  // returns error if no matching object found
                        }else{
                            console.dir("successfully");
                            //console.dir(object);
                        }
                    })
                  //  console.dir("qry="+gg)
}

 })

// call by default index.html page
app.get("*", function (req, res) {
    res.sendFile(srcpath + '/index.html');
})

//server stat on given port
app.listen(port, function () {
    console.log("server start on port" + port);
})
