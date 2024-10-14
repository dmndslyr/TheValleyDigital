# Register your models here.
from django.contrib import admin
from .models import Category, Articles

admin.site.register(Category)
admin.site.register(Articles)
