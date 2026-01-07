from dataclasses import dataclass
from typing import Optional
from sqlmodel import create_engine, Session, select
import os
from dotenv import load_dotenv
from auth.send_otp import send_otp_email
from auth.password_hashing import hash_password, verify_password
from models.todo import userTodoData

# --- LOAD ENV VARIABLES ---
load_dotenv()

# --- DATABASE CONNECTION STRING ---
NEON_DB_CONNECTION = os.getenv("NEON_DB_CONNECTION")
engine  = create_engine(NEON_DB_CONNECTION)

# --- AUTH CLASS ---
@dataclass
class Auth:
    email: str
    password: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    profilePictureURL: Optional[str] = None
    otp: Optional[str] = None

    def register_user(self):
        try:
            with Session(engine) as session:
                # 🔍 Check if user already exists
                statement = select(userTodoData).where(
                    userTodoData.email == self.email
                )
                existing_user = session.exec(statement).first()

                if existing_user:
                    return {"status": "error", "message": "User already exists."}
                
                otp = send_otp_email(self.email)
                
                if otp is None:
                    return {"status": "error", "message": "Failed to send OTP email."}

                # ➕ Create new user
                new_user = userTodoData(
                    email=self.email,
                    firstName=self.firstName,
                    lastName=self.lastName,
                    password=hash_password(self.password),  # In real scenario, hash the password
                    profilePictureURL=self.profilePictureURL,
                    otp=otp,
                    is_verified=False,
                )
                session.add(new_user)
                session.commit()
            return {"status": "success", "message": "User registered successfully."}
        except Exception as e:
            print(e)
            return {"status": "error", "message": "Something went wrong."}
        
    def verify_user(self):
        try:
            with Session(engine) as session:
                # 🔍 Find user by email
                statement = select(userTodoData).where(
                    userTodoData.email == self.email,
                )
                user = session.exec(statement).first()

                if not user:
                    return {"status": "error", "message": "User not found."}
                
                if user.otp != self.otp:
                    return {"status": "error", "message": "Invalid OTP."}
                
                # ✅ Mark user as verified
                user.is_verified = True
                user.otp = None  # Clear OTP after verification
                session.add(user)
                session.commit()
                session.refresh(user)
            
            userData = {
                "id": user.id,
                "email": user.email,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "profilePictureURL": user.profilePictureURL,
            }

            return {"status": "success", "message": "User verified successfully.", "data": userData}
        except Exception as e:
            print(e)
            return {"status": "error", "message": "Something went wrong."}
    
    def login_user(self):
        try:
            with Session(engine) as session:
                # 🔍 Check if user exists
                statement = select(userTodoData).where(
                    userTodoData.email == self.email,
                )
                user = session.exec(statement).first()

                if not user:
                    return {"status": "error", "message": "Invalid your email or password."}
                
                if not user.is_verified:
                    return {"status": "error", "message": "User is not verified. Please verify your account."}
                
                if not verify_password(self.password, user.password):
                    return {"status": "error", "message": "Invalid your password."}
                
                user_data = {
                    "id": user.id,
                    "email": user.email,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "profilePictureURL": user.profilePictureURL,
                }

            return {"status": "success", "message": "User logged in successfully.", "data": user_data}
        except Exception as e:
            print(e)
            return {"status": "error", "message": "Something went wrong."}