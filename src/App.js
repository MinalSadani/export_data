import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import firebase from './config'
import XLSX from 'xlsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
    this.exportFile = this.exportFile.bind(this)
  }

  componentWillMount(){
    this.getUsers()
  }

  getUsers() {
    let users = []
    
    firebase.database().ref(`users/`).on('value', snapshot => {
      snapshot.forEach(snap => {
        users.push(snap.val())
      })
      this.setState({
        users
      })
    })
  }

  exportFile() {
    let users = [["First Name", "Last Name", "Age", "Address", "Email"]]
    this.state.users.forEach((user) => {
      let userArray = [user.fname, user.lname, user.age, user.address, user.email]
      users.push(userArray)
    })

    const wb = XLSX.utils.book_new()
    const wsAll = XLSX.utils.aoa_to_sheet(users)
    
    XLSX.utils.book_append_sheet(wb, wsAll, "All Users")
		XLSX.writeFile(wb, "export_studentdata.xlsx")
  }

  render() {
    const userColumns = [
      {
        Header: "Student's Name",
        columns: [
          {
            Header: "First Name",
            id: "fname",   
            accessor: d => d.fname
          },
          {
            Header: "Last Name",
            id: "lname",  
            accessor: d => d.lname
          }
        ]
      },
      {
        Header: "Age",
        columns: [
          {
            id: "age",  
            accessor: d => d.age
          }
        ]
      },
      {
        Header: "Address",
        columns: [
          {
            id: "address",  
            accessor: d => d.address
          }
        ]
      },
      {
        Header: "Email",
        columns: [
          {
           
            id: "email",  
            accessor: d => d.email
          }
        ]
      }
    ]
    return (
      <div style={style}>
        <div>
          <h1><center>Student data</center></h1>
         
          <ReactTable
            style={{position:'center'}}
            data={this.state.users}
            columns={userColumns}
          />
          <center>
           <button style={{padding:'10px', marginTop:'10px'}}
            onClick={this.exportFile}>Export the data</button><br /></center>
        </div>
      </div>
    );
  }
}

const style = {
  display: 'flex',
  justifyContent: 'center',
}

export default App;
