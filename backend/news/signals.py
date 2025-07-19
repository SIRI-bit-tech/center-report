from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Article, Category, Author


@receiver(post_save, sender=Article)
def update_article_counts(sender, instance, created, **kwargs):
    """Update article counts when articles are created/updated"""
    if created or instance.status == 'published':
        # Update category article count
        if instance.category:
            instance.category.save()
        
        # Update author article count
        if instance.author:
            instance.author.save()


@receiver(post_delete, sender=Article)
def update_counts_on_delete(sender, instance, **kwargs):
    """Update counts when articles are deleted"""
    if instance.category:
        instance.category.save()
    if instance.author:
        instance.author.save() 