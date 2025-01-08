from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Categorie, Article, Tag, PrintedIssue, User, HomepageStorie

admin.site.register(User, UserAdmin)

# Register the Tag model
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Display the name of the tag in the admin interface

# Register the Articles model with enhanced admin options
@admin.register(Article)
class ArticlesAdmin(admin.ModelAdmin):
    list_display = ('headline', 'category', 'author', 'is_published', 'publication_date')
    list_filter = ('category', 'is_published', 'tags')  # Filter articles by category, published status, and tags
    search_fields = ('headline', 'author', 'content')  # Add search functionality
    filter_horizontal = ('tags',)  # Horizontal filter for tags field

# Register the Category model
admin.site.register(Categorie)

@admin.register(PrintedIssue)
class PrintedIssueAdmin(admin.ModelAdmin):
    list_display = ('volume', 'issue_no', 'month_range', 'is_published', 'slug')
    prepopulated_fields = {"slug": ("volume", "issue_no")}

@admin.register(HomepageStorie)
class HomepageStoriesAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Allow only one instance of HomepageStories
        if HomepageStorie.objects.exists():
            return False
        return super().has_add_permission(request)

    def has_delete_permission(self, request, obj=None):
        # Prevent deletion of HomepageStories
        return False

    def has_change_permission(self, request, obj=None):
        return True