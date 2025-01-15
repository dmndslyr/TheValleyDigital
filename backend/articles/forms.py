from django import forms
from .models import Article

class ArticleAdminForm(forms.ModelForm):
    publication_month_year = forms.DateField(
        widget=forms.SelectDateWidget(years=range(2000, 2031)),
        required=True
    )

    class Meta:
        model = Article
        fields = ['category', 'headline', 'author', 'content', 'publication_date', 'image', 'caption', 'tags']

    def clean_publication_month_year(self):
        # Get the cleaned data (user input)
        publication_date = self.cleaned_data['publication_month_year']
        # Set the date to the first day of the month
        publication_date = publication_date.replace(day=1)
        return publication_date
