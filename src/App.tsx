import './App.css';
import notify from './Services/Notify';
import 'notyf/notyf.min.css';
import axios from "axios"
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { useState } from 'react';

function App() {

  const [state,setState] = useState([])

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'From',
      headerName: 'From',
      width: 150,
    },
    {
      field: 'To',
      headerName: 'To',
      width: 150,
    },
    {
      field: 'Company',
      headerName: 'Company',
      width: 160,
    },
    {
      field: 'Date',
      headerName: 'Date',
      type: 'date',
      width: 110,
    },
    {
      field: 'Gate',
      headerName: 'Gate',
      width: 160,
    },
    {
      field: 'Status',
      headerName: 'Status',
      width: 160,
    },
  ];
  
  // const rows = [
  //   // { id: myId, From: 'Israel', To: to, Company:company, Date: _date, Gate: gate, Status: status },
  //   { id: 0, From: 'Israel', To: 0, Company:0, Date: 0, Gate: 0, Status: 0 },
  // ];

  const getRightArray = (data:any) => {
    var temp:any = [];
    for(var i=0; i<data.length; i+=1){
      const obj = {
        id: data[i]._id,
        From: "Israel",
        To: data[i].CHLOC1D,
        Company: data[i].CHOPERD,
        Date: data[i].CHSTOL,
        Gate: data[i].CHAORD,
        Status: data[i].CHRMINE,
      }
      temp.push(obj)
      }
      return temp;
  }

  const fetchData = async () => {
    try {
        const data = await axios.get(
          "https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=100"
        );
        // const filtered = data.data.result.records.filter((item:any)=>
        //    Object.keys(item)[0] != "_id"
        // )
        const myArray = getRightArray(data.data.result.records)
        console.log(myArray);
        setState(myArray);
        notify.success("succeed")
      }catch (err) {
        notify.error("something went wrong")
      }
    }

  return (
    <div className="App">
      <header className="App-header">
        <div><input type="button" value="update" onClick={fetchData} /></div>
          <div style={{ height: 450, width: '100%' }}>
            <DataGrid
              rows={state}
              columns={columns}
              pageSize={10}
            />
          </div>
        
      </header>
    </div>
  );
}

export default App;
