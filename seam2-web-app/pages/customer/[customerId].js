import useSWR from 'swr'
import { useRouter } from 'next/router'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Customer() {
  const { query } = useRouter()
  var customerId = query.customerId;
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
  return <>
    {cmp}
      <button type="button" onClick={ () => {
        }}>
      Click me
    </button>
    </>
}
