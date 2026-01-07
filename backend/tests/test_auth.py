import sys
from pathlib import Path

# ensure project root is on sys.path so imports like `Auth` work
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from auth.auth import Auth

EMAIL = "otpuser@gmail.com"
PASSWORD = "Test@123"

def test_register():
    auth = Auth(
        email=EMAIL,
        password=PASSWORD,
        firstName="OTP",
        lastName="User"
    )
    print("REGISTER:", auth.register_user())


def test_verify():
    otp = input("Enter OTP received on email: ")

    auth = Auth(
        email=EMAIL,
        otp=otp
    )
    print("VERIFY:", auth.verify_user())


def test_login():
    auth = Auth(
        email=EMAIL,
        password=PASSWORD
    )
    print("LOGIN:", auth.login_user())


if __name__ == "__main__":
    test_register()
    test_verify()
    test_login()
