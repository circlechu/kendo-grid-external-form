import * as React from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import products from "./products.json";
import EditForm from './editForm';
const EditCommandCell = props => {
  return <td>
        <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" onClick={() => props.enterEdit(props.dataItem)}>
          Edit
        </button>
      </td>;
};
const App = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const [editItem, setEditItem] = React.useState({
    ProductID: 1
  });
  const [data, setData] = React.useState(products);
  const enterEdit = item => {
    setOpenForm(true);
    setEditItem(item);
  };
  const handleSubmit = event => {
    let newData = data.map(item => {
      if (event.ProductID === item.ProductID) {
        item = {
          ...event
        };
      }
      return item;
    });
    setData(newData);
    setOpenForm(false);
  };
  const handleCancelEdit = () => {
    setOpenForm(false);
  };
  const MyEditCommandCell = props => <EditCommandCell {...props} enterEdit={enterEdit} />;
  return <React.Fragment>
            <Grid style={{
      height: "400px"
    }} data={data}>
              <Column field="ProductID" title="ID" width="40px" />
              <Column field="ProductName" title="Name" width="250px" />
              <Column field="Category.CategoryName" title="CategoryName" />
              <Column field="UnitPrice" title="Price" />
              <Column field="UnitsInStock" title="In stock" />
              <Column cell={MyEditCommandCell} />
            </Grid>
            {openForm && <EditForm cancelEdit={handleCancelEdit} onSubmit={handleSubmit} item={editItem} />}
          </React.Fragment>;
};
ReactDOM.render(<React.Fragment>
    <App />
    <style>
      {`.k-animation-container {
            z-index: 10003;
        }`}
    </style>
  </React.Fragment>, document.querySelector('my-app'));