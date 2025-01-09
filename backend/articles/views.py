from django.http import JsonResponse
from .models import Article, Tag, PrintedIssue, HomepageStorie
from django.shortcuts import get_object_or_404
from django.views.decorators.cache import never_cache

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ArticleSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from django.db.models import Q

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


# Home Page (if needed for frontend)
def home(request):
    return JsonResponse({"message": "Welcome to the School News Portal"})


@api_view(["GET"])
def article_list(request):
    articles = Article.objects.all().order_by("-id")  # Sort by latest ID
    serializer = ArticleSerializer(articles, many=True, context={"request": request})
    return Response(serializer.data)


# Filter articles by category
def news_articles(request):
    articles = Article.objects.filter(category__name="NEWS").order_by("-id").values()
    return JsonResponse(list(articles), safe=False)


def feature_articles(request):
    articles = Article.objects.filter(category__name="Feature").order_by("-id").values()
    return JsonResponse(list(articles), safe=False)


def editorial_articles(request):
    articles = (
        Article.objects.filter(category__name="Editorial").order_by("-id").values()
    )
    return JsonResponse(list(articles), safe=False)


def opinion_articles(request):
    articles = Article.objects.filter(category__name="Opinion").order_by("-id").values()
    return JsonResponse(list(articles), safe=False)


def science_and_technology_articles(request):
    articles = (
        Article.objects.filter(category__name="Science and Technology")
        .order_by("-id")
        .values()
    )
    return JsonResponse(list(articles), safe=False)


def sports_articles(request):
    articles = Article.objects.filter(category__name="Sports").order_by("-id").values()
    return JsonResponse(list(articles), safe=False)


# Article Detail
def article_detail(request, identifier):
    # Check if the identifier is numeric (ID) or a slug
    if identifier.isdigit():
        article = get_object_or_404(Article, id=identifier)  # Search by ID
    else:
        article = get_object_or_404(Article, slug=identifier)  # Search by Slug

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
        }
    )


def article_search(request):
    query = request.GET.get("query", "")  # Get the search query from the GET request

    # Start with all articles
    articles = Article.objects.all()

    if query:
        # Filter articles based on query matching headline, content, or tags or slug
        articles = articles.filter(
            Q(headline__icontains=query)  # Match headline
            | Q(content__icontains=query)  # Match content
            | Q(tags__name__icontains=query)  # Match tags (ManyToMany relationship)
            | Q(slug__icontains=query)  # Match slugs
        ).distinct()

    # Prepare the data to be returned as JSON
    articles_data = list(
        articles.values(
            "id",
            "headline",
            "author",
            "publication_date",
            "content",
            "tags__name",
            "slug",
        )
    )

    # Return the response in JSON format
    return JsonResponse({"articles": articles_data})


def printed_issues_list(request):
    issues = PrintedIssue.objects.all()
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


from django.http import JsonResponse
from .models import HomepageStorie


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
                ),  # Add absolute image URL
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
                ),  # Add absolute image URL
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
