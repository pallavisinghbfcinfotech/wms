import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
 import config from './config.js';
 import mongoose from 'mongoose';
 import path from 'path';
 import userRoute from './routes/userRoute.js';
 import productRoute from './routes/productRoute.js';
 import uploadRouter from './routes/uploadRouter.js';
import bodyParser from 'body-parser';
import orderRouter from './routes/orderRouter.js';
var Schema = mongoose.Schema;
import Axios from 'axios'
//import Schema from 'mongoose.Schema';
//import {Payouts}   from 'cashfree-sdk';
// const { Payouts } = require('./cashfree-sdk');

 
dotenv.config();

 


const mongodbUrl= config.MONGODB_URL;
 

console.log("I am mongodbUrflfffffffffffff", mongodbUrl);


mongoose.connect(mongodbUrl, {
	useNewUrlParser:true,
	useUnifiedTopology: true,
	//useCreateIndex:true,
	autoIndex: false, // Don't build indexes
	//useMongoClient: true,
	reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0
}).catch(error => console.log(error.reason));

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/uploads', uploadRouter);
app.use("/api/users/",userRoute);
app.use("/api/products", productRoute)
app.use('/api/orders', orderRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



const navcams = new Schema({
    SchemeCode: { type: String },
    ISINDivPayoutISINGrowth: { type: String },
    ISINDivReinvestment: { type: String },
    SchemeName: { type: String ,required: true},
    NetAssetValue: { type: Number },
    Date: { type: Date },
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
}, { versionKey: false });



//var getschema = require("../backend/route.js");//ravi line

var resdata="";

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
	
	console.log("sffffasdfadf");
	 var model2 = mongoose.model('folio_cams', foliocams, 'folio_cams');
	
    model2.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });
	console.log(" the end sffffasdfadf");
	
	
})

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
                  newdata2 != 0 ||
                  newdata1 != 0 ||
                  newdata != 0
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

  app.post("/api/gettransactionuserwise", function (req, res) {
    var mon = parseInt(req.body.month);
    var yer = parseInt(req.body.year);
    var pan = req.body.pan;
          const pipeline = [  ///trans_cams
            {$group :   {_id : {INV_NAME:"$INV_NAME",PAN:"$PAN",TRXN_NATUR:"$TRXN_NATUR",INV_NAME:"$INV_NAME",FOLIO_NO:"$FOLIO_NO",SCHEME:"$SCHEME",AMOUNT:"$AMOUNT",TRADDATE:"$TRADDATE"}}}, 
            {$project : {_id:0,INVNAME:"$_id.INV_NAME",PAN:"$_id.PAN",TRXN_NATUR:"$_id.TRXN_NATUR",INV_NAME:"$_id.INV_NAME",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRADDATE", month:{$month:('$_id.TRADDATE')}, year:{$year:('$_id.TRADDATE')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{PAN:pan}  ] }}
            ]
        const pipeline1 = [  ///trans_karvy
            {$group :   {_id : {INVNAME:"$INVNAME",PAN1:"$PAN1",TRDESC:"$TRDESC",INVNAME:"$INVNAME",TD_ACNO:"$TD_ACNO",FUNDDESC:"$FUNDDESC",TD_AMT:"$TD_AMT",TD_TRDT:"$TD_TRDT"}}}, 
            {$project : {_id:0,INVNAME:"$_id.INVNAME",PAN:"$_id.PAN1",TRXN_NATUR:"$_id.TRDESC",INV_NAME:"$_id.INVNAME",FOLIO_NO:"$_id.TD_ACNO",SCHEME:"$_id.FUNDDESC",AMOUNT:"$_id.TD_AMT",TRADDATE:"$_id.TD_TRDT", month:{$month:('$_id.TD_TRDT')}, year:{$year:('$_id.TD_TRDT')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{PAN:pan}  ] }}
            ]
        const pipeline2 = [  ///trans_franklin
            {$group :   {_id : {INVESTOR_2:"$INVESTOR_2",IT_PAN_NO1:"$IT_PAN_NO1",TRXN_TYPE:"$TRXN_TYPE",FOLIO_NO:"$FOLIO_NO",SCHEME_NA1:"$SCHEME_NA1",AMOUNT:"$AMOUNT",TRXN_DATE:"$TRXN_DATE"}}}, 
            {$project : {_id:0,INVNAME:"$INVESTOR_2",PAN:"$_id.IT_PAN_NO1",TRXN_NATUR:"$_id.TRXN_TYPE",FOLIO_NO:"$_id.FOLIO_NO",SCHEME:"$_id.SCHEME_NA1",AMOUNT:"$_id.AMOUNT",TRADDATE:"$_id.TRXN_DATE", month:{$month:('$_id.TRXN_DATE')}, year:{$year:('$_id.TRXN_DATE')}  }},
            {$match :   { $and: [  { month: mon }, { year: yer },{PAN:pan} ] }}
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
                                    return resdata
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
		        { $unwind: "$products"},
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

app.get("/api/getfoliolist", function (req, res) {
    Axios.get('https://prodigyfinallive.herokuapp.com/getUserDetails',
    {data:{ email:'sunilguptabfc@gmail.com'}}
      ).then(function(result) {
        //let json = CircularJSON.stringify(result);
        var pan =  result.data.data.User[0].pan_card;
        var folio = mongoose.model('folio_cams', foliocams, 'folio_cams');
        var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
        var datacollection = folio.find({"pan_no":pan}).distinct("foliochk", function (err, newdata) { 
            if(newdata != 0){    
                     resdata= {
                        status:200,
                        message:'Successfull',
                        data:  newdata 
                      }
                    }else{
                     resdata= {
                        status:400,
                        message:'Data not found',            
                   }
                      // res.send(newdata);
                    }
                 //   res.json(resdata)    
                });
        var trans = mongoose.model('trans_cams', transcams, 'trans_cams');
        var datacollection1 = trans.find({"pan":pan}).distinct("folio_no", function (err, newdata) { 
            if(newdata != 0){    
                     resdata1= {
                        status:200,
                        message:'Successfull',
                        data:  newdata 
                      }
                    }else{
                        resdata1= {
                        status:400,
                        message:'Data not found',            
                   }
                      // res.send(newdata);
                    }
                    //res.json(resdata1)
                    var datacon = resdata.data.concat(resdata1.data)
                    var removeduplicates = Array.from(new Set(datacon));
                    resdata.data = removeduplicates
                  //  console.log(datacon)
                  //  console.log(removeduplicates)
                    res.send(resdata)
                
                });
    
            //return resdata
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



app.post("/api/savecamsnav", function (req, res) {
    var model = mongoose.model('cams_nav', nav_cams, 'cams_nav');
    for (var i = 0; i < req.body.length; i++) {
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


app.post("/api/savecamstrans", function (req, res) {
    var model = mongoose.model('cams_trans', cams_transSchema, 'cams_trans');
    for (var i = 0; i < req.body.length; i++) {
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
    for (var i = 0; i < req.body.length; i++) {
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

app.post("/api/savefoliokarvy", function (req, res) {
    var model = mongoose.model('folio_karvy', foliokarvy, 'folio_karvy');
    for (var i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliokarvy)
                console.log(data);
            }
        });
    }
})

app.post("/api/savefoliofranklin", function (req, res) {
    var model = mongoose.model('folio_franklin', foliofranklin, 'folio_franklin');
    for (var i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

app.post("/api/savetranscams", function (req, res) {
    var model = mongoose.model('trans_cams', transcams, 'trans_cams');
    for (var i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

app.post("/api/savetranskarvy", function (req, res) {
    var model = mongoose.model('trans_karvy', transkarvy, 'trans_karvy');
    for (var i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
})

app.post("/api/savetransfranklin", function (req, res) {
    var model = mongoose.model('trans_franklin', transfranklin, 'trans_franklin');
    for (var i = 0; i < req.body.length; i++) {
        var mod = new model(req.body[i]);
        mod.save(function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                //res.send({data:"Record has been Inserted..!!"});
                //console.log("foliokarvy="+foliofranklin)
                console.log(data);
            }
        });
    }
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

 app.get("/api/getuserdetail", function (req, res) {
    var model = mongoose.model('folio_cams', foliocams, 'folio_cams');
    //console.log("hh2="+req.body.data)
    db.collection('folio_cams').aggregate({ $group: { amc_code: { $addToSet: '$amc_code' } } },);
  
})

















/* app.get('/', (req, res)=>{
	res.send('server is ready')
}) */

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

const port= process.env.PORT ||  3000;



// app.get("/api/products/:id", (req, res)=>{
// 	//res.send(data.products);
// 		const productId= req.params.id;
// 		const product= data.products.find(x => x._id === productId);
// 		if(product){
// 			res.send(product)
// 		}else{
// 			res.status(404).send({ msg: "Product Not Found"})
// 		}
// });

///////////////////////////

// app.get("/api/products", (req, res)=>{
// 	res.send(data.products);
// });

app.use((err, req, res, next) => {
	res.status(500).send({ message: err.message });
  });

app.listen(port, ()=> { console.log("server started at port ",port)})
