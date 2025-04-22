
import { useEffect } from 'react';
import Hero from '@/components/home/Hero';
import ContentRow from '@/components/home/ContentRow';
import { CONTENT_CATEGORIES } from '@/utils/constants';
import AuthModal from '@/components/auth/AuthModal';

const Home = () => {
  useEffect(() => {
    document.title = 'BingeByte Theater - Watch Movies & TV Shows Online';
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      
      <div className="container mx-auto px-4 mt-8 pb-16 space-y-8">
        {CONTENT_CATEGORIES.map((category) => (
          <ContentRow 
            key={category.id}
            title={category.name}
            categoryId={category.id}
          />
        ))}
      </div>
      
      {/* Auth Modal will show when URL has auth parameter */}
      <AuthModal />
    </div>
  );
};

export default Home;
