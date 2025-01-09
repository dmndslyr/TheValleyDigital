from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = [
            "category",
            "headline",
            "content",
            "author",
            "publication_date",
            "is_published",
            "id",
            "image_url",
            "caption",
        ]

    def get_image_url(self, obj):
        # Retrieve the request object from the context to build the absolute URI for the image
        request = self.context.get("request")
        if obj.image:
            return request.build_absolute_uri(obj.image.url)  # Return the absolute URL of the image
        return None
