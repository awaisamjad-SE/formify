# accounts/views.py
from django.db import models 
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .utils import send_otp_email

class SignupView(APIView):
    def post(self, request):
        data = request.data
        if data['role'] == 'admin':
            return Response({"error": "Admin signup not allowed"}, status=403)
        
        if User.objects.filter(username=data['username']).exists():
            return Response({"error": "Username already exists"}, status=400)
        if User.objects.filter(email=data['email']).exists():
            return Response({"error": "Email already exists"}, status=400)

        user = User.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            first_name=data.get('name'),
            role=data['role'],
            department=data.get('department'),
            is_verified=False
        )

        send_otp_email(user)
        return Response({"message": "User registered. Check email for OTP."})


class VerifyOtpView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        try:
            user = User.objects.get(email=email)
            if user.otp == otp:
                user.is_verified = True
                user.otp = None
                user.save()
                return Response({"message": "Account verified successfully."})
            return Response({"error": "Invalid OTP"}, status=400)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)


from rest_framework_simplejwt.tokens import RefreshToken
from django.db import models
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User

class LoginView(APIView):
    def post(self, request):
        identifier = request.data.get('username') or request.data.get('email')
        password = request.data.get('password')

        if not identifier or not password:
            return Response({"error": "Username/email and password are required"}, status=400)

        # Fetch user by username or email
        user = User.objects.filter(models.Q(username=identifier) | models.Q(email=identifier)).first()

        if user is None:
            return Response({"error": "Invalid credentials"}, status=400)

        # Check if account is verified
        if not user.is_verified:
            return Response({"error": "Account not verified. Please verify OTP."}, status=403)

        # Authenticate user
        user = authenticate(username=user.username, password=password)
        if user:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                "message": "Login successful",
                "role": user.role,
                "access_token": access_token,
                "refresh_token": str(refresh),
            })
        else:
            return Response({"error": "Incorrect password"}, status=400)


from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model

class PasswordResetRequestView(APIView):
    def post(self, request):
        email = request.data.get('email')

        # Check if the email exists in the system
        user = get_user_model().objects.filter(email=email).first()

        if user:
            # Generate password reset token
            token = default_token_generator.make_token(user)

            # Create reset URL
            reset_url = f"{settings.FRONTEND_URL}/reset-password/{user.pk}/{token}/"

            # Send reset link via email
            subject = "Password Reset Request"
            message = f"Click the link to reset your password: {reset_url}"
            from_email = settings.DEFAULT_FROM_EMAIL
            send_mail(subject, message, from_email, [email])

            return Response({"message": "Password reset link sent to your email"}, status=200)
        
        return Response({"error": "Email not found"}, status=400)
from django.contrib.auth.tokens import default_token_generator
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model

class PasswordResetConfirmView(APIView):
    def post(self, request, user_id, token):
        password = request.data.get('password')
        try:
            user = get_user_model().objects.get(pk=user_id)
        except get_user_model().DoesNotExist:
            return Response({"error": "Invalid user ID"}, status=400)

        # Check if the token is valid
        if default_token_generator.check_token(user, token):
            # Set new password
            user.set_password(password)
            user.save()
            return Response({"message": "Password reset successfully"}, status=200)
        return Response({"error": "Invalid or expired token"}, status=400)
