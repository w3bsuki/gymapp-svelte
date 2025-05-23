# Database Schema Design

This document outlines the database schema for our fitness trainer web application. We'll be using Prisma as our ORM with a PostgreSQL database.

## Schema Overview

```prisma
// This will be the content of your prisma/schema.prisma file

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User Authentication and Profiles
model User {
  id                String    @id @default(cuid())
  email             String    @unique
  username          String?   @unique
  name              String?
  bio               String?
  avatarUrl         String?
  role              Role      @default(USER)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  // Relations
  auth              Auth?
  profile           Profile?
  courseEnrollments CourseEnrollment[]
  coursesCreated    Course[]  @relation("CourseAuthor")
  posts             Post[]
  comments          Comment[]
  messages          Message[] @relation("MessageSender")
  receivedMessages  Message[] @relation("MessageReceiver")
  payments          Payment[]
}

model Auth {
  id           String    @id
  userId       String    @unique
  user         User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // You can add more auth-related fields here depending on your auth provider
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  expiresAt DateTime
  createdAt DateTime @default(now())
}

model Profile {
  id               String   @id @default(cuid())
  userId           String   @unique
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  fitnessGoals     String?
  experienceLevel  Level?   @default(BEGINNER)
  weight           Float?
  height           Float?
  dateOfBirth      DateTime?
  phone            String?
  address          String?
  socialMediaLinks Json?    // Store as JSON
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

// Course and Learning Platform
model Course {
  id           String    @id @default(cuid())
  title        String
  slug         String    @unique
  description  String
  content      String?   // Rich text or JSON content
  imageUrl     String?
  previewVideoUrl String?
  duration     Int?      // in minutes
  difficulty   Level     @default(BEGINNER)
  price        Float
  discountPrice Float?
  isPublished  Boolean   @default(false)
  publishedAt  DateTime?
  authorId     String
  author       User      @relation("CourseAuthor", fields: [authorId], references: [id])
  
  // Relations
  chapters     Chapter[]
  enrollments  CourseEnrollment[]
  categories   CategoryOnCourse[]
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

model Chapter {
  id          String    @id @default(cuid())
  title       String
  description String?
  position    Int
  content     String?   // Rich text or JSON content
  videoUrl    String?
  duration    Int?      // in minutes
  isPublished Boolean   @default(false)
  isFree      Boolean   @default(false)
  courseId    String
  course      Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  
  // Relations
  lessons     Lesson[]
  progress    ChapterProgress[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Lesson {
  id          String    @id @default(cuid())
  title       String
  description String?
  content     String?   // Rich text or JSON content
  videoUrl    String?
  duration    Int?      // in minutes
  position    Int
  isPublished Boolean   @default(false)
  chapterId   String
  chapter     Chapter   @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  
  // Relations
  attachments Attachment[]
  progress    LessonProgress[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Attachment {
  id        String   @id @default(cuid())
  name      String
  url       String
  lessonId  String
  lesson    Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Category {
  id        String    @id @default(cuid())
  name      String    @unique
  slug      String    @unique
  imageUrl  String?
  courses   CategoryOnCourse[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model CategoryOnCourse {
  courseId   String
  course     Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  categoryId String
  category   Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  
  @@id([courseId, categoryId])
}

model CourseEnrollment {
  id             String    @id @default(cuid())
  userId         String
  user           User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  courseId       String
  course         Course    @relation(fields: [courseId], references: [id], onDelete: Cascade)
  enrolledAt     DateTime  @default(now())
  expiresAt      DateTime?
  isCompleted    Boolean   @default(false)
  completedAt    DateTime?
  
  // Relations
  chapterProgress ChapterProgress[]
  lessonProgress  LessonProgress[]
  
  @@unique([userId, courseId])
}

model ChapterProgress {
  id                String   @id @default(cuid())
  isCompleted       Boolean  @default(false)
  completedAt       DateTime?
  chapterId         String
  chapter           Chapter  @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  courseEnrollmentId String
  courseEnrollment  CourseEnrollment @relation(fields: [courseEnrollmentId], references: [id], onDelete: Cascade)
  
  @@unique([chapterId, courseEnrollmentId])
}

model LessonProgress {
  id                String   @id @default(cuid())
  isCompleted       Boolean  @default(false)
  completedAt       DateTime?
  watchTimePercent  Float    @default(0)
  lessonId          String
  lesson            Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  courseEnrollmentId String
  courseEnrollment  CourseEnrollment @relation(fields: [courseEnrollmentId], references: [id], onDelete: Cascade)
  
  @@unique([lessonId, courseEnrollmentId])
}

// Payment and Orders
model Payment {
  id           String    @id @default(cuid())
  amount       Float
  currency     String    @default("USD")
  status       PaymentStatus
  provider     String?   // e.g., "stripe", "paypal"
  providerPaymentId String?
  userId       String
  user         User      @relation(fields: [userId], references: [id])
  courseId     String?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
}

// Community Features
model Post {
  id        String    @id @default(cuid())
  title     String
  content   String
  published Boolean   @default(false)
  authorId  String
  author    User      @relation(fields: [authorId], references: [id])
  
  // Relations
  comments  Comment[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Message {
  id          String   @id @default(cuid())
  content     String
  senderId    String
  sender      User     @relation("MessageSender", fields: [senderId], references: [id])
  receiverId  String
  receiver    User     @relation("MessageReceiver", fields: [receiverId], references: [id])
  isRead      Boolean  @default(false)
  readAt      DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Enums
enum Role {
  USER
  TRAINER
  ADMIN
}

enum Level {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  EXPERT
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}
```

## Entity Relationships

### User Management
- **User**: Central entity for authentication and profile information
- **Auth**: Linked to User for authentication details
- **Profile**: Extended user information related to fitness

### Course Platform
- **Course**: Main entity for training courses
- **Chapter**: Sections within courses
- **Lesson**: Individual lessons within chapters
- **Attachment**: Files linked to lessons
- **Category**: Course categorization
- **CourseEnrollment**: Tracks user enrollment in courses
- **ChapterProgress & LessonProgress**: Track user progress through content

### Payment System
- **Payment**: Records of payments made by users

### Community Features
- **Post**: Forum/blog posts
- **Comment**: Comments on posts
- **Message**: Direct messages between users

## Data Flow

1. **User Registration/Authentication Flow**:
   - User registers → User record created → Auth record created → Profile created
   - User logs in → Auth verified → Session created

2. **Course Enrollment Flow**:
   - User browses courses → Selects course → Makes payment → CourseEnrollment created
   - Payment recorded → Access granted to course content

3. **Learning Progress Flow**:
   - User accesses course → Views lessons → Progress tracked in LessonProgress
   - Completes chapters → ChapterProgress updated → Course completion status updated

4. **Community Interaction Flow**:
   - User creates post → Post stored → Other users view posts
   - Users comment on posts → Comments linked to posts and users
   - Users send direct messages → Messages stored with sender/receiver relationship

## Implementation Notes

1. **Indexing Strategy**:
   - Index user email and username for quick lookup
   - Index course slug for URL-friendly access
   - Index enrollment relationships for quick access checks

2. **Data Security**:
   - Never store plain-text passwords (handled by auth provider)
   - Implement row-level security for user data
   - Ensure private content is properly protected with access controls

3. **Performance Considerations**:
   - Use efficient queries for course listings with pagination
   - Optimize progress tracking for minimal database operations
   - Consider caching strategies for frequently accessed courses and content

4. **Future Extensions**:
   - Support for subscription-based access
   - Additional metrics for workout tracking
   - Integration with fitness tracking APIs/devices
