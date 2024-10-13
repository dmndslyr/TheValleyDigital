from django.http import JsonResponse
from .models import Articles
from django.shortcuts import get_object_or_404

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
    articles = Content.objects.filter(title__icontains=query).values()
    return JsonResponse(list(articles), safe=False)
