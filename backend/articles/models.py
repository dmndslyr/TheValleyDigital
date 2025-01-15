from django.db import models
from django.utils.text import slugify
from django.core.validators import FileExtensionValidator
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    ROLE_CHOICES = (
        ("editor", "Editor"),
        ("viewer", "Viewer"),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="viewer")

    def is_editor(self):
        return self.role == "editor"


class Categorie(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Assuming a simple Tag model for demonstration
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


from django.db import models
from django.utils import timezone
from django.template.defaultfilters import slugify

class Article(models.Model):
    category = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    headline = models.CharField(max_length=200)
    author = models.CharField(max_length=100, blank=True, null=True)
    content = models.TextField()
    publication_date = models.DateField()  # Store only the month and year
    is_published = models.BooleanField(default=True)
    image = models.ImageField(upload_to="content_images/", blank=True, null=True)
    caption = models.TextField(blank=True, null=True)
    tags = models.ManyToManyField(Tag, blank=True, related_name="articles")
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.headline)

        # Check if the category is not Editorial, then ensure an author is provided
        if self.category.name != "Editorial" and not self.author:
            raise ValueError("Author is required for this section.")
        
        # Ensure the publication_date is set to the first day of the given month
        if self.publication_date:
            # Set the date to the first day of the month
            self.publication_date = self.publication_date.replace(day=1)
        
        super().save(*args, **kwargs)

    def __str__(self):
        return self.headline



class PrintedIssue(models.Model):
    is_published = models.BooleanField(default=False)
    volume = models.CharField(max_length=10)
    issue_no = models.PositiveIntegerField()
    month_range = models.CharField(max_length=50)  # Format: "MM YYYY to MM YYYY"
    pdf_file = models.FileField(
        upload_to="printed_issues_pdfs/",
        blank=True,
        null=True,
        validators=[FileExtensionValidator(["pdf"])],
    )  # Ensure only PDF upload
    slug = models.SlugField(
       max_length=200, unique=True, blank=True, null=True
    )  # Slug field for URL-friendly identifier

    class Meta:
        unique_together = (
            "volume",
            "issue_no",
        )  # Ensure no duplicate volumes and issue numbers

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"volume-{self.volume}-issue-{self.issue_no}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Volume {self.volume}, Issue {self.issue_no} ({self.month_range})"

from django.core.exceptions import ValidationError
from django.db import models


class HomepageStorie(models.Model):
    top_story = models.OneToOneField(
        Article,
        on_delete=models.CASCADE,
        related_name="top_story",
        limit_choices_to={"is_published": True},  # Only allow published articles
        help_text="Select the top story to feature on the homepage",
    )
    featured_articles = models.ManyToManyField(
        Article,
        related_name="featured_articles",
        limit_choices_to={"is_published": True},
        help_text="Select up to 4 articles to feature on the homepage",
    )
    featured_editorial = models.OneToOneField(
        Article,
        on_delete=models.CASCADE,
        related_name="featured_editorial",
        limit_choices_to={"is_published": True, "category__id": 2},  # Editorial category
        help_text="Select the editorial to feature on the homepage",
    )
    featured_feature = models.OneToOneField(
        Article,
        on_delete=models.CASCADE,
        related_name="featured_feature",
        limit_choices_to={"is_published": True, "category__id": 3},  # Feature category
        help_text="Select the feature article to display on the homepage",
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Homepage Story"
        verbose_name_plural = "Homepage Stories"

    def clean(self):
        """
        Custom validation to ensure exactly 4 featured articles are selected.
        """
        # This check is applied during form submission or when `full_clean()` is called
        if self.pk:  # Ensure the object exists in the database before accessing many-to-many relationships
            if self.featured_articles.count() > 4:
                raise ValidationError("You can only select up to 4 featured articles.")
            if self.featured_articles.count() < 4:
                raise ValidationError("You must select exactly 4 featured articles.")

    def __str__(self):
        if self.updated_at:
            return f"Homepage Stories (Last updated: {self.updated_at.strftime('%Y-%m-%d %H:%M:%S')})"
        return "Homepage Stories (Not yet updated)"

    def save(self, *args, **kwargs):
        """
        Override save to ensure `clean()` validation is called before saving the model.
        """
        self.full_clean()  # Call `clean()` method to enforce custom validation
        super().save(*args, **kwargs)
