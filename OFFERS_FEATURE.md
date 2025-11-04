# Offers Feature Documentation

## Overview
The Offers feature in the LNAID student module provides a comprehensive system for students to browse, filter, and apply to funding opportunities such as internships, grants, fellowships, and other educational opportunities.

## Components

### 1. Offers Index Page (`/student/offers`)
**Location**: `/src/pages/student/offers/index.vue`

**Features**:
- Modern dashboard with statistics overview
- Advanced filtering by amount, course, and search
- Perfect match detection based on student profile
- Quick apply functionality
- Responsive grid layout
- Real-time statistics

**Statistics Displayed**:
- Total offers available
- Perfect matches for student profile
- Total funding available
- Average funding amount

**Filters**:
- Search by title, sponsor, or description
- Amount range filtering
- Course-specific filtering
- Perfect matches only toggle

### 2. Offer Detail Page (`/student/offers/[id]`)
**Location**: `/src/pages/student/offers/[id].vue`

**Features**:
- Comprehensive offer information display
- Eligibility criteria breakdown
- Application requirements list
- Selection process explanation
- Quick application submission
- Social sharing functionality
- Similar offers suggestions
- Progress tracking

**Sections**:
- Header with title, sponsor, and award amount
- Eligibility criteria with visual icons
- Application requirements checklist
- Selection process details
- Quick info sidebar
- Profile match indicator
- Similar opportunities

### 3. Offers Store (`useOffersStore`)
**Location**: `/src/stores/offers.js`

**State Management**:
- Offers data management
- Filtering and search logic
- Profile matching algorithms
- CRUD operations
- Local storage persistence

**Key Methods**:
- `getOffers` - Get all offers
- `getOfferById` - Get specific offer
- `getMatchingOffers` - Get offers matching student profile
- `initializeOffers` - Load offers from storage
- `applyToOffer` - Handle application submissions

## Data Structure

### Offer Object
```javascript
{
  id: Number,
  sponsorId: Number,
  sponsorName: String,
  sponsorAvatar: String,
  title: String,
  description: String,
  amount: Number,
  totalBudget: Number,
  remainingBudget: Number,
  maxRecipients: Number,
  currentRecipients: Number,
  criteria: {
    schools: Array,
    courses: Array,
    levels: Array,
    minGPA: Number,
    maxGPA: Number,
    gender: String,
    states: Array,
    ageRange: { min: Number, max: Number },
    financialNeed: Boolean
  },
  requirements: Array,
  selectionProcess: String, // 'merit_based', 'holistic', 'research_based', 'portfolio_based'
  status: String,
  deadline: String,
  createdAt: String,
  applications: Array
}
```

## Example Data

The offers store includes 7 comprehensive example opportunities:

1. **Tech Innovation Grant** - ₦100,000
   - Computer Science focus
   - Merit-based selection
   - GPA 3.5+ requirement

2. **Female STEM Excellence Award** - ₦150,000
   - Women-only
   - STEM courses
   - Holistic review process

3. **Renewable Energy Research Grants** - ₦200,000
   - Engineering/Environmental Science
   - Research-based selection
   - GPA 3.8+ requirement

4. **Future Doctors Scholarship** - ₦300,000
   - Medical fields
   - GPA 4.0+ requirement
   - Financial need consideration

5. **Entrepreneurship Development Grant** - ₦250,000
   - Business-focused
   - Merit-based with business plan
   - Age limit 20-35

6. **Creative Arts Excellence Award** - ₦120,000
   - Arts and creative fields
   - Portfolio-based selection
   - Financial need required

7. **Sustainable Agriculture Grant** - ₦180,000
   - Agriculture focus
   - Research-based
   - State-specific eligibility

## Integration with Applications System

The offers feature is fully integrated with the applications system:

- **ApplicationModal**: Handles offer applications
- **Applications Store**: Tracks offer applications
- **Timeline Tracking**: Application progress monitoring
- **Document Management**: Requirement submissions

## Key Features

### Profile Matching
- Automatic matching based on student profile
- Criteria comparison (school, course, GPA, etc.)
- Visual indicators for perfect matches
- Personalized recommendations

### Advanced Filtering
- Multi-criteria filtering
- Real-time search
- Amount range selection
- Course-specific filtering

### User Experience
- Modern, responsive design
- Intuitive navigation
- Quick action buttons
- Progress indicators
- Social sharing

### Data Management
- Local storage persistence
- Real-time updates
- Error handling
- State synchronization

## Navigation Integration

The offers feature is integrated into the student navigation:
- Main menu: "Browse Opportunities"
- Applications page: Direct links to related offers
- Quick access from dashboard

## Technical Implementation

### Dependencies
- Vue 3 Composition API
- Pinia for state management
- Vue Router for navigation
- Lucide Vue for icons
- Tailwind CSS for styling

### Performance Considerations
- Lazy loading of offer details
- Efficient filtering algorithms
- Optimized rendering
- Cached search results

## Future Enhancements

Potential improvements:
1. Advanced search with multiple criteria
2. Saved search preferences
3. Email notifications for new matches
4. Application deadline reminders
5. Enhanced recommendation engine
6. Integration with external opportunity APIs

## Testing

The feature includes comprehensive test data covering:
- Different opportunity types
- Various selection processes
- Diverse eligibility criteria
- Different funding amounts
- Multiple deadline scenarios

This provides a robust foundation for testing all aspects of the offers system.
