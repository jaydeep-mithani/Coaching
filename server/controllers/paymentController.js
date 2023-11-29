const stripe = require("stripe")(process.env.STRIPE_SECRET);
const PaymentDetail = require("../models/paymentDetails");
const BookedSession = require("../models/bookedSession");
const User = require("../models/user");
const Session = require("../models/session");
const sendEmail = require("../utils/sendEmail");

const CLIENT_URL = process.env.HOST_URL;

exports.paymentSession = async (req, res) => {
  try {
    const userId = req.body.userId;
    const sessionId = req.body.sessionId;
    const price_id = req.body.price_id;
    const mode = req.body.mode;

    console.log("paymentSession ::::", userId, sessionId, price_id, mode);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: mode,
      line_items: [
        {
          //Price Id can be retrived from products page, a single product will have a unique priceId
          price: price_id ?? "price_1NtwGWSFygNTJvTO4irLPEiE",
          quantity: 1,
        },
      ],
      // On success, redirect to:
      success_url: `${CLIENT_URL}?success=true`,
      // On failure, redirect to:
      cancel_url: `${CLIENT_URL}?cancelled=true`,
      metadata: {
        userId: userId,
        sessionId: sessionId,
        priceId: price_id,
      },
    });

    //Redirect user to this url. It is a stripe url, payment page.
    res.json({ url: session.url });
  } catch (e) {
    console.log("error", e);
    res.status(500).json({ error: e.message });
  }
};

exports.paymentCompleted = async (req, res) => {
  const event = req.rawBody;

  // Verify the webhook event (optional but recommended)
  try {
    const signature = req.headers["stripe-signature"];
    const verifiedEvent = stripe.webhooks.constructEvent(
      event,
      signature,
      `${process.env.STRIPE_WEBHOOK_SECRET}`
    );

    // Store the event in MongoDB

    console.log(
      "----------------------------------------------------------------------"
    );
    console.log("verifiedEvent", verifiedEvent);
    console.log(
      "----------------------------------------------------------------------"
    );

    if (verifiedEvent.type === "payment_intent.succeeded") {
      const paymentIntent = verifiedEvent.data.object;

      console.log(
        "----------------------------------------------------------------------"
      );
      console.log("paymentIntent", paymentIntent);
      console.log(
        "----------------------------------------------------------------------"
      );

      const checkoutSession = await getCheckoutSessionByPaymentIntentId(
        paymentIntent.invoice
      );

      console.log(
        "----------------------------------------------------------------------"
      );
      console.log("checkoutSession", checkoutSession);
      console.log(
        "----------------------------------------------------------------------"
      );

      const userId = checkoutSession.metadata.userId;
      const sessionId = checkoutSession.metadata.sessionId;
      const priceId = checkoutSession.metadata.priceId;

      const user = await User.findById(userId);
      const session = await Session.findById(sessionId);

      const paymentDetail = new PaymentDetail({
        id: paymentIntent.id,
        details: paymentIntent,
        session: sessionId,
        user: userId,
      });

      function getKeyByValue(arr, value) {
        data = arr.filter((i) => i.priceId === value)[0];
        if (data) {
          return data.type;
        }
      }

      const package = getKeyByValue(session.stripePrice, priceId);

      switch (package) {
        case "twiceWeekFullPriceId":
          for (let i = 0; i < 24; i++) {
            const purchasedSession = new BookedSession({
              session: sessionId,
              user: userId,
              purchaseDate: paymentIntent.created,
              status: "purchased",
            });
            await purchasedSession.save();
            user.purchasedSession.push(purchasedSession);
          }
          await user.save();

          break;
        case "twiceWeekRecurrentPriceId":
          for (let i = 0; i < 24; i++) {
            const purchasedSession = new BookedSession({
              session: sessionId,
              user: userId,
              purchaseDate: paymentIntent.created,
              status: "purchased",
            });
            await purchasedSession.save();
            user.purchasedSession.push(purchasedSession);
          }
          await user.save();

          break;
        case "onceWeekFullPriceId":
          for (let i = 0; i < 12; i++) {
            const purchasedSession = new BookedSession({
              session: sessionId,
              user: userId,
              purchaseDate: paymentIntent.created,
              status: "purchased",
            });
            await purchasedSession.save();
            user.purchasedSession.push(purchasedSession);
          }
          await user.save();
          break;
        case "onceWeekRecurrentPriceId":
          for (let i = 0; i < 12; i++) {
            const purchasedSession = new BookedSession({
              session: sessionId,
              user: userId,
              purchaseDate: paymentIntent.created,
              status: "purchased",
            });
            await purchasedSession.save();
            user.purchasedSession.push(purchasedSession);
          }
          await user.save();
          break;

        default:
          console.error("Error Price Id not found3.:", error);
          res.sendStatus(400);
          break;
      }

      await paymentDetail.save();
      const emailOptions = {
        to: user.email,
        subject: "Successful Payment",
        text: `Your payment is done successfully:`,
        html: "<h1>Tada!!</h1>",
      };

      await sendEmail(emailOptions);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling webhook event:", error);
    res.sendStatus(400); // Respond with an error status code
  }
};

async function getCheckoutSessionByPaymentIntentId(invoiceId) {
  try {
    // List all Checkout Sessions
    const sessions = await stripe.checkout.sessions.list({ limit: 100 }); // Adjust limit as needed

    // Filter the sessions to find the one associated with the PaymentIntent ID
    const session = sessions.data.find((session) => {
      return session.invoice === invoiceId;
    });

    return session;
  } catch (error) {
    console.error("Error retrieving Checkout Session:", error);
    throw error;
  }
}
