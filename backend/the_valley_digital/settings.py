from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = "django-insecure-z9dkv=$z=vl80mm14s4j2193v(=feh!%xq!-f-yiig$#09^1ld"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

STATIC_ROOT = BASE_DIR / "staticfiles"
STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

ALLOWED_HOSTS = [
    "54.153.133.144",
    "127.0.0.1",
    "localhost",
    "thevalleydigital.netlify.app",
    'thevalley.digital', 
    'api.thevalley.digital', 
    'www.thevalley.digital',
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

CORS_ALLOWED_ORIGINS = [
    "https://thevalleydigital.netlify.app",
    'thevalley.digital', 
    'api.thevalley.digital', 
    'www.thevalley.digital',
]

CORS_ALLOW_ALL_ORIGINS = True

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

# Additional directories to look for static files (for apps like Jazzmin, etc.)
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),  # add your custom static files folder here
]
# Whitenoise to handle static files efficiently
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MIDDLEWARE = [
    "whitenoise.middleware.WhiteNoiseMiddleware",
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
