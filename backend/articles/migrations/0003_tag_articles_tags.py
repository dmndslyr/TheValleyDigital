# Generated by Django 5.1.2 on 2024-12-07 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0002_alter_articles_caption'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name='articles',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='articles', to='articles.tag'),
        ),
    ]