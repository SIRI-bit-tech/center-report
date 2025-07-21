from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q, Count
from django.utils import timezone
from datetime import timedelta

from news.models import Category, Author, Article, Newsletter, Contact
from .serializers import (
    CategorySerializer, AuthorSerializer, ArticleListSerializer, 
    ArticleDetailSerializer, NewsletterSerializer, ContactSerializer,
    ArticleSearchSerializer
)
from .permissions import IsAdminOrReadOnly
from .pagination import CustomPagination


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = CustomPagination
    lookup_field = 'slug'
    
    @action(detail=True, methods=['get'])
    def articles(self, request, slug=None):
        category = self.get_object()
        articles = Article.objects.filter(
            category=category, 
            status='published'
        ).select_related('author', 'category').prefetch_related('tags')
        
        page = self.paginate_queryset(articles)
        if page is not None:
            serializer = ArticleListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)


class AuthorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Author.objects.filter(is_active=True).annotate(
        article_count=Count('articles', filter=Q(articles__status='published'))
    )
    serializer_class = AuthorSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = CustomPagination
    
    @action(detail=True, methods=['get'])
    def articles(self, request, pk=None):
        author = self.get_object()
        articles = Article.objects.filter(
            author=author, 
            status='published'
        ).select_related('author', 'category').prefetch_related('tags')
        
        page = self.paginate_queryset(articles)
        if page is not None:
            serializer = ArticleListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)


class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.filter(status='published').select_related(
        'author', 'category'
    ).prefetch_related('tags')
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = CustomPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category__slug', 'author__id', 'is_featured', 'is_breaking']
    search_fields = ['title', 'excerpt', 'content', 'author__name', 'category__name']
    ordering_fields = ['published_date', 'created_at', 'views_count', 'title']
    ordering = ['-published_date']
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ArticleDetailSerializer
        return ArticleListSerializer
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.increment_views()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        articles = self.queryset.filter(is_featured=True)
        page = self.paginate_queryset(articles)
        if page is not None:
            serializer = ArticleListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def breaking(self, request):
        articles = self.queryset.filter(is_breaking=True)
        page = self.paginate_queryset(articles)
        if page is not None:
            serializer = ArticleListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def trending(self, request):
        # Get articles from last 7 days with highest views
        week_ago = timezone.now() - timedelta(days=7)
        articles = self.queryset.filter(
            published_date__gte=week_ago
        ).order_by('-views_count')[:10]
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def latest(self, request):
        articles = self.queryset.order_by('-published_date')[:10]
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)


class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    http_method_names = ['post']  # Only allow POST for subscription
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            newsletter = serializer.save()
            return Response({
                'message': 'Successfully subscribed to newsletter!',
                'email': newsletter.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    http_method_names = ['post']  # Only allow POST for contact form
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            contact = serializer.save()
            return Response({
                'message': 'Thank you for your message. We will get back to you soon!',
                'id': contact.id
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Additional API endpoints
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView


class SearchAPIView(ListAPIView):
    serializer_class = ArticleSearchSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = CustomPagination
    
    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        if query:
            return Article.objects.filter(
                Q(title__icontains=query) |
                Q(excerpt__icontains=query) |
                Q(content__icontains=query) |
                Q(author__name__icontains=query) |
                Q(category__name__icontains=query),
                status='published'
            ).select_related('author', 'category').prefetch_related('tags')
        return Article.objects.none()


class HomepageAPIView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def get(self, request):
        # Featured articles
        featured_articles = Article.objects.filter(
            is_featured=True, 
            status='published'
        ).select_related('author', 'category').prefetch_related('tags')[:6]
        
        # Breaking news
        breaking_news = Article.objects.filter(
            is_breaking=True, 
            status='published'
        ).select_related('author', 'category').prefetch_related('tags')[:5]
        
        # Latest articles by category
        categories = Category.objects.filter(is_active=True)[:3]
        category_articles = {}
        
        for category in categories:
            articles = Article.objects.filter(
                category=category, 
                status='published'
            ).select_related('author', 'category').prefetch_related('tags')[:3]
            category_articles[category.slug] = ArticleListSerializer(articles, many=True).data
        
        return Response({
            'featured_articles': ArticleListSerializer(featured_articles, many=True).data,
            'breaking_news': ArticleListSerializer(breaking_news, many=True).data,
            'category_articles': category_articles,
        })
