from django.http import JsonResponse
from .models import Article, Tag, PrintedIssue, HomepageStorie, Categorie
from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework import status
from .serializers import ArticleSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from django.db.models import Q, Case, When, IntegerField


from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


# Home Page (if needed for frontend)
def home(request):
    return JsonResponse({"message": "Welcome to the School News Portal"})


@api_view(["GET"])
def article_list(request):
    # Get sorting order from the query parameter (default is descending)
    order = request.GET.get(
        "order", "desc"
    )  # 'asc' for ascending, 'desc' for descending

    # Determine the sorting fields based on the order
    if order == "asc":
        sort_fields = ["publication_date", "-id"]  # Ascending by date, descending by ID
    else:
        sort_fields = [
            "-publication_date",
            "-id",
        ]  # Descending by date, descending by ID

    # Fetch and sort articles
    articles = Article.objects.all().order_by(*sort_fields)

    # Serialize the data
    serializer = ArticleSerializer(articles, many=True, context={"request": request})
    return Response(serializer.data)


def category_articles(request, category_name):
    # Get sorting order from the query parameter (default is descending)
    order = request.GET.get("order", "desc")  # 'asc' for ascending, 'desc' for descending

    # Determine the sorting fields based on the order
    if order == "asc":
        sort_fields = ["publication_date", "-id"]  # Ascending by date, descending by ID
    else:
        sort_fields = ["-publication_date", "-id"]  # Descending by date, descending by ID

    # Get the category object to ensure it exists
    category = get_object_or_404(Categorie, name=category_name)

    # Filter and sort articles by category and specified fields
    articles = Article.objects.filter(category=category).order_by(*sort_fields)

    # Construct the JSON response explicitly
    article_list = [
        {
            "id": article.id,
            "headline": article.headline,
            "author": article.author,
            "content": article.content,
            "category": article.category.name,
            "slug": article.slug,
            "image_url": article.image.url if article.image else None,
            "publication_date": article.publication_date.strftime("%m-%d-%y") if article.publication_date else None,
            "is_published": article.is_published,
            "caption": article.caption,
            "tags": [tag.name for tag in article.tags.all()],
        }
        for article in articles
    ]

    # Return the articles as JSON
    return JsonResponse(article_list, safe=False)


def news_articles(request):
    return category_articles(request, "NEWS")


def feature_articles(request):
    return category_articles(request, "FEATURE")


def editorial_articles(request):
    return category_articles(request, "EDITORIAL")


def opinion_articles(request):
    return category_articles(request, "OPINION")


def science_and_technology_articles(request):
    return category_articles(request, "SCI-TECH")


def sports_articles(request):
    return category_articles(request, "SPORTS")


# Article Detail
def article_detail(request, identifier):
    # Check if the identifier is numeric (ID) or a slug
    if identifier.isdigit():
        article = get_object_or_404(Article, id=identifier)  # Search by ID
    else:
        article = get_object_or_404(Article, slug=identifier)  # Search by Slug

    # Retrieve tag names as a list
    tags = list(article.tags.values_list('name', flat=True))

    return JsonResponse(
        {
            "id": article.id,
            "headline": article.headline,
            "author": article.author,
            "content": article.content,
            "category": article.category.name,
            "slug": article.slug,  # Include the slug in the response
            "image_url": (
                article.image.url if article.image else None
            ),  # Include the image URL
            "caption": article.caption,
            "publication_date": article.publication_date.strftime("%m-%d-%y") if article.publication_date else None,
            "tags": tags,  # Add tags to the response
        }
    )


def article_search(request):
    query = request.GET.get("query", "")  # Get the search query from the GET request
    order = request.GET.get(
        "order", "desc"
    )  # Get sorting order from the query parameter (default is descending)

    # Start with all articles
    articles = Article.objects.all()

    if query:
        # Add relevance scoring based on query matching
        articles = articles.annotate(
            relevance=Case(
                When(
                    headline__icontains=query, then=4
                ),  # Match headline (highest priority)
                When(author__icontains=query, then=3),  # Match author
                When(tags__name__icontains=query, then=2),  # Match tags
                When(content__icontains=query, then=1),  # Match content
                default=0,
                output_field=IntegerField(),
            )
        ).filter(
            Q(headline__icontains=query)
            | Q(content__icontains=query)
            | Q(author__icontains=query)
            | Q(tags__name__icontains=query)
        )

    # Determine sorting fields
    if order == "asc":
        sort_fields = [
            "relevance",
            "publication_date",
            "-id",
        ]  # Ascending by relevance, publication_date, and ID
    elif order == "desc":
        sort_fields = [
            "-relevance",
            "-publication_date",
            "-id",
        ]  # Descending by relevance, publication_date, and ID
    else:  # Default to relevance sorting
        sort_fields = ["-relevance", "-publication_date", "-id"]

    # Fetch and sort articles
    articles = articles.order_by(*sort_fields).prefetch_related("tags")

    # Remove duplicates manually in Python
    unique_articles = []
    seen_ids = set()
    for article in articles:
        if article.id not in seen_ids:
            unique_articles.append(
                {
                    "id": article.id,
                    "category": article.category.name,
                    "headline": article.headline,
                    "author": article.author,
                    "publication_date": article.publication_date,
                    "content": article.content,
                    "slug": article.slug,
                    "tags": list(
                        article.tags.values_list("name", flat=True).distinct()
                    ),
                }
            )
            seen_ids.add(article.id)

    # Return the response in JSON format
    return JsonResponse({"articles": unique_articles})


