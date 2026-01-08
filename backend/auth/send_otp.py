import os
import smtplib
from dotenv import load_dotenv
import secrets
from email.message import EmailMessage

# --- LOAD ENV VARIABLES ---
load_dotenv()

# --- EMAIL CREDENTIALS ---
EMAIL = os.getenv("EMAIL")
EMAIL_APP_PASSWORDS = os.getenv("EMAIL_APP_PASSWORDS")

# --- OTP GENERATOR ---
def generate_otp() -> str:
    return str(secrets.randbelow(900000) + 100000)

# --- SEND OTP EMAIL ---
def send_otp_email(email: str) -> str | None:
    try:
        otp = generate_otp()

        msg = EmailMessage()
        msg["From"] = EMAIL
        msg["To"] = email
        msg["Subject"] = "Your One-Time Password (OTP)"

        msg.set_content(f"""
        Hello,

        Your One-Time Password (OTP) is:

        {otp}

        This OTP is valid for the next 5 minutes.
        Please do not share this code with anyone.

        If you did not request this OTP, please ignore this email.

        Best regards,
        Support Team
        """)

        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL, EMAIL_APP_PASSWORDS)
            server.send_message(msg)

        return otp   # ✅ OTP return ho raha hai

    except Exception as e:
        print("Email error:", e)
        return None
