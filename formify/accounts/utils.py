# accounts/utils.py
from django.core.mail import send_mail
import random
from django.conf import settings

def send_otp_email(user):
    otp = str(random.randint(100000, 999999))
    user.otp = otp
    user.save()

    subject = "Your OTP Code"
    message = f"Your OTP code is: {otp}"
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list)
    return otp
