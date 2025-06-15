# 🎥 How to Enable YouTube Video Embedding

## 📋 **Step-by-Step Instructions:**

### **1. Go to YouTube Studio**
- Visit [YouTube Studio](https://studio.youtube.com)
- Sign in to your YouTube account

### **2. Navigate to Your Video**
- Click on **"Contenido"** (Content) in the left sidebar
- Find your video in the list
- Click on the video title or thumbnail

### **3. Access Video Settings**
- Click on **"Detalles"** (Details) tab
- Scroll down to find the **"Visibilidad"** (Visibility) section

### **4. Enable Embedding**
- Look for **"Restricciones"** (Restrictions) section
- Find the **"Derechos de autor"** (Copyright) or **"Embedding"** option
- **UNCHECK** the box that says:
  - ❌ "Disable embedding" 
  - ❌ "Block embedding on other websites"
  - ❌ "Restringir inserción" (Restrict embedding)

### **5. Additional Settings to Check**
- **Visibility**: Make sure it's set to **"Público"** (Public)
- **Age Restrictions**: Ensure it's **NOT** marked as age-restricted
- **Copyright Claims**: Resolve any copyright issues

### **6. Save Changes**
- Click **"Guardar"** (Save) or **"Publicar"** (Publish)
- Wait a few minutes for changes to propagate

---

## 🔧 **Alternative Method - Advanced Settings:**

### **Via Video Manager:**
1. Go to **YouTube Studio** → **Content**
2. Click the **pencil icon** (edit) next to your video
3. Go to **"Visibility"** tab
4. Under **"Embedding"** section:
   - ✅ **Allow embedding**
   - ✅ **Allow embedding on any website**

### **Bulk Settings (Multiple Videos):**
1. Select multiple videos in Content tab
2. Click **"Edit"** → **"Visibility"**
3. Change embedding settings for all selected videos

---

## 🚨 **Common Issues & Solutions:**

### **Issue 1: "Video unavailable" still shows**
- **Solution**: Clear browser cache and wait 10-15 minutes
- YouTube's CDN needs time to update embedding permissions

### **Issue 2: Copyright restrictions**
- **Solution**: Ensure no copyrighted music/content in your video
- Use YouTube's **Audio Library** for copyright-free music

### **Issue 3: Age-restricted content**
- **Solution**: Remove any content that might trigger age restrictions
- Educational/technical content is usually fine

### **Issue 4: Regional restrictions**
- **Solution**: Check if video is blocked in certain countries
- Remove geographical restrictions if not needed

---

## ✅ **Test Your Embedding:**

After making changes, test with this simple HTML:

```html
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
  frameborder="0" 
  allowfullscreen>
</iframe>
```

Replace `YOUR_VIDEO_ID` with your actual video ID.

---

## 🎯 **For Your Specific Videos:**

### **KSPDG 2024 Video:**
- Video ID: `ioy0TIyqa8w`
- Test URL: `https://www.youtube.com/embed/ioy0TIyqa8w`

### **KSPDG 2025 Video:**
- Video ID: `qK2dbhiIw8c` 
- Test URL: `https://www.youtube.com/embed/qK2dbhiIw8c`

---

## 📱 **Mobile-Friendly Settings:**

Make sure to also enable:
- ✅ **Mobile playback**
- ✅ **Autoplay on mobile** (optional)
- ✅ **Picture-in-picture mode**

---

## 🔄 **After Enabling Embedding:**

1. **Wait 5-10 minutes** for YouTube to update
2. **Clear your browser cache**
3. **Test the embedding** on your website
4. **Check both desktop and mobile** versions

The hover preview and modal system we built will work perfectly once embedding is enabled! 🚀