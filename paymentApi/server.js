import express from 'express';
import dotenv from 'dotenv'
import cors from  "cors";
import stripeCheckoutRoutes from "./routes/stripeCheckoutRoutes.js"
import Razorpay from 'razorpay';
import razorpayRoutes from "./routes/razorpayCheckout.js"

dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

export const instance = new Razorpay({
    key_id: 'rzp_test_tKErgxv1zhxPDM',
    key_secret: '1p790OsReg4WRYyk2grj9mS8'
})
app.use(stripeCheckoutRoutes);
app.use(razorpayRoutes);


app.get('/getApiKey', (req,res) =>{
    res.status(200).json({key: process.env.RAZORPAY_API_KEY})
});


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}!`)
});