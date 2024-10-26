from django.http import JsonResponse
from .models import Articles
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ArticleSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

# Home Page (if needed for frontend)
def home(request):
    return JsonResponse({"message": "Welcome to the School News Portal"})

# List all articles
def article_list(request):
    articles = Articles.objects.all().values()  # Fetch all articles as dictionaries
    return JsonResponse(list(articles), safe=False)  # Return as JSON

# Filter articles by category
def news_articles(request):
    articles = Articles.objects.filter(category__name='NEWS').values()
    return JsonResponse(list(articles), safe=False)

def feature_articles(request):
    articles = Articles.objects.filter(category__name='Feature').values()
    return JsonResponse(list(articles), safe=False)

def editorial_articles(request):
    articles = Articles.objects.filter(category__name='Editorial').values()
    return JsonResponse(list(articles), safe=False)

def opinion_articles(request):
    articles = Articles.objects.filter(category__name='Opinion').values()
    return JsonResponse(list(articles), safe=False)

def science_and_technology_articles(request):
    articles = Articles.objects.filter(category__name='Science and Technology').values()
    return JsonResponse(list(articles), safe=False)

def sports_articles(request):
    articles = Articles.objects.filter(category__name='Sports').values()
    return JsonResponse(list(articles), safe=False)

# Article Detail
#@csrf_exempt
def article_detail(request, id):
    article = get_object_or_404(Articles, id=id)
    return JsonResponse({
        'id': article.id,
        'headline': article.headline,
        'content': article.content,
        # 'photo': article.photo.url,  # Assuming your model has a photo field
        'category': article.category.name,
    })
    print("KHIYICGFEWUDWRFURDDDDDDVYJGVDVGJ ScvjhvbhjfkKJHBVFVBKHVFEKBGVBKEFT ANO")

# Search Functionality
def article_search(request):
    query = request.GET.get('q', '')
    articles = Articles.objects.filter(title__icontains=query).values()
    return JsonResponse(list(articles), safe=False)

# ADMIN VIEWS

# CREATE Article
@api_view(['POST'])
@permission_classes([IsAdminUser])
def article_create(request):
    if request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# READ Articles (Admin can view all articles)
@api_view(['GET'])
@permission_classes([IsAdminUser])
def article_list_admin(request):
    if request.method == 'GET':
        articles = Articles.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data)

# UPDATE Article
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def article_update(request, id):
    try:
        article = Articles.objects.get(pk=id)
    except Articles.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE Article
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def article_delete(request, id):
    try:
        article = Articles.objects.get(pk=id)
    except Articles.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@csrf_exempt
@api_view(['POST'])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        # Generate token if authentication is successful
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@csrf_exempt  # Ensure this is exempt
def test_view(request):
    return JsonResponse({"message": "CSRF test passed!"})