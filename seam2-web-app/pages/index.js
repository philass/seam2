import useRouter from "next/router";
const fetcher = (url) => fetch(url).then((res) => res.json())


  //const { data, error } = useSWR('/api/login', fetcher)
  //if (error) return <div>Failed to load</div>
  //if (!data) return <div>Loading...</div>

export default function Index() {
  return (
      <form
        onSubmit={async e => {
          var email = document.getElementById("email_id").value;
          e.preventDefault();
          var response = await fetch(`http://localhost:3000/api/login/${email}`);
          var customerId = await response.json();
          const router = useRouter;
          router.push(`http://localhost:3000/customer/${customerId}`);
        }
      }>
        <div>
          <label>Email:</label>
          <input type="text" name="email" id="email_id"/>
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
  );
};
