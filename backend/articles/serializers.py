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
        # Retrieve the request object from the context to build the URI for the image
        request = self.context.get("request")
        if obj.image:
            return  f"https://api.thevalley.digital{obj.image.url}"  # Return the URL of the image
        return None
