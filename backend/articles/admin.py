from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Category, Articles, Tag, PrintedIssue, User

admin.site.register(User, UserAdmin)

# Register the Tag model
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Display the name of the tag in the admin interface

# Register the Articles model with enhanced admin options
@admin.register(Articles)
class ArticlesAdmin(admin.ModelAdmin):
    list_display = ('headline', 'category', 'author', 'is_published', 'publication_date')
    list_filter = ('category', 'is_published', 'tags')  # Filter articles by category, published status, and tags
    search_fields = ('headline', 'author', 'content')  # Add search functionality
    filter_horizontal = ('tags',)  # Horizontal filter for tags field

# Register the Category model
admin.site.register(Category)

@admin.register(PrintedIssue)
class PrintedIssueAdmin(admin.ModelAdmin):
    list_display = ('volume', 'issue_no', 'month_range', 'is_published', 'slug')
    prepopulated_fields = {"slug": ("volume", "issue_no")}