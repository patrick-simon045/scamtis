from django import forms
from django.contrib.auth import get_user_model

User = get_user_model()

<<<<<<< HEAD

=======
>>>>>>> f161519c885dbbd74d63bb4f7868fb2c4b2e5068
class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(
        label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
<<<<<<< HEAD
        fields = ['username', ]
=======
        fields = ['username',]
>>>>>>> f161519c885dbbd74d63bb4f7868fb2c4b2e5068

    def clean_password(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords do not match")
        return password2

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data['password1'])

        if commit:
            user.save()
<<<<<<< HEAD
        return user
=======
        return user
>>>>>>> f161519c885dbbd74d63bb4f7868fb2c4b2e5068
