"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchX, ArrowDownNarrowWide, Grid3x2 } from 'lucide-react';
import { toast } from 'sonner';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  tags: string[];
  image: string;
  fullContent?: string;
}

const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Art of Minimalist Living in Modern Spaces',
    excerpt: 'Discover how to create serene, functional environments that reflect your values while maintaining style and comfort.',
    category: 'Lifestyle',
    author: {
      name: 'Emma Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
    },
    publishDate: '2024-01-15',
    tags: ['Interior Design', 'Wellness', 'Sustainability'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    fullContent: 'Minimalist living is more than just decluttering—it\'s about intentional choices that create space for what truly matters. In our modern world, where complexity often overwhelms, the principles of minimalism offer a path to clarity and peace.'
  },
  {
    id: '2',
    title: 'Revolutionary AI Tools Reshaping Creative Workflows',
    excerpt: 'Explore cutting-edge artificial intelligence applications that are transforming how designers and creators approach their craft.',
    category: 'Tech',
    author: {
      name: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    publishDate: '2024-01-12',
    tags: ['AI', 'Design Tools', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    fullContent: 'The landscape of creative work is evolving rapidly with AI integration. From generative design to automated workflows, these tools are not replacing human creativity but amplifying it in unprecedented ways.'
  },
  {
    id: '3',
    title: 'Handcrafted Ceramics: Ancient Techniques, Modern Appeal',
    excerpt: 'Meet the artisans reviving traditional pottery methods while creating contemporary pieces that speak to today\'s aesthetic.',
    category: 'Craft',
    author: {
      name: 'Sarah Kim',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    publishDate: '2024-01-10',
    tags: ['Pottery', 'Artisan', 'Traditional Crafts'],
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    fullContent: 'In an age of mass production, handcrafted ceramics represent a return to authenticity. These artisans are preserving ancient techniques while creating pieces that resonate with contemporary sensibilities.'
  },
  {
    id: '4',
    title: 'Typography as Visual Language in Digital Spaces',
    excerpt: 'Understanding how letterforms communicate beyond words and shape user experiences in the digital realm.',
    category: 'Design',
    author: {
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    publishDate: '2024-01-08',
    tags: ['Typography', 'UX Design', 'Visual Communication'],
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
    fullContent: 'Typography in digital design goes far beyond choosing pretty fonts. It\'s about creating hierarchy, establishing mood, and guiding users through information with clarity and purpose.'
  },
  {
    id: '5',
    title: 'Sustainable Fashion: Beyond Fast Trends',
    excerpt: 'How conscious consumers are driving a revolution in fashion that prioritizes longevity and environmental responsibility.',
    category: 'Lifestyle',
    author: {
      name: 'Lisa Wong',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    publishDate: '2024-01-05',
    tags: ['Sustainability', 'Fashion', 'Ethics'],
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
    fullContent: 'The fashion industry is experiencing a fundamental shift as consumers demand transparency, quality, and environmental responsibility from brands.'
  },
  {
    id: '6',
    title: 'The Future of Remote Collaboration Tools',
    excerpt: 'Examining next-generation platforms that are making distributed teams more creative and productive than ever.',
    category: 'Tech',
    author: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face'
    },
    publishDate: '2024-01-03',
    tags: ['Remote Work', 'Collaboration', 'Productivity'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    fullContent: 'Remote collaboration has evolved beyond video calls and shared documents. New platforms are creating immersive experiences that rival in-person interaction.'
  }
];

const categories = ['All', 'Lifestyle', 'Tech', 'Craft', 'Design'];
const sortOptions = ['Newest', 'Most Popular'];

export default function ContentShowcase() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const itemsPerPage = 6;

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = mockArticles;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(article => article.category === activeCategory);
    }

    // Filter by search query
    if (debouncedQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    // Sort articles
    if (sortBy === 'Newest') {
      filtered = filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    } else if (sortBy === 'Most Popular') {
      // Mock popularity sorting (could be based on views, likes, etc.)
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [activeCategory, debouncedQuery, sortBy]);

  // Paginate articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(0, startIndex + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const hasMoreArticles = paginatedArticles.length < filteredArticles.length;

  const handleLoadMore = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const handleBookmark = useCallback((articleId: string) => {
    setBookmarkedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
        toast.success('Removed from bookmarks');
      } else {
        newSet.add(articleId);
        toast.success('Added to bookmarks');
      }
      return newSet;
    });
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (error) {
    return (
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="text-center py-16">
            <SearchX className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
            <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't load the articles. Please try again.
            </p>
            <Button onClick={handleRetry} variant="outline">
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container max-w-7xl">
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
                className={`rounded-full px-4 py-2 transition-all duration-150 ${
                  activeCategory === category
                    ? 'bg-[#8b6f47] hover:bg-[#7a5f3a] text-white'
                    : 'hover:bg-secondary'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="relative">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-4 pr-4"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-40">
                <ArrowDownNarrowWide className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Area */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-3 w-20 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                  <Skeleton className="h-9 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-16">
            <Grid3x2 className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-6">
              {debouncedQuery || activeCategory !== 'All'
                ? 'Try adjusting your search or filters'
                : 'Check back soon for new content'}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setCurrentPage(1);
              }}
            >
              Explore latest articles
            </Button>
          </div>
        ) : (
          <>
            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedArticles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:shadow-lg hover:border-[#f0eae2] group"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif font-medium text-lg leading-tight mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Author & Date */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {article.author.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(article.publishDate)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 hover:bg-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBookmark(article.id);
                        }}
                      >
                        <span className={`text-sm ${bookmarkedIds.has(article.id) ? 'text-accent' : 'text-muted-foreground'}`}>
                          ★
                        </span>
                      </Button>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs px-2 py-0.5 border-border/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {article.tags.length > 2 && (
                        <Badge
                          variant="outline"
                          className="text-xs px-2 py-0.5 border-border/50"
                        >
                          +{article.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    {/* CTA */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 font-medium text-primary hover:text-primary/80"
                    >
                      Read article →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            {hasMoreArticles && (
              <div className="text-center mt-12">
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  size="lg"
                  className="px-8"
                >
                  Load more articles
                </Button>
              </div>
            )}
          </>
        )}

        {/* Article Preview Modal */}
        <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedArticle && (
              <>
                <DialogHeader>
                  <DialogTitle className="font-serif text-xl leading-tight pr-8">
                    {selectedArticle.title}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedArticle.excerpt}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-6">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  
                  <div className="flex items-center gap-3 mb-6">
                    <img
                      src={selectedArticle.author.avatar}
                      alt={selectedArticle.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">
                        {selectedArticle.author.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(selectedArticle.publishDate)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedArticle.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground leading-relaxed">
                      {selectedArticle.fullContent}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-8 pt-6 border-t">
                    <Button
                      onClick={() => handleBookmark(selectedArticle.id)}
                      variant={bookmarkedIds.has(selectedArticle.id) ? "default" : "outline"}
                      size="sm"
                    >
                      {bookmarkedIds.has(selectedArticle.id) ? 'Bookmarked' : 'Bookmark'}
                    </Button>
                    <Button variant="outline" size="sm">
                      Share article
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}