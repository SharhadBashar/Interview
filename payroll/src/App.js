import React, {Component} from 'react';
import './Style.css';
import {ReportAPI} from "./api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      uploading: false,
      uploaded: false,
      uploadError: null,
      loading: false,
      data: [],
    }
  }

  componentDidMount(){
    this.loadReport();
  }

  loadReport= () => {
    this.setState({loading: true});
    ReportAPI.get().then((data) => {
      this.setState({
        loading: false,
        data: data,
      });
    });
  };

  handleUpload = (event) => {
    event.preventDefault();
    const file = new FormData();
    file.append('file', this.state.selectedFile);
    this.setState({uploading: true, uploaded: false});
    ReportAPI.uploadCSV(file)
      .then((res) => {
        this.setState({uploading: false, uploadError: null, uploaded: true});
        this.loadReport();
      })
      .catch(err => {
        this.setState({uploading: false, uploadError: err.response.body})
      })
  };

  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      uploadError: null,
    })
  };

  render() {
    return (
      <div>
        <h1>Welcome to the Payroll App</h1>
        {this.state.uploaded &&
        <div className="alert alert-success" role="alert">
          CSV File has successfully been uploaded!
        </div>
        }
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <label htmlFor="uploadFile">CSV Upload</label>
            {!this.state.uploading &&
              <input type="file" className="form-control-file" id="uploadFile" onChange={this.handleselectedFile}/>
            }
            {this.state.uploadError && <span className="text-danger">{this.state.uploadError}</span>}
          </div>
          <button className="btn btn-primary" type="submit">Upload!</button>
        </form>

        <br/>
        {!this.state.loading &&
        <div>
          <h2>Report</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Pay Period</th>
                <th>Amount Paid</th>
              </tr>
            </thead>
            <tbody>
            {this.state.data.map((row, index) => {
              return (
                <tr key={index}>
                  <td>
                    {row.employee_id}
                  </td>
                  <td>
                    {row.pay_period}
                  </td>
                  <td>
                    ${row.amount_paid}
                  </td>
                </tr>
              )
            })}
            </tbody>
          </table>
        </div>
        }
      </div>

    );
  }
}

export default App;
