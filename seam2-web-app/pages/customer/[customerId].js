import useSWR from 'swr'
import { useRouter } from 'next/router'
import useRouter2 from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json())
//var query;
var customerId

export default function Customer() {
  var { query } = useRouter();
  customerId = query.customerId;
  var { data, error } = useSWR(customerId === undefined ? null : `http://localhost:3000/api/devices/${customerId}`, fetcher);
  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>
  return renderTableData(data);
} 



function renderTableData(rows) {
  var cmp =
  rows.map(row => {
     const { id, productId, deviceName} = row //destructuring
     return (
        <tr key={id}>
           <td>{id}</td>
           <td>{productId}</td>
           <td>{deviceName}</td>
        </tr>
     )
  });
  return (
    <>
    <table>
    <tbody>
    {cmp}
    </tbody>
    </table>
    <button type="button" onClick={ () => {
        var router = useRouter2;
        router.push(`http://localhost:3000/new_device/${customerId}`);
        }}>
    Add device
    </button>
    </>);
}
