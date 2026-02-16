#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Icon Generation Script
 * Converts SVG to PNG using macOS sips command
 * Creates 1024x1024 PNG icon suitable for iOS App Store
 */

const SVG_SOURCE = path.join(__dirname, '../assets/icon.svg');
const PNG_OUTPUT = path.join(__dirname, '../assets/icon.png');

function generateIcon() {
  try {
    // Verify SVG exists
    if (!fs.existsSync(SVG_SOURCE)) {
      console.error(`Error: SVG file not found at ${SVG_SOURCE}`);
      process.exit(1);
    }

    console.log('Generating PNG icon from SVG...');
    console.log(`Source: ${SVG_SOURCE}`);
    console.log(`Output: ${PNG_OUTPUT}`);

    // Use macOS sips command to convert SVG to PNG
    // sips maintains the viewBox dimensions (1024x1024)
    execSync(`sips -s format png "${SVG_SOURCE}" --out "${PNG_OUTPUT}"`, {
      stdio: 'inherit',
    });

    // Verify output
    if (fs.existsSync(PNG_OUTPUT)) {
      const stats = fs.statSync(PNG_OUTPUT);
      console.log(`✓ Successfully created icon.png (${Math.round(stats.size / 1024)}KB)`);
      console.log('✓ Icon is ready for iOS App Store submission');
    } else {
      throw new Error('Failed to create PNG file');
    }
  } catch (error) {
    console.error('Error generating icon:', error.message);
    process.exit(1);
  }
}

generateIcon();
