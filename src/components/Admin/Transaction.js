import React, { Component } from 'react'
import $ from 'jquery';
import Moment from 'moment';
//import MonthPickerInput  from 'react-month-picker-input';
//import 'react-month-picker-input/dist/react-month-picker-input.css'

class Transaction  extends Component {
  
  constructor(props) {
    super(props);
    this.handlechange1 = this.handlechange1.bind(this);
    this.onChanger1 = this.onChanger1.bind(this);
    this.onChanger2 = this.onChanger2.bind(this);

    this.state = {
      data1:[],
      data2:[],
      data3:[],
      msg:"",
      msg3:"",
      rvalue:'',
      user:'',
      defaultValue:"",
      year:'',
      mon:'',
    };
  }
  onChanger1(e) {
    this.setState({
      rvalue: e.target.value    
    });
    var sel = document.getElementById("getcalender").value;
    var mon = sel.split('-')[1];
    var yer = sel.split('-')[0];
    if(e.target.value === "yes"){
    $.ajax({
       url: "http://localhost:3001/api/gettransactionall",
       type: "POST",
       data:{month:mon,year:yer},
        success: function (res1) {
          this.setState({
            data1: res1.data,
            msg: res1.message});
       }.bind(this)
       
     });
    }else{
      $.ajax({
        url: "http://localhost:3001/api/gettransactionuserwise",
        type: "POST",
        data:{month:mon,year:yer,pan:e.target.value},
         success: function (res3) {
          this.setState({
            data3: res3.data,
            msg3: res3.message});
        }.bind(this),
        error: function(jqXHR) {
          console.log(jqXHR);          
        }
      });
    }
 }
  onChanger2(e) {
    this.setState({
      rvalue: e.target.value    
    });
    if(e.target.value === "no"){
      $.ajax({
        url: "http://localhost:3001/api/getapplicant",
        type: "GET",
         success: function (res2) {
          this.setState({ data2: res2 });
        }.bind(this),
        error: function(jqXHR) {
          console.log(jqXHR);          
        }
      });
    }
    //alert(e.target.value)
  }
  
  changeApplicant = (e) =>{
    document.title = "WMS | Folio Detail"
    var sel = document.getElementById("getcalender").value;
  //var user = document.getElementById("user").value;
    var mon = sel.split('-')[1];
    var yer = sel.split('-')[0];
    //alert(mon)
   // alert(yer)
    $.ajax({
      url: "http://localhost:3001/api/gettransactionuserwise",
      type: "POST",
      data:{month:mon,year:yer,pan:e.target.value},
       success: function (res3) {
        this.setState({
          data3: res3.data,
          msg3: res3.message});
      }.bind(this),
      error: function(jqXHR) {
        console.log(jqXHR);          
      }
    });
}
  
handlechange1(){

  var sel = document.getElementById("getcalender").value;
   var mon = sel.split('-')[1];
   var yer = sel.split('-')[0];
 //  alert(mon)
 //  alert(yer)
 //  alert(this.state.rvalue)
 if(this.state.rvalue === "yes"){
   $.ajax({
     url: "http://localhost:3001/api/gettransactionall",
     type: "POST",
     data:{month:mon,year:yer},
      success: function (res1) {
       this.setState({
          data1: res1.data,
          msg: res1.message});
     }.bind(this),
     error: function(jqXHR) {
       console.log(jqXHR);         
     }
   });   
 }else if(this.state.rvalue === "no"){
   var user = document.getElementById("user").value;
   $.ajax({
     url: "http://localhost:3001/api/gettransactionuserwise",
     type: "POST",
     data:{month:mon,year:yer,pan:user},
      success: function (res3) {
       this.setState({
         data3: res3.data,
         msg3: res3.message});
     }.bind(this)
   });
 }else{

 }
}
  componentDidMount(){
    document.title = "WMS | Folio Detail"
    var sel = document.getElementById("getcalender").value;
    var mon = sel.split('-')[0];
    var yer = sel.split('-')[1];
    this.setState({
      year: yer,
      mon: mon  
    });
    $.ajax({
      url: "http://localhost:3001/api/gettransactionall",
      type: "POST",
      data:{month:mon,year:yer},
       success: function (res1) {
        this.setState({
          data1: res1.data,
          msg: res1.message});
      }.bind(this),
      error: function(jqXHR) {
        console.log(jqXHR);          
      }
    });
  
  //}
  }
  
