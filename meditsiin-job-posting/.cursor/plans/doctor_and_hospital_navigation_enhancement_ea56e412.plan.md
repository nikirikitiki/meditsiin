# Doctor and Hospital Navigation Enhancement

## Overview
Enhance the doctor portal with navigation to Positions, Hospitals, and Applications, add a Doctors view for hospitals, and add clear public/private indicators on hospital profile and position listings.

## Current State
- Doctors currently only have "My Profile" button in `NavbarUserMenu`
- The homepage (/) shows all positions but isn't doctor-specific
- `/doctors/applications` exists
- `/doctors/directory` exists for public doctors
- Hospitals have navigation buttons: Positions, Applications, Post Position, My Profile
- Hospitals don't have a way to browse doctors
- Hospital profile doesn't clearly show public/private status
- Hospital positions page doesn't show public/private status for each position

## Changes Required

### 1. Doctor Navigation Enhancement

#### 1.1 Update NavbarUserMenu for Doctors
- **File**: `src/components/NavbarUserMenu.tsx`
- Add navigation buttons for doctors similar to hospitals:
  - **Positions** → `/doctors/positions` (new page)
  - **Hospitals** → `/doctors/hospitals` (new page)
  - **Applications** → `/doctors/applications` (existing)
  - **My Profile** → `/doctors/profile` (existing)

#### 1.2 Create Doctor Positions Page
- **File**: `src/app/doctors/positions/page.tsx`
- Show all available public positions (similar to homepage)
- Use existing `JobFilterSidebar` and `JobResults` components
- Filter positions to only show `isPublic: true`
- Reuse the filtering/search logic from `src/app/page.tsx`

#### 1.3 Create Doctor Hospitals Page
- **File**: `src/app/doctors/hospitals/page.tsx`
- Show list of all public hospitals (similar to `/hospitals/directory`)
- Reuse pattern from `src/app/hospitals/directory/page.tsx`
- Link to individual hospital pages at `/hospitals/[slug]`

### 2. Hospital Navigation Enhancement

#### 2.1 Update NavbarUserMenu for Hospitals
- **File**: `src/components/NavbarUserMenu.tsx`
- Add "Doctors" button that links to `/hospitals/doctors`

#### 2.2 Create Hospital Doctors Page
- **File**: `src/app/hospitals/doctors/page.tsx`
- Show list of all public doctors (similar to `/doctors/directory`)
- Reuse pattern from `src/app/doctors/directory/page.tsx`
- Link to individual doctor pages at `/doctors/[id]`

### 3. Hospital Profile Public Status Button

#### 3.1 Add Public/Private Status Button to Hospital Profile
- **File**: `src/app/hospitals/profile/HospitalProfileView.tsx`
- Add a clear button/badge showing if the hospital profile is public or private
- Display prominently in the profile header area, near the hospital name
- Use visual styling: green/green-100 for "Public", gray/gray-100 for "Private"
- Use `Badge` component or styled button from `@/components/ui/badge` or `@/components/ui/button`
- Include `isPublic` in the hospital type interface if needed
- The button should be visible and clear, showing the current status

### 4. Hospital Positions Public Status Indicators

#### 4.1 Add Public/Private Status Button to Each Position
- **File**: `src/app/hospitals/positions/page.tsx`
- Add a clear button/badge for each position showing if it's public or private
- Display prominently on each position card/item
- Use visual styling: green/green-100 for "Public", gray/gray-100 for "Private"
- Use `Badge` component from `@/components/ui/badge`
- Show the status next to position title or in a visible location on the position card

## Implementation Details

### Doctor Positions Page
- Reuse `JobFilterSidebar` and `JobResults` components
- Query: `prisma.position.findMany({ where: { isPublic: true }, ... })`
- Include search, filtering, sorting, and pagination
- Same functionality as homepage but scoped to doctor view

### Doctor Hospitals Page
- Query: `prisma.hospital.findMany({ where: { isPublic: true }, ... })`
- Display hospital cards with name, location, description, logo
- Link format: `/hospitals/${hospital.slug}`

### Hospital Doctors Page
- Query: `prisma.doctor.findMany({ where: { isPublic: true }, ... })`
- Display doctor cards with name, headline, location
- Link format: `/doctors/${doctor.id}`

### Hospital Profile Public Status Button
- Access `hospital.isPublic` field from the hospital object
- Add button/badge in the header section near the hospital name
- Style: green background for public, gray for private
- Text: "Public" or "Private"
- Should be prominent and clear
- Use existing Badge or Button component with appropriate styling

### Hospital Positions Public Status
- Access `position.isPublic` field for each position
- Add badge/button to each position card in the list
- Display near position title or in a visible location
- Style: green background for public, gray for private
- Text: "Public" or "Private"
- Use Badge component with conditional styling

## Navigation Structure

### Doctor Navigation (NavbarUserMenu)
```
[Positions] [Hospitals] [Applications] [My Profile]
```

### Hospital Navigation (NavbarUserMenu)
```
[My Positions] [Applications] [Post Position] [Doctors] [My Profile]
```

## Files to Create
1. `src/app/doctors/positions/page.tsx`
2. `src/app/doctors/hospitals/page.tsx`
3. `src/app/hospitals/doctors/page.tsx`

## Files to Modify
1. `src/components/NavbarUserMenu.tsx` - Add navigation buttons for both roles
2. `src/app/hospitals/profile/HospitalProfileView.tsx` - Add public/private status button/badge
3. `src/app/hospitals/positions/page.tsx` - Add public/private status badge for each position