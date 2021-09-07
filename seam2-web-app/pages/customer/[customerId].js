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


  return (<div></div>);
  //return renderTableData(data);;
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
//
//  return (
//    <table>
//      <thead>
//        <tr>
//          <th>Name</th>
//          <th>Height</th>
//          <th>Mass</th>
//          <th>Hair color</th>
//          <th>Skin color</th>
//          <th>Eye color</th>
//          <th>Gender</th>
//        </tr>
//      </thead>
//      <tbody>
//        <tr>
//          <td>{data.name}</td>
//          <td>{data.height}</td>
//          <td>{data.mass}</td>
//          <td>{data.hair_color}</td>
//          <td>{data.skin_color}</td>
//          <td>{data.eye_color}</td>
//          <td>{data.gender}</td>
//        </tr>
//      </tbody>
//    </table>
//  )
//}
