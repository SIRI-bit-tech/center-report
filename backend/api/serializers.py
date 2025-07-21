from rest_framework import serializers
from news.models import Category, Author, Article, Newsletter, Contact
from taggit.serializers import TagListSerializerField


class CategorySerializer(serializers.ModelSerializer):
    article_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'color', 'order', 'is_active', 'article_count', 'created_at']

    def get_article_count(self, obj):
        return obj.articles.filter(status='published').count()


class AuthorSerializer(serializers.ModelSerializer):
    article_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Author
        fields = ['id', 'name', 'bio', 'avatar', 'email', 'twitter_handle', 'linkedin_url', 'website', 'is_active', 'article_count', 'created_at']

    def get_article_count(self, obj):
        return obj.articles.filter(status='published').count()


class ArticleListSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagListSerializerField()
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'excerpt', 'featured_image', 'author', 'category', 'tags', 
                 'is_featured', 'is_breaking', 'published_date', 'read_time', 'views_count', 'created_at']


class ArticleDetailSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    tags = TagListSerializerField()
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'excerpt', 'content', 'featured_image', 'author', 'category', 'tags',
                 'is_featured', 'is_breaking', 'published_date', 'read_time', 'views_count', 
                 'meta_title', 'meta_description', 'created_at', 'updated_at']


class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Newsletter
        fields = ['email']
    
    def create(self, validated_data):
        email = validated_data['email']
        newsletter, created = Newsletter.objects.get_or_create(
            email=email,
            defaults={'is_active': True}
        )
        if not created and not newsletter.is_active:
            newsletter.is_active = True
            newsletter.unsubscribed_at = None
            newsletter.save()
        return newsletter


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['first_name', 'last_name', 'email', 'subject', 'message']


class ArticleSearchSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'excerpt', 'featured_image', 'author', 'category', 
                 'published_date', 'read_time', 'views_count'] 