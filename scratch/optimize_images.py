import os
from PIL import Image

def optimize_images():
    img_dir = r"c:\Users\SUNDAR\Documents\GitHub\acumatic\src\assets\images"
    target_files = ["acumatic_bg.png", "logo.png", "about.png", "about_1.png", "vision_icon.png"]
    
    print(f"Starting image optimization in: {img_dir}")
    
    for filename in target_files:
        src_path = os.path.join(img_dir, filename)
        if not os.path.exists(src_path):
            print(f"Warning: File {filename} not found in {img_dir}. Skipping.")
            continue
            
        base_name, _ = os.path.splitext(filename)
        dest_path = os.path.join(img_dir, f"{base_name}.webp")
        
        orig_size = os.path.getsize(src_path)
        print(f"Optimizing {filename} ({orig_size / 1024:.2f} KB)...")
        
        try:
            with Image.open(src_path) as img:
                # Convert RGBA to RGB if saving as JPEG, but WebP supports alpha.
                # So we can keep it as is or optimize it.
                img.save(dest_path, "WEBP", quality=80, method=6)
                
            new_size = os.path.getsize(dest_path)
            reduction = (1 - (new_size / orig_size)) * 100
            print(f"Saved: {base_name}.webp ({new_size / 1024:.2f} KB) - Reduced by {reduction:.1f}%")
        except Exception as e:
            print(f"Error optimizing {filename}: {e}")

if __name__ == "__main__":
    optimize_images()
