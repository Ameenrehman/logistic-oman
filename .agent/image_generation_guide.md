# Image Generation Guide - Beverage Logistics Oman

For Stage 1 (Asset Production), you need to generate 15–20 high-quality commercial-grade images for the website (Hero, Warehouse, Fleet, and Operations Center). Below are the recommended platforms, tools, and parameters to achieve the highest quality.

---

## 🌐 Recommended Image Generators

### 1. Midjourney (v6)
* **Website**: [midjourney.com](https://www.midjourney.com/) (Requires Discord or their web interface subscription)
* **Why**: Best in class for cinematic, warm lighting (golden hour), premium reflections on truck bodywork, and atmospheric landscape compositions.
* **Key Commands**:
  - Add `--ar 16:9` for Hero images.
  - Add `--ar 4:3` for Warehouse images.
  - Add `--ar 1:1` for Fleet/Card images.
  - Add `--style raw` to avoid cartoonish/fantasy looks and maintain a realistic commercial photograph style.

### 2. FLUX.1 (Dev / Pro)
* **Websites / APIs**: 
  - [fal.ai](https://fal.ai/) (Pay-as-you-go, fast, very cheap)
  - [replicate.com](https://replicate.com/) (Great selection of FLUX.1 models)
  - [huggingface.co](https://huggingface.co/) (Free/paid spaces for testing)
* **Why**: The absolute state-of-the-art for physical composition, realistic vehicle anatomy (truck wheels, cabs), and text rendering. It handles complex scene instructions better than any other model.

### 3. Leonardo.ai
* **Website**: [leonardo.ai](https://leonardo.ai/) (Offers daily free credits and web UI)
* **Why**: Has specific styles like *Kino XL*, *Leonardo Vision XL*, or *Phoenix* which are pre-tuned for high-end cinematic/commercial photography.
* **Bonus**: Has built-in canvas editing and real-time generation tools.

---

## ⚡ Resolution Enhancers & Upscalers

Since the plan asks for **8K resolution** for final assets, you should generate images at standard resolutions (e.g., 1024x1024 or 1456x816) and upscale them.

1. **Magnific AI** ([magnific.ai](https://magnific.ai/)): The gold standard for upscaling. It adds incredibly realistic details (road texture, paint reflections, dust, lights) rather than just stretching pixels.
2. **Krea AI** ([krea.ai](https://krea.ai/)): Very strong upscaler and enhancer with fine-grained control over "creativity" and "resemblance".
3. **Upscayl** (Open Source / Free): A desktop application using local GPU to upscale images without subscription costs.

---

## 💡 Prompting Best Practices for Logistics

- **Maintain Color Consistency**: To keep a cohesive brand look across all pages, include color keywords like:
  - `golden hour lighting`, `warm desert tones`, `corporate branding`, `consistent color grading`.
- **Composition / Safe Zones**: When generating hero images, remember there will be text on the left side on desktop. Use Midjourney's panning or prompt:
  - `Left 30% empty for text overlay, minimalist composition, off-center subject`.
- **Remove Text & Watermarks**: AI sometimes adds fake letters. Always append negative prompts or instructions like:
  - `No logos, no text, no watermark, photorealistic, commercial photography`.
