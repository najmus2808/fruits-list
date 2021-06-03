import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
function App() {

  const options = [
    { value: 'Mango', label: 'Mango' },
    { value: 'Banana', label: 'Banana' },
    { value: 'Strawberry', label: 'Strawberry' }
  ]

  const [rowData, setRowData] = useState([])
  const [totalNetAmount, setTotalNetAmount] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)

  console.log("Rowdata", rowData);

  const handleChange = (v) => {
    const obj = {
      ...v,
      quantity: 1,
      price: '',
      discount: '',
      netAmount: '',
    }
    setRowData([...rowData, obj])
  }

  const handleRowData = (name, value, i) => {
    const data = [...rowData];
    data[i][name] = value;
    setRowData(data)

  };

  useEffect(() => {
    let price = rowData.reduce((prevValue, currValue) => (
      prevValue + Number(currValue?.netAmount)
    ), 0)
    setTotalNetAmount(price);

    let discount = rowData.reduce((prevValue, currValue) => (
      prevValue + +currValue?.discount
    ), 0)
    setTotalDiscount(discount);
  }, [rowData])

  // const dataHandler = () => {

  // let price = rowData.reduce((prevValue, currValue) => (
  //   prevValue + Number(currValue?.netAmount)
  // ), 0)
  // setTotalNetAmount(price);

  // let discount = rowData.reduce((prevValue, currValue) => (
  //   prevValue + +currValue?.discount
  // ), 0)
  // setTotalDiscount(discount);
  // }


  return (
    <div>
      <Select
        name="item"
        options={options}
        onChange={(v) => { handleChange(v) }}
      />

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>NetAmount</th>
          </tr>
        </thead>
        <tbody>
          {rowData?.map((item, i) => (
            <tr key={i}>
              <td>{item?.label}</td>
              <td>
                <input
                  name="quantity"
                  value={item?.quantity}
                  onChange={(e) => {
                    handleRowData(e.target.name, e.target.value, i);
                    const netAmount = e.target.value * item?.price - item?.discount || 0;
                    handleRowData("netAmount", netAmount, i);
                    // dataHandler();

                  }}
                />
              </td>

              <td>
                <input
                  name="price"
                  value={item?.price}
                  onChange={(e) => {
                    handleRowData(e.target.name, e.target.value, i);
                    const netAmount = e.target.value * item?.quantity - item?.discount || 0;
                    handleRowData("netAmount", netAmount, i);
                    // dataHandler();

                  }}
                />
              </td>
              <td>
                <input
                  name="discount"
                  value={item?.discount}
                  onChange={(e) => {
                    handleRowData(e.target.name, e.target.value, i);
                    const netAmount = item?.price * item?.quantity - e.target.value;
                    handleRowData("netAmount", netAmount, i);
                    // dataHandler();

                  }}
                />
              </td>
              <td>{item?.netAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5>Total discount: {totalDiscount} tk</h5>
      <h5>Total amount:{totalNetAmount} tk</h5>

    </div>
  );
}

export default App;
