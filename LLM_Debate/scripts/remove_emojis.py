#!/usr/bin/env python3
"""
Script to remove all emojis from the codebase
Replaces emojis with professional text markers
"""

import os
import re

# Emoji to replacement mapping
EMOJI_REPLACEMENTS = {
    '🚀': '',
    '🎯': '',
    '💻': '',
    '🏟️': '',
    '👥': '',
    '📊': '',
    '⏱️': '',
    '🔄': '',
    '📝': '',
    '🎉': '',
    '🎨': '',
    '✨': '',
    '✅': '',
    '⚽': '',
    '💡': '',
    '❌': '[Error]',
    '⚠️': '[Warning]',
    '🔥': '',
    '🔧': '',
    '📚': '',
    '🌐': '',
    '🐍': '',
    '♾️': '',
    '❤️': '',
    '🗺️': '',
    '🔌': '',
    '🎭': '',
    '🧠': '',
    '📈': '',
    '🏗️': '',
    '🛠️': '',
    '⚖️': '',
    '🌟': ''
}

def remove_emojis(content):
    """Remove emojis from content"""
    cleaned = content
    for emoji, replacement in EMOJI_REPLACEMENTS.items():
        cleaned = cleaned.replace(emoji, replacement)
    # Clean up extra spaces
    cleaned = re.sub(r'  +', ' ', cleaned)
    cleaned = re.sub(r'\n\n\n+', '\n\n', cleaned)
    return cleaned

def process_file(filepath):
    """Process a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        cleaned = remove_emojis(content)
        
        if content != cleaned:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(cleaned)
            print(f"Cleaned: {filepath}")
            return True
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
    return False

def process_directory(directory):
    """Process all files in directory recursively"""
    cleaned_count = 0
    for root, dirs, files in os.walk(directory):
        # Skip node_modules and hidden directories
        dirs[:] = [d for d in dirs if not d.startswith('.') and d != 'node_modules' and d != 'scripts']
        
        for file in files:
            if file.endswith(('.js', '.md', '.py')):
                filepath = os.path.join(root, file)
                if process_file(filepath):
                    cleaned_count += 1
    
    return cleaned_count

if __name__ == '__main__':
    print('Removing emojis from codebase...\n')
    count = process_directory('.')
    print(f'\nDone! Cleaned {count} files.')
