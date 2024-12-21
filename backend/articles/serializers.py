from rest_framework import serializers
from .models import Articles

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articles
        fields = ['category', 'headline', 'content', 'author', 'photo', 'publication_date', 'is_published', 'id', 'image', 'caption']
