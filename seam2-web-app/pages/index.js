import React from 'react';
import useRouter from "next/router";
import useSWR from 'swr'

var email;

const fetcher = (url) => fetch(url).then((res) => res.json().then((data) => {
  var customerId = data;
  var router = useRouter;
  router.push(`http://localhost:3000/customer/${customerId}`);
}))

export default function Index() {
  // https://github.com/vercel/swr/issues/254
  const [shouldFetch, setShouldFetch] = React.useState(false);

  var {data, error} = useSWR(shouldFetch ? `http://localhost:3000/api/login/${email}` : null, fetcher);
  if (error) {
    return <div>No matching email</div>;
  }

  return (
    <div>
      <label>Email:</label>
      <input type="text" name="email" id="email_id"/>
      <button type="button" onClick={ () => {
          email = document.getElementById("email_id").value;
          setShouldFetch(true);
        }
      }>
      Log In
      </button>
    </div>
  );
};
