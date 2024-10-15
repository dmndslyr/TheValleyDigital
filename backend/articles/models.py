from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
# Create your models here.
class Articles(models.Model):
    
    # Use a ForeignKey to link to the Category model
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    headline = models.CharField(max_length=200)
    author = models.CharField(max_length=100, blank=True, null=True)  # Optional author
    content = models.TextField()
    publication_date = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=True)
    image = models.ImageField(upload_to='content_images/', blank=True, null=True)  # Optional image
    caption = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.headline

    def save(self, *args, **kwargs):
        # Check if the category is not Editorial, then ensure an author is provided
        if self.category.name != 'Editorial' and not self.author:
            raise ValueError("Author is required for this section.")
        super().save(*args, **kwargs)