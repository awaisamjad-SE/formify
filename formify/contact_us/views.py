from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactUs
from .serializers import ContactUsSerializer

@api_view(['POST'])
def contact_us_api(request):
    serializer = ContactUsSerializer(data=request.data)
    if serializer.is_valid():
        contact = serializer.save()

        # Send email to you
        send_mail(
            subject=f"New Message from {contact.name}",
            message=(
                f"Name: {contact.name}\n"
                f"Email: {contact.email}\n"
                f"Subject: {contact.subject}\n\n"
                f"Message:\n{contact.message}"
            ),
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],  
        )

        # Send confirmation to user
        send_mail(
            subject="Thanks for contacting us!",
            message=(
                f"Hi {contact.name},\n\n"
                "Thanks for your message. We'll contact you soon!\n\n"
                "Best regards,\nYour Company"
            ),
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[contact.email],
        )

        return Response({"message": "Success"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
