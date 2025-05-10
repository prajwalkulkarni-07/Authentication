import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email verification",
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.log(`Error sending verfication email: ${err.message}`);
    throw new Error(`Error sending verfication email: ${err.message}`);
  }
};

export const sendWelcomeEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "dbdc7b89-dfca-46d0-8698-a2dec7d52b99",
      template_variables: {},
    });

    console.log(`Welcome email sent successfully`);
  } catch (err) {
    console.log(`Error sending welcome email: ${err.message}`);
    throw new Error(`Error sending welcome email: ${err.message}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (err) {
    console.log(`Error sending password reset email ${err}`);
    throw new Error(`Error sending password reset email ${err}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "password reset success",
    });
  } catch (err) {
    console.log(`Error sending password reset success email ${err}`);
    throw new Error(`Error sending password reset success email ${err}`);
  }
};
