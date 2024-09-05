import './App.css';
import BasicTable from './components/trial/table/BasicTable';
import SortingTable from './components/trial/table/SortingTable';
import FilteringTable from './components/trial/table/FilteringTable';
import PaginationTable from './components/trial/table/PaginationTable';
import RowSelection from './components/trial/table/RowSelection';
import ColumnOrder from './components/trial/table/ColumnOrder';
import ColumnHiding from './components/trial/table/ColumnHiding';
import RequestCard from './components/common/cards/RequestCard';
import RequestLists from './components/common/RequestLists';
import ResetPasswordForm from './components/common/ResetPasswordForm';
import AllFeatureTable from './components/trial/table/AllFeatureTable';
import RequestsTable from './components/common/table/RequestsTable';
import REQUEST_DATA from './components/main/reqData.json'
import ImageUpload from './components/common/ImageUpload';
import Rate from './components/common/Rate';
import Chart from './components/main/Chart';
import Dashboard from './components/main/Dashboard';

// name, placeholder, value, onChange
function TestApp() {
  // function onChange(){
  //   console.log('Changed');
  // }
  return (
    <div className="App">
      {/* <Chart></Chart> */}
      <Dashboard></Dashboard>
      
    </div>
  );
}

export default TestApp;