  render() {      
    return (  
      <>
      <style jsx>
      {`
      .list-group-item{
        border:none!important;
      }
      .list-group-item:hover{
        border:none!important;
      }
      .normal-table .table td, .normal-table .table th {
        padding: .30rem;
      }
      .table-fix-height{
        height:500px;
      }
      `}
        </style>
      <div className="content-wrapper">
       <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>My Transactions</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">My Transactions</li>
                  </ol>
                </div>
              </div>
            </div>{/* /.container-fluid */}
          </section>
          {/* Main content */}
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* left column */}
                <div className="col-md-12 offset-md-0">
                <div className="row">
                      <div className="col-md-4 offset-md-4 mt-3">
                      <div className="form-group">
                            <label>Select Month</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                    <i className="far fa-calendar-alt" />
                                    </span>
                                </div>
                                <input type="month" className="form-control" defaultValue="2021-02" style={{height: '30px'}} id="getcalender" onChange={this.handlechange1}/>
                                {/* <div>
                                <MonthPickerInput year={2021} month={1} closeOnSelect={true}  maxYear={2021} onChange={this.handlechange} id="calender"/>
                                </div> */}
                                
                            </div>
                            {/* /.input group */}
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-12 form-group text-center check_btn">
                      <div className="form-group clearfix" style={{marginLeft:'-144px'}}>
                      <div className="icheck-primary d-inline mr-5">
                        <input type="radio" id="radioPrimary1" name="r1" defaultValue="yes" onClick={this.onChanger1} />
                        <label for="radioPrimary1">
                          All
                        </label>
                      </div>
                      <div className="icheck-primary d-inline">
                        <input type="radio" id="radioPrimary2" name="r1" defaultValue="no" onClick={this.onChanger2}   />
                        <label for="radioPrimary2">
                        Clientwise
                        </label>
                      </div>
                    </div>
                        {/* <div className="form-check-inline">
                          <input type="radio" id="yes" name="kstatus" defaultValue="yes" onClick={this.onChangekstatus}  />
                          <label htmlFor="yes">ALL</label>&nbsp;   <br/>
                        </div> */}
                        {/* <div className="form-check-inline">
                          <input type="radio" id="no" name="kstatus" defaultValue="no" onClick={this.onChangekstatus}/>
                          <label htmlFor="no">Userwise</label>
                        </div>  */}
                      </div>
                    </div>
                    { ( this.state.rvalue==='yes')? (
	  <div> 
			 
       { (this.state.msg==='Successfull')? (
                      <div className="card">
                        <div className="card-header bg-primary">
                          <h3 className="card-title"></h3>
                          <div className="card-tools">
                            {/* <div className="input-group input-group-sm" style={{width: '150px'}}>
                              <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                              <div className="input-group-append">
                                <button type="submit" className="btn btn-default"><i className="fas fa-search" /></button>
                              </div>
                            </div> */}
                          </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                       
                        <table id="example1" className="table table-bordered table-striped">
                        <thead className="bg-primary">
                              <tr>
                                <th>S. No.</th>
                                <th>Date</th>
                                <th>Folio no</th>
                                <th>Scheme</th>
                                <th>Amount</th>
                                <th>Trxn Type</th>
                              </tr>
                            </thead>
                           
                            <tbody>
                            {this.state.data1.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td> 
                                    <td>{Moment(item.TRADDATE).format('DD/MM/YYYY')}</td>
                                    <td>{item.FOLIO_NO}</td>
                                    <td>{item.SCHEME}</td>
                                    <td>{item.AMOUNT}</td>
                                    {(item.TRXN_NATUR.match(new RegExp(`${"Systematic - To"}`)) || item.TRXN_NATUR.match(new RegExp(`${"S T P"}`))) ? (
                                     <td>STP</td> ) :(item.TRXN_NATUR.match(new RegExp(`${"Systematic"}`))  && (Math.sign(item.AMOUNT) === -1)) ? (
                                      <td>SIP Reversal</td>  ) :(item.TRXN_NATUR.match(new RegExp(`${"Lateral Shift In"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Switch-In"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Transfer-In"}`))) ? (
                                        <td>Switch In</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Lateral Shift Out"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Switchout"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Transfer-Out"}`)) ) ? (
                                          <td>Switch Out</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Redemption"}`)) ) ? (
                                            <td>Redemption</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Purchase"}`)) ) ? (
                                              <td> Purchase</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Dividend Reinvest"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Dividend Paid"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Div. Reinvestment"}`)) ) ? (
                                                <td> Dividend </td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Gross Dividend"}`))  ) ? (
                                                  <td> Dividend Payout</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Consolidation In"}`))  ) ? (
                                                    <td> Con In</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Consolidation Out"}`))  ) ? (
                                                      <td> Con Out</td>  ):(
                                                      <td>SIP</td> ) }
                                </tr>
                            
                            ))}
                                
                              </tbody>
                              
                          </table>
                          
                        </div>
                        {/* /.card-body */}
                      </div>
                        ):  (<div align="center"  className="col-sm-10">
                          <br/>
                        <h6>Data Not Found</h6>
                      </div>)}
			 
	  </div>
	  
	   ): ( this.state.rvalue==='no')?(
          <div>
            <form role="form">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Applicant</label>
                            <select className="form-control" onChange={this.changeApplicant} id="user">
                              <option>Select Applicant</option>
                              {this.state.data2.map((item, index) => (
                                     <option value={item.PAN}>{item.INVNAME}/{item.PAN}</option>  
                                ))}
                             </select>
                          </div>
                        </div>
                        </div>
                        </div>
                        </form>
                        <div> 
			 
       { (this.state.msg3==='Successfull')? (
                      <div className="card">
                        <div className="card-header bg-primary">
                          <h3 className="card-title"></h3>
                          <div className="card-tools">
                            {/* <div className="input-group input-group-sm" style={{width: '150px'}}>
                              <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                              <div className="input-group-append">
                                <button type="submit" className="btn btn-default"><i className="fas fa-search" /></button>
                              </div>
                            </div> */}
                          </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                       
                       <table id="example1" className="table table-bordered table-striped">
                       <thead className="bg-primary">
                              <tr>
                                <th>S. No.</th>
                                <th>Date</th>
                                <th>Folio no</th>
                                <th>Scheme</th>
                                <th>Amount</th>
                                <th>Trxn Type</th>
                               </tr>
                            </thead>
                           
                            <tbody>
                            {this.state.data3.map((item, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td> 
                                    <td>{Moment(item.TRADDATE).format('DD/MM/YYYY')}</td>
                                    <td>{item.FOLIO_NO}</td>
                                    <td>{item.SCHEME}</td>
                                    <td>{item.AMOUNT}</td>
                                    {(item.TRXN_NATUR.match(new RegExp(`${"Systematic - To"}`)) || item.TRXN_NATUR.match(new RegExp(`${"S T P"}`))) ? (
                                     <td>STP</td> ) :(item.TRXN_NATUR.match(new RegExp(`${"Systematic"}`))  && (Math.sign(item.AMOUNT) === -1)) ? (
                                      <td>SIP Reversal</td>  ) :(item.TRXN_NATUR.match(new RegExp(`${"Lateral Shift In"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Switch-In"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Transfer-In"}`))) ? (
                                        <td>Switch In</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Lateral Shift Out"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Switchout"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Transfer-Out"}`)) ) ? (
                                          <td>Switch Out</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Redemption"}`)) ) ? (
                                            <td>Redemption</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Purchase"}`)) ) ? (
                                              <td> Purchase</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Dividend Reinvest"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Dividend Paid"}`)) || item.TRXN_NATUR.match(new RegExp(`${"Div. Reinvestment"}`)) ) ? (
                                                <td> Dividend </td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Gross Dividend"}`))  ) ? (
                                                  <td> Dividend Payout</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Consolidation In"}`))  ) ? (
                                                    <td> Con In</td>  ):(item.TRXN_NATUR.match(new RegExp(`${"Consolidation Out"}`))  ) ? (
                                                      <td> Con Out</td>  ):(
                                                      <td>SIP</td> ) }
                                </tr>
                            
                            ))}
                                
                              </tbody>
                              
                          </table>
                          
                        </div>
                        {/* /.card-body */}
                      </div>
                        ):  (<div align="center"  className="col-sm-10">
                          <br/>
                        <h6>Data Not Found</h6>
                      </div>)}
			 
	  </div>
             </div>
             
             ): (<div> <br /> </div>)}

                      {/* /.card */}
                </div>
                {/*/.col (left) */}
              </div>
              {/* /.row */}
            </div>{/* /.container-fluid */}
          </section>
        </div>
      </>
    );






   
  }
}
export default Transaction ;
