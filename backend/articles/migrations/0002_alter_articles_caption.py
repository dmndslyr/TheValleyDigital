# Generated by Django 5.1.2 on 2024-10-13 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articles',
            name='caption',
            field=models.TextField(blank=True, null=True),
        ),
    ]