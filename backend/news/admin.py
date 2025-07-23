from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Category, Author, Article, Newsletter, Contact


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'color', 'order', 'is_active', 'article_count']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    ordering = ['order', 'name']
    
    def article_count(self, obj):
        return obj.articles.filter(status='published').count()
    article_count.short_description = 'Articles'


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'twitter_handle', 'is_active', 'article_count', 'avatar_display']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'email', 'bio']
    readonly_fields = ['created_at', 'updated_at']
    
    def avatar_display(self, obj):
        try:
            if obj.avatar and hasattr(obj.avatar, 'url'):
                return format_html('<img src="{}" width="50" height="50" style="border-radius: 50%;" />', obj.avatar.url)
        except Exception:
            pass
        return "No Avatar"
    avatar_display.short_description = 'Avatar'
    
    def article_count(self, obj):
        return obj.articles.filter(status='published').count()
    article_count.short_description = 'Articles'


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'status', 'is_featured', 'is_breaking', 'published_date', 'views_count', 'read_time_display']
    list_filter = ['status', 'is_featured', 'is_breaking', 'category', 'author', 'published_date', 'created_at']
    search_fields = ['title', 'excerpt', 'content', 'author__name', 'category__name']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at', 'views_count', 'read_time_display']
    date_hierarchy = 'published_date'
    ordering = ['-published_date', '-created_at']
    
    fieldsets = (
        ('Content', {
            'fields': ('title', 'slug', 'excerpt', 'content', 'featured_image')
        }),
        ('Metadata', {
            'fields': ('author', 'category', 'tags', 'status', 'is_featured', 'is_breaking')
        }),
        ('Publishing', {
            'fields': ('published_date',)
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description'),
            'classes': ('collapse',)
        }),
        ('Analytics', {
            'fields': ('views_count', 'read_time_display'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def read_time_display(self, obj):
        return f"{obj.read_time} min"
    read_time_display.short_description = 'Read Time'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('author', 'category')
    
    actions = ['make_published', 'make_draft', 'make_featured', 'remove_featured', 'fix_published_dates']
    
    def make_published(self, request, queryset):
        from django.utils import timezone
        now = timezone.now()
        for article in queryset:
            if not article.published_date:
                article.published_date = now
            article.status = 'published'
            article.save()
    make_published.short_description = "Mark selected articles as published"
    
    def make_draft(self, request, queryset):
        queryset.update(status='draft')
    make_draft.short_description = "Mark selected articles as draft"
    
    def make_featured(self, request, queryset):
        queryset.update(is_featured=True)
    make_featured.short_description = "Mark selected articles as featured"
    
    def remove_featured(self, request, queryset):
        queryset.update(is_featured=False)
    remove_featured.short_description = "Remove featured status from selected articles"
    
    def fix_published_dates(self, request, queryset):
        from django.utils import timezone
        fixed_count = 0
        for article in queryset:
            if article.status == 'published' and not article.published_date:
                article.published_date = article.created_at or timezone.now()
                article.save()
                fixed_count += 1
        self.message_user(request, f"Fixed published_date for {fixed_count} articles.")
    fix_published_dates.short_description = "Fix published_date for published articles"

    def save_model(self, request, obj, form, change):
        if obj.status == 'published' and not obj.published_date:
            from django.utils import timezone
            obj.published_date = timezone.now()
        super().save_model(request, obj, form, change)


@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ['email', 'is_active', 'subscribed_at', 'unsubscribed_at']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email']
    readonly_fields = ['subscribed_at']
    ordering = ['-subscribed_at']
    
    actions = ['activate_subscribers', 'deactivate_subscribers']
    
    def activate_subscribers(self, request, queryset):
        queryset.update(is_active=True, unsubscribed_at=None)
    activate_subscribers.short_description = "Activate selected subscribers"
    
    def deactivate_subscribers(self, request, queryset):
        from django.utils import timezone
        queryset.update(is_active=False, unsubscribed_at=timezone.now())
    deactivate_subscribers.short_description = "Deactivate selected subscribers"


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'subject', 'is_read', 'created_at']
    list_filter = ['subject', 'is_read', 'created_at']
    search_fields = ['first_name', 'last_name', 'email', 'message']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('first_name', 'last_name', 'email', 'subject')
        }),
        ('Message', {
            'fields': ('message',)
        }),
        ('Status', {
            'fields': ('is_read',)
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['mark_as_read', 'mark_as_unread']
    
    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected messages as read"
    
    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
    mark_as_unread.short_description = "Mark selected messages as unread"


# Customize admin site
admin.site.site_header = "The Central Report Admin"
admin.site.site_title = "Central Report Admin"
admin.site.index_title = "Welcome to The Central Report Administration"
