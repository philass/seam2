import React from 'react';
//import { DropdownButton, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useRouter } from "next/router";
import useRouter2 from "next/router";
import useSWR from 'swr'


var customerId;
var productId;
var deviceName;

const fetcher = (url) => fetch(url).then((res) => res.json().then((data) => {
  var router = useRouter2;
  router.push(`http://localhost:3000/customer/${customerId}`);
}))

export default function NewDevice() {
  var { query } = useRouter();
  customerId = query.customerId;
  // https://github.com/vercel/swr/issues/254
  const [shouldFetch, setShouldFetch] = React.useState(false);

  var {data, error} = useSWR(shouldFetch ? `http://localhost:3000/api/newDevice?customerId=${customerId}&productId=${productId}&deviceName=${deviceName}` : null, fetcher);
  if (error) {
    return <div>Could not create device</div>;
  }

//  var { products, error2 } = useSWR(customerId === undefined ? null : `http://localhost:3000/api/products`, fetcher);
//  if (error2) return <div>{error2.message}</div>
//  if (!products) return <div>Loading...</div>
  var products = [{productId : "1", productName : "2", category : "ca"},
              {productId : "2", productName : "2", category : "ca"},
    {productId : "3", productName : "6k", category : "ca"}]

  var dropDownItems =
    products.map(product => {
      const {productId, productName, category} = product
      return (
        <option value={productId}>{productName}</option>
      )})
  return (
    <div>
      <label>deviceName:</label>
      <input type="text" name="deviceName" id="deviceName_id"/>
      <label>productId:</label>
      <input type="text" name="productId" id="productId_id"/>
      <select id="select_id">
      {dropDownItems}
      </select>
      <button type="button" onClick={ () => {
          deviceName = document.getElementById("deviceName_id").value;
          productId = document.getElementById("select_id").value;
          setShouldFetch(true);
        }
      }>
      Make Device
      </button>
    </div>
  );
};
