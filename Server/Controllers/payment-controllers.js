

const Payment = require("../Models/payment-models");

const processPayment = async (req, res) => {
    try {
        const paymentData = req.body;
        console.log("Received payment data from frontend:", paymentData);

        await Payment.create(paymentData);

        return res.status(200).json({ msg: "Payment processed successfully backend" });
    } catch (error) {
        console.error("Error processing payment:", error);
        return res.status(400).json({ msg: "Payment not processed" });
    }
};

module.exports = processPayment;
