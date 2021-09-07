import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
  var email = "rick@hotel.com";
  fetch("http://localhost:3000/api/login/rick@hotel.com").then((res) => res.json()).then((x) => console.log(x));

  //const { data, error } = useSWR('/api/login', fetcher)
  //if (error) return <div>Failed to load</div>
  //if (!data) return <div>Loading...</div>

  return (
    <ul>
    </ul>
  )
}
