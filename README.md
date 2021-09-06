# Seam App Take Home

Seam is an API for IoT devices, but we recently lost all of our code. Can you
rewrite Seam from scratch for us?

We managed to save our customer data into `customer_data.json` (thank goodness)

We need to recreate the Seam Dashboard, a way for customers to view all the
devices they've connected to the Seam platform and add new ones.

Here's what you need to do:

1. Design a SQL schema and a script called `load-customer-data.js` in NodeJS that
   loads in all the customer data from `customer_data.json` and inserts it into
   the schema you designed.

> Tip: You'll need a `device` and `customer` table.
> 
> Tip: You can use a framework like [node-pg-migrate](https://github.com/salsita/node-pg-migrate) to run your migration with node
> 
> Tip: You can run a postgres instance on your machine with docker using `docker run -d -p 5432:5432 -e POSTGRES_HOST_AUTH_METHOD=trust postgres` and connect to it using `psql -h localhost -U postgres`

2. Create a Next.JS project and design a Login page. Your login page should have
   a single field "email" and a login button (we are very trusting at Seam, no
   passwords required!). If the user types the email correctly they should be
   redirected to the page in (3). If they type it wrong they should see an error

> Tip: We don't care about design at all. Please make something that looks bad
> 
> Tip: Seriously don't worry about the look of it!! OK, if you really insist, you can always try to wire in [Tailwind CSS](https://tailwindcss.com/) :)
> 
> Tip: You'll need to create an `api` directory and drop a route in there, maybe `api/login.js`

3. Create a page for viewing all the devices a customer has. Customers should
   be able to delete their devices. After a customer logs in, they should be
   taken to the page for viewing devices.

> Tip: If it wasn't clear, this interview isn't about security, no need for auth,
> but if you implement session auth (with a Bearer token) that's a BONUS

4. Create a page for creating a new device. After the device is created it should
   be owned by the logged in customer. Put a link to the create device page on
   the page where the customer can see all of their devices.

> Tip: Use a dropdown for the difference device types

5. BONUS: Write a `dump-customer-data.js` script that connects
   to the database and writes out a JSON file in the same format as `customer_data.json`

# Did I win?

You should spend less than 5 hours on this task. We'll schedule a 30 minute followup to
go over what you made. If you don't finish that's fine.
