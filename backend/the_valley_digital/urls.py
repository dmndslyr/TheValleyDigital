"""
URL configuration for the_valley_digital project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.contrib import admin
from articles import views  # Import views from the current app


urlpatterns = [
    path('admin/', admin.site.urls),
    path('editor/login/', views.editor_login, name='editor-login'),
    path('editor/articles/', views.article_list, name='editor_article_list'),
    path('editor/article/<int:id>/', views.article_detail, name='editor_detail'),
    path('editor/search/', views.article_search, name='editor_article_search'),  
    path('editor/create/', views.article_create, name='editor_article_create'),
    path('editor/article/<int:id>/modify/', views.article_update, name='editor_article_modify'),
    path('editor/article/<int:id>/delete/', views.article_delete, name='editor_article_delete'),

    path('test/', views.test_view, name='test_view'),

    path('', views.home, name='home'),  # Home page
    path('articles/', views.article_list, name='article_list'),  # List all articles
    path('articles/news/', views.news_articles, name='news_articles'),  # News articles
    path('articles/features/', views.feature_articles, name='feature_articles'),  # Feature articles
    path('articles/editorials/', views.editorial_articles, name='editorial_articles'),  # Editorial articles
    path('articles/opinions/', views.opinion_articles, name='opinion_articles'),  # Opinion articles
    path('articles/science/', views.science_and_technology_articles, name='science_and_technology_articles'),  # Science and Technology articles
    path('articles/sports/', views.sports_articles, name='sports_articles'),  # Sports articles
    path('article/<int:id>/', views.article_detail, name='article_detail'),  # Article detail by ID
    path('search/', views.article_search, name='article_search'),  # Search functionality
    path('article/<slug:identifier>/', views.article_detail, name='article_detail_by_slug'),  # Search by slug
    path('article/<int:identifier>/', views.article_detail, name='article_detail_by_id'),  # Search by ID
]


