import React from 'react';
import { useRouter } from "next/router";
import useRouter2 from "next/router";
import useSWR from 'swr'


var customerId;
var productId;
var deviceName;

const fetcher = (url) => fetch(url).then((res) => res.json().then((data) => {
  var router = useRouter2;
  console.log(customerId);
  router.push(`http://localhost:3000/customer/${customerId}`);
}))

const productFetcher = (url) => fetch(url).then((res) => res.json())

export default function NewDevice() {
  const [shouldFetch, setShouldFetch] = React.useState(false);
  var { query } = useRouter();
  customerId = query.customerId;
  

  // https://github.com/vercel/swr/issues/254

  var {data, error} = useSWR(shouldFetch ? `http://localhost:3000/api/newDevice?customerId=${customerId}&productId=${productId}&deviceName=${deviceName}` : null, fetcher);
  if (error) {
    return <div>Could not create device</div>;
  }

    console.log("before drop down");
  var {data : products, error : error2} = useSWR(`http://localhost:3000/api/products`, productFetcher);
  console.log("About to check status of api/products requres");
  console.log("products", products);
   if (error2) return <div>{error2.message}</div>
   if (!products) return <div>Loading...</div>
  var dropDownItems =
    products.map(product => {
      const {id, productName, category} = product
      return (
        <option value={id}>{productName}</option>
      )})
  return (
    <div>
      <label>ProductName</label>
      <select id="select_id">
      {dropDownItems}
      </select>
      <label>deviceName:</label>
      <input type="text" name="deviceName" id="deviceName_id"/>
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
