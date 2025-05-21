require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MessagingResponse } = require('twilio').twiml;
const fleetData = require('./fleetData.json');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const incomingMsg = req.body.Body.trim().toLowerCase();
  const twiml = new MessagingResponse();
  const msg = twiml.message();

  if (incomingMsg === 'hi' || incomingMsg === 'hello' || incomingMsg === 'start') {
  msg.body(
  '*Hi Driver! What happened?*\n\n' +
  '1. 🔋 Flat Battery\n' +
  '2. 🛞 Flat Tire\n' +
  '3. ⛽ Fuel Card / Petrol Station\n' +
  '4. 📱 Woolies Go App Not Working?\n' +
  '5. 🎥 Reverse Camera Not Working?\n' +
  '6. 🚨 Involved in an Accident?\n' +
  '7. 📦 Delivery Issues\n' +
  '8. ⏰ Running Late After 9PM +60min?\n' +
  '9. 🔗 Saphyroo / Woolies Go Links\n' +
  '10. 📝 How to Send Timesheet\n' +
  '11. ☎️ Customer Service Contact\n' +
  '12. 🗺️ CBD Address List (PDF)\n' +
  '13. ⚡ Charge EV Truck\n' +
  '14. 🅿️ Where Can I Park After Shift?\n' +
  '15. 🚫 Where NOT to Park\n' +
  '16. ⚠️ Hazard or Near Miss Report\n' +
  '17. 🚻 Need a Toilet?\n' +
  '18. 🔐 Locker Box PIN\n' +
  '19. 💸 Reimbursement Guide\n' +
  '20. 🧾 Delivery of Alcohol/Tobacco (ID 25+)\n\n' +
  '👉 *Reply with the number of your issue.*'
);

}
 else if (incomingMsg === '1' || incomingMsg === '2') {
    msg.body(`
Please reply with the REGO (e.g., DB21QM) so I can give you the correct Fleet Company contact.

Also, please:
- Notify your EGX Supervisor immediately
- Then contact the Road Side Assistance provided for your Fleet Company
`);

  } else if (incomingMsg.length === 6 || incomingMsg.length === 7) {
    const truckID = incomingMsg.replace(/\s/g, '').toUpperCase();
    const fleet = fleetData[truckID];
    if (fleet) {
      msg.body(`For ${truckID}, please call: ${fleet}`);
    } else {
      msg.body('Sorry, I couldn\'t find this truck. Please check the REGO and try again.');
    }
  } else if (incomingMsg === '3') {
    msg.body("Fuel Up Instructions:\n- Ensure you fill up with DIESEL only\n- Pay if needed and keep the receipt\n- Request refund using: https://form.jotform.com/241480902769867");
  } else if (incomingMsg === '4') {
  msg.body("🛠️ *App Troubleshooting Steps:*\n" +
    "1. Report the issue to your EGX supervisor\n" +
    "2. Skip the order by entering a *fake DA number* (e.g., 123456)\n" +
    "3. The order will move to the *bottom* of the screen\n" +
    "4. Scroll down and tap *Resume* to make it active again\n" +
    "5. Make sure your app is updated\n" +
    "6. Try force closing and reopening the app\n" +
    "7. Check your network connection\n" +
    "8. Log out and log back in if necessary");
} else if (incomingMsg === '5') {
    msg.body("Watch this video to fix the reverse camera:\nhttps://www.youtube.com/shorts/IK5l0EfXAYc");
  } else if (incomingMsg === '6') {
  msg.body("🚨 *Accident Protocol:*\n" +
    "- Park in a safe place\n" +
    "- Take clear photos/videos of the scene and any damage\n" +
    "- Collect third-party info (if involved):\n" +
    "  • Phone number\n" +
    "  • Photo of driver’s license\n" +
    "- Do NOT admit responsibility\n" +
    "- Contact your EGX supervisor immediately");
}
 else if (incomingMsg === '7') {
    msg.body("Delivery Issue Guidelines:\n- Try parking within 500m radius\n- If customer doesn't respond after 3 calls within 5 mins: call CSH\n- If the delivery window is not open, call CSH for permission\n- Never leave unattended unless approved");
  } else if (incomingMsg === '8') {
    msg.body("Running Late (+60min after 9PM):\n- Call Customer Service to update your status\n- Then notify EGX supervisor on duty");
  } else if (incomingMsg === '9') {
    msg.body("New Saphyroo Links:\n- Android and iOS: https://www.saphyroo.com/download\n- Woolies Go: https://apps.wooliesx.com.au");
  } else if (incomingMsg === '10') {
    msg.body("How to Send Timesheet:\n1. Open Saphyroo App\n2. Tap END SHIFT\n3. Tap TIMESHEET (top right)\n4. Tap Adjust\n5. Add break time and SHIFT notes");
  } else if (incomingMsg === '11') {
    msg.body("Customer Service Phone:\n1300 365 956");
  } else if (incomingMsg === '12') {
    msg.body("CBD Address List PDF:\nhttps://drive.google.com/file/d/1HVrOn-lwce1_pBapctux-UC2GPVKY47w/view?usp=sharing");
  } else if (incomingMsg === '13') {
    msg.body("How to Charge EV Truck:\nhttps://www.youtube.com/watch?v=atmxjQSTHrM");
  } else if (incomingMsg === '14') {
    msg.body("You can park:\n- Opposite all docks\n- Beside dock 14 if possible\n- Last option: Coward Street\n\n⚠️ Do NOT park on COGGINS Place (see map for location)");
  } else if (incomingMsg === '15') {
    msg.body("Never park on COGGINS Place after finishing your shift");
  } else if (incomingMsg === '16') {
    msg.body("Report a Hazard / Near Miss / Unsafe Location:\nFill this form: https://form.jotform.com/your-hazard-report-form");
  } else if (incomingMsg === '17') {
    msg.body("Toilet Map: https://toiletmap.gov.au/");
  } else if (incomingMsg === '18') {
    msg.body("Locker PIN: 843\nVisual reference: https://link-to-locker-photo-or-guide");
  } else if (incomingMsg === '19') {
    msg.body("What can be reimbursed:\n- Parking ticket\n- Diesel refuel\n\nNOT accepted: personal items (chargers, umbrellas, etc)\nSubmit receipt here: https://form.jotform.com/241480902769867");
  } else if (incomingMsg === '20') {
    msg.body("Alcohol/Tobacco Delivery Guide:\n- Must NOT leave at door unattended\n- Ensure someone receives it\n- Person must appear to be over 25\n- If not, request valid ID to confirm age");
  } else {
    msg.body("I didn't understand. Please type 'hi' to see the list of options.");
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Bot running on port ' + PORT);
});
