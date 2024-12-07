# Register your models here.
from django.contrib import admin
from .models import Category, Articles, Tag

admin.site.register(Category)
@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Articles)
class ArticlesAdmin(admin.ModelAdmin):
    list_display = ('headline', 'category', 'author', 'is_published', 'publication_date')
    filter_horizontal = ('tags',)  # Makes selecting tags easier in the admin interface