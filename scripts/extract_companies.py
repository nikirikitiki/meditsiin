#!/usr/bin/env python3
"""
Extract company data from SSB.ee search results
"""
import re
import json

# Sample data structure from the web search results
# We'll parse the text content to extract company information

def parse_company_data(text_content):
    """Parse company data from the search results text"""
    companies = []
    
    # Pattern to match company entries
    # Looking for patterns like:
    # ## COMPANY NAME
    # Krediidiskoor: value
    # Maineskoor: value
    # Töötajaid: value
    # Prognooskäive (2025): value
    
    # Split by company headers (##)
    parts = re.split(r'##\s+([A-Z][^\n]+)', text_content)
    
    for i in range(1, len(parts), 2):
        if i + 1 < len(parts):
            name = parts[i].strip()
            content = parts[i + 1]
            
            company = {'name': name}
            
            # Extract Krediidiskoor
            krediidiskoor_match = re.search(r'Krediidiskoor:\s*([^\n]+)', content)
            if krediidiskoor_match:
                company['krediidiskoor'] = krediidiskoor_match.group(1).strip()
            
            # Extract Maineskoor
            maineskoor_match = re.search(r'Maineskoor:\s*([^\n]+)', content)
            if maineskoor_match:
                company['maineskoor'] = maineskoor_match.group(1).strip()
            
            # Extract Töötajaid
            tootajaid_match = re.search(r'Töötajaid:\s*(\d+)', content)
            if tootajaid_match:
                company['tootajaid'] = tootajaid_match.group(1).strip()
            
            # Extract Prognooskäive
            prognoos_match = re.search(r'Prognooskäive \(2025\):\s*([^\n€]+)', content)
            if prognoos_match:
                company['prognooskaive'] = prognoos_match.group(1).strip()
            
            if 'krediidiskoor' in company:
                companies.append(company)
    
    return companies

if __name__ == '__main__':
    # For now, this is a template
    # The actual data would need to be fetched from the website
    print("This script would parse company data from SSB.ee")
    print("Due to access restrictions, manual data entry or API access would be needed")

