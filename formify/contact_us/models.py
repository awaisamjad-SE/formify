from django.db import models

class ContactUs(models.Model):
    name=models.CharField(max_length=50)
    subject=models.CharField(max_length=50)
    email=models.EmailField(max_length=50)
    message=models.TextField()
    submitted_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.name} ({self.email})"
