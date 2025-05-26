const express = require("express");
const router = express.Router();

// DB Connection
const connection = require("../config/db");

router.get("/", (req, res) => {
  return res.status(200).json({ message: "API Calling....." });
});

// get products API

router.get("/getproducts", async (req, res) => {
  try {
    const result = await connection.execute("select * from products");
    // console.log(result)
    return res.status(201).json({ message: "User Fetched successfully...", data: result[0], success: true });
  } catch (err)
   {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error...", success: false });
  }
});

// See Details

router.get("/details/:id", async (req, res) => {
  try {
    var id = req.params.id;

    var sql = `select * from products where id = ${id}`;

    const result = await connection.execute(sql);

    return res.status(201).json({message: "ID - Product Fetched...", data: result[0], success: true,});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error...", success: false });
  }
});

// Add To Cart

router.post("/addtocart/:id", async (req, res) => {
  try {
    var p_id = req.params.id;

    var sql = `select * from products where id =${p_id}`;

    const result = await connection.execute(sql);

    console.log(result[0][0]);

    const { id, title } = result[0][0];

    console.log(id+title)

    var sql2 = `insert into cart(id,title)values('${id}','${title}')`;
    console.log(sql2)

    const result2 = await connection.execute(sql2);

    return res.status(201).json({message: "Added to Cart successfully ", data: result2[0], success: true,});

  } catch (err) 
  {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error...", success: false });
  }
});

// Display cart data
router.get("/cartdata", async (req, res) => {
  try {

    var sql=`select * from cart JOIN products on cart.id=products.id`;

    
    const result = await connection.execute(sql);
    console.log(result)

    return res.status(201).json({ message: "Product Fetched...", data: result[0], success: true });

  } catch (err)
  {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error...", success: false });
  }
});


// Delete Product 

router.delete('/delete/:id', async (req, res)=>{
    try{
        var id = req.params.id

        var sql = `delete from cart where cart_id = ${id}`

        const result = await connection.execute(sql)

        return res.status(200).json({ message: "Product Deleted...", success: true });

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error...", success: false });

    
    }

})
module.exports = router;
