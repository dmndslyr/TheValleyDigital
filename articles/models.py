from django.db import models
<<<<<<< Updated upstream:articles/models.py
=======
from django.utils.text import slugify
from django.core.validators import FileExtensionValidator 
>>>>>>> Stashed changes:backend/articles/models.py

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

<<<<<<< Updated upstream:articles/models.py
    def save(self, *args, **kwargs):
        # Check if the category is not Editorial, then ensure an author is provided
        if self.category.name != 'Editorial' and not self.author:
            raise ValueError("Author is required for non-editorial content.")
        super().save(*args, **kwargs)
=======
class PrintedIssue(models.Model):
    is_published = models.BooleanField(default=False)
    volume = models.CharField(max_length=10)
    issue_no = models.PositiveIntegerField()
    month_range = models.CharField(max_length=50)  # Format: "MM YYYY to MM YYYY"
    pdf_file = models.FileField(upload_to='printed_issues_pdfs/', blank=True, null=True, validators=[FileExtensionValidator(['pdf'])])  # Ensure only PDF upload
    slug = models.SlugField(unique=True, blank=True, null=True)  # Slug field for URL-friendly identifier

    class Meta:
        unique_together = ('volume', 'issue_no')  # Ensure no duplicate volumes and issue numbers

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"volume-{self.volume}-issue-{self.issue_no}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Volume {self.volume}, Issue {self.issue_no} ({self.month_range})"
>>>>>>> Stashed changes:backend/articles/models.py
