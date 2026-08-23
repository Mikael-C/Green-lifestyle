import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { reference, orderDetails, customerInfo } = req.body;

  if (!reference) {
    return res.status(400).json({ success: false, message: 'Reference is required' });
  }

  try {
    // Call Paystack to verify the transaction
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    // Check if the verification was successful and the payment was actually made
    if (data.status && data.data.status === 'success') {
      
      let emailSent = false;
      let emailError = null;

      // Payment is valid! Send email notification to store owner
      if (orderDetails && customerInfo) {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          const itemsHtml = orderDetails.items.map(item => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <strong>${item.name}</strong><br />
                Size: ${item.size} | Qty: ${item.quantity}
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
                ₦${(item.price * item.quantity).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          `).join('');

          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `New Order Received! #${reference.slice(0, 8)}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
                <h2 style="color: #10B981;">New Order Placed! 🎉</h2>
                <p>You have received a new order from <strong>${customerInfo.firstName} ${customerInfo.lastName}</strong>.</p>
                
                <h3 style="border-bottom: 2px solid #10B981; padding-bottom: 5px; margin-top: 30px;">Customer Details</h3>
                <p>
                  <strong>Email:</strong> ${customerInfo.email}<br />
                  <strong>Phone:</strong> ${customerInfo.phone}<br />
                  <strong>Address:</strong> ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zip}
                </p>

                <h3 style="border-bottom: 2px solid #10B981; padding-bottom: 5px; margin-top: 30px;">Order Summary</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  ${itemsHtml}
                </table>
                <div style="text-align: right; margin-top: 20px; font-size: 1.2em;">
                  <strong>Total Paid: ₦${orderDetails.grandTotal.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>
                </div>
              </div>
            `,
          };

          await transporter.sendMail(mailOptions);
          emailSent = true;
          console.log('✅ Order notification email sent successfully to:', process.env.EMAIL_USER);
        } catch (err: any) {
          emailError = err.message;
          console.error('❌ Failed to send order notification email:', err.message);
        }
      }

      return res.status(200).json({
        success: true,
        data: data.data,
        emailStatus: {
          sent: emailSent,
          to: emailSent ? process.env.EMAIL_USER : null,
          error: emailError,
        },
      });
    } else {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ success: false, message: 'Server error during verification' });
  }
}
