from django.contrib import admin
from django import forms
from .models import Article, Categorie, Tag, PrintedIssue, User, HomepageStorie


# Custom form for Article admin
class ArticleAdminForm(forms.ModelForm):
    publication_month_year = forms.DateField(
        widget=forms.SelectDateWidget(years=range(2016, 2031)),
        required=True,
        label="Publication Date (Month and Year)",
    )

    class Meta:
        model = Article
        exclude = ['publication_date']  # Exclude the original field from the form

    def clean_publication_month_year(self):
        # Get the cleaned data (user input)
        publication_date = self.cleaned_data['publication_month_year']
        # Set the date to the first day of the month
        publication_date = publication_date.replace(day=1)
        return publication_date


# Register the Articles model with enhanced admin options and custom form
@admin.register(Article)
class ArticlesAdmin(admin.ModelAdmin):
    form = ArticleAdminForm  # Use the custom form
    list_display = ('headline', 'category', 'author', 'is_published', 'publication_date')
    list_filter = ('category', 'is_published', 'tags')  # Filter articles by category, published status, and tags
    search_fields = ('headline', 'author', 'content')  # Add search functionality
    filter_horizontal = ('tags',)  # Horizontal filter for tags field

    def save_model(self, request, obj, form, change):
        # Map the custom field value to the original model field
        if 'publication_month_year' in form.cleaned_data:
            obj.publication_date = form.cleaned_data['publication_month_year']
        super().save_model(request, obj, form, change)


# Register other models
admin.site.register(User, admin.ModelAdmin)
admin.site.register(Categorie)
admin.site.register(Tag)
admin.site.register(PrintedIssue)
admin.site.register(HomepageStorie)
