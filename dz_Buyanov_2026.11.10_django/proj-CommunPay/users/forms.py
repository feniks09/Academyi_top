from django import forms
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from users.models import User, Profile


class RegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, label="Пароль")
    password_confirm = forms.CharField(widget=forms.PasswordInput, label="Повтор пароля")
    city = forms.CharField(max_length=100, required=True, label="Город")
    bio = forms.CharField(widget=forms.Textarea, required=False, label="О себе")

    class Meta:
        model = User
        fields = ("email", "first_name", "last_name")

    def clean_email(self):
        email = self.cleaned_data["email"]
        if User.objects.filter(email__iexact=email).exists():
            raise ValidationError("Этот email уже зарегистрирован")
        return email

    def clean(self):
        cleaned = super().clean()
        p1 = cleaned.get("password")
        p2 = cleaned.get("password_confirm")
        if p1 and p2 and p1 != p2:
            raise ValidationError("Пароли не совпадают")
        if p1:
            validate_password(p1)
        if not cleaned.get("city"):
            raise ValidationError("Город обязателен для заполнения профиля")
        return cleaned

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
            Profile.objects.create(
                user=user,
                city=self.cleaned_data["city"],
                bio=self.cleaned_data.get("bio", ""),
            )
        return user