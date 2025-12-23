#!/usr/bin/env node

/**
 * Script to remove all emojis from the codebase
 * Replaces emojis with professional text markers
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const emojiReplacements = {
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
  '❤️': ''
};

function removeEmojis(content) {
  let cleaned = content;
  for (const [emoji, replacement] of Object.entries(emojiReplacements)) {
    cleaned = cleaned.replace(new RegExp(emoji, 'g'), replacement);
  }
  // Clean up extra spaces
  cleaned = cleaned.replace(/  +/g, ' ');
  cleaned = cleaned.replace(/\n\n\n+/g, '\n\n');
  return cleaned;
}

function processFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const cleaned = removeEmojis(content);
    if (content !== cleaned) {
      writeFileSync(filePath, cleaned, 'utf8');
      console.log(`Cleaned: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dir) {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      processDirectory(fullPath);
    } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.md') || item.endsWith('.py'))) {
      processFile(fullPath);
    }
  }
}

// Start cleaning from current directory
console.log('Removing emojis from codebase...\n');
processDirectory('.');
console.log('\nDone!');
