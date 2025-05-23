export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  discountPrice?: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // Duration in minutes
  category: string;
  rating: number;
  reviews: number;
  instructor: string;
  instructorAvatar: string;
  featured: boolean;
  tags: string[];
}
