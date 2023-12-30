
// // const express = require("express");
// // const {createClient} = require("@supabase/supabase-js");
// // const morgan = require("morgan");
// // const bodyParser = require("body-parser");

// // const app = express();


// // // using morgan for logs
// // app.use(morgan('combined'));

// // app.use(bodyParser.urlencoded({extended: true}));
// // app.use(bodyParser.json());

// // const supabase = supabaseClient.createClient({
// //   apiKey: '<API_KEY>',
// //   project: '<PROJECT_ID>'
// // });

// // app.get('/products', async (req, res) => {
// //     const {data, error} = await supabase
// //         .from('products')
// //         .select()
// //     res.send(data);
// // });

// // app.get('/products/:id', async (req, res) => {
// //     const {data, error} = await supabase
// //         .from('products')
// //         .select()
// //         .is('id', req.params.id)
// //     res.send(data);
// // });

// // app.post('/products', async (req, res) => {
// //     const {error} = await supabase
// //         .from('products')
// //         .insert({
// //             name: req.body.name,
// //             description: req.body.description,
// //             price: req.body.price,
// //         })
// //     if (error) {
// //         res.send(error);
// //     }
// //     res.send("created!!");
// // });

// // app.put('/products/:id', async (req, res) => {
// //     const {error} = await supabase
// //         .from('products')
// //         .update({
// //             name: req.body.name,
// //             description: req.body.description,
// //             price: req.body.price
// //         })
// //         .eq('id', req.params.id)
// //     if (error) {
// //         res.send(error);
// //     }
// //     res.send("updated!!");
// // });

// // app.delete('/products/:id', async (req, res) => {
// //     const {error} = await supabase
// //         .from('products')
// //         .delete()
// //         .eq('id', req.params.id)
// //     if (error) {
// //         res.send(error);
// //     }
// //     res.send("deleted!!")

// // });

// // app.get('/', (req, res) => {
// //     res.send("Hello I am working my friend Supabase <3");
// // });

// // app.get('*', (req, res) => {
// //     res.send("Hello again I am working my friend to the moon and behind <3");
// // });

// // app.listen(3000, () => {
// //     console.log(`> Ready on http://localhost:3000`);
// // });

// const express = require("express");
// const { createClient } = require("@supabase/supabase-js");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");

// const app = express();

// // using morgan for logs
// app.use(morgan('combined'));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Replace '<API_KEY>' and '<PROJECT_ID>' with your actual Supabase API key and project ID
// const supabase = createClient('https://qaytugbcusqrhmaqwpsu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFheXR1Z2JjdXNxcmhtYXF3cHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5MjM2NjAsImV4cCI6MjAxOTQ5OTY2MH0.9WT7yoCXARLpZX2IBhLEIWuw4MsHrhvgz6m61omQxhE');

// app.get('/', async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from('user')
//       .select("*");
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       res.status(200).send(data);
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error.message);
//     res.status(500).send(error.message);
//   }
// });


// app.get('*', (req, res) => {
//   res.send("Hello again, I am working with my friend to the moon and beyond <3");
// });

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server listening at http://localhost:${PORT}`);
// });


const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require('./src/router');

const app = express();

// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
