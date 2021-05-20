const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `
  <div>
  <h2>Your Recent Order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
  <ul>
  ${order.map(
    (o) => `
  <li>
  <img src="${o.thumbnail}" alt="${o.name}" />
  ${o.size} ${o.name} - ${o.price}
  </li>
  `
  )}
  </ul>
  <p>Your total is <strong>$${total}</strong> due at pickup</p>
  <style>
  ul {
    list-style: none
  }
  </style>
  </div>
  `;
}

// create transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // console.log(body);
  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`Check that field ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // send the email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({
      order: body.order,
      total: body.total,
    }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
