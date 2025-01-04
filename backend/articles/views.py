from django.http import JsonResponse
from .models import Articles, Tag, PrintedIssue
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, BasePermission
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.views.decorators.csrf import csrf_exempt
from .serializers import ArticleSerializer

# Custom Permission for Editor
class IsEditorOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (
            request.user.role == 'editor' or request.user.is_staff
        )

# Home Page (if needed for frontend)
def home(request):
    return JsonResponse({"message": "Welcome to the School News Portal"})

# Editor Login
@csrf_exempt
@api_view(['POST'])
def editor_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user and user.role == 'editor':  # Assuming 'role' is a custom field in the User model
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid credentials or not an editor'}, status=status.HTTP_401_UNAUTHORIZED)

# CREATE Article (Editors and Admin)
@api_view(['POST'])
@permission_classes([IsEditorOrAdmin])
def article_create(request):
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# READ Articles (Editors and Admin can view all articles)
@api_view(['GET'])
@permission_classes([IsEditorOrAdmin])
def article_list_admin(request):
    articles = Articles.objects.all()
    serializer = ArticleSerializer(articles, many=True)
    return Response(serializer.data)

# UPDATE Article (Editors and Admin)
@api_view(['PUT'])
@permission_classes([IsEditorOrAdmin])
def article_update(request, id):
    try:
        article = Articles.objects.get(pk=id)
    except Articles.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ArticleSerializer(article, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE Article (Restricted to Admins only)
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def article_delete(request, id):
    try:
        article = Articles.objects.get(pk=id)
    except Articles.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    article.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# Public Views
def article_list(request):
    articles = Articles.objects.all().values()  # Fetch all articles as dictionaries
    return JsonResponse(list(articles), safe=False)

def article_detail(request, identifier):
    if identifier.isdigit():
        article = get_object_or_404(Articles, id=identifier)
    else:
        article = get_object_or_404(Articles, slug=identifier)

    return JsonResponse({
        'id': article.id,
        'headline': article.headline,
        'content': article.content,
        'category': article.category.name,
        'slug': article.slug,
    })

def article_search(request):
    query = request.GET.get('query', '')
    articles = Articles.objects.filter(
        Q(headline__icontains=query) | 
        Q(content__icontains=query) | 
        Q(tags__name__icontains=query) | 
        Q(slug__icontains=query)
    ).distinct()
    articles_data = list(articles.values('id', 'headline', 'author', 'publication_date', 'content', 'tags__name', 'slug'))
    return JsonResponse({'articles': articles_data})
