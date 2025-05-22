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
      '1. 🔋🛞 *Flat Battery or Flat Tire*\n' +
      '2. ⛽ *Fuel Card / Petrol Station*\n' +
      '3. 📱 *Woolies Go App Not Working?*\n' +
      '4. 🎥 *Reverse Camera Not Working?*\n' +
      '5. 🚨 *Involved in an Accident?*\n' +
      '6. 📦 *Delivery Issues*\n' +
      '7. ⏰ *Running Late After 9PM +60min?*\n' +
      '8. 🔗 *Saphyroo / Woolies Go Links / Fleetio*\n' +
      '9. 📝 *How to Send Timesheet*\n' +
      '10. ☎️ *Customer Service Contact*\n' +
      '11. 🗺️ *CBD Address List (PDF)*\n' +
      '12. ⚡ *Charge EV Truck*\n' +
      '13. 🅿️ *Where can I Park after PM shift?*\n' +
      '14. ⚠️ *Hazard or Near Miss Report*\n' +
      '15. 🚻 *Need a Toilet?*\n' +
      '16. 🔐 *Locker Box PIN*\n' +
      '17. 💸 *Reimbursement Guide*\n' +
      '18. 🧾 *Delivery of Alcohol/Tobacco (ID 25+)*\n' +
      '19. 🔁 *Do you have order to return?*\n' +
      '20. 🚛 *Truck Breakdown*\n\n' +
      '👉 *Reply with the number of your issue.*'
    );
  } else if (incomingMsg === '1') {
    msg.body("**Flat Battery or Flat Tire**\n\nPlease reply with the REGO (e.g., DB21QM) so I can give you the correct Fleet Company contact.\n\nAlso, please:\n- Notify your EGX Supervisor immediately\n- Then contact the Road Side Assistance provided for your Fleet Company");
  } else if (incomingMsg.length === 6 || incomingMsg.length === 7) {
    const truckID = incomingMsg.replace(/\s/g, '').toUpperCase();
    const fleet = fleetData[truckID];
    if (fleet) {
      msg.body(`For ${truckID}, please call: ${fleet}`);
    } else {
      msg.body("Sorry, I couldn't find this truck. Please check the REGO and try again.");
    }
  } else if (incomingMsg === '2') {
    msg.body("**Fuel Up Instructions**:\n- Ensure you fill up with DIESEL only\n- Card PIN: 8431\n- Pay if needed and keep the receipt\n- Request refund using: https://form.jotform.com/241480902769867");
  } else if (incomingMsg === '3') {
    msg.body("**App Troubleshooting Steps**:\n1. Report the issue to your EGX supervisor\n2. Skip the order by entering a *fake DA number* (e.g., 123456)\n3. The order will move to the *bottom* of the screen\n4. Scroll down and tap *Resume* to make it active again\n5. Make sure your app is updated\n6. Try force closing and reopening the app\n7. Check your network connection\n8. Log out and log back in if necessary");
  } else if (incomingMsg === '4') {
    msg.body("**Reverse Camera Fix**:\nWatch this video: https://www.youtube.com/shorts/IK5l0EfXAYc");
  } else if (incomingMsg === '5') {
    msg.body("**Accident Protocol**:\n- Park in a safe place\n- Take clear photos/videos of the scene and any damage\n- Collect third-party info (if involved):\n  • Phone number\n  • Photo of driver’s license\n- Do NOT admit responsibility\n- Contact your EGX supervisor immediately");
  } else if (incomingMsg === '6') {
    msg.body("**Delivery Issue Guidelines**:\n- Try parking within 500m radius\n- If customer doesn't respond after 3 calls within 5 mins: call Customer Service Hub\n- If the delivery window is not open, call Customer Service Hub for permission\n- Never leave unattended unless approved");
  } else if (incomingMsg === '7') {
    msg.body("**Running Late (+60min after 9PM)**:\n- Call Customer Service to update your route progress\n- Then notify EGX supervisor on duty to seek further instructions");
  } else if (incomingMsg === '8') {
    msg.body("**Saphyroo & Fleetio Links**:\n- Saphyroo Android/iOS: https://www.saphyroo.com/download\n- Woolies Go: https://apps.wooliesx.com.au\n- Fleetio Android: https://play.google.com/store/apps/details?id=com.fleetio.go_app\n- Fleetio iOS: https://apps.apple.com/au/app/fleetio-go-fleet-management/id1100421418\n\nFleetio Login:\n- Username: your Driver ID\n- Password: Lfx + your Driver ID");
  } else if (incomingMsg === '9') {
    msg.body("**How to Send Timesheet**:\n1. Open Saphyroo App\n2. Tap END SHIFT\n3. Tap TIMESHEET (top right)\n4. Tap Adjust\n5. Add break time and SHIFT notes\n\n🎥 Video Tutorial: https://www.canva.com/design/DAF7UCZz19U/V-Hge7KbwigX05M37v77Jw/view?utm_content=DAF7UCZz19U&utm_campaign=designshare&utm_medium=link&utm_source=editor#11");
  } else if (incomingMsg === '10') {
    msg.body("**Customer Service Contact**:\nWoolworths Customer Service: 1300 365 956");
  } else if (incomingMsg === '11') {
    msg.body("**CBD Address List PDF**:\nhttps://drive.google.com/file/d/1HVrOn-lwce1_pBapctux-UC2GPVKY47w/view?usp=sharing");
  } else if (incomingMsg === '12') {
    msg.body("**How to Charge EV Truck**:\nhttps://www.youtube.com/watch?v=atmxjQSTHrM");
  } else if (incomingMsg === '13') {
    msg.body("**Where can I Park after PM shift?**:\n- Opposite all docks\n- Park at dock 6, 7, 8 or 13\n- Beside dock 14 if possible\n- Last option: Coward Street\n\n⚠️ Do NOT park on COGGINS Place (see map for location)");
  } else if (incomingMsg === '14') {
    msg.body("**Report a Hazard / Near Miss / Unsafe Location**:\nFill this form: https://form.jotform.com/your-hazard-report-form");
  } else if (incomingMsg === '15') {
    msg.body("**Toilet Map**:\nhttps://toiletmap.gov.au/\n\n⏱️ Do not detour your route more than 5 minutes. If necessary, make note in your timesheet as 'hygienic break'.");
  } else if (incomingMsg === '16') {
    msg.body("**Locker PIN**:\n843");
  } else if (incomingMsg === '17') {
    msg.body("**Reimbursement Guide**:\nWhat can be reimbursed:\n- Parking ticket\n- Diesel refuel\n\nNOT accepted: personal items (chargers, umbrellas, etc)\nSubmit receipt here: https://form.jotform.com/241480902769867");
  } else if (incomingMsg === '18') {
    msg.body("**Alcohol/Tobacco Delivery Guide**:\n- Must NOT leave at door unattended\n- Ensure someone receives it\n- Person must appear to be over 25\n- If not, request valid ID to confirm age\n\nIf fails to meet the criteria, contact Customer Service Hub to return item to store.\n\n✅ Acceptable ID types:\n- Driver License\n- Passport\n- NSW Photo Card");
  } else if (incomingMsg === '19') {
    msg.body("**Return Orders**:\nAt the end of your shift, leave the totes of the returned orders at the Return Area (behind left to dock 4).\nThere is a yellow pole with a QR code attached. Scan the QR code to access the Return Form.\nFill out the form with the customer’s order info and the DA number.\nClick Submit.");
  } else if (incomingMsg === '20') {
    msg.body("**Truck Breakdown**:\nCall your EGX Supervisor immediately.");
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
