import useSWR from 'swr'
import { useRouter } from 'next/router'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Customer() {
  const { query } = useRouter()
  var customerId = query.customerId;
  console.log("customerID", customerId);
  var { data, error } = useSWR(`http://localhost:3000/api/devices/${customerId}`, fetcher);
  console.log("What?");
  console.log("data", data);
  console.log("error", error);
  //var response = await fetch(`http://localhost:3000/api/devices/${customerId}`);
  //console.log(devices);


  //return (<div></div>);
  return renderTableData(data);;
  //return renderTableData(data);
} 



function renderTableData(rows) {
  return rows.map(row => {
     const { id, productId, deviceName} = row //destructuring
     return (
        <tr key={id}>
           <td>{id}</td>
           <td>{productId}</td>
           <td>{deviceName}</td>
        </tr>
     )
  })
}
