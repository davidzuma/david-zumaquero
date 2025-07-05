#!/usr/bin/env python3
"""
Convert the David chess image to a proper favicon.ico file
"""

from PIL import Image
import os

def create_favicon():
    # Input and output paths
    input_path = "assets/david_chess.jpg"
    output_path = "favicon.ico"
    
    # Check if input file exists
    if not os.path.exists(input_path):
        print(f"Error: Input file {input_path} not found")
        return False
    
    try:
        # Open the image
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for JPEG compatibility)
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            # Create multiple sizes for the ICO file (common favicon sizes)
            sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
            
            # Create a list to store the resized images
            icon_images = []
            
            for size in sizes:
                # Resize the image
                resized = img.resize(size, Image.Resampling.LANCZOS)
                icon_images.append(resized)
            
            # Save as ICO file with multiple sizes
            icon_images[0].save(
                output_path,
                format='ICO',
                sizes=[(img.width, img.height) for img in icon_images],
                append_images=icon_images[1:]
            )
            
            print(f"✅ Successfully created {output_path}")
            print(f"📊 Created favicon with sizes: {sizes}")
            
            # Verify the file was created
            if os.path.exists(output_path):
                file_size = os.path.getsize(output_path)
                print(f"📁 File size: {file_size} bytes")
                return True
            else:
                print("❌ Error: Favicon file was not created")
                return False
                
    except Exception as e:
        print(f"❌ Error creating favicon: {e}")
        return False

if __name__ == "__main__":
    print("🎨 Creating favicon from David chess image...")
    success = create_favicon()
    
    if success:
        print("\n🎉 Favicon created successfully!")
        print("🌐 Your website will now show the David chess image as favicon on all pages")
        print("🔄 Refresh your browser to see the changes")
    else:
        print("\n💥 Failed to create favicon")
