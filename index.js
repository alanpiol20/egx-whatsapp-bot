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
      '8. 🔗 *Links: Saphyroo / Woolies Go / Fleetio*\n' +
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
      '20. 🚛 *Truck Breakdown*\n' +
      '21. 🧠 *Feeling Mentally Tired?*\n' +
      '22. 🚚 *Truck Dimensions*\n\n' +
      '👉 *Reply with the number of your issue.*'
    );
  } else if (incomingMsg === '22') {
    msg.body("**Truck Dimensions & Weight** 🚚\n\n📷 Truck Image:\nhttps://drive.google.com/file/d/1cKN9uGS1Mq0PnWICMtbkBHnpcAX95vM2/view?usp=sharing\n\n📏 *Size:*\n- Height: 2.8m\n- Total Width: 2.2m\n- Cabin Width: 1.95m\n- Total Length: 5.85m\n\n⚖️ *Weight:*\n- Tare: 3,300 kg\n- Gross Vehicle Mass (GVM): 4,495 kg\n- Max Load: 1,100 kg\n\nKeep these dimensions in mind when parking or accessing restricted areas.");
  } else if (incomingMsg === '21') {
    msg.body("**Mental Health Support** 🧠\n\nIf you’re feeling emotionally or psychologically tired, you are not alone.\n\nYou can call *Healthy Heads in Trucks & Sheds Support Line* — a free and confidential mental health support service for truck drivers:\n\n📞 1800 931 193\n🕒 Available 24/7\n\nOr visit: https://www.healthyheads.org.au\n\nDon’t hesitate to talk to someone. Looking after your mental health is just as important as your physical safety.");
  } else if (incomingMsg === '1') {
    msg.body("**Flat Battery or Flat Tire**\n\nPlease reply with the REGO (e.g., DB21QM) so I can give you the correct Fleet Company contact.\n\nAlso, please:\n- Notify your EGX Supervisor immediately\n- Then contact the Road Side Assistance provided for your Fleet Company");
  // (...continua igual para as demais opções...)
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