def printed_issues_list(request):
    # Get sorting order from the query parameter (default is descending)
    order = request.GET.get(
        "order", "desc"
    )  # 'asc' for ascending, 'desc' for descending

    # Determine the sorting fields based on the order
    if order == "asc":
        sort_fields = [
            "month_range",
            "-id",
        ]  # Ascending by `month_range`, descending by `id`
    else:
        sort_fields = [
            "-month_range",
            "-id",
        ]  # Descending by `month_range`, descending by `id`

    # Fetch and sort printed issues
    issues = PrintedIssue.objects.all().order_by(*sort_fields)

    # Serialize the data
    data = [
        {
            "id": issue.id,
            "volume": issue.volume,
            "issue_no": issue.issue_no,
            "month_range": issue.month_range,
            "is_published": issue.is_published,
            "pdf_file_url": issue.pdf_file.url if issue.pdf_file else None,
            "slug": issue.slug,
        }
        for issue in issues
    ]
    return JsonResponse({"printed_issues": data})


# Printed Issue Detail
def printed_issue_detail(request, identifier):
    # Check if the identifier is numeric (ID) or a slug
    if identifier.isdigit():
        issue = get_object_or_404(PrintedIssue, id=identifier)  # Search by ID
    else:
        issue = get_object_or_404(PrintedIssue, slug=identifier)  # Search by Slug

    return JsonResponse(
        {
            "pdf_file_url": issue.pdf_file.url if issue.pdf_file else None,
        }
    )


def homepage_storie_list(request):
    # Get all the homepage stories
    stories = HomepageStorie.objects.all()

    # Serialize the data (with proper checks for related fields)
    data = [
        {
            "id": story.id,
            "top_story": {
                "headline": (
                    story.top_story.headline if story.top_story else "No top story"
                ),  # Handle None value
                "id": (
                    story.top_story.id if story.top_story else None
                ),  # Add ID of top story
                "image_url": (
                    request.build_absolute_uri(story.top_story.image.url)
                    if story.top_story and story.top_story.image
                    else None
                ),  # Add absolute image URL
                "author": (
                    story.top_story.author if story.top_story else "No author"
                ),
                "publication_date": (
                    story.top_story.publication_date.strftime("%m-%d-%Y")
                    if story.top_story and story.top_story.publication_date
                    else "Not yet published"
                ),
            },
            "featured_editorial": {
                "headline": (
                    story.featured_editorial.headline
                    if story.featured_editorial
                    else "No editorial"
                ),  # Handle None value
                "id": (
                    story.featured_editorial.id if story.featured_editorial else None
                ),  # Add ID of featured editorial
                "image_url": (
                    request.build_absolute_uri(story.featured_editorial.image.url)
                    if story.featured_editorial and story.featured_editorial.image
                    else None
                ), 
                "author": (
                    story.featured_editorial.author if story.featured_editorial else "No author"
                ),
                "publication_date": (
                    story.featured_editorial.publication_date.strftime("%m-%d-%Y")
                    if story.featured_editorial and story.featured_editorial.publication_date
                    else "Not yet published"
                ), # Add absolute image URL
            },
            "featured_feature": {
                "headline": (
                    story.featured_feature.headline
                    if story.featured_feature
                    else "No feature"
                ),  # Handle None value
                "id": (
                    story.featured_feature.id if story.featured_feature else None
                ),  # Add ID of featured feature
                "image_url": (
                    request.build_absolute_uri(story.featured_feature.image.url)
                    if story.featured_feature and story.featured_feature.image
                    else None
                ),  
                "author": (
                    story.featured_feature.author if story.featured_feature else "No author"
                ),
                "publication_date": (
                    story.featured_feature.publication_date.strftime("%m-%d-%Y")
                    if story.featured_feature and story.featured_feature.publication_date
                    else "Not yet published"
                ), # Add absolute image URL
            },
            "featured_articles": [
                {
                    "id": article.id,
                    "headline": article.headline,
                    "image_url": (
                        request.build_absolute_uri(article.image.url)
                        if article.image
                        else None
                    ),  # Include absolute image URL for articles
                    "author": (
                    article.author if article.author else "No author"
                    ),
                    "publication_date": (
                        article.publication_date.strftime("%m-%d-%Y")
                    ), # Add absolute image URL
                }
                for article in story.featured_articles.all()
            ],  # Include article IDs, headlines, and absolute image URLs
            "updated_at": (
                story.updated_at.strftime("%Y-%m-%d %H:%M:%S")
                if story.updated_at
                else "Not yet updated"
            ),
        }
        for story in stories
    ]

    return JsonResponse({"homepage_stories": data})


# ADMIN VIEWS
# CREATE Article
@api_view(["POST"])
@permission_classes([IsAdminUser])
def article_create(request):
    if request.method == "POST":
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# READ Articles (Admin can view all articles)
@api_view(["GET"])
@permission_classes([IsAdminUser])
def article_list_admin(request):
    if request.method == "GET":
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)


# UPDATE Article
@api_view(["PUT"])
@permission_classes([IsAdminUser])
def article_update(request, id):
    try:
        article = Article.objects.get(pk=id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# DELETE Article
@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def article_delete(request, id):
    try:
        article = Article.objects.get(pk=id)
    except Article.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@api_view(["POST"])
def editor_login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if user is not None:
        # Generate token if authentication is successful
        token, created = Token.objects.get_or_create(user=user)
        return Response({"token": token.key}, status=status.HTTP_200_OK)
    return Response(
        {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
    )


@csrf_exempt  # Ensure this is exempt
def test_view(request):
    return JsonResponse({"message": "CSRF test passed!"})
