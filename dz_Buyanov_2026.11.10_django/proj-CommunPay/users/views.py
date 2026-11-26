from django.shortcuts import render, redirect
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth import login
from users.forms import RegistrationForm
from users.models import User


def register(request):
    if request.method == "POST":
        form = RegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("analytics")
    else:
        form = RegistrationForm()
    return render(request, "users/register.html", {"form": form})


@user_passes_test(lambda u: u.is_staff)
def user_list(request):
    users = User.objects.select_related("profile").all().order_by("-date_joined")
    return render(request, "users/user_list.html", {"users": users})

def index(request):
    return render(request, "users/index.html")