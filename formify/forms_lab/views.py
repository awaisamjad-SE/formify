# forms_lab/views.py

from django.shortcuts import render
from .forms import ContactForm

def contact_view(request):
    form = ContactForm()
    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()  # Save to DB
            return render(request, "contact_form.html", {
                "form": ContactForm(), "success": True
            })

    return render(request, "contact_form.html", {"form": form})
