from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-z9dkv=$z=vl80mm14s4j2193v(=feh!%xq!-f-yiig$#09^1ld"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

STATIC_ROOT = BASE_DIR / "staticfiles"
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

ALLOWED_HOSTS = [
    "3.27.199.83",
    "127.0.0.1",
    "localhost",
    "192.168.1.102",
    "https://thevalleydigital.netlify.app/",
]

INSTALLED_APPS = [
    "jazzmin",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "articles",
    "corsheaders",
    "rest_framework",
    "rest_framework.authtoken",
]

<<<<<<< HEAD
CORS_ALLOW_ALL_ORIGINS = [
    "http://localhost:5173/",
    "https://thevalleydigital.netlify.app/",
]

REST_FRAMEWORK = {"DEFAULT_PERMISSION_CLASSES": ["rest_framework.permission.AllowAny"]}
=======
CORS_ALLOW_ALL_ORIGINS = ["http://localhost:5173/", "https://thevalleydigital.netlify.app/"]
>>>>>>> 30f0854a12f6d88c6d80748705d16eb04d1b2737

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')  # Ensure this path is correct
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]


<<<<<<< HEAD
    urlpatterns = [
        # Add your URL patterns here
    ]
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

=======
>>>>>>> 30f0854a12f6d88c6d80748705d16eb04d1b2737
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

ROOT_URLCONF = "the_valley_digital.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "the_valley_digital.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Manila"
USE_I18N = True
USE_TZ = True

<<<<<<< HEAD

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "/static/"
STATICFILES_DIRS = [
    BASE_DIR / "static",  # Your static files directory
]


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

=======
>>>>>>> 30f0854a12f6d88c6d80748705d16eb04d1b2737
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "articles.User"

JAZZMIN_SETTINGS = {
    "site_title": "The Valley Digital | Admin",
    "site_header": "The Valley Digital Admin",
    "site_brand": "The Valley Digital",
    "site_logo": "images/the_valley_pubmats_e9Q_icon.ico",  # Corrected to use a static file path
    "site_icon": "images/the_valley_pubmats_e9Q_icon.ico",
    "welcome_sign": "Welcome to The Valley Digital Admin Panel",
    "show_sidebar": True,  # Show or hide the sidebar
    "navigation_expanded": True,  # Expand the sidebar navigation by default
}
