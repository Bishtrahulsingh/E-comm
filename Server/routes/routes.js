


  
const router=require("express").Router()
const {products,userproduct, createproduct, editproduct, deleteproduct, createreview, readreview, deletenoimageproduct, searchapi}=require("../controllers/productController")
const { createuser, edituser, loginuser,jwtuserautologin, logout, profile } = require("../controllers/usercontroller")
const {getallcartitems,getitemimage,createcartitem,updatecart,deletecartitem}=require("../controllers/cartcontroller")
 
 
 
//products routes
router.route("/searchapi/:search").get(searchapi)
router.route("/deletenoimageproduct").get(deletenoimageproduct)
router.route("/createreview/:id").post(createreview)
router.route("/getreviews/:id").get(readreview)
router.route("/userproducts/:id").get(userproduct)
router.route("/products").get(products)
router.route("/createproduct/:id").post(createproduct)
router.route("/editproduct/:id").put(editproduct)
router.route("/deleteproduct").delete(deleteproduct)





//user routes
router.route("/profile/:id").get(profile)
router.route("/createuser").post(createuser)
router.route('/edituserprofile/:id').post(edituser)
router.route("/loginuser").post(loginuser)


//cart routes

router.route('/getallcartitems/:id').get(getallcartitems)
router.route("/getitemimage/:id").get(getitemimage)
router.route("/createcartitem").post(createcartitem)
router.route("/updatecart").put(updatecart)
router.route("/deletecartitem").delete(deletecartitem)



//jwt routes

router.route("/jwtuserautologin").post(jwtuserautologin)
router.route("/logout/:id").post(logout)


module.exports=router