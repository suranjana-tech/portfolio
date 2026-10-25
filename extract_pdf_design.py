import fitz, json, os, collections
pdf_path = r"C:\Agentic-AI\portfolio\Green White and Brown Modern Front End Developer Portfolio Presentation.pdf"
out_dir = r"C:\Agentic-AI\portfolio\analysis_output"
os.makedirs(out_dir, exist_ok=True)
doc = fitz.open(pdf_path)
summary = {"page_count": len(doc), "pages": []}
text_lines = []
for i, page in enumerate(doc, start=1):
    data = page.get_text("dict")
    font_counter = collections.Counter()
    color_counter = collections.Counter()
    block_count = len(data.get("blocks", []))
    image_count = sum(1 for b in data.get("blocks", []) if b.get("type") == 1)
    page_text = page.get_text("text")
    for line in page_text.splitlines():
        if line.strip():
            text_lines.append(f"[Page {i}] {line}")
    for block in data.get("blocks", []):
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                font = span.get("font", "unknown")
                size = round(span.get("size", 0), 1)
                color_int = span.get("color", 0)
                r = (color_int >> 16) & 255
                g = (color_int >> 8) & 255
                b = color_int & 255
                font_counter[(font, size)] += 1
                color_counter[(r, g, b)] += 1
    pix = page.get_pixmap(matrix=fitz.Matrix(2,2), alpha=False)
    pix.save(os.path.join(out_dir, f"page_{i}.png")) if i <= 3 else None
    summary["pages"].append({
        "page": i,
        "num_blocks": block_count,
        "num_images": image_count,
        "top_fonts": [{"font": f, "size": s, "count": c} for (f, s), c in font_counter.most_common(8)],
        "top_colors_rgb": [{"rgb": [r,g,b], "count": c} for (r,g,b), c in color_counter.most_common(8)]
    })
with open(os.path.join(out_dir, "design_summary.json"), "w", encoding="utf-8") as f:
    json.dump(summary, f, indent=2)
with open(os.path.join(out_dir, "text_preview.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(text_lines[:300]))
print(f"Pages: {len(doc)}")
print("Generated:")
print(os.path.join(out_dir, "design_summary.json"))
print(os.path.join(out_dir, "text_preview.txt"))
print(os.path.join(out_dir, "page_1.png"))
print(os.path.join(out_dir, "page_2.png"))
print(os.path.join(out_dir, "page_3.png"))
