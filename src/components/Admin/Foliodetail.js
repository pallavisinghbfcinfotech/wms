import React, { Component } from 'react'
import $ from 'jquery';
import Axios from 'axios';
import '../../../node_modules/aos/dist/aos.css';


//var createReactClass = require('create-react-class');

class Addbook extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data1: [],
      data2: [],
      data3:[],
      data4:[],
      secdrp:'',
    };
  }

  

changeScheme = (e) =>{
  var sel = e.target.value;
  var folioval = this.state.secdrp;
  //alert(e)
//alert(this.state.secdrp)
  $.ajax({
    url: "http://localhost:3001/api/getfoliodetail",
    type: "GET",
    data:{scheme:sel,folio:folioval},
     success: function (res4) {
      this.setState({ data4: res4 });
      $("#detail").show();
      // var foliodetail = "";
      
      // {this.state.data4.map((item, index) => (
      //   foliodetail +="<div className='card-body box-profile'><h3 className='profile-username text-center'>"+item.INVNAME+"</h3><ul className='list-group list-group-unbordered mb-3'><li className='list-group-item'><b>Units</b> <a className='float-right'>"+(item.UNITS).toFixed(2)+"</a></li><li className='list-group-item'><b>Current Value</b> <a className='float-right'>"+(item._id.cnav * item.UNITS).toFixed(2)+"</a></li><li className='list-group-item'><b>Bank</b> <a className='float-right'>"+item.BANK_NAME+"</a></li><li className='list-group-item'><b>Account No.</b> <a className='float-right'>"+item.AC_NO+"</a></li><li className='list-group-item'><b>Joint 1</b> <a className='float-right'>"+item.JTNAME1+"</a></li><li className='list-group-item'><b>Joint 2</b> <a className='float-right'>"+item.JTNAME2+"</a></li><li className='list-group-item'><b>Nominee</b> <a className='float-right'>"+item.NOMINEE+"</a></li></ul></div>" 
      // ))}
      // $("#detail").html(foliodetail);
    }.bind(this),
    error: function(jqXHR) {
      console.log(jqXHR);         
    }
  });   
}

changeFolio = (e) =>{
  var sel = e.target.value;
  this.setState({secdrp:sel})
  $.ajax({
    url: "http://localhost:3001/api/getscheme",
    type: "GET",
    data:{folio:sel},
     success: function (res3) {
      this.setState({ data3: res3 });
      var schemename = "<option value=''>Select Scheme</option>";
      var foliodetail = "";
      {this.state.data3.map((item, index) => (
        schemename += "<option value='"+item+"'>"+item+"</option>"   
      ))}
      $("#scheme").html(schemename);
      $("#detail").hide();
    }.bind(this),
    error: function(jqXHR) {
      console.log(jqXHR);         
    }
  });   
}

  changeApplicant = (e) =>{
    var sel = e.target.value;
    $.ajax({
      url: "http://localhost:3001/api/getfolio",
      type: "GET",
      data:{name:sel},
       success: function (res2) {
        this.setState({ data2: res2 });
        var folionumber = "<option value=''>Select Folio No.</option>";
        var schemename = "<option value=''>Select scheme</option>";
        var foliodetail = "";
        {this.state.data2.map((item, index) => (
          folionumber += "<option value='"+item+"'>"+item+"</option>"   
        ))}
        $("#folio").html(folionumber);
        $("#scheme").html(schemename);
        $("#detail").hide();
      }.bind(this),
      error: function(jqXHR) {
        console.log(jqXHR);         
      }
    });   
}

  componentDidMount(){
    document.title = "WMS | Folio Detail"
    $.ajax({
      url: "http://localhost:3001/api/getapplicant",
      type: "GET",
       success: function (res1) {
        this.setState({ data1: res1});
      }.bind(this),
      error: function(jqXHR) {
        console.log(jqXHR);          
      }
    });
  }
  render(){
  return (  
    <>
    <style jsx>
      {`
      .list-group-item:hover{
        border:none!important;
      }
      `}
      </style>
    <div className="content-wrapper">
     <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Folio Details</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Folio Details</li>
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
              <div className="col-md-6">
                {/* general form elements */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">View Folio</h3>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <fieldset>
                  {/* <legend>Personalia:</legend> */}
                  <form role="form">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Applicant</label>
                            <select className="form-control"  onChange={this.changeApplicant}>
                              <option value={""}>Select Applicant</option>
                              {this.state.data1.map((item, index) => (
                                    <option value={item.PAN}>{item.INVNAME}/{item.PAN}</option> 
                                  
                                ))}
                             </select>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Folio :</label>
                            <select className="form-control" id="folio" onChange={this.changeFolio}>
                              <option value={""}>Select Folio No.</option>
                             
                            </select>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Scheme :</label>
                            <select className="form-control"  id="scheme" onChange={this.changeScheme} >
                              <option value={""}>Select Scheme</option>
                              
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* /.card-body */}
                    {/* <div className="card-footer">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div> */}
                  </form>
                  </fieldset>
                </div>
                {/* /.card */}                
              </div>
              {/*/.col (left) */}
              {/* right column */}
              <div className="col-md-6">
                {/* general form elements */}
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Folio Detail</h3>
                  </div>
                  {/* /.card-header */}
                  <div className="card card-primary card-outline" id="detail">
                  {this.state.data4.map((item, index) => (
                    <div className="card-body box-profile">
                      <h3 className="profile-username text-center">{item.INVNAME}</h3>
                      <ul className="list-group list-group-unbordered mb-3">         
                        <li className="list-group-item">
                          <b>Units</b> <a className="float-right">{(item.UNITS).toFixed(2)}</a>
                        </li>
                        <li className="list-group-item">
                          <b>Current Value</b> <a className="float-right">{(item.cnav * item.UNITS).toFixed(2)}</a>
                        </li>
                        <li className="list-group-item">
                          <b>Bank</b> <a className="float-right">{item.BANK_NAME}</a>
                        </li>
                        <li className="list-group-item">
                          <b>Account No.</b> <a className="float-right">{item.AC_NO}</a>
                        </li>
                        <li className="list-group-item">
                          <b>Joint 1</b> <a className="float-right">{item.JTNAME1}</a>
                        </li>
                        <li className="list-group-item">
                           <b>Joint 2</b> <a className="float-right">{item.JTNAME2}</a>
                        </li>
                        <li className="list-group-item">
                          <b>Nominee</b> <a className="float-right">{item.NOMINEE}</a>
                        </li>
                      </ul>
                    </div>
  ))}
                  </div>
                </div>
                {/* /.card */}                
              </div>
              {/*/.col (right) */}
              
            </div>
            {/* /.row */}
          </div>{/* /.container-fluid */}
        </section>
      </div>
    </>
  );
 }
};

export default Addbook;
