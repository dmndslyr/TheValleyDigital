from django.contrib import admin
from .models import Category, Articles, Tag

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
<<<<<<< HEAD
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Articles)
class ArticlesAdmin(admin.ModelAdmin):
    list_display = ('headline', 'category', 'author', 'is_published', 'publication_date')
    filter_horizontal = ('tags',)  # Makes selecting tags easier in the admin interface
=======
>>>>>>> ab4889c0516d480127ce1d4b1d3f0082934fc122
