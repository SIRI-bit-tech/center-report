from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, AuthorViewSet, ArticleViewSet, 
    NewsletterViewSet, ContactViewSet, SearchAPIView, HomepageAPIView
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'authors', AuthorViewSet)
router.register(r'articles', ArticleViewSet)
router.register(r'newsletter', NewsletterViewSet)
router.register(r'contact', ContactViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('search/', SearchAPIView.as_view(), name='search'),
    path('homepage/', HomepageAPIView.as_view(), name='homepage'),
    path('trending/', ArticleViewSet.as_view({'get': 'trending'}), name='trending'),
    path('breaking/', ArticleViewSet.as_view({'get': 'breaking'}), name='breaking'),
    path('featured/', ArticleViewSet.as_view({'get': 'featured'}), name='featured'),
    path('latest/', ArticleViewSet.as_view({'get': 'latest'}), name='latest'),
] 